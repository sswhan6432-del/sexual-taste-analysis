"use client";

import { motion } from "framer-motion";
import type { RecommendedPlay } from "@/lib/compatibility";
import type { Locale } from "@/lib/i18n";

interface Props {
  plays: RecommendedPlay[];
  locale: Locale;
}

export default function RecommendedPlays({ plays, locale }: Props) {
  const isEn = locale === "en";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="border border-white/[0.06] p-6"
    >
      <p className="mb-1 text-[10px] font-normal uppercase tracking-[0.4em] text-gold/35">
        Recommendations
      </p>
      <h3 className="mb-6 text-lg font-normal text-text-primary">
        {isEn ? "Recommended Plays" : "추천 플레이"}
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {plays.map((play, i) => (
          <motion.div
            key={play.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08 }}
            className="group border border-white/[0.04] p-4 transition-all hover:border-gold/15 hover:bg-gold/[0.02]"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg">{play.icon}</span>
              <span className="text-[9px] text-gold/30">{play.score}%</span>
            </div>

            <p className="text-xs font-normal text-text-primary transition-colors group-hover:text-gold">
              {isEn ? play.nameEn : play.name}
            </p>

            <p className="mt-1.5 text-[10px] leading-relaxed text-text-muted/50">
              {isEn ? play.descriptionEn : play.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
