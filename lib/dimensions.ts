export interface Dimension {
  key: string;
  name: string;
  nameEn: string;
  description: string;
  lowLabel: string;
  highLabel: string;
  symbol: string;
}

export const dimensions: Dimension[] = [
  {
    key: "dominance",
    name: "주도성",
    nameEn: "Dominance",
    description: "관계에서의 주도/수용 성향",
    lowLabel: "수용적",
    highLabel: "주도적",
    symbol: "I",
  },
  {
    key: "emotion",
    name: "감성적 연결",
    nameEn: "Emotion",
    description: "감정적 교감의 중요도",
    lowLabel: "독립적",
    highLabel: "교감 중시",
    symbol: "II",
  },
  {
    key: "adventure",
    name: "모험성",
    nameEn: "Adventure",
    description: "새로운 경험에 대한 개방성",
    lowLabel: "안정 추구",
    highLabel: "탐험 추구",
    symbol: "III",
  },
  {
    key: "sensory",
    name: "감각 선호",
    nameEn: "Sensory",
    description: "감각적 자극의 선호도",
    lowLabel: "정서적",
    highLabel: "감각적",
    symbol: "IV",
  },
  {
    key: "atmosphere",
    name: "분위기",
    nameEn: "Atmosphere",
    description: "상황/환경의 중요도",
    lowLabel: "즉흥적",
    highLabel: "분위기 중시",
    symbol: "V",
  },
  {
    key: "communication",
    name: "커뮤니케이션",
    nameEn: "Communication",
    description: "소통 방식 선호",
    lowLabel: "비언어적",
    highLabel: "언어적",
    symbol: "VI",
  },
  {
    key: "intimacy",
    name: "친밀감",
    nameEn: "Intimacy",
    description: "친밀도 깊이 선호",
    lowLabel: "가벼운",
    highLabel: "깊은",
    symbol: "VII",
  },
  {
    key: "fantasy",
    name: "판타지",
    nameEn: "Fantasy",
    description: "상상력/역할극 선호",
    lowLabel: "현실적",
    highLabel: "상상력 풍부",
    symbol: "VIII",
  },
];

export const dimensionMap = Object.fromEntries(
  dimensions.map((d) => [d.key, d])
);
