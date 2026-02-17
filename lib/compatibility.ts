import type { DimensionScores, BdsmProfile } from "./scoring";
import type { Archetype } from "./types";
import { dimensions } from "./dimensions";

// ─── Types ───

export interface DimensionComparison {
  key: string;
  name: string;
  nameEn: string;
  score1: number;
  score2: number;
  diff: number;
  compatibility: number; // 0-100
  type: "match" | "complement" | "growth";
  insight: string;
  insightEn: string;
}

export interface DynamicAnalysis {
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  balance: number; // -100 (P1 dominant) to +100 (P2 dominant), 0 = balanced
}

export interface RecommendedPlay {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  score: number; // relevance score 0-100
}

export interface StyleComparison {
  dsBalance: string;
  dsBalanceEn: string;
  intensityDiff: number;
  roleMatch: string;
  roleMatchEn: string;
  overallStyle: string;
  overallStyleEn: string;
}

export interface CoupleCompatibility {
  overallScore: number; // 0-100
  dimensionComparison: DimensionComparison[];
  strengthAreas: string[];
  strengthAreasEn: string[];
  growthAreas: string[];
  growthAreasEn: string[];
  dynamicAnalysis: DynamicAnalysis;
  recommendedPlays: RecommendedPlay[];
  styleComparison: StyleComparison;
}

// ─── Dimension compatibility rules ───

type CompatRule = "similar" | "complement" | "flexible";

const dimensionRules: Record<string, CompatRule> = {
  dominance: "complement",
  emotion: "similar",
  adventure: "flexible",
  sensory: "similar",
  atmosphere: "similar",
  communication: "similar",
  intimacy: "similar",
  fantasy: "flexible",
};

function calcDimensionCompat(key: string, s1: number, s2: number): number {
  const diff = Math.abs(s1 - s2);
  const rule = dimensionRules[key] ?? "similar";

  if (rule === "complement") {
    // dominance: difference is good (one leads, one follows)
    // Both high or both low = potential conflict
    const complementScore = Math.min(diff * 1.2, 100);
    // Penalize if both extreme same direction
    if ((s1 >= 65 && s2 >= 65) || (s1 <= 35 && s2 <= 35)) {
      return Math.max(complementScore - 20, 10);
    }
    return Math.max(complementScore, 20);
  }

  if (rule === "similar") {
    // Similar scores = higher compatibility
    return Math.max(100 - diff * 1.5, 10);
  }

  // flexible: similar is good, but moderate difference also works
  if (diff <= 20) return 90;
  if (diff <= 40) return 70;
  return Math.max(100 - diff, 20);
}

function getComparisonType(
  key: string,
  compat: number
): "match" | "complement" | "growth" {
  const rule = dimensionRules[key];
  if (compat >= 70) {
    return rule === "complement" ? "complement" : "match";
  }
  return "growth";
}

// ─── Dimension insights ───

interface InsightPair {
  ko: string;
  en: string;
}

