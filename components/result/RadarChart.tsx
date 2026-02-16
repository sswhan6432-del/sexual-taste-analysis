"use client";

import { motion } from "framer-motion";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { dimensions } from "@/lib/dimensions";
import type { DimensionScores } from "@/lib/scoring";
import { useQuizStore } from "@/store/quizStore";

interface RadarChartProps {
  scores: DimensionScores;
}

export default function RadarChartComponent({ scores }: RadarChartProps) {
  const locale = useQuizStore((s) => s.locale);
  const data = dimensions.map((dim) => ({
    subject: locale === "en" ? dim.nameEn : dim.name,
    value: scores[dim.key] ?? 50,
    fullMark: 100,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mx-auto max-w-md border border-gold/10 p-6"
    >
      <p className="mb-4 text-center text-xs font-normal uppercase tracking-[0.3em] text-gold/40">
        Dimensional Analysis
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#1A1A1A" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#B8B0A4", fontSize: 11, fontWeight: 400 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="score"
            dataKey="value"
            stroke="#C9A96E"
            fill="#C9A96E"
            fillOpacity={0.1}
            strokeWidth={1.5}
            animationDuration={1500}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
