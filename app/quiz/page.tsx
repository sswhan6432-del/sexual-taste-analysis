"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";
import { useCoupleStore } from "@/store/coupleStore";
import CategorySelect from "@/components/quiz/CategorySelect";
import QuizContainer from "@/components/quiz/QuizContainer";
import StepTransition from "@/components/transitions/StepTransition";

/** Intro screen shown before each partner starts their quiz */
function PartnerIntro({
  name,
  partner,
  onStart,
}: {
  name: string;
  partner: 1 | 2;
  onStart: () => void;
}) {
  const locale = useQuizStore((s) => s.locale);
  const isEn = locale === "en";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm text-center"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-8 h-px w-12 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-[10px] font-normal uppercase tracking-[0.3em] text-gold/50"
        >
          Partner {partner}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 text-sm leading-relaxed text-text-muted"
        >
          {isEn ? (
            <>
              It&apos;s <span className="text-gold">{name}</span>&apos;s turn.
              <br />
              {partner === 1
                ? "Please hand the device to them."
                : `Please hand the device to ${name}.`}
            </>
          ) : (
            <>
              이제 <span className="text-gold">{name}</span>의 차례입니다.
              <br />
              기기를 {name}에게 전달해주세요.
            </>
          )}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full border border-gold/30 py-4 text-sm font-normal uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/[0.05]"
        >
          {name} {isEn ? "Quiz Start" : "퀴즈 시작"}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function QuizPage() {
  const { step, setStep } = useQuizStore();
  const coupleActive = useCoupleStore((s) => s.active);
  const currentPartner = useCoupleStore((s) => s.currentPartner);
  const partner1Name = useCoupleStore((s) => s.partner1Name);
  const partner2Name = useCoupleStore((s) => s.partner2Name);

  // Show partner intro only for Partner 1 (Partner 2 uses CoupleTransition)
  const [showPartnerIntro, setShowPartnerIntro] = useState(
    () => coupleActive && currentPartner === 1
  );

  useEffect(() => {
    if (step === "landing") {
      setStep("category");
    }
  }, [step, setStep]);

  // Partner 1 intro screen before quiz starts
  if (showPartnerIntro && coupleActive) {
    return (
      <PartnerIntro
        name={partner1Name}
        partner={1}
        onStart={() => setShowPartnerIntro(false)}
      />
    );
  }

  const currentStep = step === "category" || step === "landing" ? "category" : step;

  // In couple mode, keep QuizContainer mounted when step is "result"
  // so it can handle partner snapshot + transition/navigation
  const showQuiz = currentStep === "quiz" || (step === "result" && coupleActive);

  return (
    <StepTransition stepKey={showQuiz ? "quiz" : currentStep}>
      {currentStep === "category" && !showQuiz && <CategorySelect />}
      {showQuiz && <QuizContainer />}
    </StepTransition>
  );
}