function getDimensionInsight(
  key: string,
  s1: number,
  s2: number,
  diff: number,
  type: "match" | "complement" | "growth"
): InsightPair {
  const insights: Record<string, Record<string, InsightPair>> = {
    dominance: {
      complement: {
        ko: "한 명이 이끌고 한 명이 따르는 자연스러운 역학이 형성됩니다",
        en: "A natural dynamic forms where one leads and the other follows",
      },
      match: {
        ko: "비슷한 주도성은 때로 권력 충돌을, 때로 완벽한 균형을 만듭니다",
        en: "Similar dominance levels can create power clashes or perfect balance",
      },
      growth: {
        ko: "주도권에 대한 대화가 더 깊은 이해를 만들 수 있습니다",
        en: "Discussing power dynamics can deepen mutual understanding",
      },
    },
    emotion: {
      match: {
        ko: "감정의 파장이 일치하여 깊은 공감대를 형성합니다",
        en: "Your emotional wavelengths align, creating deep resonance",
      },
      complement: {
        ko: "감정 표현의 차이가 서로에게 새로운 시각을 줍니다",
        en: "Different emotional expressions offer fresh perspectives to each other",
      },
      growth: {
        ko: "감정적 교감의 깊이에 대한 차이를 이해하면 더 가까워집니다",
        en: "Understanding your different emotional depths brings you closer",
      },
    },
    adventure: {
      match: {
        ko: "새로운 경험에 대한 열린 태도가 비슷하여 함께 성장할 수 있습니다",
        en: "Similar openness to new experiences allows you to grow together",
      },
      complement: {
        ko: "한 명이 새로운 경험을 리드하며 상대를 이끌 수 있습니다",
        en: "One partner can lead and introduce new experiences to the other",
      },
      growth: {
        ko: "모험 성향의 차이를 존중하며 각자의 속도로 탐색하세요",
        en: "Respect each other's pace and explore at your own speed",
      },
    },
    sensory: {
      match: {
        ko: "감각에 대한 반응이 비슷하여 서로의 터치에 자연스럽게 반응합니다",
        en: "Similar sensory responses make your touches naturally harmonious",
      },
      complement: {
        ko: "감각적 차이가 서로에게 새로운 자극을 선사합니다",
        en: "Sensory differences offer each other new stimulations",
      },
      growth: {
        ko: "서로의 감각적 선호를 탐색하면 새로운 쾌감의 영역이 열립니다",
        en: "Exploring each other's sensory preferences opens new realms of pleasure",
      },
    },
    atmosphere: {
      match: {
        ko: "분위기에 대한 취향이 일치하여 함께 완벽한 공간을 만듭니다",
        en: "Matching atmosphere preferences let you create the perfect space together",
      },
      complement: {
        ko: "한 명의 분위기 연출력이 상대에게 새로운 경험을 줄 수 있습니다",
        en: "One partner's atmosphere skills can bring new experiences to the other",
      },
      growth: {
        ko: "환경에 대한 기대치를 맞추면 더 만족스러운 시간을 보낼 수 있습니다",
        en: "Aligning environment expectations leads to more satisfying times together",
      },
    },
    communication: {
      match: {
        ko: "소통 스타일이 비슷하여 원하는 것을 자연스럽게 공유합니다",
        en: "Similar communication styles make sharing desires feel natural",
      },
      complement: {
        ko: "한 명의 솔직한 표현이 상대의 숨겨진 욕구를 이끌어냅니다",
        en: "One partner's openness draws out the other's hidden desires",
      },
      growth: {
        ko: "서로의 소통 방식을 이해하면 오해 없는 깊은 교감이 가능합니다",
        en: "Understanding each other's communication styles enables deeper connection",
      },
    },
    intimacy: {
      match: {
        ko: "친밀감의 깊이가 비슷하여 관계의 템포가 자연스럽습니다",
        en: "Similar intimacy depth creates a natural relationship tempo",
      },
      complement: {
        ko: "친밀감의 차이가 건강한 밀당의 긴장감을 만들 수 있습니다",
        en: "Intimacy differences can create healthy push-pull tension",
      },
      growth: {
        ko: "원하는 친밀감의 수준을 대화로 맞추면 더 깊은 유대가 생깁니다",
        en: "Aligning your desired intimacy levels through dialogue deepens your bond",
      },
    },
    fantasy: {
      match: {
        ko: "상상력의 수준이 비슷하여 판타지를 함께 현실로 만들 수 있습니다",
        en: "Matched imagination levels let you bring fantasies to life together",
      },
      complement: {
        ko: "한 명의 풍부한 상상력이 관계에 새로운 시나리오를 더합니다",
        en: "One partner's rich imagination adds new scenarios to your relationship",
      },
      growth: {
        ko: "판타지에 대한 개방성을 천천히 넓혀가면 새로운 즐거움이 기다립니다",
        en: "Gradually opening up to fantasies unveils new joys awaiting you",
      },
    },
  };

  const dimInsights = insights[key];
  if (!dimInsights) {
    return { ko: "", en: "" };
  }
  return dimInsights[type] ?? dimInsights.growth;
}

