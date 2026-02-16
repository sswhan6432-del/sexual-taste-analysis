"use client";

import { motion } from "framer-motion";
import { dimensions } from "@/lib/dimensions";
import type { DimensionScores } from "@/lib/scoring";
import { useQuizStore } from "@/store/quizStore";
import { t } from "@/lib/i18n";

interface ScoreBreakdownProps {
  scores: DimensionScores;
}

export default function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  const locale = useQuizStore((s) => s.locale);
  // Convert 0-100 scale (50=neutral) to percentage deviation
  const items = dimensions
    .map((dim) => {
      const raw = scores[dim.key] ?? 50;
      const pct = Math.round((raw - 50) * 2); // -100 ~ +100
      return { dim, raw, pct };
    })
    .sort((a, b) => b.pct - a.pct);

  const maxAbs = Math.max(...items.map((i) => Math.abs(i.pct)), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mx-auto max-w-md border border-gold/10 p-8"
    >
      <p className="mb-3 text-center text-xs font-normal uppercase tracking-[0.3em] text-gold/40">
        Score Summary
      </p>

      {/* Legend */}
      <div className="mb-8 text-center text-[10px] leading-relaxed text-text-muted/60">
        <p>
          <span className="text-emerald-400/80">{t("score.positive", locale)}</span>{t("score.hasTrait", locale)},{" "}
          <span className="text-amber-400/80">{t("score.negative", locale)}</span>{t("score.noTrait", locale)}
        </p>
        <p>
          {t("score.strongNote", locale)} <span className="text-emerald-400/80">{t("score.strong", locale)}</span>,{" "}
          {t("score.softNote", locale)}{" "}
          <span className="text-amber-400/80">{t("score.soft", locale)}</span>
        </p>
      </div>

      <div className="space-y-3">
        {items.map(({ dim, pct }, index) => {
          const isPositive = pct >= 0;
          const barWidth = maxAbs > 0 ? (Math.abs(pct) / maxAbs) * 100 : 0;

          return (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0, x: isPositive ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.06 }}
              className="flex items-center gap-3"
            >
              {/* Percentage value */}
              <span
                className={`w-12 text-right text-sm tabular-nums ${
                  isPositive
                    ? pct === 0
                      ? "text-text-muted/40"
                      : "text-emerald-400/80"
                    : "text-amber-400/80"
                }`}
              >
                {isPositive ? `+${pct}` : pct}%
              </span>

              {/* Bar */}
              <div className="relative h-[6px] flex-1 bg-white/[0.04] rounded-sm overflow-hidden">
                <motion.div
                  className={`absolute top-0 h-full rounded-sm ${
                    isPositive
                      ? pct === 0
                        ? "bg-white/10"
                        : "bg-emerald-400/50"
                      : "bg-amber-400/50"
                  }`}
                  style={{ left: 0 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + index * 0.06,
                    ease: "easeOut",
                  }}
                />
              </div>

              {/* Dimension label */}
              <span className="w-24 text-xs text-text-secondary/70">
                {locale === "en" ? dim.nameEn : dim.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Dimension detail list */}
      <div className="mt-8 border-t border-white/[0.04] pt-6 space-y-2.5">
        {items.map(({ dim, pct }, index) => {
          const isPositive = pct >= 0;
          const label = isPositive
            ? (locale === "en" ? dim.highLabelEn : dim.highLabel)
            : (locale === "en" ? dim.lowLabelEn : dim.lowLabel);
          return (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.04 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gold/25">{dim.symbol}</span>
                <span className="text-xs text-text-secondary/60">
                  {locale === "en" ? dim.nameEn : dim.name}
                </span>
              </div>
              <span
                className={`text-[11px] ${
                  isPositive
                    ? pct === 0
                      ? "text-text-muted/30"
                      : "text-emerald-400/60"
                    : "text-amber-400/60"
                }`}
              >
                {label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
