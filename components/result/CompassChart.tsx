"use client";

import { motion } from "framer-motion";
import type { DimensionScores } from "@/lib/scoring";

interface CompassChartProps {
  scores: DimensionScores;
}

export default function CompassChart({ scores }: CompassChartProps) {
  const x = (scores.dominance ?? 50) - 50;
  const y = ((scores.sensory ?? 50) - (scores.emotion ?? 50)) / 2;
  const posX = 50 + x;
  const posY = 50 - y;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mx-auto max-w-md border border-gold/10 p-6"
    >
      <p className="mb-6 text-center text-xs font-normal uppercase tracking-[0.3em] text-gold/40">
        2D Compass
      </p>

      <div className="relative mx-auto aspect-square w-full max-w-[260px]">
        <div className="absolute inset-0 border border-white/[0.04]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.04]" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.04]" />
        </div>

        <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-[10px] font-normal tracking-wider text-text-muted">
          Receptive
        </span>
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[10px] font-normal tracking-wider text-text-muted">
          Dominant
        </span>
        <span className="absolute left-1/2 -top-5 -translate-x-1/2 text-[10px] font-normal tracking-wider text-text-muted">
          Sensory
        </span>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-normal tracking-wider text-text-muted">
          Emotional
        </span>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_15px_rgba(201,169,110,0.4)]"
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
          }}
        />
      </div>
    </motion.div>
  );
}
