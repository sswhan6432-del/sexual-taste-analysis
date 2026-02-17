"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCoupleStore } from "@/store/coupleStore";
import { useQuizStore } from "@/store/quizStore";

export default function CoupleTransition() {
  const router = useRouter();
  const { partner1Name, partner2Name, difficulty } = useCoupleStore();
  const locale = useQuizStore((s) => s.locale);

  const handleStart = () => {
    // Reset quiz store for partner 2
    const qs = useQuizStore.getState();
    qs.reset();
    qs.setDifficulty(difficulty);
    router.push("/quiz");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/95 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm text-center"
      >
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border border-gold/20"
        >
          <span className="text-2xl text-gold">✓</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-2 text-xs font-normal uppercase tracking-[0.3em] text-gold/50"
        >
          Partner 1 Complete
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4 text-2xl font-normal text-text-primary"
        >
          {partner1Name}
          <span className="text-text-muted">
            {locale === "en" ? " is done!" : " 완료!"}
          </span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto my-6 h-px w-12 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 text-sm leading-relaxed text-text-muted"
        >
          {locale === "en" ? (
            <>
              Now it&apos;s <span className="text-gold">{partner2Name}</span>&apos;s turn.
              <br />
              Please hand the device to {partner2Name}.
            </>
          ) : (
            <>
              이제 <span className="text-gold">{partner2Name}</span>의 차례입니다.
              <br />
              기기를 {partner2Name}에게 전달해주세요.
            </>
          )}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="w-full border border-gold/30 py-4 text-sm font-normal uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/[0.05]"
        >
          {locale === "en"
            ? `Start ${partner2Name}'s Quiz`
            : `${partner2Name} 퀴즈 시작`}
        </motion.button>
      </motion.div>
    </div>
  );
}
