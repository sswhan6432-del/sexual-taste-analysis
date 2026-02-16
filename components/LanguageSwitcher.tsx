"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";

export default function LanguageSwitcher() {
  const locale = useQuizStore((s) => s.locale);
  const setLocale = useQuizStore((s) => s.setLocale);

  // Sync <html lang="..."> attribute with locale
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <button
      onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
      className="flex items-center gap-1 border border-white/[0.06] px-3 py-1.5 text-[11px] font-normal tracking-wider transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.02]"
    >
      <span className={locale === "ko" ? "text-gold" : "text-text-muted/40"}>
        KO
      </span>
      <span className="text-white/10">/</span>
      <span className={locale === "en" ? "text-gold" : "text-text-muted/40"}>
        EN
      </span>
    </button>
  );
}
