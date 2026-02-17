"use client";

import { motion } from "framer-motion";
import type { BdsmProfile } from "@/lib/scoring";
import type { StyleComparison, DynamicAnalysis } from "@/lib/compatibility";
import type { Locale } from "@/lib/i18n";

interface Props {
  bdsm1: BdsmProfile;
  bdsm2: BdsmProfile;
  partner1Name: string;
  partner2Name: string;
  styleComparison: StyleComparison;
  dynamicAnalysis: DynamicAnalysis;
  locale: Locale;
}

export default function StyleCompare({
  bdsm1,
  bdsm2,
  partner1Name,
  partner2Name,
  styleComparison,
  dynamicAnalysis,
  locale,
}: Props) {
  const isEn = locale === "en";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="border border-white/[0.06] p-6"
    >
      <p className="mb-1 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
        Style & Dynamic
      </p>
      <h3 className="mb-6 text-lg font-normal text-text-primary">
        {isEn ? "BDSM Profile Comparison" : "BDSM 프로필 비교"}
      </h3>

      {/* D/s Spectrum comparison */}
      <div className="mb-6">
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-muted/40">
          D/s Spectrum
        </p>

        <div className="relative mb-2 h-4 w-full overflow-hidden bg-white/[0.03]">
          {/* Partner 1 marker */}
          <motion.div
            initial={{ left: "50%" }}
            animate={{ left: `${bdsm1.dsSpectrum}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-0 h-full w-0.5 bg-gold/70"
            style={{ transform: "translateX(-50%)" }}
          />
          {/* Partner 2 marker */}
          <motion.div
            initial={{ left: "50%" }}
            animate={{ left: `${bdsm2.dsSpectrum}%` }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-0 h-full w-0.5 bg-gold/40"
            style={{ transform: "translateX(-50%)" }}
          />
          {/* Range highlight */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              left: `${Math.min(bdsm1.dsSpectrum, bdsm2.dsSpectrum)}%`,
              width: `${Math.abs(bdsm1.dsSpectrum - bdsm2.dsSpectrum)}%`,
            }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute top-0 h-full bg-gold/[0.08]"
          />
        </div>

        <div className="flex justify-between text-[9px] text-text-muted/30">
          <span>Sub</span>
          <span>Switch</span>
          <span>Dom</span>
        </div>

        <div className="mt-2 flex justify-between text-[10px]">
          <span className="text-gold/60">
            {partner1Name}: {bdsm1.dsLabel}
          </span>
          <span className="text-gold/60">
            {partner2Name}: {bdsm2.dsLabel}
          </span>
        </div>
      </div>

      {/* Roles */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="border border-white/[0.04] p-3">
          <p className="text-[9px] uppercase tracking-wider text-gold/30">
            {partner1Name}
          </p>
          <p className="mt-1 text-sm text-text-primary">
            {isEn ? bdsm1.roleEn : bdsm1.role}
          </p>
          <p className="mt-0.5 text-[10px] text-text-muted/50">
            {bdsm1.intensityLabel} intensity
          </p>
        </div>
        <div className="border border-white/[0.04] p-3">
          <p className="text-[9px] uppercase tracking-wider text-gold/30">
            {partner2Name}
          </p>
          <p className="mt-1 text-sm text-text-primary">
            {isEn ? bdsm2.roleEn : bdsm2.role}
          </p>
          <p className="mt-0.5 text-[10px] text-text-muted/50">
            {bdsm2.intensityLabel} intensity
          </p>
        </div>
      </div>

      {/* Dynamic Analysis */}
      <div className="mb-5 border-t border-white/[0.04] pt-5">
        <p className="mb-2 text-xs font-normal text-gold/70">
          {isEn ? dynamicAnalysis.labelEn : dynamicAnalysis.label}
        </p>
        <p className="text-[11px] leading-relaxed text-text-muted/70">
          {isEn
            ? dynamicAnalysis.descriptionEn
            : dynamicAnalysis.description}
        </p>
      </div>

      {/* Style summary */}
      <div className="space-y-2 border-t border-white/[0.04] pt-4">
        <p className="text-[11px] leading-relaxed text-text-muted/60">
          {isEn ? styleComparison.dsBalanceEn : styleComparison.dsBalance}
        </p>
        <p className="text-[11px] leading-relaxed text-text-muted/60">
          {isEn ? styleComparison.roleMatchEn : styleComparison.roleMatch}
        </p>
        <p className="text-[11px] font-normal leading-relaxed text-gold/60">
          {isEn
            ? styleComparison.overallStyleEn
            : styleComparison.overallStyle}
        </p>
      </div>
    </motion.section>
  );
}