// ─── Recommended Plays Pool ───

const playPool: Omit<RecommendedPlay, "score">[] = [
  {
    id: "role-play",
    name: "Role Play",
    nameEn: "Role Play",
    description: "서로 다른 캐릭터로 변신하여 새로운 역학을 탐색하세요",
    descriptionEn: "Transform into different characters and explore new dynamics",
    icon: "🎭",
  },
  {
    id: "scenario-play",
    name: "Scenario Play",
    nameEn: "Scenario Play",
    description: "특별한 시나리오를 함께 설계하고 실행해보세요",
    descriptionEn: "Design and execute special scenarios together",
    icon: "📜",
  },
  {
    id: "power-exchange",
    name: "Power Exchange",
    nameEn: "Power Exchange",
    description: "주도권을 주고받으며 신뢰의 깊이를 경험하세요",
    descriptionEn: "Exchange control and experience the depth of trust",
    icon: "⚡",
  },
  {
    id: "gentle-domination",
    name: "Gentle Domination",
    nameEn: "Gentle Domination",
    description: "부드럽지만 확실한 리딩으로 안전한 지배를 경험하세요",
    descriptionEn: "Experience safe dominance through gentle but firm leading",
    icon: "🤲",
  },
  {
    id: "sensory-play",
    name: "Sensory Play",
    nameEn: "Sensory Play",
    description: "다양한 감각 자극으로 새로운 쾌감의 영역을 열어보세요",
    descriptionEn: "Open new realms of pleasure with varied sensory stimulations",
    icon: "✨",
  },
  {
    id: "massage",
    name: "Sensual Massage",
    nameEn: "Sensual Massage",
    description: "서로의 몸을 천천히 탐색하며 감각을 깨워보세요",
    descriptionEn: "Slowly explore each other's bodies and awaken your senses",
    icon: "💆",
  },
  {
    id: "new-location",
    name: "New Location",
    nameEn: "New Location",
    description: "익숙한 침실을 벗어나 새로운 장소에서의 설렘을 느껴보세요",
    descriptionEn: "Leave the familiar bedroom and feel the thrill of a new setting",
    icon: "🗺️",
  },
  {
    id: "toys",
    name: "Toys & Tools",
    nameEn: "Toys & Tools",
    description: "새로운 도구를 함께 탐색하며 경험의 폭을 넓혀보세요",
    descriptionEn: "Explore new tools together and expand your range of experiences",
    icon: "🎁",
  },
  {
    id: "candlelight",
    name: "Candlelight Night",
    nameEn: "Candlelight Night",
    description: "촛불과 음악으로 완벽한 분위기를 만들어보세요",
    descriptionEn: "Create the perfect atmosphere with candles and music",
    icon: "🕯️",
  },
  {
    id: "music-mood",
    name: "Music & Mood",
    nameEn: "Music & Mood",
    description: "취향에 맞는 플레이리스트로 감각을 극대화하세요",
    descriptionEn: "Maximize your senses with a curated playlist",
    icon: "🎵",
  },
  {
    id: "eye-contact",
    name: "Eye Contact",
    nameEn: "Eye Contact Play",
    description: "눈을 마주보며 가장 원초적인 연결을 경험하세요",
    descriptionEn: "Experience the most primal connection through sustained eye contact",
    icon: "👁️",
  },
  {
    id: "slow-intimacy",
    name: "Slow Intimacy",
    nameEn: "Slow Intimacy",
    description: "모든 것을 느리게, 한 순간 한 순간을 깊이 음미하세요",
    descriptionEn: "Slow everything down and savor each moment deeply",
    icon: "🌙",
  },
  {
    id: "dirty-talk",
    name: "Dirty Talk",
    nameEn: "Verbal Play",
    description: "말로 서로의 흥분을 끌어올리며 소통의 쾌감을 느껴보세요",
    descriptionEn: "Use words to heighten each other's excitement and feel the pleasure of communication",
    icon: "💬",
  },
  {
    id: "verbal-affirmation",
    name: "Verbal Affirmation",
    nameEn: "Verbal Affirmation",
    description: "사랑과 욕망을 말로 표현하며 감정의 깊이를 더하세요",
    descriptionEn: "Express love and desire verbally to deepen emotional connection",
    icon: "💝",
  },
  {
    id: "aftercare",
    name: "Aftercare",
    nameEn: "Aftercare Ritual",
    description: "사후 케어를 통해 깊은 유대감과 안전함을 느껴보세요",
    descriptionEn: "Feel deep bonding and safety through aftercare rituals",
    icon: "🫂",
  },
  {
    id: "deep-conversation",
    name: "Deep Conversation",
    nameEn: "Pillow Talk",
    description: "서로의 가장 은밀한 욕망을 솔직하게 나눠보세요",
    descriptionEn: "Share your most intimate desires honestly with each other",
    icon: "💭",
  },
];

