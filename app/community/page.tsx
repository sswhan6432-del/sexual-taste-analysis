"use client";

import { useQuizStore } from "@/store/quizStore";
import { t } from "@/lib/i18n";

export default function CommunityPage() {
  const locale = useQuizStore((s) => s.locale);

  return (
    <main className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide text-gold">
          {t("community.title", locale)}
        </h1>
        <button
          disabled
          className="border border-gold/30 px-4 py-1.5 text-[13px] tracking-wider text-gold opacity-50 transition-all"
        >
          {t("community.write", locale)}
        </button>
      </div>

      {/* Empty state */}
      <div className="glass flex flex-col items-center justify-center rounded-sm py-20">
        <svg
          className="mb-4 h-12 w-12 text-gold-dim"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-[13px] tracking-wider text-text-muted">
          {t("community.empty", locale)}
        </p>
      </div>
    </main>
  );
}
