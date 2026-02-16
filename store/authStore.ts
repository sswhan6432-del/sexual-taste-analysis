"use client";

import { create } from "zustand";

interface User {
  email: string;
  nickname: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (email: string, password: string, nickname: string) => { success: boolean; error?: string };
  logout: () => void;
  hydrate: () => void;
}

const AUTH_KEY = "auth_user";
const USERS_KEY = "auth_users";

function getStoredUsers(): Record<string, { password: string; nickname: string }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { password: string; nickname: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email, password) => {
    const users = getStoredUsers();
    const entry = users[email];
    if (!entry) {
      return { success: false, error: "account_not_found" };
    }
    if (entry.password !== password) {
      return { success: false, error: "wrong_password" };
    }
    const user = { email, nickname: entry.nickname };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return { success: true };
  },

  signup: (email, password, nickname) => {
    const users = getStoredUsers();
    if (users[email]) {
      return { success: false, error: "email_exists" };
    }
    users[email] = { password, nickname };
    saveUsers(users);
    const user = { email, nickname };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    set({ user: null, isAuthenticated: false });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const user = JSON.parse(raw) as User;
        set({ user, isAuthenticated: true });
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
  },
}));
