"use client";

import { motion } from "framer-motion";
import type { Archetype } from "@/lib/types";

interface SecondaryTypeProps {
  archetype: Archetype;
  similarity: number;
}

export default function SecondaryType({
  archetype,
  similarity,
}: SecondaryTypeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mx-auto max-w-md border border-white/[0.04] p-8"
    >
      <p className="mb-6 text-center text-[10px] font-normal uppercase tracking-[0.4em] text-gold/30">
        Secondary Archetype
      </p>

      <div className="flex items-center gap-6">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-gold/15">
          <span className="text-lg font-normal text-gold/50">
            {archetype.numeral}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-normal text-text-primary">
            {archetype.name}
          </h3>
          <p className="mt-0.5 text-xs font-normal italic text-gold/30">
            {archetype.nameEn}
          </p>
          <p className="mt-2 text-xs font-normal leading-relaxed text-text-muted/70">
            {archetype.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.04] pt-4">
        <span className="text-[10px] font-normal uppercase tracking-[0.3em] text-gold/25">
          Similarity
        </span>
        <span className="text-sm font-normal text-gold/50">
          {Math.round(similarity * 100)}%
        </span>
      </div>
    </motion.div>
  );
}
