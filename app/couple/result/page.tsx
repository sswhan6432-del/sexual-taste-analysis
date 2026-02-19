"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCoupleStore } from "@/store/coupleStore";
import { useQuizStore } from "@/store/quizStore";
import CoupleOverview from "@/components/couple/CoupleOverview";
import DimensionCompare from "@/components/couple/DimensionCompare";
import StyleCompare from "@/components/couple/StyleCompare";
import RecommendedPlays from "@/components/couple/RecommendedPlays";
import CoupleShareCard from "@/components/couple/CoupleShareCard";

export default function CoupleResultPage() {
  const router = useRouter();
  const locale = useQuizStore((s) => s.locale);
  const {
    partner1Result,
    partner2Result,
    compatibility,
    partner1Name,
    partner2Name,
    resetCouple,
  } = useCoupleStore();

  useEffect(() => {
    if (!partner1Result || !partner2Result || !compatibility) {
      router.push("/couple");
    }
  }, [partner1Result, partner2Result, compatibility, router]);

  if (!partner1Result || !partner2Result || !compatibility) return null;

  const isEn = locale === "en";

  const handleRetake = () => {
    resetCouple();
    useQuizStore.getState().reset();
    router.push("/");
  };

  // Strength & growth areas
  const strengths = isEn
    ? compatibility.strengthAreasEn
    : compatibility.strengthAreas;
  const growths = isEn
    ? compatibility.growthAreasEn
    : compatibility.growthAreas;

  return (
    <main className="min-h-screen px-4 pb-24 pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-2xl"
      >
        {/* 1. Overview */}
        <CoupleOverview
          partner1={partner1Result}
          partner2={partner2Result}
          overallScore={compatibility.overallScore}
          locale={locale}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="my-10 text-center"
        >
          <p className="mb-2 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/25">
            Detailed Analysis
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mx-auto h-4 w-px bg-gradient-to-b from-gold/30 to-transparent"
          />
        </motion.div>

        <div className="space-y-10">
          {/* 2. Dimension Comparison */}
          <DimensionCompare
            comparisons={compatibility.dimensionComparison}
            partner1Name={partner1Name}
            partner2Name={partner2Name}
            locale={locale}
          />

          {/* 3. Style Comparison */}
          <StyleCompare
            bdsm1={partner1Result.bdsmProfile}
            bdsm2={partner2Result.bdsmProfile}
            partner1Name={partner1Name}
            partner2Name={partner2Name}
            styleComparison={compatibility.styleComparison}
            dynamicAnalysis={compatibility.dynamicAnalysis}
            locale={locale}
          />

          {/* 4. Strength Areas */}
          {strengths.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border border-white/[0.06] p-6"
            >
              <p className="mb-1 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
                Strengths
              </p>
              <h3 className="mb-4 text-lg font-normal text-text-primary">
                {isEn ? "Where You Click" : "잘 맞는 영역"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((area) => (
                  <span
                    key={area}
                    className="border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-1.5 text-xs text-emerald-400/70"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* 5. Growth Areas */}
          {growths.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="border border-white/[0.06] p-6"
            >
              <p className="mb-1 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
                Growth
              </p>
              <h3 className="mb-4 text-lg font-normal text-text-primary">
                {isEn ? "Room to Grow" : "성장 가능 영역"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {growths.map((area) => (
                  <span
                    key={area}
                    className="border border-amber-400/10 bg-amber-400/[0.04] px-3 py-1.5 text-xs text-amber-400/70"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* 6. Recommended Plays */}
          <RecommendedPlays
            plays={compatibility.recommendedPlays}
            locale={locale}
          />

          {/* 7. Share */}
          <CoupleShareCard
            partner1={partner1Result}
            partner2={partner2Result}
            overallScore={compatibility.overallScore}
            locale={locale}
          />
        </div>

        {/* Retake button */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRetake}
            className="border border-white/[0.06] px-10 py-3 text-sm font-normal uppercase tracking-[0.2em] text-text-muted transition-all hover:border-gold/20 hover:text-text-secondary"
          >
            {isEn ? "Back to Home" : "홈으로 돌아가기"}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
