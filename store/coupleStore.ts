import { create } from "zustand";
import type { DimensionScores, BdsmProfile } from "@/lib/scoring";
import type { Archetype } from "@/lib/types";
import {
  calculateCompatibility,
  type CoupleCompatibility,
} from "@/lib/compatibility";
import { useQuizStore, type Difficulty } from "./quizStore";

export interface PartnerResult {
  name: string;
  dimensionScores: DimensionScores;
  resultType: Archetype;
  similarity: number;
  bdsmProfile: BdsmProfile;
  traitTags: string[];
  top3: { archetype: Archetype; similarity: number; percentage: number }[];
}

interface CoupleState {
  active: boolean;
  currentPartner: 1 | 2;
  difficulty: Difficulty;
  partner1Name: string;
  partner2Name: string;
  partner1Result: PartnerResult | null;
  partner2Result: PartnerResult | null;
  compatibility: CoupleCompatibility | null;

  // Actions
  startCouple: (name1: string, name2: string, difficulty: Difficulty) => void;
  snapshotPartner1: () => void;
  snapshotPartner2: () => void;
  resetCouple: () => void;
}

function snapshotFromQuizStore(name: string): PartnerResult | null {
  const qs = useQuizStore.getState();
  if (!qs.resultType || !qs.bdsmProfile) return null;

  return {
    name,
    dimensionScores: { ...qs.dimensionScores },
    resultType: qs.resultType,
    similarity: qs.similarity,
    bdsmProfile: { ...qs.bdsmProfile },
    traitTags: [...qs.traitTags],
    top3: qs.top3.map((t) => ({ ...t })),
  };
}

export const useCoupleStore = create<CoupleState>((set, get) => ({
  active: false,
  currentPartner: 1,
  difficulty: "intermediate",
  partner1Name: "",
  partner2Name: "",
  partner1Result: null,
  partner2Result: null,
  compatibility: null,

  startCouple: (name1, name2, difficulty) => {
    set({
      active: true,
      currentPartner: 1,
      difficulty,
      partner1Name: name1,
      partner2Name: name2,
      partner1Result: null,
      partner2Result: null,
      compatibility: null,
    });
  },

  snapshotPartner1: () => {
    const { partner1Name } = get();
    const result = snapshotFromQuizStore(partner1Name);
    if (result) {
      set({ partner1Result: result, currentPartner: 2 });
    }
  },

  snapshotPartner2: () => {
    const { partner2Name, partner1Result } = get();
    const result = snapshotFromQuizStore(partner2Name);
    if (result && partner1Result) {
      const compat = calculateCompatibility(
        partner1Result.dimensionScores,
        partner1Result.bdsmProfile,
        result.dimensionScores,
        result.bdsmProfile
      );
      set({
        partner2Result: result,
        compatibility: compat,
      });
    }
  },

  resetCouple: () =>
    set({
      active: false,
      currentPartner: 1,
      difficulty: "intermediate",
      partner1Name: "",
      partner2Name: "",
      partner1Result: null,
      partner2Result: null,
      compatibility: null,
    }),
}));
