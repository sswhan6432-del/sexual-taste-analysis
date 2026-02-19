import { archetypes, type Archetype, type ArchetypeProfile } from "./types";
import { dimensions } from "./dimensions";

export type DimensionScores = Record<string, number>;

interface DimensionAccumulator {
  total: number;
  count: number;
}

/**
 * Calculates dimension scores from quiz answers
 */
export function calculateDimensionScores(
  answers: Record<string, Record<string, number>>
): DimensionScores {
  const accumulators: Record<string, DimensionAccumulator> = {};

  for (const dim of dimensions) {
    accumulators[dim.key] = { total: 0, count: 0 };
  }

  for (const questionId in answers) {
    const dimensionContributions = answers[questionId];
    for (const dimKey in dimensionContributions) {
      if (accumulators[dimKey]) {
        accumulators[dimKey].total += dimensionContributions[dimKey];
        accumulators[dimKey].count += 1;
      }
    }
  }

  const scores: DimensionScores = {};
  for (const dim of dimensions) {
    const acc = accumulators[dim.key];
    scores[dim.key] = acc.count > 0 ? Math.round(acc.total / acc.count) : 50;
  }

  return scores;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Euclidean distance normalized to 0-1 range (0 = identical, 1 = maximum distance)
 */
function normalizedEuclidean(a: number[], b: number[]): number {
  let sumSq = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sumSq += diff * diff;
  }
  // Max possible distance in 8D space with 0-100 range = sqrt(8 * 100^2) ≈ 283
  const maxDist = Math.sqrt(a.length * 100 * 100);
  return Math.sqrt(sumSq) / maxDist;
}

/**
 * Pearson correlation: cosine similarity on mean-centered vectors.
 * Compares profile SHAPE (pattern of deviations) rather than raw direction.
 * This prevents flat/uniform profiles from matching everything.
 * Returns 0-1 (shifted from -1~+1 range).
 */
function pearsonCorrelation(a: number[], b: number[]): number {
  const n = a.length;
  const meanA = a.reduce((s, v) => s + v, 0) / n;
  const meanB = b.reduce((s, v) => s + v, 0) / n;

  let num = 0, denomA = 0, denomB = 0;
  for (let i = 0; i < n; i++) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    num += da * db;
    denomA += da * da;
    denomB += db * db;
  }

  const denom = Math.sqrt(denomA) * Math.sqrt(denomB);
  if (denom === 0) return 0.5; // flat profile = no correlation
  const r = num / denom; // -1 to +1
  return (r + 1) / 2; // normalize to 0-1
}

/**
 * Variance of a vector (spread from mean).
 */
function vectorVariance(v: number[]): number {
  const mean = v.reduce((s, x) => s + x, 0) / v.length;
  return v.reduce((s, x) => s + (x - mean) ** 2, 0) / v.length;
}

/**
 * Hybrid similarity v2: three-metric combination that prevents
 * the "harmonious partner" over-matching problem.
 *
 * 1. Pearson correlation (40%) — compares profile shape/pattern
 * 2. Inverse Euclidean (35%) — compares absolute distance
 * 3. Variance match penalty — penalizes when user has distinctive
 *    scores but archetype is flat (or vice versa)
 */
function hybridSimilarity(a: number[], b: number[]): number {
  const pearson = pearsonCorrelation(a, b);
  const eucInverse = 1 - normalizedEuclidean(a, b);

  let sim = pearson * 0.40 + eucInverse * 0.60;

  // Variance mismatch penalty:
  // If user has high variance (distinctive profile) but archetype
  // has low variance (flat profile like harmonious-partner), reduce match
  const varA = vectorVariance(a);
  const varB = vectorVariance(b);
  const varRatio = Math.min(varA, varB) / Math.max(varA, varB, 1);

  // Apply penalty: if variance ratio is low (mismatch), reduce similarity
  // varRatio near 1 = similar spread = no penalty
  // varRatio near 0 = very different spread = up to 15% penalty
  const variancePenalty = (1 - varRatio) * 0.15;
  sim -= variancePenalty;

  return Math.max(sim, 0);
}

function scoresToVector(scores: DimensionScores): number[] {
  const raw = dimensions.map((d) => scores[d.key] ?? 50);

  // Amplify subtle differences when user scores are clustered near center.
  // This helps differentiate users who answered mostly "middle" options
  // but still have meaningful relative differences between dimensions.
  const mean = raw.reduce((s, v) => s + v, 0) / raw.length;
  const variance = raw.reduce((s, v) => s + (v - mean) ** 2, 0) / raw.length;
  const stdDev = Math.sqrt(variance);

  // If std dev is low (< 12), amplify deviations by stretching from mean
  if (stdDev > 0 && stdDev < 12) {
    const factor = 12 / stdDev; // amplification factor (capped naturally)
    return raw.map((v) => {
      const amplified = mean + (v - mean) * Math.min(factor, 2.5);
      return Math.max(0, Math.min(100, amplified));
    });
  }

  return raw;
}

