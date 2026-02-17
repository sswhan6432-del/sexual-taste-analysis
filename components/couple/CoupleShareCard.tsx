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

export default function CoupleShareCard({
  partner1,
  partner2,
  overallScore,
  locale,
}: Props) {
  const isEn = locale === "en";

  const shareText = isEn
    ? `${partner1.name} (${partner1.resultType.nameEn}) & ${partner2.name} (${partner2.resultType.nameEn}) — ${overallScore}% compatibility! Take the Velvet Compass couple quiz.`
    : `${partner1.name} (${partner1.resultType.name}) & ${partner2.name} (${partner2.resultType.name}) — 궁합 ${overallScore}%! Velvet Compass 커플 퀴즈를 해보세요.`;

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url + "/couple")}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="border border-white/[0.06] p-6 text-center"
    >
      <p className="mb-4 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
        Share Results
      </p>

      {/* Mini summary card */}
      <div className="mx-auto mb-6 max-w-xs border border-white/[0.04] bg-white/[0.01] p-5">
        <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-gold/30">
          Velvet Compass
        </p>

        <div className="flex items-center justify-center gap-3">
          <div className="text-center">
            <p className="text-xs text-gold/50">{partner1.name}</p>
            <p className="text-sm text-text-primary">
              {partner1.resultType.numeral}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center border border-gold/15">
            <span className="text-xs font-normal text-gold">
              {overallScore}%
            </span>
          </div>

          <div className="text-center">
            <p className="text-xs text-gold/50">{partner2.name}</p>
            <p className="text-sm text-text-primary">
              {partner2.resultType.numeral}
            </p>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-text-muted/40">
          {isEn
            ? `${partner1.resultType.nameEn} × ${partner2.resultType.nameEn}`
            : `${partner1.resultType.name} × ${partner2.resultType.name}`}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleShare}
        className="border border-white/[0.06] px-8 py-2.5 text-xs font-normal uppercase tracking-[0.2em] text-text-muted transition-all hover:border-gold/20 hover:text-gold"
      >
        {isEn ? "Share on X" : "X에 공유하기"}
      </motion.button>
    </motion.section>
  );
}
