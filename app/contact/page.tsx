"use client";

import { useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import { t } from "@/lib/i18n";

export default function ContactPage() {
  const locale = useQuizStore((s) => s.locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Phase 1: just show success message (no backend)
    setSent(true);
  };

  if (sent) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="glass max-w-md rounded-sm p-8 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-[14px] leading-relaxed tracking-wider text-text-secondary">
            {t("contact.success", locale)}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="glass w-full max-w-lg rounded-sm p-8">
        <h1 className="mb-2 text-center text-2xl font-semibold tracking-wide text-gold">
          {t("contact.title", locale)}
        </h1>
        <p className="mb-4 text-center text-[12px] tracking-wider text-text-muted">
          {t("contact.description", locale)}
        </p>
        <div className="mb-8 space-y-1 text-center text-[12px] tracking-wider text-text-muted">
          <p>
            <a href="mailto:sswhan6432@gmail.com" className="text-gold/80 underline hover:text-gold">
              sswhan6432@gmail.com
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("contact.name", locale)}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("contact.email", locale)}
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
              {t("contact.subject", locale)}
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-wider text-text-muted">
              {t("contact.message", locale)}
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <button
            type="submit"
            className="mt-2 border border-gold/40 bg-gold/10 py-2.5 text-[14px] font-medium tracking-wider text-gold transition-all duration-200 hover:bg-gold/20"
          >
            {t("contact.submit", locale)}
          </button>
        </form>
      </div>
    </main>
  );
}
