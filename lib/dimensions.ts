export interface Dimension {
  key: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  lowLabel: string;
  lowLabelEn: string;
  highLabel: string;
  highLabelEn: string;
  symbol: string;
}

export const dimensions: Dimension[] = [
  {
    key: "dominance",
    name: "주도성",
    nameEn: "Dominance",
    description: "관계에서의 주도/수용 성향",
    descriptionEn: "Tendency to lead or follow in relationships",
    lowLabel: "수용적",
    lowLabelEn: "Receptive",
    highLabel: "주도적",
    highLabelEn: "Dominant",
    symbol: "I",
  },
  {
    key: "emotion",
    name: "감성적 연결",
    nameEn: "Emotion",
    description: "감정적 교감의 중요도",
    descriptionEn: "Importance of emotional connection",
    lowLabel: "독립적",
    lowLabelEn: "Independent",
    highLabel: "교감 중시",
    highLabelEn: "Connection-driven",
    symbol: "II",
  },
  {
    key: "adventure",
    name: "모험성",
    nameEn: "Adventure",
    description: "새로운 경험에 대한 개방성",
    descriptionEn: "Openness to new experiences",
    lowLabel: "안정 추구",
    lowLabelEn: "Stability-seeking",
    highLabel: "탐험 추구",
    highLabelEn: "Thrill-seeking",
    symbol: "III",
  },
  {
    key: "sensory",
    name: "감각 선호",
    nameEn: "Sensory",
    description: "감각적 자극의 선호도",
    descriptionEn: "Preference for sensory stimulation",
    lowLabel: "정서적",
    lowLabelEn: "Emotional",
    highLabel: "감각적",
    highLabelEn: "Sensual",
    symbol: "IV",
  },
  {
    key: "atmosphere",
    name: "분위기",
    nameEn: "Atmosphere",
    description: "상황/환경의 중요도",
    descriptionEn: "Importance of setting and environment",
    lowLabel: "즉흥적",
    lowLabelEn: "Spontaneous",
    highLabel: "분위기 중시",
    highLabelEn: "Mood-driven",
    symbol: "V",
  },
  {
    key: "communication",
    name: "커뮤니케이션",
    nameEn: "Communication",
    description: "소통 방식 선호",
    descriptionEn: "Preferred communication style",
    lowLabel: "비언어적",
    lowLabelEn: "Non-verbal",
    highLabel: "언어적",
    highLabelEn: "Verbal",
    symbol: "VI",
  },
  {
    key: "intimacy",
    name: "친밀감",
    nameEn: "Intimacy",
    description: "친밀도 깊이 선호",
    descriptionEn: "Preferred depth of closeness",
    lowLabel: "가벼운",
    lowLabelEn: "Casual",
    highLabel: "깊은",
    highLabelEn: "Deep",
    symbol: "VII",
  },
  {
    key: "fantasy",
    name: "판타지",
    nameEn: "Fantasy",
    description: "상상력/역할극 선호",
    descriptionEn: "Preference for imagination and roleplay",
    lowLabel: "현실적",
    lowLabelEn: "Realistic",
    highLabel: "상상력 풍부",
    highLabelEn: "Imaginative",
    symbol: "VIII",
  },
];

export const dimensionMap = Object.fromEntries(
  dimensions.map((d) => [d.key, d])
);