function scorePlayRelevance(
  play: Omit<RecommendedPlay, "score">,
  s1: DimensionScores,
  s2: DimensionScores
): number {
  const g = (key: string) => ((s1[key] ?? 50) + (s2[key] ?? 50)) / 2;
  const diff = (key: string) =>
    Math.abs((s1[key] ?? 50) - (s2[key] ?? 50));

  const rules: Record<string, () => number> = {
    "role-play": () => (g("fantasy") >= 60 ? 60 + g("fantasy") * 0.4 : 30),
    "scenario-play": () =>
      g("fantasy") >= 55 && g("adventure") >= 50
        ? 60 + (g("fantasy") + g("adventure")) * 0.2
        : 25,
    "power-exchange": () =>
      diff("dominance") >= 25 ? 60 + diff("dominance") * 0.4 : 20,
    "gentle-domination": () =>
      diff("dominance") >= 20 && g("emotion") >= 50
        ? 60 + diff("dominance") * 0.3
        : 20,
    "sensory-play": () =>
      g("sensory") >= 55 ? 60 + g("sensory") * 0.4 : 25,
    massage: () =>
      g("sensory") >= 50 && g("intimacy") >= 45
        ? 55 + (g("sensory") + g("intimacy")) * 0.2
        : 30,
    "new-location": () =>
      g("adventure") >= 60 ? 60 + g("adventure") * 0.3 : 20,
    toys: () =>
      g("adventure") >= 55 && g("sensory") >= 50
        ? 55 + (g("adventure") + g("sensory")) * 0.2
        : 20,
    candlelight: () =>
      g("atmosphere") >= 60 ? 60 + g("atmosphere") * 0.3 : 25,
    "music-mood": () =>
      g("atmosphere") >= 55 ? 55 + g("atmosphere") * 0.3 : 25,
    "eye-contact": () =>
      g("emotion") >= 60 && g("intimacy") >= 55
        ? 60 + (g("emotion") + g("intimacy")) * 0.2
        : 25,
    "slow-intimacy": () =>
      g("emotion") >= 55 && g("intimacy") >= 55
        ? 55 + (g("emotion") + g("intimacy")) * 0.2
        : 25,
    "dirty-talk": () =>
      g("communication") >= 60 ? 60 + g("communication") * 0.3 : 20,
    "verbal-affirmation": () =>
      g("communication") >= 55 && g("emotion") >= 50
        ? 55 + (g("communication") + g("emotion")) * 0.2
        : 25,
    aftercare: () =>
      g("intimacy") >= 60 && g("emotion") >= 55
        ? 60 + (g("intimacy") + g("emotion")) * 0.2
        : 30,
    "deep-conversation": () =>
      g("intimacy") >= 60 && g("communication") >= 55
        ? 60 + (g("intimacy") + g("communication")) * 0.2
        : 25,
  };

  const calcFn = rules[play.id];
  return Math.min(Math.round(calcFn ? calcFn() : 30), 100);
}

// ─── Dynamic Analysis ───

