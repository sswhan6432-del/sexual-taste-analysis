"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCoupleStore } from "@/store/coupleStore";
import { useQuizStore, type Difficulty } from "@/store/quizStore";
import { t } from "@/lib/i18n";

const difficultyOptions: {
  key: Difficulty;
  label: string;
  labelEn: string;
  questions: string;
}[] = [
  { key: "beginner", label: "첫경험", labelEn: "First Time", questions: "12~20" },
  { key: "intermediate", label: "중급자", labelEn: "Experienced", questions: "24~40" },
  { key: "expert", label: "전문가", labelEn: "Connoisseur", questions: "36~60" },
];

export default function CouplePage() {
  const router = useRouter();
  const locale = useQuizStore((s) => s.locale);
  const { startCouple } = useCoupleStore();
  const { setDifficulty } = useQuizStore();

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [difficulty, setDiff] = useState<Difficulty>("intermediate");

  const canStart = name1.trim().length > 0 && name2.trim().length > 0;

  const handleStart = () => {
    if (!canStart) return;
    startCouple(name1.trim(), name2.trim(), difficulty);
    setDifficulty(difficulty);
    // Reset quiz store for partner 1
    useQuizStore.getState().reset();
    useQuizStore.getState().setDifficulty(difficulty);
    router.push("/quiz");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <p className="mb-2 text-xs font-normal uppercase tracking-[0.35em] text-gold/60">
          Couple Mode
        </p>

        <h1 className="mb-3 text-3xl font-normal tracking-tight text-text-primary sm:text-4xl">
          {locale === "en" ? "Couple Quiz" : "커플 퀴즈"}
        </h1>

        <p className="mb-10 text-sm leading-relaxed text-text-muted">
          {locale === "en"
            ? "Discover your intimate compatibility together"
            : "두 사람의 성적 궁합을 분석합니다"}
        </p>

        {/* Name inputs */}
        <div className="mb-8 space-y-4">
          <div className="text-left">
            <label className="mb-1.5 block text-[10px] font-normal uppercase tracking-[0.3em] text-gold/40">
              Partner 1 {locale === "ko" ? "(여)" : "(F)"}
            </label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder={locale === "en" ? "Enter name" : "이름을 입력하세요"}
              maxLength={20}
              className="w-full border border-white/[0.06] bg-transparent px-4 py-3 text-sm text-text-primary placeholder-text-muted/30 outline-none transition-colors focus:border-gold/30"
            />
          </div>

          <div className="text-left">
            <label className="mb-1.5 block text-[10px] font-normal uppercase tracking-[0.3em] text-gold/40">
              Partner 2 {locale === "ko" ? "(남)" : "(M)"}
            </label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder={locale === "en" ? "Enter name" : "이름을 입력하세요"}
              maxLength={20}
              className="w-full border border-white/[0.06] bg-transparent px-4 py-3 text-sm text-text-primary placeholder-text-muted/30 outline-none transition-colors focus:border-gold/30"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-8">
          <p className="mb-4 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
            Select Depth
          </p>
          <div className="grid grid-cols-3 gap-2">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDiff(opt.key)}
                className={`border px-3 py-3 text-center transition-all ${
                  difficulty === opt.key
                    ? "border-gold/30 bg-gold/[0.05] text-gold"
                    : "border-white/[0.06] text-text-muted hover:border-gold/15"
                }`}
              >
                <p className="text-xs font-normal">
                  {locale === "en" ? opt.labelEn : opt.label}
                </p>
                <p className="mt-1 text-[10px] text-text-muted/50">
                  {opt.questions}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileHover={canStart ? { scale: 1.02 } : {}}
          whileTap={canStart ? { scale: 0.98 } : {}}
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full border py-4 text-sm font-normal uppercase tracking-[0.2em] transition-all ${
            canStart
              ? "border-gold/30 text-gold hover:bg-gold/[0.05]"
              : "cursor-not-allowed border-white/[0.04] text-text-muted/30"
          }`}
        >
          {locale === "en" ? "Start Couple Quiz" : "커플 퀴즈 시작"}
        </motion.button>

        <p className="mt-6 text-[10px] leading-relaxed text-text-muted/40">
          {locale === "en"
            ? "Partner 1 takes the quiz first, then Partner 2.\nResults are compared at the end."
            : "파트너 1이 먼저 퀴즈를 진행하고,\n파트너 2가 이어서 진행합니다."}
        </p>
      </motion.div>
    </main>
  );
}
