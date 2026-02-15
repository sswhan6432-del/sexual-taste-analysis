"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/questions";
import { useQuizStore } from "@/store/quizStore";
import { MIN_CATEGORIES, MAX_CATEGORIES } from "@/lib/constants";

export default function CategorySelect() {
  const { selectedCategories, toggleCategory, startAdaptiveQuiz } = useQuizStore();
  const canProceed =
    selectedCategories.length >= MIN_CATEGORIES &&
    selectedCategories.length <= MAX_CATEGORIES;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <p className="mb-3 text-xs font-normal uppercase tracking-[0.3em] text-gold/50">
          Select Categories
        </p>
        <h2 className="mb-4 text-3xl font-normal text-text-primary sm:text-4xl">
          관심 있는 영역을 선택하세요
        </h2>
        <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <p className="text-sm font-normal text-text-muted">
          {MIN_CATEGORIES}~{MAX_CATEGORIES}개 선택 &middot; 현재{" "}
          {selectedCategories.length}개 선택됨
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((cat, index) => {
          const isSelected = selectedCategories.includes(cat.id);
          const isDisabled =
            !isSelected && selectedCategories.length >= MAX_CATEGORIES;

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={() => !isDisabled && toggleCategory(cat.id)}
              disabled={isDisabled}
              className={`group relative overflow-hidden border p-6 text-left transition-all duration-300 ${
                isSelected
                  ? "border-gold/40 bg-gold/[0.05]"
                  : isDisabled
                    ? "cursor-not-allowed border-white/[0.03] opacity-30"
                    : "border-white/[0.06] hover:border-gold/20 hover:bg-white/[0.02]"
              }`}
            >
              <p className="mb-1 text-xs font-normal uppercase tracking-[0.2em] text-gold/40">
                {cat.nameEn}
              </p>
              <h3 className="mb-2 text-lg font-normal text-text-primary">
                {cat.name}
              </h3>
              <p className="text-sm font-normal text-text-muted">
                {cat.description}
              </p>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-4 h-2 w-2 rounded-full bg-gold"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <motion.button
          whileHover={canProceed ? { scale: 1.02 } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
          onClick={() => canProceed && startAdaptiveQuiz()}
          disabled={!canProceed}
          className={`border px-12 py-4 text-sm font-normal uppercase tracking-[0.25em] transition-all duration-500 ${
            canProceed
              ? "border-gold/30 text-gold hover:border-gold/60 hover:bg-gold/[0.05]"
              : "cursor-not-allowed border-white/[0.06] text-text-muted"
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
