"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  generateAiAnalysis,
  type AiAnalysisResult,
  type AnalysisSection,
} from "@/lib/ai-analysis";
import type { DimensionScores, BdsmProfile } from "@/lib/scoring";
import type { Archetype } from "@/lib/types";

interface AiAnalysisProps {
  scores: DimensionScores;
  archetype: Archetype;
  similarity: number;
  secondaryArchetype: Archetype | null;
  bdsmProfile: BdsmProfile;
  traitTags: string[];
  dominantDimensions: string[];
  recessiveDimensions: string[];
}

export default function AiAnalysis({
  scores,
  archetype,
  similarity,
  secondaryArchetype,
  bdsmProfile,
  traitTags,
  dominantDimensions,
  recessiveDimensions,
}: AiAnalysisProps) {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const generate = useCallback(() => {
    setIsGenerating(true);
    setRevealedCount(0);
    setExpandedId(null);

    // Simulate AI generation delay for dramatic effect
    setTimeout(() => {
      const result = generateAiAnalysis({
        scores,
        archetype,
        similarity,
        secondaryArchetype,
        bdsmProfile,
        traitTags,
        dominantDims: dominantDimensions,
        recessiveDims: recessiveDimensions,
      });
      setAnalysis(result);
      setIsGenerating(false);
    }, 800);
  }, [
    scores,
    archetype,
    similarity,
    secondaryArchetype,
    bdsmProfile,
    traitTags,
    dominantDimensions,
    recessiveDimensions,
  ]);

  // Auto-generate on mount
  useEffect(() => {
    generate();
  }, [generate]);

  // Progressive reveal
  useEffect(() => {
    if (!analysis || isGenerating) return;
    if (revealedCount >= analysis.sections.length) return;

    const timer = setTimeout(() => {
      setRevealedCount((c) => c + 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [analysis, isGenerating, revealedCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="mx-auto max-w-md"
    >
      {/* Header */}
      <div className="mb-6 border border-gold/10 p-6 text-center">
        <p className="mb-1 text-[9px] font-normal uppercase tracking-[0.5em] text-gold/30">
          Powered by AI Engine
        </p>
        <h3 className="mb-2 text-lg font-normal text-text-primary">
          AI 개인화 분석
        </h3>
        <p className="text-[11px] leading-relaxed text-text-muted/50">
          8개 차원의 점수 조합과 성향 패턴을 기반으로
          <br />
          당신만을 위한 심층 분석을 생성합니다
        </p>
        <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* Generating state */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-center justify-center gap-3 py-8"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-gold/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted/40">
              분석 생성 중...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis sections */}
      {analysis && !isGenerating && (
        <div className="space-y-3">
          {analysis.sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              isRevealed={index < revealedCount}
              isExpanded={expandedId === section.id}
              onToggle={() =>
                setExpandedId(expandedId === section.id ? null : section.id)
              }
            />
          ))}
        </div>
      )}

      {/* Regenerate */}
      {analysis && !isGenerating && revealedCount >= (analysis?.sections.length ?? 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="mb-4 text-[9px] text-text-muted/25">
            분석 결과는 동일한 점수에 대해 항상 같은 결과를 생성합니다
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Section Card ───

function SectionCard({
  section,
  index,
  isRevealed,
  isExpanded,
  onToggle,
}: {
  section: AnalysisSection;
  index: number;
  isRevealed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  if (!isRevealed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-gold/10 overflow-hidden"
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[10px] text-gold/30">
          {section.icon}
        </span>
        <div className="flex-1">
          <p className="text-sm font-normal text-text-primary">
            {section.title}
          </p>
          <p className="text-[10px] text-text-muted/30">{section.titleEn}</p>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] text-gold/30"
        >
          ▼
        </motion.span>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-white/[0.04] px-5 pb-5 pt-4">
              <MarkdownContent text={section.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Simple Markdown Renderer ───

function MarkdownContent({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        if (line.trim() === "") return null;

        // Render bold text
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <span key={j} className="font-medium text-gold/70">
                {part.slice(2, -2)}
              </span>
            );
          }
          return <span key={j}>{part}</span>;
        });

        return (
          <p
            key={i}
            className="text-xs font-normal leading-[1.9] text-text-secondary/70"
          >
            {rendered}
          </p>
        );
      })}
    </div>
  );
}
