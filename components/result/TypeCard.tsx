"use client";

import { motion } from "framer-motion";
import type { Archetype } from "@/lib/types";
import { useQuizStore } from "@/store/quizStore";

interface TypeCardProps {
  archetype: Archetype;
  similarity: number;
}

export default function TypeCard({ archetype, similarity }: TypeCardProps) {
  const locale = useQuizStore((s) => s.locale);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mx-auto max-w-md border border-gold/10 p-10 text-center"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-xs font-normal uppercase tracking-[0.4em] text-gold/40"
      >
        Type {archetype.numeral}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-1 text-3xl font-normal text-gold sm:text-4xl"
      >
        {locale === "en" ? archetype.nameEn : archetype.name}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6 text-sm font-normal italic text-text-muted"
      >
        {locale === "en" ? archetype.name : archetype.nameEn}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6 inline-block border border-gold/15 px-4 py-1.5 text-xs font-normal tracking-wider text-gold/60"
      >
        {Math.round(similarity * 100)}% match
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8 text-base font-normal leading-relaxed text-text-secondary"
      >
        {locale === "en" ? archetype.descriptionEn : archetype.description}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm font-normal leading-loose text-text-muted"
      >
        {locale === "en" ? archetype.detailDescriptionEn : archetype.detailDescription}
      </motion.p>
    </motion.div>
  );
}
