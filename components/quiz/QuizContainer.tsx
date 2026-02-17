"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";
import { useCoupleStore } from "@/store/coupleStore";
import { t } from "@/lib/i18n";
import MultipleChoice from "./MultipleChoice";
import CardSelect from "./CardSelect";
import SliderQuestion from "./SliderQuestion";
import ProgressBar from "./ProgressBar";
import CoupleTransition from "@/components/couple/CoupleTransition";

export default function QuizContainer() {
  const router = useRouter();
  const {
    currentQuestion,
    questionHistory,
    answerQuestion,
    prevQuestion,
    progressCurrent,
    progressTotal,
    currentCategoryLabel,
    step,
    locale,
  } = useQuizStore();

  const coupleActive = useCoupleStore((s) => s.active);
  const currentPartner = useCoupleStore((s) => s.currentPartner);

  const [showTransition, setShowTransition] = useState(false);

  const handleAnswer = useCallback(
    (scores: Record<string, number>) => {
      if (!currentQuestion) return;
      answerQuestion(currentQuestion.id, scores);

      // If step changed to "result", navigate
      const currentStep = useQuizStore.getState().step;
      if (currentStep === "result") {
        if (coupleActive && currentPartner === 1) {
          // Partner 1 done: snapshot and show transition
          useCoupleStore.getState().snapshotPartner1();
          setShowTransition(true);
        } else if (coupleActive && currentPartner === 2) {
          // Partner 2 done: snapshot and go to couple result
          useCoupleStore.getState().snapshotPartner2();
          router.push("/couple/result");
        } else {
          // Solo mode
          router.push("/result");
        }
      }
    },
    [currentQuestion, answerQuestion, router, coupleActive, currentPartner]
  );

  if (showTransition) {
    return <CoupleTransition />;
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <ProgressBar
        current={progressCurrent}
        total={progressTotal}
        categoryLabel={currentCategoryLabel}
      />

      <div className="flex flex-1 flex-col items-center justify-center pb-20 pt-4">
        {questionHistory.length > 0 && (
          <button
            onClick={prevQuestion}
            className="mb-4 text-sm text-text-muted transition-colors hover:text-text-secondary"
          >
            {t("quiz.prev", locale)}
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -30, filter: "blur(6px)" }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-full"
          >
            {currentQuestion.type === "multiple-choice" && (
              <MultipleChoice
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === "card-select" && (
              <CardSelect
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === "slider" && (
              <SliderQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