function analyzeDynamic(
  s1: DimensionScores,
  bdsm1: BdsmProfile,
  s2: DimensionScores,
  bdsm2: BdsmProfile
): DynamicAnalysis {
  const dom1 = s1.dominance ?? 50;
  const dom2 = s2.dominance ?? 50;
  const balance = dom2 - dom1; // positive = P2 more dominant

  const diff = Math.abs(dom1 - dom2);

  if (diff >= 30) {
    const leader = dom1 > dom2 ? "Partner 1" : "Partner 2";
    return {
      label: "상보적 역학",
      labelEn: "Complementary Dynamic",
      description: `${leader === "Partner 1" ? "파트너 1" : "파트너 2"}이(가) 리드하고 상대가 따르는 자연스러운 D/s 역학이 형성됩니다. ${bdsm1.dsLabel}과 ${bdsm2.dsLabel}의 조합은 서로의 성향을 완벽하게 충족시킵니다.`,
      descriptionEn: `A natural D/s dynamic where ${leader} leads and the other follows. The combination of ${bdsm1.dsLabel} and ${bdsm2.dsLabel} perfectly fulfills each other's tendencies.`,
      balance,
    };
  }

  if (diff >= 15) {
    return {
      label: "유연한 역학",
      labelEn: "Flexible Dynamic",
      description: `주도권이 약간의 기울기를 가지고 있어, 상황에 따라 자연스럽게 역할이 전환될 수 있습니다. ${bdsm1.dsLabel}과 ${bdsm2.dsLabel}의 조합은 다양한 플레이를 가능하게 합니다.`,
      descriptionEn: `A slight tilt in power dynamics allows natural role switching. The ${bdsm1.dsLabel} and ${bdsm2.dsLabel} combination enables diverse play styles.`,
      balance,
    };
  }

  return {
    label: "균형적 역학",
    labelEn: "Balanced Dynamic",
    description: `두 사람의 주도성이 비슷하여 서로 번갈아 리드하는 스위치 역학이 적합합니다. 누가 이끌지 자연스럽게 결정되는 유동적인 관계를 즐기세요.`,
    descriptionEn: `Similar dominance levels make a switch dynamic ideal. Enjoy a fluid relationship where leadership naturally alternates between you.`,
    balance,
  };
}

// ─── Style Comparison ───

function compareStyles(
  bdsm1: BdsmProfile,
  bdsm2: BdsmProfile
): StyleComparison {
  const intensityDiff = Math.abs(bdsm1.intensity - bdsm2.intensity);

  // D/s balance description
  let dsBalance: string;
  let dsBalanceEn: string;
  const dsDiff = Math.abs(bdsm1.dsSpectrum - bdsm2.dsSpectrum);

  if (dsDiff >= 30) {
    dsBalance = "한 명이 확실히 주도하고 상대가 따르는 이상적인 조합";
    dsBalanceEn = "An ideal pairing where one clearly leads and the other follows";
  } else if (dsDiff >= 15) {
    dsBalance = "약간의 차이가 있어 유연한 역할 교환이 가능한 조합";
    dsBalanceEn = "A slight difference enabling flexible role exchange";
  } else {
    dsBalance = "비슷한 위치에서 서로 도전하고 성장하는 조합";
    dsBalanceEn = "A pairing that challenges and grows from similar positions";
  }

  // Role match
  let roleMatch: string;
  let roleMatchEn: string;

  if (bdsm1.role === bdsm2.role) {
    roleMatch = `두 사람 모두 ${bdsm1.role} 성향으로, 공감대가 높지만 역할 분담이 필요할 수 있습니다`;
    roleMatchEn = `Both share ${bdsm1.roleEn} tendencies — high empathy but may need role negotiation`;
  } else {
    roleMatch = `${bdsm1.role}과(와) ${bdsm2.role}의 독특한 조합이 다채로운 경험을 만듭니다`;
    roleMatchEn = `The unique combination of ${bdsm1.roleEn} and ${bdsm2.roleEn} creates diverse experiences`;
  }

  // Overall style
  const avgIntensity = (bdsm1.intensity + bdsm2.intensity) / 2;
  let overallStyle: string;
  let overallStyleEn: string;

  if (avgIntensity >= 70) {
    overallStyle = "강렬하고 모험적인 커플 — 경계를 함께 탐험합니다";
    overallStyleEn = "An intense, adventurous couple — exploring boundaries together";
  } else if (avgIntensity >= 45) {
    overallStyle = "균형 잡힌 커플 — 부드러움과 강렬함을 자유롭게 넘나듭니다";
    overallStyleEn = "A balanced couple — freely moving between gentle and intense";
  } else {
    overallStyle = "부드럽고 감성적인 커플 — 감정의 깊이로 쾌락을 만듭니다";
    overallStyleEn = "A gentle, emotional couple — creating pleasure through emotional depth";
  }

  return {
    dsBalance,
    dsBalanceEn,
    intensityDiff,
    roleMatch,
    roleMatchEn,
    overallStyle,
    overallStyleEn,
  };
}

