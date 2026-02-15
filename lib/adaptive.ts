import {
  questions,
  questionMeta,
  type Question,
  type QuestionMeta,
} from "./questions";
import { dimensions } from "./dimensions";
import { archetypes } from "./types";
import type { ArchetypeProfile } from "./types";

// ─── Types ───

export interface DimensionAccumulator {
  total: number;
  count: number;
}

export interface AdaptiveState {
  /** IDs of already-answered questions in order */
  answeredIds: string[];
  /** Running dimension score accumulators */
  accumulators: Record<string, DimensionAccumulator>;
  /** User-selected categories */
  selectedCategories: string[];
  /** Total questions to ask this session */
  targetTotal: number;
}

// ─── State Management ───

export function createAdaptiveState(
  selectedCategories: string[],
  difficulty: string
): AdaptiveState {
  const accumulators: Record<string, DimensionAccumulator> = {};
  for (const dim of dimensions) {
    accumulators[dim.key] = { total: 0, count: 0 };
  }

  return {
    answeredIds: [],
    accumulators,
    selectedCategories,
    targetTotal: calculateTargetCount(selectedCategories, difficulty),
  };
}

export function recordAnswer(
  state: AdaptiveState,
  questionId: string,
  scores: Record<string, number>
): AdaptiveState {
  const newAccumulators: Record<string, DimensionAccumulator> = {};
  for (const key of Object.keys(state.accumulators)) {
    newAccumulators[key] = { ...state.accumulators[key] };
  }

  for (const [dimKey, value] of Object.entries(scores)) {
    if (newAccumulators[dimKey]) {
      newAccumulators[dimKey] = {
        total: newAccumulators[dimKey].total + value,
        count: newAccumulators[dimKey].count + 1,
      };
    }
  }

  return {
    ...state,
    answeredIds: [...state.answeredIds, questionId],
    accumulators: newAccumulators,
  };
}

// ─── Core Adaptive Engine ───

/**
 * Select the next best question based on the current adaptive state.
 * Uses a multi-factor scoring system:
 * 1. Category match (selected categories get priority)
 * 2. Tier alignment (core → deepening → differentiating as progress increases)
 * 3. Dimension need (under-measured dimensions get priority)
 * 4. Type variety (avoid consecutive same question types)
 * 5. Category variety (spread questions across categories)
 * 6. Late-game differentiation (distinguish close archetypes)
 */
