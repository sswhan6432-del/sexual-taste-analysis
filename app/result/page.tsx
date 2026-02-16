"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";
import { t } from "@/lib/i18n";
import ViralCard from "@/components/result/ViralCard";
import BdsmResult from "@/components/result/BdsmResult";
import TypeCard from "@/components/result/TypeCard";
import SecondaryType from "@/components/result/SecondaryType";
import TypeBreakdown from "@/components/result/TypeBreakdown";
import TraitTags from "@/components/result/TraitTags";
import RadarChartComponent from "@/components/result/RadarChart";
import CompassChart from "@/components/result/CompassChart";
import DimensionBars from "@/components/result/DimensionBars";
import DimensionInsights from "@/components/result/DimensionInsights";
import CompatibleTypes from "@/components/result/CompatibleTypes";
import ScoreBreakdown from "@/components/result/ScoreBreakdown";
import AiAnalysis from "@/components/result/AiAnalysis";

export default function ResultPage() {
  const {
    resultType,
    dimensionScores,
    similarity,
    step,
    reset,
    secondaryType,
    secondarySimilarity,
    top3,
    traitTags,
    dimensionInsights,
    dominantDimensions,
    recessiveDimensions,
    bdsmProfile,
    locale,
  } = useQuizStore();
  const router = useRouter();

  useEffect(() => {
    if (!resultType || step !== "result") {
      router.push("/quiz");
    }
  }, [resultType, step, router]);

  if (!resultType) return null;

  const handleRetry = () => {
    reset();
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen px-4 pb-24 pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-2xl"
      >
        {/* Viral Summary Card — screenshot & share target */}
        {bdsmProfile && (
          <div className="mb-16">
            <ViralCard
              archetype={resultType}
              similarity={similarity}
              bdsmProfile={bdsmProfile}
              traitTags={traitTags}
              dimensionScores={dimensionScores}
              top3={top3}
            />
          </div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-12 text-center"
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
          {/* BDSM Deep Dive */}
          {bdsmProfile && <BdsmResult profile={bdsmProfile} />}

          <TypeCard archetype={resultType} similarity={similarity} />
          {secondaryType && (
            <SecondaryType
              archetype={secondaryType}
              similarity={secondarySimilarity}
            />
          )}
          {top3.length > 0 && <TypeBreakdown top3={top3} />}
          <TraitTags tags={traitTags} />
          <ScoreBreakdown scores={dimensionScores} />
          <RadarChartComponent scores={dimensionScores} />
          <CompassChart scores={dimensionScores} />
          <DimensionBars scores={dimensionScores} />
          <DimensionInsights
            insights={dimensionInsights}
            scores={dimensionScores}
          />
          <CompatibleTypes archetype={resultType} />
          {bdsmProfile && (
            <AiAnalysis
              scores={dimensionScores}
              archetype={resultType}
              similarity={similarity}
              secondaryArchetype={secondaryType}
              bdsmProfile={bdsmProfile}
              traitTags={traitTags}
              dominantDimensions={dominantDimensions}
              recessiveDimensions={recessiveDimensions}
            />
          )}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRetry}
            className="border border-white/[0.06] px-10 py-3 text-sm font-normal uppercase tracking-[0.2em] text-text-muted transition-all hover:border-gold/20 hover:text-text-secondary"
          >
            {t("result.retake", locale)}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
