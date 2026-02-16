"use client";

import { motion } from "framer-motion";
import type { BdsmProfile } from "@/lib/scoring";
import { useQuizStore } from "@/store/quizStore";

interface BdsmResultProps {
  profile: BdsmProfile;
}

export default function BdsmResult({ profile }: BdsmResultProps) {
  const locale = useQuizStore((s) => s.locale);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mx-auto max-w-md border border-gold/10 p-8"
    >
      <p className="mb-6 text-center text-[10px] font-normal uppercase tracking-[0.4em] text-gold/30">
        BDSM Spectrum Analysis
      </p>

      {/* Role */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-medium text-text-primary">
          {locale === "en" ? profile.roleEn : profile.role}
        </h3>
        <p className="mt-1 text-xs font-normal italic text-gold/40">
          {locale === "en" ? profile.role : profile.roleEn}
        </p>
      </div>

      <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* D/s Spectrum */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-text-muted/50">
          <span>Submissive</span>
          <span className="text-gold/50">{profile.dsLabel}</span>
          <span>Dominant</span>
        </div>
        <div className="relative h-[2px] w-full bg-white/[0.06]">
          <motion.div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,184,122,0.4)]"
            initial={{ left: "50%" }}
            animate={{ left: `${profile.dsSpectrum}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 text-xs font-normal leading-relaxed text-text-muted/70">
          {locale === "en" ? profile.dsDescriptionEn : profile.dsDescription}
        </p>
      </div>

      {/* Intensity */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-text-muted/50">
          <span>Soft</span>
          <span className="text-gold/50">{profile.intensityLabel}</span>
          <span>Intense</span>
        </div>
        <div className="relative h-[2px] w-full bg-white/[0.06]">
          <motion.div
            className="h-[2px] bg-gradient-to-r from-gold/20 to-gold/60"
            initial={{ width: 0 }}
            animate={{ width: `${profile.intensity}%` }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Role description */}
      <div className="mb-6 border-l border-gold/15 pl-4">
        <p className="text-sm font-normal leading-[1.8] text-text-secondary/80">
          {locale === "en" ? profile.roleDescriptionEn : profile.roleDescription}
        </p>
      </div>

      {/* Tendencies */}
      {profile.tendencies.length > 0 && (
        <div>
          <p className="mb-3 text-[10px] font-normal uppercase tracking-[0.3em] text-gold/25">
            Tendencies
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.tendencies.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="bg-gold/[0.06] px-3 py-1.5 text-[11px] tracking-wider text-gold/50"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
