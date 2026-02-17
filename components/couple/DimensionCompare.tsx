"use client";

import { motion } from "framer-motion";
import type { DimensionComparison } from "@/lib/compatibility";
import type { Locale } from "@/lib/i18n";

interface Props {
  comparisons: DimensionComparison[];
  partner1Name: string;
  partner2Name: string;
  locale: Locale;
}

const typeColors: Record<string, string> = {
  match: "text-emerald-400/80",
  complement: "text-blue-400/80",
  growth: "text-amber-400/80",
};

const typeBg: Record<string, string> = {
  match: "bg-emerald-400/10",
  complement: "bg-blue-400/10",
  growth: "bg-amber-400/10",
};

const typeLabels: Record<string, { ko: string; en: string }> = {
  match: { ko: "일치", en: "Match" },
  complement: { ko: "상보적", en: "Complement" },
  growth: { ko: "성장 영역", en: "Growth" },
};

export default function DimensionCompare({
  comparisons,
  partner1Name,
  partner2Name,
  locale,
}: Props) {
  const isEn = locale === "en";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border border-white/[0.06] p-6"
    >
      <p className="mb-1 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
        Dimension Comparison
      </p>
      <h3 className="mb-6 text-lg font-normal text-text-primary">
        {isEn ? "8-Dimension Analysis" : "8차원 비교 분석"}
      </h3>

      {/* Legend */}
      <div className="mb-4 flex justify-center gap-4">
        <span className="text-[10px] text-gold/50">
          ◀ {partner1Name}
        </span>
        <span className="text-[10px] text-text-muted/40">|</span>
        <span className="text-[10px] text-gold/50">
          {partner2Name} ▶
        </span>
      </div>

      <div className="space-y-4">
        {comparisons.map((dim, i) => (
          <motion.div
            key={dim.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            {/* Dimension header */}
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {isEn ? dim.nameEn : dim.name}
              </span>
              <span
                className={`rounded-sm px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${typeColors[dim.type]} ${typeBg[dim.type]}`}
              >
                {isEn ? typeLabels[dim.type].en : typeLabels[dim.type].ko}
              </span>
            </div>

            {/* Dual bar */}
            <div className="flex items-center gap-1">
              {/* Partner 1 bar (right-aligned) */}
              <div className="flex flex-1 justify-end">
                <div className="relative h-2 w-full overflow-hidden bg-white/[0.03]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score1}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                    className="absolute right-0 top-0 h-full bg-gold/40"
                  />
                </div>
              </div>

              {/* Scores */}
              <div className="flex w-16 shrink-0 items-center justify-center gap-1 text-[10px]">
                <span className="text-gold/60">{dim.score1}</span>
                <span className="text-text-muted/20">:</span>
                <span className="text-gold/60">{dim.score2}</span>
              </div>

              {/* Partner 2 bar (left-aligned) */}
              <div className="flex flex-1 justify-start">
                <div className="relative h-2 w-full overflow-hidden bg-white/[0.03]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score2}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                    className="absolute left-0 top-0 h-full bg-gold/40"
                  />
                </div>
              </div>
            </div>

            {/* Compatibility score + Insight */}
            <div className="mt-1 flex items-start gap-2">
              <span className="shrink-0 text-[10px] text-text-muted/40">
                {dim.compatibility}%
              </span>
              <p className="text-[10px] leading-relaxed text-text-muted/50">
                {isEn ? dim.insightEn : dim.insight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
