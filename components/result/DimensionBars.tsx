"use client";

import { motion } from "framer-motion";
import { dimensions } from "@/lib/dimensions";
import type { DimensionScores } from "@/lib/scoring";
import { useQuizStore } from "@/store/quizStore";

interface DimensionBarsProps {
  scores: DimensionScores;
}

export default function DimensionBars({ scores }: DimensionBarsProps) {
  const locale = useQuizStore((s) => s.locale);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mx-auto max-w-md border border-gold/10 p-8"
    >
      <p className="mb-8 text-center text-xs font-normal uppercase tracking-[0.3em] text-gold/40">
        Dimension Breakdown
      </p>

      <div className="space-y-5">
        {dimensions.map((dim, index) => {
          const score = scores[dim.key] ?? 50;
          return (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.06 }}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-3 text-sm font-normal text-text-primary">
                  <span className="w-6 text-right text-[10px] text-gold/30">
                    {dim.symbol}
                  </span>
                  <span>{locale === "en" ? dim.nameEn : dim.name}</span>
                </span>
                <span className="text-xs font-normal text-gold/60">
                  {score}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-right text-[10px] font-normal text-text-muted">
                  {locale === "en" ? dim.lowLabelEn : dim.lowLabel}
                </span>
                <div className="h-px flex-1 bg-white/[0.06]">
                  <motion.div
                    className="h-px bg-gold/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + index * 0.06,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <span className="w-12 text-[10px] font-normal text-text-muted">
                  {locale === "en" ? dim.highLabelEn : dim.highLabel}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
