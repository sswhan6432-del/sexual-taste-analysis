"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { dimensions } from "@/lib/dimensions";
import type { Archetype } from "@/lib/types";
import type { BdsmProfile, DimensionScores } from "@/lib/scoring";

interface Top3Entry {
  archetype: Archetype;
  similarity: number;
  percentage: number;
}

interface ViralCardProps {
  archetype: Archetype;
  similarity: number;
  bdsmProfile: BdsmProfile;
  traitTags: string[];
  dimensionScores: DimensionScores;
  top3: Top3Entry[];
}

const CARD_WIDTH = 420;

export default function ViralCard({
  archetype,
  similarity,
  bdsmProfile,
  traitTags,
  dimensionScores,
  top3,
}: ViralCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Dimension scores sorted by deviation from 50
  const sortedDims = dimensions
    .map((dim) => {
      const raw = dimensionScores[dim.key] ?? 50;
      const pct = Math.round((raw - 50) * 2);
      return { dim, raw, pct };
    })
    .sort((a, b) => b.pct - a.pct);

  const maxAbs = Math.max(...sortedDims.map((i) => Math.abs(i.pct)), 1);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import("html-to-image");

      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: ${CARD_WIDTH}px;
        overflow: visible;
        pointer-events: none;
      `;

      const clone = cardRef.current.cloneNode(true) as HTMLElement;
      clone.style.cssText = `
        width: ${CARD_WIDTH}px;
        max-width: ${CARD_WIDTH}px;
        min-width: ${CARD_WIDTH}px;
        margin: 0;
        transform: none;
        box-sizing: border-box;
        overflow: visible;
        background: #000000;
      `;

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 150)));

      const dataUrl = await toPng(clone, {
        width: CARD_WIDTH,
        height: clone.scrollHeight,
        pixelRatio: 3,
        backgroundColor: "#000000",
        cacheBust: true,
      });

      document.body.removeChild(wrapper);

      const link = document.createElement("a");
      link.download = `taste-${archetype.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Image capture failed:", e);
    }
  }, [archetype.id]);

  const handleShare = useCallback(async () => {
    const text = `${archetype.name} (${archetype.nameEn}) | ${bdsmProfile.role}\n"${bdsmProfile.headline}"\n\nSexual Taste Analysis`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Sexual Taste Analysis", text, url: window.location.origin });
      } catch {
        navigator.clipboard.writeText(text);
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [archetype, bdsmProfile]);

  const displayTags = traitTags.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Capturable card area */}
      <div
        ref={cardRef}
        className="relative mx-auto w-full border border-gold/15"
        style={{ background: "#000000", maxWidth: CARD_WIDTH }}
      >
        {/* Top accent line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="px-8 pb-10 pt-8">
          {/* Header */}
          <div className="mb-2 text-center">
            <p className="text-[9px] font-normal uppercase tracking-[0.5em] text-gold/35">
              Sexual Taste Analysis
            </p>
          </div>

          {/* Archetype */}
          <div className="mb-6 text-center">
            <p className="mb-1 text-[10px] font-normal uppercase tracking-[0.3em] text-gold/40">
              Type {archetype.numeral}
            </p>
            <h2 className="text-[26px] font-normal leading-tight text-gold">
              {archetype.name}
            </h2>
            <p className="mt-1 text-xs font-normal italic text-text-muted/60">
              {archetype.nameEn}
            </p>
            <p className="mt-1 text-[10px] tracking-wider text-gold/40">
              {Math.round(similarity * 100)}% match
            </p>
          </div>

          {/* Divider */}
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

          {/* BDSM Role */}
          <div className="mb-6 text-center">
            <p className="mb-1 text-[9px] font-normal uppercase tracking-[0.4em] text-gold/30">
              BDSM Spectrum
            </p>
            <p className="text-base font-medium text-text-primary">
              {bdsmProfile.role}
            </p>
            <p className="text-[10px] font-normal italic text-gold/40">
              {bdsmProfile.roleEn}
            </p>

            {/* D/s bar */}
            <div className="mx-auto mt-4 max-w-[200px]">
              <div className="mb-1 flex justify-between text-[8px] uppercase tracking-wider text-text-muted/40">
                <span>Sub</span>
                <span>{bdsmProfile.dsLabel}</span>
                <span>Dom</span>
              </div>
              <div className="relative h-[2px] w-full bg-white/[0.06]">
                <div
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,184,122,0.4)]"
                  style={{ left: `${bdsmProfile.dsSpectrum}%` }}
                />
              </div>
            </div>

            {/* Intensity */}
            <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-text-muted/40">
              Intensity: <span className="text-gold/50">{bdsmProfile.intensityLabel}</span>
            </p>
          </div>

          {/* Headline */}
          <div className="mb-6 border-l border-gold/20 pl-4 pr-1">
            <p className="break-keep text-xs font-normal leading-[1.8] text-text-secondary/80">
              &ldquo;{bdsmProfile.headline}&rdquo;
            </p>
          </div>

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="mb-6 flex flex-wrap justify-center gap-1.5">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gold/10 px-2.5 py-1 text-[10px] tracking-wider text-text-muted/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* BDSM tendencies */}
          {bdsmProfile.tendencies.length > 0 && (
            <div className="mb-6 flex flex-wrap justify-center gap-1.5">
              {bdsmProfile.tendencies.map((t) => (
                <span
                  key={t}
                  className="bg-gold/[0.06] px-2.5 py-1 text-[10px] tracking-wider text-gold/50"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* ──── Dimension Score Breakdown ──── */}
          <div className="mb-6">
            <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            <p className="mb-1 text-center text-[9px] font-normal uppercase tracking-[0.4em] text-gold/30">
              Dimension Scores
            </p>
            <p className="mb-5 text-center text-[8px] text-text-muted/30">
              양수 = 성향 강함 &middot; 음수 = 성향 약함
            </p>

            <div className="space-y-2.5">
              {sortedDims.map(({ dim, pct }) => {
                const isPositive = pct >= 0;
                const barWidth = maxAbs > 0 ? (Math.abs(pct) / maxAbs) * 100 : 0;
                const label = isPositive ? dim.highLabel : dim.lowLabel;

                return (
                  <div key={dim.key} className="flex items-center gap-2">
                    {/* Percentage */}
                    <span
                      className="w-10 text-right text-[11px] tabular-nums"
                      style={{
                        color:
                          pct === 0
                            ? "rgba(255,255,255,0.2)"
                            : isPositive
                              ? "rgba(52,211,153,0.75)"
                              : "rgba(251,191,36,0.75)",
                      }}
                    >
                      {isPositive ? `+${pct}` : pct}%
                    </span>

                    {/* Bar */}
                    <div
                      className="relative flex-1 overflow-hidden rounded-sm"
                      style={{ height: 5, background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full rounded-sm"
                        style={{
                          width: `${barWidth}%`,
                          background:
                            pct === 0
                              ? "rgba(255,255,255,0.06)"
                              : isPositive
                                ? "rgba(52,211,153,0.4)"
                                : "rgba(251,191,36,0.4)",
                        }}
                      />
                    </div>

                    {/* Label */}
                    <span className="w-20 text-right text-[10px] text-text-muted/50">
                      {dim.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dimension detail labels */}
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
              {sortedDims.map(({ dim, pct }) => {
                const isPositive = pct >= 0;
                const label = isPositive ? dim.highLabel : dim.lowLabel;
                return (
                  <div key={dim.key} className="flex items-center justify-between">
                    <span className="text-[9px] text-text-muted/30">
                      {dim.symbol}. {dim.name}
                    </span>
                    <span
                      className="text-[9px]"
                      style={{
                        color:
                          pct === 0
                            ? "rgba(255,255,255,0.15)"
                            : isPositive
                              ? "rgba(52,211,153,0.5)"
                              : "rgba(251,191,36,0.5)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ──── Top 3 Archetype Match ──── */}
          {top3.length > 0 && (
            <div className="mb-6">
              <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
              <p className="mb-4 text-center text-[9px] font-normal uppercase tracking-[0.4em] text-gold/30">
                Type Composition
              </p>

              <div className="space-y-2">
                {top3.map((entry, i) => (
                  <div key={entry.archetype.id} className="flex items-center gap-2.5">
                    <span className="w-4 text-right text-[10px] text-gold/25">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-[11px] text-text-secondary/70">
                      {entry.archetype.name}
                      <span className="ml-1.5 text-[9px] italic text-text-muted/35">
                        {entry.archetype.nameEn}
                      </span>
                    </span>
                    <span className="text-[11px] tabular-nums text-gold/50">
                      {entry.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Composition bar */}
              <div
                className="mt-3 flex overflow-hidden rounded-sm"
                style={{ height: 4 }}
              >
                {top3.map((entry, i) => {
                  const colors = [
                    "rgba(212,184,122,0.5)",
                    "rgba(212,184,122,0.25)",
                    "rgba(212,184,122,0.12)",
                  ];
                  return (
                    <div
                      key={entry.archetype.id}
                      style={{
                        width: `${entry.percentage}%`,
                        background: colors[i] ?? colors[2],
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="mx-auto mb-3 h-px w-8 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
            <p className="text-[8px] uppercase tracking-[0.4em] text-text-muted/25">
              tastanalysis.com
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Action buttons */}
      <div className="mx-auto mt-4 flex gap-3" style={{ maxWidth: CARD_WIDTH }}>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleDownload}
          className="flex-1 border border-gold/30 py-3 text-sm font-normal uppercase tracking-[0.15em] text-gold transition-all hover:border-gold/50 hover:bg-gold/[0.05]"
        >
          Save Image
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleShare}
          className="flex-1 border border-white/[0.06] py-3 text-sm font-normal uppercase tracking-[0.15em] text-text-secondary transition-all hover:border-white/10 hover:bg-white/[0.02]"
        >
          Share
        </motion.button>
      </div>
    </motion.div>
  );
}
