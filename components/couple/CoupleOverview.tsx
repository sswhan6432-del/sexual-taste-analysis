"use client";

import { motion } from "framer-motion";
import type { PartnerResult } from "@/store/coupleStore";
import type { Locale } from "@/lib/i18n";

interface Props {
  partner1: PartnerResult;
  partner2: PartnerResult;
  overallScore: number;
  locale: Locale;
}

export default function CoupleOverview({
  partner1,
  partner2,
  overallScore,
  locale,
}: Props) {
  const isEn = locale === "en";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border border-white/[0.06] p-6 text-center"
    >
      <p className="mb-6 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
        Couple Compatibility
      </p>

      {/* Two archetypes side by side */}
      <div className="mb-6 flex items-start justify-center gap-6">
        {/* Partner 1 */}
        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gold/40">
            {partner1.name}
          </p>
          <p className="text-lg text-text-primary">
            {partner1.resultType.numeral}
          </p>
          <p className="mt-1 text-sm font-normal text-gold">
            {isEn
              ? partner1.resultType.nameEn
              : partner1.resultType.name}
          </p>
          <p className="mt-1 text-[10px] text-text-muted/50">
            {Math.round(partner1.similarity * 100)}% match
          </p>
        </div>

        {/* Compatibility score circle */}
        <div className="flex flex-col items-center pt-2">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg className="absolute inset-0" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="rgba(212,184,122,0.1)"
                strokeWidth="1"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="rgba(212,184,122,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore / 100) * 226} 226`}
                strokeDashoffset="0"
                transform="rotate(-90 40 40)"
                initial={{ strokeDasharray: "0 226" }}
                animate={{
                  strokeDasharray: `${(overallScore / 100) * 226} 226`,
                }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl font-normal text-gold"
            >
              {overallScore}
            </motion.span>
          </div>
          <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-text-muted/40">
            {isEn ? "Compatibility" : "궁합 점수"}
          </p>
        </div>

        {/* Partner 2 */}
        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gold/40">
            {partner2.name}
          </p>
          <p className="text-lg text-text-primary">
            {partner2.resultType.numeral}
          </p>
          <p className="mt-1 text-sm font-normal text-gold">
            {isEn
              ? partner2.resultType.nameEn
              : partner2.resultType.name}
          </p>
          <p className="mt-1 text-[10px] text-text-muted/50">
            {Math.round(partner2.similarity * 100)}% match
          </p>
        </div>
      </div>

      {/* One-line summary */}
      <div className="mx-auto h-px w-10 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <p className="mt-4 text-xs leading-relaxed text-text-muted">
        {isEn
          ? `${partner1.name} (${partner1.resultType.nameEn}) and ${partner2.name} (${partner2.resultType.nameEn}) — ${overallScore >= 70 ? "a naturally harmonious pairing" : overallScore >= 50 ? "a dynamic pairing with growth potential" : "an exciting pairing of contrasts"}`
          : `${partner1.name} (${partner1.resultType.name})과(와) ${partner2.name} (${partner2.resultType.name}) — ${overallScore >= 70 ? "자연스럽게 조화를 이루는 조합" : overallScore >= 50 ? "성장 가능성이 풍부한 역동적 조합" : "대조적인 매력의 흥미로운 조합"}`}
      </p>
    </motion.section>
  );
}
