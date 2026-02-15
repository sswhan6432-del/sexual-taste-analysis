"use client";

import { motion } from "framer-motion";

interface TraitTagsProps {
  tags: string[];
}

export default function TraitTags({ tags }: TraitTagsProps) {
  if (tags.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mx-auto max-w-md"
    >
      <p className="mb-6 text-center text-[10px] font-normal uppercase tracking-[0.4em] text-gold/30">
        Trait Keywords
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
            className="border border-gold/10 px-4 py-2 text-xs font-normal tracking-wider text-text-secondary/80 transition-colors hover:border-gold/25 hover:text-gold/60"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
