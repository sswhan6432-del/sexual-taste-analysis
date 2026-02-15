"use client";

import { motion } from "framer-motion";
import { archetypeMap } from "@/lib/types";
import type { Archetype } from "@/lib/types";

interface CompatibleTypesProps {
  archetype: Archetype;
}

export default function CompatibleTypes({ archetype }: CompatibleTypesProps) {
  const compatible = archetype.compatibleTypes
    .map((id) => archetypeMap[id])
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mx-auto max-w-md border border-gold/10 p-8"
    >
      <p className="mb-6 text-center text-xs font-normal uppercase tracking-[0.3em] text-gold/40">
        Compatible Types
      </p>

      <div className="space-y-4">
        {compatible.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 + index * 0.12 }}
            className="border-b border-white/[0.04] pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-base font-normal text-text-primary">
                {type.name}
              </p>
              <p className="text-[10px] font-normal uppercase tracking-wider text-gold/30">
                Type {type.numeral}
              </p>
            </div>
            <p className="mt-0.5 text-xs font-normal italic text-text-muted">
              {type.nameEn}
            </p>
            <p className="mt-2 text-sm font-normal leading-relaxed text-text-secondary">
              {type.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
