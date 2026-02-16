"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useQuizStore } from "@/store/quizStore";
import { useAuthStore } from "@/store/authStore";
import { t } from "@/lib/i18n";

export default function ResultsPage() {
  const locale = useQuizStore((s) => s.locale);
  const { isAuthenticated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Not logged in
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="glass max-w-md rounded-sm p-8 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gold-dim"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h1 className="mb-3 text-xl font-semibold tracking-wide text-gold">
            {t("results.title", locale)}
          </h1>
          <p className="mb-6 text-[13px] leading-relaxed tracking-wider text-text-muted">
            {t("results.loginRequired", locale)}
          </p>
          <Link
            href="/login"
            className="inline-block border border-gold/40 bg-gold/10 px-6 py-2 text-[13px] tracking-wider text-gold transition-all hover:bg-gold/20"
          >
            {t("results.goLogin", locale)}
          </Link>
        </div>
      </main>
    );
  }

  // Logged in — empty state (no saved results yet in Phase 1)
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="glass max-w-lg rounded-sm p-8 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-gold-dim"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h1 className="mb-3 text-xl font-semibold tracking-wide text-gold">
          {t("results.title", locale)}
        </h1>
        <p className="mb-6 text-[13px] leading-relaxed tracking-wider text-text-muted">
          {t("results.empty", locale)}
        </p>
        <Link
          href="/"
          className="inline-block border border-gold/40 bg-gold/10 px-6 py-2 text-[13px] tracking-wider text-gold transition-all hover:bg-gold/20"
        >
          {t("results.takeTest", locale)}
        </Link>
      </div>
    </main>
  );
}
