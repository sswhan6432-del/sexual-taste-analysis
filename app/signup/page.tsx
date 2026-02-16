"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { useAuthStore } from "@/store/authStore";
import { t } from "@/lib/i18n";

export default function SignupPage() {
  const locale = useQuizStore((s) => s.locale);
  const signup = useAuthStore((s) => s.signup);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(locale === "ko" ? "비밀번호가 일치하지 않습니다." : "Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError(locale === "ko" ? "비밀번호는 6자 이상이어야 합니다." : "Password must be at least 6 characters.");
      return;
    }
    if (!termsAgreed) {
      setError(locale === "ko" ? "이용약관에 동의해주세요." : "Please agree to the Terms of Service.");
      return;
    }

    const result = signup(email, password, nickname);
    if (result.success) {
      router.push("/");
    } else {
      setError(
        locale === "ko" ? "이미 등록된 이메일입니다." : "Email already registered."
      );
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="glass w-full max-w-md rounded-sm p-8">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-wide text-gold">
          {t("signup.title", locale)}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <p className="text-center text-[13px] text-red-400">{error}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("signup.email", locale)}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("signup.nickname", locale)}
            </label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("signup.password", locale)}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("signup.confirmPassword", locale)}
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-center gap-2 text-[12px] tracking-wider text-text-muted">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="accent-gold"
            />
            {t("signup.terms", locale)}
          </label>

          <button
            type="submit"
            className="mt-2 border border-gold/40 bg-gold/10 py-2.5 text-[14px] font-medium tracking-wider text-gold transition-all duration-200 hover:bg-gold/20"
          >
            {t("signup.submit", locale)}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-[12px] tracking-wider text-text-muted">
          {t("signup.hasAccount", locale)}{" "}
          <Link href="/login" className="text-gold transition-colors hover:text-gold/80">
            {t("header.login", locale)}
          </Link>
        </p>
      </div>
    </main>
  );
}
