"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import CategorySelect from "@/components/quiz/CategorySelect";
import QuizContainer from "@/components/quiz/QuizContainer";
import StepTransition from "@/components/transitions/StepTransition";

export default function QuizPage() {
  const { step, setStep } = useQuizStore();

  useEffect(() => {
    if (step === "landing") {
      setStep("category");
    }
  }, [step, setStep]);

  const currentStep = step === "category" || step === "landing" ? "category" : step;

  return (
    <StepTransition stepKey={currentStep}>
      {currentStep === "category" && <CategorySelect />}
      {currentStep === "quiz" && <QuizContainer />}
    </StepTransition>
  );
}
