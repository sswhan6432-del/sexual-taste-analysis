"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuizStore, type Difficulty } from "@/store/quizStore";
import { t } from "@/lib/i18n";
import AdBanner from "@/components/ads/AdBanner";

const difficultyOptions: {
  key: Difficulty;
  label: string;
  labelEn: string;
  questions: string;
  time: string;
  description: string;
  descriptionEn: string;
}[] = [
  {
    key: "beginner",
    label: "첫경험",
    labelEn: "First Time",
    questions: "12~20",
    time: "2min",
    description: "당신의 욕망을 살짝 엿보는 입문",
    descriptionEn: "A quick peek into your desires",
  },
  {
    key: "intermediate",
    label: "중급자",
    labelEn: "Experienced",
    questions: "24~40",
    time: "5min",
    description: "침대 위 당신을 해부하는 심층 분석",
    descriptionEn: "An in-depth analysis of your intimate self",
  },
  {
    key: "expert",
    label: "전문가",
    labelEn: "Connoisseur",
    questions: "36~60",
    time: "10min",
    description: "가장 은밀한 곳까지 완전한 탐색",
    descriptionEn: "A full exploration to your deepest desires",
  },
];

export default function Hero() {
  const router = useRouter();
  const { setDifficulty } = useQuizStore();
  const locale = useQuizStore((s) => s.locale);

  const handleSelect = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    router.push("/quiz");
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Thin gold line ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mb-10 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4 text-xs font-normal uppercase tracking-[0.35em] text-gold/60"
        >
          Intimate Archetype Discovery
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-6 text-5xl font-normal leading-tight tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-text-primary">Sexual</span>
          <br />
          <span className="font-normal italic text-gold">Taste</span>
          <br />
          <span className="text-text-primary">Analysis</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mx-auto mb-3 max-w-sm text-base font-normal leading-relaxed text-text-secondary"
        >
          {t("hero.subtitle", locale)}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-14 text-xs tracking-wider text-text-muted"
        >
          72 questions &middot; 8 dimensions &middot; 12 archetypes
        </motion.p>

        {/* Difficulty selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mb-6"
        >
          <p className="mb-6 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
            Select Depth
          </p>

          <div className="mx-auto grid max-w-lg grid-cols-3 gap-3">
            {difficultyOptions.map((opt, i) => (
              <motion.button
                key={opt.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: "rgba(212,184,122,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(opt.key)}
                className="group relative border border-white/[0.06] px-3 py-6 transition-all duration-500 hover:bg-gold/[0.03] sm:px-5"
              >
                <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-gold/40 transition-colors group-hover:text-gold/60">
                  {locale === "en" ? opt.label : opt.labelEn}
                </p>

                <p className="mt-2 text-lg font-normal text-text-primary transition-colors group-hover:text-gold sm:text-xl">
                  {locale === "en" ? opt.labelEn : opt.label}
                </p>

                <div className="mx-auto my-3 h-px w-6 bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-all group-hover:w-10 group-hover:via-gold/30" />

                <p className="text-[10px] tracking-wider text-text-muted/70">
                  {opt.questions} questions
                </p>
                <p className="mt-1 text-[10px] tracking-wider text-gold/30">
                  {opt.time}
                </p>

                <p className="mt-3 text-[11px] leading-relaxed text-text-muted/50 transition-colors group-hover:text-text-muted/70">
                  {locale === "en" ? opt.descriptionEn : opt.description}
                </p>

                {/* Hover corner accents */}
                <span className="absolute left-0 top-0 h-3 w-px bg-gold/0 transition-all duration-500 group-hover:bg-gold/30" />
                <span className="absolute left-0 top-0 h-px w-3 bg-gold/0 transition-all duration-500 group-hover:bg-gold/30" />
                <span className="absolute bottom-0 right-0 h-3 w-px bg-gold/0 transition-all duration-500 group-hover:bg-gold/30" />
                <span className="absolute bottom-0 right-0 h-px w-3 bg-gold/0 transition-all duration-500 group-hover:bg-gold/30" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Couple Quiz button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, borderColor: "rgba(212,184,122,0.35)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/couple")}
            className="border border-white/[0.06] px-8 py-3 transition-all duration-500 hover:bg-gold/[0.03]"
          >
            <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-gold/40">
              {locale === "en" ? "With Partner" : "파트너와 함께"}
            </p>
            <p className="mt-1 text-sm font-normal text-text-secondary">
              Couple Quiz
            </p>
          </motion.button>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="mx-auto mt-12 h-px w-10 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        />

      </motion.div>

      {/* Ad: home bottom — separated from main content */}
      <div className="relative z-10 mt-20 pb-10">
        <AdBanner slot="home_bottom" />
      </div>
    </section>
  );
}
