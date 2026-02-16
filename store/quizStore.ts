import { create } from "zustand";
import {
  calculateDimensionScores,
  analyzeResults,
  analyzeBdsm,
  type DimensionScores,
  type AnalysisResult,
  type BdsmProfile,
} from "@/lib/scoring";
import type { Archetype } from "@/lib/types";
import {
  createAdaptiveState,
  recordAnswer,
  getNextQuestion,
  isComplete,
  getProgress,
  type AdaptiveState,
} from "@/lib/adaptive";
import { questionMeta, categories } from "@/lib/questions";
import type { Question } from "@/lib/questions";

export type Step = "landing" | "category" | "quiz" | "result";
export type Difficulty = "beginner" | "intermediate" | "expert";
export type Locale = "ko" | "en";

interface QuizState {
  step: Step;
  difficulty: Difficulty;
  locale: Locale;
  selectedCategories: string[];
  /** Adaptive engine state */
  adaptiveState: AdaptiveState | null;
  /** Currently displayed question (chosen by adaptive engine) */
  currentQuestion: Question | null;
  /** History of questions for "back" navigation */
  questionHistory: Question[];
  /** questionId → { dimensionKey → score } */
  answers: Record<string, Record<string, number>>;
  dimensionScores: DimensionScores;
  resultType: Archetype | null;
  similarity: number;
  allSimilarities: { archetype: Archetype; similarity: number }[];
  // Enhanced analysis fields
  secondaryType: Archetype | null;
  secondarySimilarity: number;
  top3: { archetype: Archetype; similarity: number; percentage: number }[];
  traitTags: string[];
  dimensionInsights: Record<string, string>;
  dominantDimensions: string[];
  recessiveDimensions: string[];
  bdsmProfile: BdsmProfile | null;
  // Progress
  progressCurrent: number;
  progressTotal: number;
  /** Category label of current question */
  currentCategoryLabel: string | null;

  // Actions
  setStep: (step: Step) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setLocale: (locale: Locale) => void;
  toggleCategory: (categoryId: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  /** Start the adaptive quiz (call after category selection) */
  startAdaptiveQuiz: () => void;
  /** Answer current question and get next */
  answerQuestion: (questionId: string, scores: Record<string, number>) => void;
  /** Go back to previous question */
  prevQuestion: () => void;
  calculateResults: () => void;
  reset: () => void;
}

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "ko") return stored;
  }
  return "ko";
}

const initialState = {
  step: "landing" as Step,
  difficulty: "intermediate" as Difficulty,
  locale: (typeof window !== "undefined" ? getInitialLocale() : "ko") as Locale,
  selectedCategories: [] as string[],
  adaptiveState: null as AdaptiveState | null,
  currentQuestion: null as Question | null,
  questionHistory: [] as Question[],
  answers: {} as Record<string, Record<string, number>>,
  dimensionScores: {} as DimensionScores,
  resultType: null as Archetype | null,
  similarity: 0,
  allSimilarities: [] as { archetype: Archetype; similarity: number }[],
  secondaryType: null as Archetype | null,
  secondarySimilarity: 0,
  top3: [] as { archetype: Archetype; similarity: number; percentage: number }[],
  traitTags: [] as string[],
  dimensionInsights: {} as Record<string, string>,
  dominantDimensions: [] as string[],
  recessiveDimensions: [] as string[],
  bdsmProfile: null as BdsmProfile | null,
  progressCurrent: 0,
  progressTotal: 0,
  currentCategoryLabel: null as string | null,
};

