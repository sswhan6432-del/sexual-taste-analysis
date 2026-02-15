"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dimensions } from "@/lib/dimensions";

interface DimensionInsightsProps {
  insights: Record<string, string>;
  scores: Record<string, number>;
}

export default function DimensionInsights({
  insights,
  scores,
}: DimensionInsightsProps) {
  const [expandedDim, setExpandedDim] = useState<string | null>(null);

  const insightDimensions = dimensions.filter((d) => insights[d.key]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mx-auto max-w-md"
    >
      <p className="mb-6 text-center text-[10px] font-normal uppercase tracking-[0.4em] text-gold/30">
        Dimension Insights
      </p>

      <div className="space-y-1">
        {insightDimensions.map((dim) => {
          const score = scores[dim.key] ?? 50;
          const isExpanded = expandedDim === dim.key;
          const level =
            score <= 35 ? "Low" : score >= 65 ? "High" : "Balanced";

          return (
            <div key={dim.key} className="border border-white/[0.03]">
              <button
                onClick={() =>
                  setExpandedDim(isExpanded ? null : dim.key)
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-normal text-gold/30">
                    {dim.symbol}
                  </span>
                  <span className="text-sm font-normal text-text-primary/80">
                    {dim.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-normal uppercase tracking-wider text-gold/25">
                    {level}
                  </span>
                  <span className="text-xs font-normal text-text-muted/40">
                    {score}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-gold/20"
                  >
                    v
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/[0.03] px-5 py-4">
                      <p className="text-xs font-normal leading-[1.8] text-text-muted/70">
                        {insights[dim.key]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
