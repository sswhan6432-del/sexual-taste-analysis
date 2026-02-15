"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";

interface MultipleChoiceProps {
  question: Question;
  onAnswer: (scores: Record<string, number>) => void;
}

export default function MultipleChoice({
  question,
  onAnswer,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choiceId: string, scores: Record<string, number>) => {
    setSelected(choiceId);
    setTimeout(() => onAnswer(scores), 400);
  };

  const letters = ["A", "B", "C", "D"];

  return (
    <div className="mx-auto max-w-xl px-4">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center text-xl font-normal leading-relaxed text-text-primary sm:text-2xl"
      >
        {question.text}
      </motion.h3>

      <div className="space-y-3">
        {question.choices?.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(choice.id, choice.scores)}
            className={`flex w-full items-center gap-4 border p-5 text-left transition-all duration-300 ${
              selected === choice.id
                ? "border-gold/40 bg-gold/[0.05]"
                : "border-white/[0.06] hover:border-gold/15 hover:bg-white/[0.02]"
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-gold/20 text-xs font-normal text-gold/60">
              {letters[index]}
            </span>
            <span className="text-sm font-normal text-text-primary">
              {choice.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