function getCategoryLabel(questionId: string, locale: Locale): string | null {
  const meta = questionMeta[questionId];
  if (!meta) return null;
  const cat = categories.find((c) => c.id === meta.category);
  if (!cat) return null;
  return locale === "en" ? cat.nameEn : cat.name;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setLocale: (locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
    set({ locale });
  },

  toggleCategory: (categoryId) =>
    set((state) => {
      const current = state.selectedCategories;
      if (current.includes(categoryId)) {
        return {
          selectedCategories: current.filter((id) => id !== categoryId),
        };
      }
      if (current.length >= 7) return state;
      return { selectedCategories: [...current, categoryId] };
    }),

  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),

  startAdaptiveQuiz: () => {
    const { selectedCategories, difficulty } = get();
    const adaptive = createAdaptiveState(selectedCategories, difficulty);
    const firstQuestion = getNextQuestion(adaptive);
    const progress = getProgress(adaptive);

    set({
      adaptiveState: adaptive,
      currentQuestion: firstQuestion,
      questionHistory: [],
      answers: {},
      progressCurrent: progress.current,
      progressTotal: progress.total,
      currentCategoryLabel: firstQuestion
        ? getCategoryLabel(firstQuestion.id, get().locale)
        : null,
      step: "quiz",
    });
  },

  answerQuestion: (questionId, scores) => {
    const { adaptiveState, currentQuestion } = get();
    if (!adaptiveState || !currentQuestion) return;

    // Record answer in adaptive state
    const newAdaptive = recordAnswer(adaptiveState, questionId, scores);
    const newAnswers = { ...get().answers, [questionId]: scores };

    // Check if quiz is complete
    if (isComplete(newAdaptive)) {
      // Calculate results immediately
      const dimensionScores = calculateDimensionScores(newAnswers);
      const result = analyzeResults(dimensionScores);
      const bdsmProfile = analyzeBdsm(dimensionScores);

      set({
        adaptiveState: newAdaptive,
        answers: newAnswers,
        questionHistory: [...get().questionHistory, currentQuestion],
        dimensionScores,
        bdsmProfile,
        resultType: result.primaryType,
        similarity: result.primarySimilarity,
        allSimilarities: result.allSimilarities,
        secondaryType: result.secondaryType,
        secondarySimilarity: result.secondarySimilarity,
        top3: result.top3,
        traitTags: result.traitTags,
        dimensionInsights: result.dimensionInsights,
        dominantDimensions: result.dominantDimensions,
        recessiveDimensions: result.recessiveDimensions,
        step: "result",
      });
      return;
    }

    // Get next question from adaptive engine
    const nextQ = getNextQuestion(newAdaptive);
    const progress = getProgress(newAdaptive);

    set({
      adaptiveState: newAdaptive,
      answers: newAnswers,
      currentQuestion: nextQ,
      questionHistory: [...get().questionHistory, currentQuestion],
      progressCurrent: progress.current,
      progressTotal: progress.total,
      currentCategoryLabel: nextQ ? getCategoryLabel(nextQ.id, get().locale) : null,
    });
  },

  prevQuestion: () => {
    const { questionHistory, adaptiveState, answers } = get();
    if (questionHistory.length === 0 || !adaptiveState) return;

    const prevQ = questionHistory[questionHistory.length - 1];
    const newHistory = questionHistory.slice(0, -1);

    // Remove the last answer and revert adaptive state
    const prevAnswerScores = answers[prevQ.id];
    const newAnswers = { ...answers };
    delete newAnswers[prevQ.id];

    // Revert accumulators
    const newAccumulators: Record<string, { total: number; count: number }> = {};
    for (const key of Object.keys(adaptiveState.accumulators)) {
      newAccumulators[key] = { ...adaptiveState.accumulators[key] };
    }
    if (prevAnswerScores) {
      for (const [dimKey, value] of Object.entries(prevAnswerScores)) {
        if (newAccumulators[dimKey]) {
          newAccumulators[dimKey] = {
            total: newAccumulators[dimKey].total - value,
            count: newAccumulators[dimKey].count - 1,
          };
        }
      }
    }

    const revertedAdaptive: AdaptiveState = {
      ...adaptiveState,
      answeredIds: adaptiveState.answeredIds.slice(0, -1),
      accumulators: newAccumulators,
    };

    const progress = getProgress(revertedAdaptive);

    set({
      adaptiveState: revertedAdaptive,
      currentQuestion: prevQ,
      questionHistory: newHistory,
      answers: newAnswers,
      progressCurrent: progress.current,
      progressTotal: progress.total,
      currentCategoryLabel: getCategoryLabel(prevQ.id, get().locale),
    });
  },

  calculateResults: () => {
    const { answers } = get();
    const dimensionScores = calculateDimensionScores(answers);
    const result = analyzeResults(dimensionScores);
    const bdsmProfile = analyzeBdsm(dimensionScores);

    set({
      dimensionScores,
      bdsmProfile,
      resultType: result.primaryType,
      similarity: result.primarySimilarity,
      allSimilarities: result.allSimilarities,
      secondaryType: result.secondaryType,
      secondarySimilarity: result.secondarySimilarity,
      top3: result.top3,
      traitTags: result.traitTags,
      dimensionInsights: result.dimensionInsights,
      dominantDimensions: result.dominantDimensions,
      recessiveDimensions: result.recessiveDimensions,
      step: "result",
    });
  },

  reset: () => set(initialState),
}));