function profileToVector(profile: ArchetypeProfile): number[] {
  return dimensions.map(
    (d) => profile[d.key as keyof ArchetypeProfile] ?? 50
  );
}

export interface AnalysisResult {
  primaryType: Archetype;
  primarySimilarity: number;
  secondaryType: Archetype;
  secondarySimilarity: number;
  top3: { archetype: Archetype; similarity: number; percentage: number }[];
  allSimilarities: { archetype: Archetype; similarity: number }[];
  traitTags: string[];
  dimensionInsights: Record<string, string>;
  dominantDimensions: string[];
  recessiveDimensions: string[];
}

/**
 * Full analysis with primary/secondary types, traits, and insights
 */
export function analyzeResults(scores: DimensionScores): AnalysisResult {
  const userVector = scoresToVector(scores);

  const similarities = archetypes.map((archetype) => ({
    archetype,
    similarity: hybridSimilarity(userVector, profileToVector(archetype.profile)),
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  // Top 3 with percentage normalization
  const top3Total =
    similarities[0].similarity +
    similarities[1].similarity +
    similarities[2].similarity;
  const top3 = similarities.slice(0, 3).map((s) => ({
    ...s,
    percentage: Math.round((s.similarity / top3Total) * 100),
  }));

  // Trait tags based on dimension scores
  const traitTags = generateTraitTags(scores);

  // Dimension insights
  const dimensionInsights = generateDimensionInsights(scores);

  // Dominant & recessive dimensions
  const sortedDims = dimensions
    .map((d) => ({ key: d.key, score: scores[d.key] ?? 50 }))
    .sort((a, b) => b.score - a.score);

  const dominantDimensions = sortedDims
    .filter((d) => d.score >= 70)
    .map((d) => d.key);
  const recessiveDimensions = sortedDims
    .filter((d) => d.score <= 30)
    .map((d) => d.key);

  return {
    primaryType: similarities[0].archetype,
    primarySimilarity: similarities[0].similarity,
    secondaryType: similarities[1].archetype,
    secondarySimilarity: similarities[1].similarity,
    top3,
    allSimilarities: similarities,
    traitTags,
    dimensionInsights,
    dominantDimensions,
    recessiveDimensions,
  };
}

// Legacy compatibility
export function findMatchingArchetype(scores: DimensionScores) {
  const result = analyzeResults(scores);
  return {
    archetype: result.primaryType,
    similarity: result.primarySimilarity,
    allSimilarities: result.allSimilarities,
  };
}

function generateTraitTags(scores: DimensionScores): string[] {
  const tags: string[] = [];

  const s = (key: string) => scores[key] ?? 50;

  // Dominance
  if (s("dominance") >= 75) tags.push("주도적");
  else if (s("dominance") <= 25) tags.push("수용적");

  // Emotion
  if (s("emotion") >= 75) tags.push("감성적");
  else if (s("emotion") <= 25) tags.push("독립적");

  // Adventure
  if (s("adventure") >= 75) tags.push("모험가");
  else if (s("adventure") <= 25) tags.push("안정 추구");

  // Sensory
  if (s("sensory") >= 75) tags.push("감각주의");
  else if (s("sensory") <= 25) tags.push("정서 중심");

  // Atmosphere
  if (s("atmosphere") >= 75) tags.push("분위기 메이커");
  else if (s("atmosphere") <= 25) tags.push("즉흥파");

  // Communication
  if (s("communication") >= 75) tags.push("화술가");
  else if (s("communication") <= 25) tags.push("비언어적");

  // Intimacy
  if (s("intimacy") >= 75) tags.push("깊은 관계 지향");
  else if (s("intimacy") <= 25) tags.push("가벼운 관계 지향");

  // Fantasy
  if (s("fantasy") >= 75) tags.push("몽상가");
  else if (s("fantasy") <= 25) tags.push("현실주의");

  // Combination tags
  if (s("dominance") >= 70 && s("emotion") >= 70) tags.push("카리스마 + 따뜻함");
  if (s("sensory") >= 70 && s("atmosphere") >= 70) tags.push("미학적 감각");
  if (s("fantasy") >= 70 && s("adventure") >= 70) tags.push("탐험적 상상력");
  if (s("intimacy") >= 70 && s("communication") >= 70) tags.push("소울메이트 추구");
  if (s("dominance") <= 30 && s("emotion") >= 70) tags.push("헌신적 수호자");
  if (s("adventure") >= 70 && s("intimacy") <= 30) tags.push("자유로운 방랑자");
  if (s("fantasy") >= 70 && s("communication") <= 30) tags.push("내면의 세계");
  if (s("sensory") >= 70 && s("adventure") >= 70) tags.push("감각의 탐닉자");

  return tags;
}

export const traitTagEnMap: Record<string, string> = {
  "주도적": "Dominant",
  "수용적": "Receptive",
  "감성적": "Emotional",
  "독립적": "Independent",
  "모험가": "Adventurer",
  "안정 추구": "Stability-seeker",
  "감각주의": "Sensualist",
  "정서 중심": "Emotion-centered",
  "분위기 메이커": "Mood Maker",
  "즉흥파": "Spontaneous",
  "화술가": "Smooth Talker",
  "비언어적": "Non-verbal",
  "깊은 관계 지향": "Deep Bond Seeker",
  "가벼운 관계 지향": "Casual Bond Seeker",
  "몽상가": "Dreamer",
  "현실주의": "Realist",
  "카리스마 + 따뜻함": "Charisma + Warmth",
  "미학적 감각": "Aesthetic Sense",
  "탐험적 상상력": "Exploratory Imagination",
  "소울메이트 추구": "Soulmate Seeker",
  "헌신적 수호자": "Devoted Guardian",
  "자유로운 방랑자": "Free Wanderer",
  "내면의 세계": "Inner World",
  "감각의 탐닉자": "Sensory Devotee",
};

const dimensionInsightMap: Record<string, { low: string; mid: string; high: string }> = {
  dominance: {
    low: "당신은 상대에게 이끌릴 때 가장 편안합니다. 누군가 방향을 제시하고 이끌어주는 순간, 온몸의 긴장이 풀리며 깊은 안도감이 시작됩니다. 수용은 약함이 아닌, 신뢰의 가장 깊은 표현입니다.",
    mid: "당신은 관계에서의 주도권을 자유롭게 넘나듭니다. 때로는 이끌고, 때로는 따르며 — 이 유동적인 역할 교환 자체가 당신에게는 가장 흥미로운 역동입니다.",
    high: "당신은 이끌 때 가장 에너지가 넘칩니다. 방향을 결정하고, 속도를 조율하고, 전체적인 흐름을 설계하는 것 — 그 리더십이 당신의 관계 에너지의 핵심 연료입니다.",
  },
  emotion: {
    low: "당신은 감정과 독립적으로 연결될 수 있는 사람입니다. 현재의 순간 자체에 집중하며, 순수한 현재 경험으로 충분한 만족을 느낍니다. 깊은 유대 없이도 의미 있는 순간을 만들 줄 아는 현실주의자입니다.",
    mid: "당신은 감정과 현재의 연결 사이의 황금비율을 알고 있습니다. 마음이 통하면 더 깊어지지만, 때로는 순수한 현재의 끌림만으로도 충분히 즐길 줄 아는 유연한 성향입니다.",
    high: "당신에게 진정한 교감은 감정의 연장선입니다. 마음이 열리지 않으면 몸도 열리지 않으며, 사랑하는 사람과의 깊은 연결 속에서 한 번의 터치가 천 번의 기교보다 강렬합니다. 감정이 깊을수록 연결도 깊어집니다.",
  },
  adventure: {
    low: "당신은 검증된 깊이를 아는 사람입니다. 매번 새로운 방식보다 익숙한 방식을 완벽하게 마스터하는 것이 더 만족스럽습니다. 안정감 속에서 디테일을 더해가는 것이 당신의 방식입니다.",
    mid: "당신은 가끔은 새로운 것을 시도하되, 너무 과하지 않은 적당한 모험을 즐깁니다. '한 번 해볼까?'라는 제안에 열려있으면서도 자신의 한계를 명확히 아는 균형 잡힌 탐험가입니다.",
    high: "당신은 '같은 것의 반복'에서 설렘을 느끼지 못합니다. 새로운 장소, 새로운 방식, 해본 적 없는 시도 — 미지의 것을 향한 갈증이 당신의 관계 에너지를 끊임없이 충전합니다. 루틴은 당신의 적입니다.",
  },
  sensory: {
    low: "당신은 피부보다 마음으로 느끼는 사람입니다. 화려한 감각적 자극 없이도, 상대의 눈빛 하나, 숨결 하나에 전율을 느낄 수 있습니다. 감각보다 감정의 깊이가 연결을 결정합니다.",
    mid: "당신은 감각적 자극과 정서적 교감 사이에서 자연스럽게 균형을 잡습니다. 피부의 접촉도, 마음의 연결도 모두 중요한 요소로 — 둘 다 충족될 때 최고의 경험이 만들어집니다.",
    high: "당신의 피부는 수천 개의 안테나입니다. 손끝이 스치는 미세한 접촉, 온도의 차이, 상대의 체취 — 모든 감각 신호가 증폭되어 깊은 연결로 변환됩니다. 당신의 몸은 감동의 수신기입니다.",
  },
  atmosphere: {
    low: "소파 위든, 어디서든 — 장소는 중요하지 않습니다. 설렘이 치솟는 그 순간 그 자리가 당신의 무대가 됩니다. 즉흥적 상황에서 오히려 더 강렬한 에너지를 느낍니다.",
    mid: "좋은 분위기가 있으면 더 좋지만, 없어도 괜찮습니다. 상황에 맞게 즐길 줄 아는 유연함이 있으며, 가끔은 계획된 로맨스를, 가끔은 즉흥적 열정을 즐깁니다.",
    high: "조명을 낮추고, 좋아하는 음악을 틀고, 공간의 감촉까지 — 모든 것이 완벽해야 비로소 마음이 열립니다. 환경 자체가 당신에게는 가장 강력한 촉매이며, 분위기 없는 만남은 영혼 없는 시간입니다.",
  },
  communication: {
    low: "당신은 말 대신 존재로 말합니다. 깊은 눈빛, 손의 온기, 침묵의 울림 — 비언어적 신호가 어떤 말보다 더 솔직하고 깊습니다.",
    mid: "당신은 적절한 순간에 적절한 말을 할 줄 압니다. 때로는 감각적인 속삭임으로, 때로는 깊은 침묵으로 — 상황에 맞는 소통 방식을 자연스럽게 전환합니다.",
    high: "당신에게 말은 가장 강력한 연결 도구입니다. '거기 좋아', '더 해줘', '이렇게 하면 어때?' — 솔직한 표현이 관계의 질을 200% 높이며, 서로의 마음을 말로 나누는 것 자체가 깊은 교감입니다.",
  },
  intimacy: {
    low: "당신은 가볍고 자유로운 연결을 선호합니다. 깊은 유대 없이도 충분히 빛날 수 있으며, 자유로운 관계에서 가장 솔직한 자신을 보여줍니다.",
    mid: "적당한 친밀감이 있으면 좋지만, 영혼까지 나눠야 할 필요는 없습니다. 편안하면서도 적당한 긴장감이 유지되는 관계에서 가장 자연스러운 에너지를 느낍니다.",
    high: "당신은 교감 후 서로의 숨소리가 잦아들 때까지 안고 있는 그 순간을 위해 사랑합니다. 영혼까지 나누는 깊은 친밀감이 없으면, 아무리 뜨거운 순간도 공허합니다.",
  },
  fantasy: {
    low: "당신은 지금 여기, 실제로 일어나는 것에 집중합니다. 복잡한 시나리오 없이도 상대의 온기와 호흡만으로 충분히 충족됩니다. 현실의 연결이 어떤 상상보다 강렬합니다.",
    mid: "가끔은 머릿속으로 풍부한 시나리오를 그려보지만, 그것을 실행에 옮기는 것은 별개의 문제입니다. 적당한 상상은 관계에 양념을 더하되, 현실의 기반을 잃지 않습니다.",
    high: "당신의 머릿속은 24시간 극장입니다. 누구와, 어디서, 어떤 상황에서 — 현실에서는 말하지 못하는 시나리오들이 정교하게 재생되고 있습니다. 이 풍부한 상상력이 현실로 옮겨질 때, 파트너는 잊지 못할 순간을 경험합니다.",
  },
};

export const dimensionInsightMapEn: Record<string, { low: string; mid: string; high: string }> = {
  dominance: {
    low: "You feel most at ease when someone else leads. The moment someone takes charge and guides you, all tension dissolves and a deep sense of ease begins. Receptiveness is not weakness — it's the deepest expression of trust.",
    mid: "You freely navigate the power balance in relationships. Sometimes leading, sometimes following — this fluid exchange of roles is your most engaging dynamic.",
    high: "You're most energized when leading. Setting the direction, controlling the pace, deciding when to pause and when to begin — that sense of leadership is the core fuel of your relational energy.",
  },
  emotion: {
    low: "You can connect independently of deep emotion. You focus on the present moment itself, and pure present experience gives you full satisfaction. A realist who knows that meaningful moments can exist without deep emotional bonds.",
    mid: "You know the golden ratio between emotion and present connection. It's richer with a heart bond, but sometimes pure present attraction is enough — a flexible approach to both.",
    high: "For you, true connection is an extension of emotion. If your heart isn't open, your body won't open either. A single touch from someone you love is more powerful than a thousand techniques. The deeper the emotion, the deeper the connection.",
  },
  adventure: {
    low: "You appreciate the depth of proven connection. Perfecting a familiar approach is more satisfying than something new every time. Your way is adding detail within the comfort of stability.",
    mid: "You occasionally try new things without going too far. Open to 'Shall we try this?' while clearly knowing your limits — a balanced explorer.",
    high: "Repetition holds no excitement for you. New places, new methods, untried experiences — your thirst for the unknown constantly recharges your relational energy. Routine is your enemy.",
  },
  sensory: {
    low: "You feel with your heart more than your skin. Without elaborate sensory stimulation, a single glance or breath from your partner can send shivers. Emotional depth determines connection, not sensation.",
    mid: "You naturally balance sensory stimulation and emotional connection. Both touch and heart matter — the best experiences emerge when both are fulfilled.",
    high: "Your skin is an array of thousands of antennas. The subtlest brush of fingertips, temperature differences, your partner's presence — every sensory signal is amplified and converted into deep connection. Your body is a receiver of feeling.",
  },
  atmosphere: {
    low: "On the couch, anywhere — location doesn't matter. Where connection sparks becomes your stage. You feel even more intense energy in spontaneous situations.",
    mid: "Nice ambiance is a plus, but not a requirement. You're flexible enough to enjoy the moment, sometimes savoring planned romance, sometimes spontaneous energy.",
    high: "Dim the lights, play your favorite music, feel the space — everything must be perfect before your heart opens. The environment itself is your most powerful catalyst, and connection without atmosphere feels hollow.",
  },
  communication: {
    low: "You speak through presence instead of words. Deep eye contact, the warmth of a hand, the resonance of silence — non-verbal signals speak more honestly and deeply than any words.",
    mid: "You know when to say the right thing at the right moment. Sometimes a sensory whisper, sometimes deep silence — you naturally switch communication styles to match the situation.",
    high: "Words are your most powerful connection tool. 'Right there,' 'More,' 'How about this?' — honest expression boosts relationship quality by 200%, and sharing what's on your mind through words is connection itself.",
  },
  intimacy: {
    low: "You prefer light, free connections. You can shine fully without deep bonds, and your most honest self emerges in relationships with freedom.",
    mid: "Some closeness is nice, but you don't need to share souls. You feel the most natural energy in a relationship that's comfortable yet maintains a healthy tension.",
    high: "You connect for that moment after — holding each other until breathing slows. Without soul-sharing intimacy, even the most passionate moment feels hollow.",
  },
  fantasy: {
    low: "You focus on the here and now — what's actually happening. Without elaborate scenarios, your partner's warmth and presence are enough. Real connection outweighs any fantasy.",
    mid: "You sometimes sketch rich scenarios in your mind, but acting on them is another matter. Moderate imagination adds depth to your relationship without losing the foundation of reality.",
    high: "Your mind is a 24-hour theater. With whom, where, in what situation — scenarios play in exquisite detail. When this rich imagination transfers to reality, your partner experiences an unforgettable moment.",
  },
};

// ─── Relationship Spectrum Analysis ───

export interface BdsmProfile {
  /** Dom ↔ Sub spectrum: 0 = pure receptive, 100 = pure dominant */
  dsSpectrum: number;
  dsLabel: string;
  dsDescription: string;
  dsDescriptionEn: string;
  /** Intensity: 0 = soft, 100 = intense */
  intensity: number;
  intensityLabel: string;
  /** Primary relationship role */
  role: string;
  roleEn: string;
  roleDescription: string;
  roleDescriptionEn: string;
  /** Secondary tendencies */
  tendencies: string[];
  /** One-liner for sharing */
  headline: string;
  headlineEn: string;
}

const bdsmRoles: {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  condition: (s: (k: string) => number) => boolean;
  priority: number;
}[] = [
  {
    id: "gentle-dom",
    name: "젠틀 도미넌트",
    nameEn: "Gentle Dominant",
    description: "강하게 이끌 때도 눈빛은 '괜찮아?'를 묻고 있습니다. 단단하게 리드하되 한 번도 파트너를 불안하게 만들지 않는 — 가장 강하면서도 가장 따뜻한 리더입니다.",
    descriptionEn: "Even when you take strong control, your eyes ask 'Are you okay?' You lead firmly yet never make your partner feel unsafe — the most powerful yet warmest kind of leader.",
    condition: (s) => s("dominance") >= 65 && s("emotion") >= 55,
    priority: 10,
  },
  {
    id: "strict-dom",
    name: "스트릭트 도미넌트",
    nameEn: "Strict Dominant",
    description: "'내 방식대로 해'라는 한마디에 협상의 여지는 없습니다. 명확한 규칙과 체계 안에서 파트너를 이끄는 것을 즐기며, 그 단호함 속에서 파트너는 역설적으로 가장 깊은 해방감을 느낍니다.",
    descriptionEn: "'My way' — there's no room for negotiation. You enjoy guiding your partner within clear rules and structure, and paradoxically, your firmness gives them the deepest sense of liberation.",
    condition: (s) => s("dominance") >= 70 && s("emotion") < 50 && s("communication") >= 55,
    priority: 9,
  },
  {
    id: "sensual-dom",
    name: "센슈얼 도미넌트",
    nameEn: "Sensual Dominant",
    description: "강압 대신 유혹을, 명령 대신 속삭임을 무기로 씁니다. 파트너의 감각을 느리게 깨우는 손끝 하나로 마음 전체를 이끌며, 감각의 울림으로 상대를 녹여버립니다.",
    descriptionEn: "You wield seduction instead of force, whispers instead of commands. A single fingertip slowly awakening your partner's senses guides their whole being, melting them through sensory resonance.",
    condition: (s) => s("dominance") >= 60 && s("sensory") >= 65,
    priority: 8,
  },
  {
    id: "playful-switch",
    name: "플레이풀 스위치",
    nameEn: "Playful Switch",
    description: "방금까지 이끌었다가 다음 순간 따르는 것을 즐깁니다. '오늘은 네가 이끌어봐'라는 말 한마디로 판을 뒤집는 유연함이 매력이며, 예측 불가능한 역동이 당신과의 시간을 지루할 틈 없게 만듭니다.",
    descriptionEn: "You enjoy leading one moment and following the next. Your charm is the flexibility to flip the script with a single 'Your turn to lead,' making time with you endlessly unpredictable.",
    condition: (s) => s("dominance") >= 35 && s("dominance") <= 65 && s("adventure") >= 55,
    priority: 7,
  },
  {
    id: "romantic-sub",
    name: "로맨틱 서브미시브",
    nameEn: "Romantic Submissive",
    description: "사랑하는 사람에게만 온전히 마음을 맡길 수 있습니다. 신뢰라는 이름의 안전장치가 있어야만 비로소 눈을 감고 마음을 내려놓을 수 있는 — 감정이 곧 열쇠인 유형입니다.",
    descriptionEn: "You can only fully open your heart to someone you love. Trust is your safety net — only then can you close your eyes and let go. Emotion is the key to your openness.",
    condition: (s) => s("dominance") <= 40 && s("emotion") >= 60,
    priority: 8,
  },
  {
    id: "brat",
    name: "브랫",
    nameEn: "Brat",
    description: "'시키는 대로 해'라고요? 그 말이 당신을 더 도전하게 만듭니다. 일부러 말을 안 듣고, 일부러 도발하고, 상대가 '진짜' 에너지를 보여줄 때까지 밀어붙입니다. 길들여지는 과정 자체가 당신에게 설레는 경험입니다.",
    descriptionEn: "'Do as you're told'? That only makes you push harder. You deliberately resist and provoke until your partner shows their 'real' energy. The process of being tamed IS your thrill.",
    condition: (s) => s("dominance") >= 35 && s("dominance") <= 60 && s("adventure") >= 55 && s("communication") >= 50,
    priority: 7,
  },
  {
    id: "service-sub",
    name: "서비스 서브미시브",
    nameEn: "Service Submissive",
    description: "파트너의 만족이 당신의 가장 큰 보상입니다. 상대의 모든 필요를 읽고 충족시키는 것에서 깊은 만족감을 느끼며, '잘했어'라는 한마디에 온몸이 반응합니다.",
    descriptionEn: "Your partner's joy is your greatest reward. Reading and fulfilling their every need gives you deep fulfillment, and a simple 'Well done' makes your whole being respond.",
    condition: (s) => s("dominance") <= 35 && s("intimacy") >= 60 && s("emotion") >= 50,
    priority: 8,
  },
  {
    id: "fantasy-explorer",
    name: "판타지 익스플로러",
    nameEn: "Fantasy Explorer",
    description: "오늘은 선생님과 학생, 내일은 전혀 다른 두 사람 — 현실에서 불가능한 시나리오를 상상 속에서 실현시킵니다. 역할극의 몰입도가 높을수록 연결도 깊어집니다.",
    descriptionEn: "Teacher and student today, entirely different people tomorrow — you bring impossible scenarios to life through imagination. The deeper you immerse in roleplay, the deeper the connection.",
    condition: (s) => s("fantasy") >= 65 && s("adventure") >= 55,
    priority: 6,
  },
  {
    id: "sensory-devotee",
    name: "감각 탐닉자",
    nameEn: "Sensory Devotee",
    description: "차가움과 따뜻함, 부드러움과 날카로움의 대비 — 피부가 느끼는 모든 자극이 당신의 놀이터입니다. 감각의 경계를 탐험하고, 그 경계에서 전에 없던 감동을 발견합니다.",
    descriptionEn: "Cold and warmth, softness and sharpness — every stimulus your skin can feel is your playground. You explore sensory limits and discover unprecedented depth at those boundaries.",
    condition: (s) => s("sensory") >= 65 && s("adventure") >= 50,
    priority: 6,
  },
  {
    id: "vanilla-plus",
    name: "바닐라 플러스",
    nameEn: "Vanilla Plus",
    description: "극단적인 기교보다 진심 어린 교감의 깊이를 아는 사람입니다. 단순한 눈 맞춤 하나가 이 세상 어떤 특별한 순간보다 뜨거울 수 있다는 것을 증명하는 유형입니다.",
    descriptionEn: "You understand the depth of genuine connection over extreme technique. You prove that simple eye contact can be more electric than any elaborate scenario in the world.",
    condition: () => true,
    priority: 0,
  },
];

export function analyzeBdsm(scores: DimensionScores): BdsmProfile {
  const s = (key: string) => scores[key] ?? 50;

  // D/s spectrum
  const dsSpectrum = s("dominance");
  let dsLabel: string;
  let dsDescription: string;

  let dsDescriptionEn: string;

  if (dsSpectrum >= 68) {
    dsLabel = "Dominant";
    dsDescription = "관계의 주도권을 잡고 방향을 제시하는 것에서 에너지를 얻습니다.";
    dsDescriptionEn = "You draw energy from taking the lead and setting the direction.";
  } else if (dsSpectrum >= 56) {
    dsLabel = "Soft Dominant";
    dsDescription = "부드럽게 이끌되 상대의 반응에 유연하게 대응하는 스타일입니다.";
    dsDescriptionEn = "You lead gently while responding flexibly to your partner's reactions.";
  } else if (dsSpectrum >= 44) {
    dsLabel = "Switch";
    dsDescription = "상황과 파트너에 따라 주도하기도, 따르기도 하는 유연한 성향입니다.";
    dsDescriptionEn = "You flexibly lead or follow depending on the situation and partner.";
  } else if (dsSpectrum >= 32) {
    dsLabel = "Soft Submissive";
    dsDescription = "상대의 리드를 즐기되 자신만의 의사표현도 자연스럽게 합니다.";
    dsDescriptionEn = "You enjoy your partner's lead while naturally expressing your own desires.";
  } else {
    dsLabel = "Submissive";
    dsDescription = "상대에게 주도권을 맡기고 그 흐름에 몰입하는 것에서 깊은 만족을 느낍니다.";
    dsDescriptionEn = "You find deep satisfaction in surrendering control and immersing in the flow.";
  }

  // Intensity
  const intensity = Math.round(
    (s("sensory") * 0.3 + s("adventure") * 0.3 + s("fantasy") * 0.25 + Math.abs(s("dominance") - 50) * 0.15) * 1.1
  );
  const clampedIntensity = Math.min(100, Math.max(0, intensity));

  let intensityLabel: string;
  if (clampedIntensity >= 75) intensityLabel = "Intense";
  else if (clampedIntensity >= 55) intensityLabel = "Moderate";
  else if (clampedIntensity >= 35) intensityLabel = "Mild";
  else intensityLabel = "Soft";

  // Find matching role
  const matched = bdsmRoles
    .filter((r) => r.condition(s))
    .sort((a, b) => b.priority - a.priority);
  const role = matched[0];

  // Secondary tendencies
  const tendencies: string[] = [];
  if (s("fantasy") >= 65) tendencies.push("Role Play");
  if (s("sensory") >= 65 && s("atmosphere") >= 60) tendencies.push("Sensation Play");
  if (s("dominance") >= 65 && s("communication") >= 70) tendencies.push("Power Exchange");
  if (s("intimacy") >= 70 && s("emotion") >= 65) tendencies.push("Aftercare Focus");
  if (s("adventure") >= 70) tendencies.push("Edge Play Curious");
  if (s("atmosphere") >= 70 && s("fantasy") >= 60) tendencies.push("Scene Setting");
  if (s("communication") >= 70 && s("intimacy") >= 65) tendencies.push("Negotiation Oriented");
  if (s("sensory") >= 70 && s("dominance") <= 35) tendencies.push("Sensory Surrender");

  // Headline for sharing
  const headline = generateHeadline(role.id, dsLabel, clampedIntensity);
  const headlineEn = generateHeadlineEn(role.id, dsLabel, clampedIntensity);

  return {
    dsSpectrum,
    dsLabel,
    dsDescription,
    dsDescriptionEn,
    intensity: clampedIntensity,
    intensityLabel,
    role: role.name,
    roleEn: role.nameEn,
    roleDescription: role.description,
    roleDescriptionEn: role.descriptionEn,
    tendencies: tendencies.slice(0, 4),
    headline,
    headlineEn,
  };
}

function generateHeadline(roleId: string, dsLabel: string, intensity: number): string {
  const headlines: Record<string, string> = {
    "gentle-dom": "당신에게 이끌리는 순간, 파트너는 긴장이 아닌 안도를 느낍니다 — 그것이 당신만의 리더십입니다",
    "strict-dom": "당신의 방식을 따르는 것이 왜 이렇게 중독적인지, 파트너도 설명할 수 없습니다",
    "sensual-dom": "당신의 손끝이 지나간 자리마다 전기가 흐릅니다 — 감각으로 이끄는 가장 우아한 방식",
    "playful-switch": "이끌다가 따르고, 다시 이끌고 — 당신과의 시간은 누가 이기는지 모르는 가장 뜨거운 게임입니다",
    "romantic-sub": "당신이 눈을 감고 마음을 맡기는 순간, 그것은 항복이 아닌 가장 용기 있는 사랑의 고백입니다",
    "brat": "말 안 듣는 척, 도망가는 척 — 결국 잡혔을 때의 그 짜릿함이 당신이 진짜 원하는 것입니다",
    "service-sub": "온전히 헌신하는 그 시선 속에서 당신은 지금, 가장 강력한 사랑의 힘을 행사하고 있습니다",
    "fantasy-explorer": "당신의 머릿속 시나리오는 항상 무한합니다 — 그리고 그 상상을 현실로 만들 준비가 되어있습니다",
    "sensory-devotee": "뜨거움과 차가움의 경계, 부드러움과 날카로움의 사이 — 당신은 그 틈에서 깊은 감각을 찾습니다",
    "vanilla-plus": "특별한 기교 없이도, 눈을 마주치는 것만으로 온 몸에 전율을 일으킬 수 있는 사람입니다",
  };
  return headlines[roleId] ?? `${dsLabel} 성향의 ${intensity >= 60 ? "강렬한" : "섬세한"} 매력`;
}

function generateHeadlineEn(roleId: string, dsLabel: string, intensity: number): string {
  const headlines: Record<string, string> = {
    "gentle-dom": "When you take the lead, your partner feels not tension but relief — that is your leadership",
    "strict-dom": "Why is following your way so addictive? Even your partner can't explain it",
    "sensual-dom": "Electricity follows wherever your fingertips travel — the most elegant way to lead through sensation",
    "playful-switch": "Leading then following and back again — time with you is the most thrilling game where no one knows who leads next",
    "romantic-sub": "The moment you close your eyes and open your heart, it's not defeat — it's the bravest confession of love",
    "brat": "Pretending not to listen, provoking on purpose — the thrill of finally being caught is what you truly crave",
    "service-sub": "In giving completely, you're exercising the most powerful form of love",
    "fantasy-explorer": "Your mental screenplay is always vivid and boundless — and you're ready to make those fantasies reality",
    "sensory-devotee": "Between hot and cold, soft and sharp — you find your peak in the space between extremes",
    "vanilla-plus": "Without any special technique, you can send shivers through their entire body with just eye contact",
  };
  return headlines[roleId] ?? `A ${dsLabel} with ${intensity >= 60 ? "intense" : "delicate"} allure`;
}

function generateDimensionInsights(
  scores: DimensionScores
): Record<string, string> {
  const insights: Record<string, string> = {};

  for (const dim of dimensions) {
    const score = scores[dim.key] ?? 50;
    const map = dimensionInsightMap[dim.key];
    if (!map) continue;

    if (score <= 35) insights[dim.key] = map.low;
    else if (score >= 65) insights[dim.key] = map.high;
    else insights[dim.key] = map.mid;
  }

  return insights;
}

export function generateDimensionInsightsEn(
  scores: DimensionScores
): Record<string, string> {
  const insights: Record<string, string> = {};

  for (const dim of dimensions) {
    const score = scores[dim.key] ?? 50;
    const map = dimensionInsightMapEn[dim.key];
    if (!map) continue;

    if (score <= 35) insights[dim.key] = map.low;
    else if (score >= 65) insights[dim.key] = map.high;
    else insights[dim.key] = map.mid;
  }

  return insights;
}