// ─── Main calculation ───

export function calculateCompatibility(
  scores1: DimensionScores,
  bdsm1: BdsmProfile,
  scores2: DimensionScores,
  bdsm2: BdsmProfile
): CoupleCompatibility {
  // 1. Dimension comparisons
  const dimComparisons: DimensionComparison[] = dimensions.map((dim) => {
    const s1 = scores1[dim.key] ?? 50;
    const s2 = scores2[dim.key] ?? 50;
    const diff = Math.abs(s1 - s2);
    const compat = calcDimensionCompat(dim.key, s1, s2);
    const type = getComparisonType(dim.key, compat);
    const insightPair = getDimensionInsight(dim.key, s1, s2, diff, type);

    return {
      key: dim.key,
      name: dim.name,
      nameEn: dim.nameEn,
      score1: s1,
      score2: s2,
      diff,
      compatibility: compat,
      type,
      insight: insightPair.ko,
      insightEn: insightPair.en,
    };
  });

  // 2. Overall score (weighted average)
  const weights: Record<string, number> = {
    dominance: 1.3,
    emotion: 1.2,
    adventure: 0.9,
    sensory: 1.0,
    atmosphere: 0.8,
    communication: 1.1,
    intimacy: 1.2,
    fantasy: 0.9,
  };
  let weightedSum = 0;
  let totalWeight = 0;
  for (const dc of dimComparisons) {
    const w = weights[dc.key] ?? 1;
    weightedSum += dc.compatibility * w;
    totalWeight += w;
  }
  const overallScore = Math.round(weightedSum / totalWeight);

  // 3. Strength & growth areas
  const sorted = [...dimComparisons].sort(
    (a, b) => b.compatibility - a.compatibility
  );
  const strengthAreas = sorted
    .filter((d) => d.compatibility >= 65)
    .slice(0, 3)
    .map((d) => d.name);
  const strengthAreasEn = sorted
    .filter((d) => d.compatibility >= 65)
    .slice(0, 3)
    .map((d) => d.nameEn);
  const growthAreas = sorted
    .filter((d) => d.compatibility < 55)
    .slice(-3)
    .map((d) => d.name);
  const growthAreasEn = sorted
    .filter((d) => d.compatibility < 55)
    .slice(-3)
    .map((d) => d.nameEn);

  // 4. Dynamic analysis
  const dynamicAnalysis = analyzeDynamic(scores1, bdsm1, scores2, bdsm2);

  // 5. Recommended plays
  const scoredPlays = playPool
    .map((play) => ({
      ...play,
      score: scorePlayRelevance(play, scores1, scores2),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  // 6. Style comparison
  const styleComparison = compareStyles(bdsm1, bdsm2);

  return {
    overallScore,
    dimensionComparison: dimComparisons,
    strengthAreas,
    strengthAreasEn,
    growthAreas,
    growthAreasEn,
    dynamicAnalysis,
    recommendedPlays: scoredPlays,
    styleComparison,
  };
}
