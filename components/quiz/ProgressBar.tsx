"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  categoryLabel?: string | null;
}

export default function ProgressBar({
  current,
  total,
  categoryLabel,
}: ProgressBarProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="mb-2 flex items-center justify-between text-xs font-normal tracking-wider text-text-muted">
        <span>
          {current + 1} / {total}
        </span>
        <AnimatePresence mode="wait">
          {categoryLabel && (
            <motion.span
              key={categoryLabel}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="text-gold/60"
            >
              {categoryLabel}
            </motion.span>
          )}
        </AnimatePresence>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-px w-full bg-white/[0.06]">
        <motion.div
          className="h-px bg-gold/60"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
