"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";

interface SliderQuestionProps {
  question: Question;
  onAnswer: (scores: Record<string, number>) => void;
}

export default function SliderQuestion({
  question,
  onAnswer,
}: SliderQuestionProps) {
  const [value, setValue] = useState(50);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    const scores: Record<string, number> = {};
    if (question.sliderDimensions) {
      for (const dim of question.sliderDimensions) {
        scores[dim.key] = dim.inverted ? 100 - value : value;
      }
    }
    setTimeout(() => onAnswer(scores), 300);
  };

  return (
    <div className="mx-auto max-w-xl px-4">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center text-xl font-normal leading-relaxed text-text-primary sm:text-2xl"
      >
        {question.text}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-white/[0.06] p-8"
      >
        <div className="mb-8 flex items-end justify-between text-xs font-normal tracking-wider text-text-muted">
          <span className="max-w-[40%] text-left">{question.lowLabel}</span>
          <span className="max-w-[40%] text-right">{question.highLabel}</span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="mb-6 w-full"
        />

        <div className="mb-8 text-center">
          <span className="text-3xl font-normal text-gold">{value}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleConfirm}
          disabled={confirmed}
          className={`w-full border py-3 text-sm font-normal uppercase tracking-[0.2em] transition-all duration-300 ${
            confirmed
              ? "border-gold/20 text-gold/50"
              : "border-gold/30 text-gold hover:border-gold/50 hover:bg-gold/[0.05]"
          }`}
        >
          {confirmed ? "Confirmed" : "Confirm"}
        </motion.button>
      </motion.div>
    </div>
  );
}
