"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { Archetype } from "@/lib/types";
import { useQuizStore } from "@/store/quizStore";
import { t } from "@/lib/i18n";

interface ShareCardProps {
  archetype: Archetype;
  similarity: number;
}

export default function ShareCard({ archetype, similarity }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const locale = useQuizStore((s) => s.locale);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `sexual-taste-${archetype.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Silently fail
    }
  }, [archetype.id]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.origin);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="mx-auto max-w-md"
    >
      <div
        ref={cardRef}
        className="mb-6 border border-gold/10 p-10 text-center"
        style={{ background: "#000000" }}
      >
        <p className="mb-3 text-[10px] font-normal uppercase tracking-[0.5em] text-gold/30">
          Type {archetype.numeral}
        </p>
        <h3 className="mb-1 text-2xl font-normal text-gold">
          {locale === "en" ? archetype.nameEn : archetype.name}
        </h3>
        <p className="mb-4 text-xs font-normal italic text-gray-600">
          {locale === "en" ? archetype.name : archetype.nameEn}
        </p>
        <div className="mx-auto mb-4 h-px w-10 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <p className="mb-4 text-sm font-normal leading-relaxed text-gray-400">
          {locale === "en" ? archetype.descriptionEn : archetype.description}
        </p>
        <p className="text-[10px] font-normal tracking-wider text-gold/40">
          {Math.round(similarity * 100)}% match
        </p>
        <p className="mt-6 text-[9px] font-normal uppercase tracking-[0.4em] text-gray-700">
          Sexual Taste Analysis
        </p>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleDownload}
          className="flex-1 border border-gold/30 py-3 text-sm font-normal uppercase tracking-[0.15em] text-gold transition-all hover:border-gold/50 hover:bg-gold/[0.05]"
        >
          {t("share.saveImage", locale)}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleCopyLink}
          className="flex-1 border border-white/[0.06] py-3 text-sm font-normal uppercase tracking-[0.15em] text-text-secondary transition-all hover:border-white/10 hover:bg-white/[0.02]"
        >
          {t("share.copyLink", locale)}
        </motion.button>
      </div>
    </motion.div>
  );
}