export function getNextQuestion(state: AdaptiveState): Question | null {
  const remaining = state.targetTotal - state.answeredIds.length;
  if (remaining <= 0) return null;

  const answeredSet = new Set(state.answeredIds);
  const available = questions.filter(
    (q) => !answeredSet.has(q.id) && questionMeta[q.id]
  );
  if (available.length === 0) return null;

  const progress = state.answeredIds.length / state.targetTotal;

  const scored = available.map((q) => ({
    question: q,
    score: scoreQuestion(q, state, progress),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Weighted random from top 3 for variety
  const topN = Math.min(3, scored.length);
  const top = scored.slice(0, topN);

  // If there's a clear winner (>10 point lead), just pick it
  if (top.length >= 2 && top[0].score - top[1].score > 10) {
    return top[0].question;
  }

  const totalScore = top.reduce((sum, t) => sum + Math.max(t.score, 1), 0);
  let rand = Math.random() * totalScore;
  for (const t of top) {
    rand -= Math.max(t.score, 1);
    if (rand <= 0) return t.question;
  }

  return top[0].question;
}

function scoreQuestion(
  q: Question,
  state: AdaptiveState,
  progress: number
): number {
  const meta = questionMeta[q.id];
  if (!meta) return -100;

  let score = 0;

  // 1. Category match bonus
  if (state.selectedCategories.includes(meta.category)) {
    score += 25;
  } else {
    // Non-selected category questions still useful for coverage
    score += 3;
  }

  // 2. Tier alignment based on progress
  const idealTier = progress < 0.35 ? 1 : progress < 0.7 ? 2 : 3;
  const tierDiff = Math.abs(meta.tier - idealTier);
  score += (2 - tierDiff) * 15; // 30 exact, 15 off-by-one, 0 off-by-two

  // 3. Dimension coverage need
  for (const dimKey of meta.primaryDimensions) {
    const acc = state.accumulators[dimKey];
    if (acc) {
      // 4+ data points = fully confident in a dimension
      const confidence = Math.min(acc.count / 4, 1);
      score += (1 - confidence) * 20;
    }
  }

  // 4. Question type variety
  const recentTypes = state.answeredIds.slice(-2).map((id) => {
    const found = questions.find((qq) => qq.id === id);
    return found?.type;
  });
  if (!recentTypes.includes(q.type)) {
    score += 8;
  }

  // 5. Category variety (penalize clustering)
  const recentCategories = state.answeredIds.slice(-3).map((id) => {
    return questionMeta[id]?.category;
  });
  const sameCatCount = recentCategories.filter(
    (c) => c === meta.category
  ).length;
  score -= sameCatCount * 12;

  // 6. Ensure no single category dominates
  const catCounts: Record<string, number> = {};
  for (const id of state.answeredIds) {
    const m = questionMeta[id];
    if (m) catCounts[m.category] = (catCounts[m.category] || 0) + 1;
  }
  const thisCount = catCounts[meta.category] || 0;
  const avgPerCat = state.answeredIds.length / state.selectedCategories.length;
  if (thisCount > avgPerCat + 2) {
    score -= 15; // Category already well-represented
  }

  // 7. Late-game archetype differentiation
  if (progress > 0.65) {
    score += getDifferentiatingScore(meta, state);
  }

  // 8. Bonus for measuring multiple dimensions (more info per question)
  if (meta.primaryDimensions.length >= 3) {
    score += 5;
  }

  return score;
}

// ─── Archetype Differentiation ───

function getDifferentiatingScore(
  meta: QuestionMeta,
  state: AdaptiveState
): number {
  const currentScores: Record<string, number> = {};
  for (const dim of dimensions) {
    const acc = state.accumulators[dim.key];
    currentScores[dim.key] = acc.count > 0 ? acc.total / acc.count : 50;
  }

  // Find top 2 archetype candidates using cosine similarity
  const sims = archetypes
    .map((arch) => {
      const archVec = dimensions.map(
        (d) => arch.profile[d.key as keyof ArchetypeProfile] ?? 50
      );
      const userVec = dimensions.map((d) => currentScores[d.key] ?? 50);
      return { arch, sim: cosine(archVec, userVec) };
    })
    .sort((a, b) => b.sim - a.sim);

  if (sims.length < 2) return 0;

  const top1 = sims[0].arch;
  const top2 = sims[1].arch;

  // Find dimensions where top 2 candidates differ most
  let diffScore = 0;
  for (const dimKey of meta.primaryDimensions) {
    const v1 = top1.profile[dimKey as keyof ArchetypeProfile] ?? 50;
    const v2 = top2.profile[dimKey as keyof ArchetypeProfile] ?? 50;
    diffScore += (Math.abs(v1 - v2) / 100) * 10;
  }

  return diffScore;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const ma = Math.sqrt(magA);
  const mb = Math.sqrt(magB);
  if (ma === 0 || mb === 0) return 0;
  return dot / (ma * mb);
}

// ─── Helpers ───

export function calculateTargetCount(
  selectedCategories: string[],
  difficulty: string
): number {
  const perCategory: Record<string, number> = {
    beginner: 3,
    intermediate: 5,
    expert: 8,
  };
  const base = (perCategory[difficulty] || 5) * selectedCategories.length;
  // Add supplement for dimension coverage (up to 4 extra)
  const supplement = Math.min(Math.ceil(selectedCategories.length * 0.5), 4);
  return Math.min(base + supplement, 55);
}

export function isComplete(state: AdaptiveState): boolean {
  return state.answeredIds.length >= state.targetTotal;
}

export function getProgress(state: AdaptiveState): {
  current: number;
  total: number;
  percentage: number;
} {
  return {
    current: state.answeredIds.length,
    total: state.targetTotal,
    percentage:
      state.targetTotal > 0
        ? Math.round((state.answeredIds.length / state.targetTotal) * 100)
        : 0,
  };
}

