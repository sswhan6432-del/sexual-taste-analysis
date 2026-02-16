"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { useQuizStore } from "@/store/quizStore";

interface CardSelectProps {
  question: Question;
  onAnswer: (scores: Record<string, number>) => void;
}

export default function CardSelect({ question, onAnswer }: CardSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const locale = useQuizStore((s) => s.locale);

  const handleSelect = (choiceId: string, scores: Record<string, number>) => {
    setSelected(choiceId);
    setTimeout(() => onAnswer(scores), 400);
  };

  return (
    <div className="mx-auto max-w-xl px-4">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center text-xl font-normal leading-relaxed text-text-primary sm:text-2xl"
      >
        {locale === "en" && question.textEn ? question.textEn : question.text}
      </motion.h3>

      <div
        className={`grid gap-3 ${
          (question.choices?.length ?? 0) <= 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-2"
        }`}
      >
        {question.choices?.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(choice.id, choice.scores)}
            className={`flex flex-col items-center border p-6 text-center transition-all duration-300 ${
              selected === choice.id
                ? "border-gold/40 bg-gold/[0.05]"
                : "border-white/[0.06] hover:border-gold/15 hover:bg-white/[0.02]"
            }`}
          >
            <span className="text-sm font-normal leading-relaxed text-text-primary">
              {locale === "en" && choice.textEn ? choice.textEn : choice.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
