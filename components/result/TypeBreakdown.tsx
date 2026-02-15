"use client";

import { motion } from "framer-motion";
import type { Archetype } from "@/lib/types";

interface TypeBreakdownProps {
  top3: { archetype: Archetype; similarity: number; percentage: number }[];
}

export default function TypeBreakdown({ top3 }: TypeBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mx-auto max-w-md"
    >
      <p className="mb-6 text-center text-[10px] font-normal uppercase tracking-[0.4em] text-gold/30">
        Type Composition
      </p>

      <div className="space-y-4">
        {top3.map((item, i) => (
          <motion.div
            key={item.archetype.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
            className="border border-white/[0.04] p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-normal text-gold/40">
                  {item.archetype.numeral}
                </span>
                <span className="text-sm font-normal text-text-primary/80">
                  {item.archetype.name}
                </span>
              </div>
              <span className="text-lg font-normal text-gold/60">
                {item.percentage}%
              </span>
            </div>

            <div className="relative h-[2px] w-full bg-white/[0.04]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{
                  duration: 1,
                  delay: 0.8 + i * 0.15,
                  ease: "easeOut",
                }}
                className="absolute left-0 top-0 h-full"
                style={{
                  background: `linear-gradient(90deg, rgba(201,169,110,${0.6 - i * 0.15}), rgba(201,169,110,${0.2 - i * 0.05}))`,
                }}
              />
            </div>

            <p className="mt-2 text-[10px] font-normal italic text-text-muted/40">
              {item.archetype.nameEn}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
