export type QuestionType = "multiple-choice" | "card-select" | "slider";

export interface Choice {
  id: string;
  text: string;
  textEn?: string;
  /** Score contributions: dimension key → score value (0–100) */
  scores: Record<string, number>;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: string;
  text: string;
  textEn?: string;
  subtitle?: string;
  /** For slider: low-end label */
  lowLabel?: string;
  lowLabelEn?: string;
  /** For slider: high-end label */
  highLabel?: string;
  highLabelEn?: string;
  /** For slider: which dimensions this maps to */
  sliderDimensions?: { key: string; inverted?: boolean }[];
  /** For multiple-choice & card-select */
  choices?: Choice[];
}

/** Adaptive engine metadata per question */
export interface QuestionMeta {
  /** New fine-grained category this question belongs to */
  category: string;
  /** 1=core, 2=deepening, 3=differentiating */
  tier: 1 | 2 | 3;
  /** Primary dimensions this question measures */
  primaryDimensions: string[];
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  dimensions: string[];
}

/** @deprecated Legacy categories - kept for backward compatibility */
export const legacyCategories: Category[] = [
  {
    id: "relationship-role",
    name: "관계 역할",
    nameEn: "Role & Dynamic",
    description: "관계에서 당신이 선호하는 역할과 소통 방식",
    descriptionEn: "Your preferred role and communication style in relationships",
    dimensions: ["dominance", "communication"],
  },
  {
    id: "emotion-atmosphere",
    name: "감성과 분위기",
    nameEn: "Emotion & Mood",
    description: "감정적 교감과 분위기에 대한 당신의 가치관",
    descriptionEn: "How you value emotional connection and atmosphere",
    dimensions: ["emotion", "atmosphere"],
  },
  {
    id: "sensory-experience",
    name: "감각과 체험",
    nameEn: "Sensory & Experience",
    description: "감각적 자극과 새로운 경험에 대한 선호",
    descriptionEn: "Your preferences for sensory stimulation and new experiences",
    dimensions: ["sensory", "adventure"],
  },
  {
    id: "intimacy-trust",
    name: "친밀감과 신뢰",
    nameEn: "Intimacy & Trust",
    description: "관계의 깊이와 신뢰에 대한 당신의 생각",
    descriptionEn: "How you think about depth and trust in relationships",
    dimensions: ["intimacy", "emotion"],
  },
  {
    id: "fantasy-imagination",
    name: "판타지와 상상",
    nameEn: "Fantasy & Imagination",
    description: "상상력과 창의적 경험에 대한 개방성",
    descriptionEn: "Your openness to imagination and creative experiences",
    dimensions: ["fantasy", "adventure"],
  },
  {
    id: "expression-connection",
    name: "소통과 표현",
    nameEn: "Expression & Bond",
    description: "감정을 표현하고 연결하는 당신만의 방식",
    descriptionEn: "Your unique way of expressing feelings and building connection",
    dimensions: ["communication", "intimacy"],
  },
];

export const categories: Category[] = [
  {
    id: "power-dynamics",
    name: "주도와 리드",
    nameEn: "Power & Lead",
    description: "관계에서 누가 이끌고 따르는지, 역할과 주도권에 대한 선호",
    descriptionEn: "Who leads and who follows — your preferences around roles and initiative",
    dimensions: ["dominance"],
  },
  {
    id: "emotional-depth",
    name: "감정의 깊이",
    nameEn: "Emotional Depth",
    description: "감정적 교감, 정서적 연결, 감성의 중요성",
    descriptionEn: "Emotional resonance, feeling connected, and the importance of sentiment",
    dimensions: ["emotion"],
  },
  {
    id: "sensory-world",
    name: "감각의 세계",
    nameEn: "Sensory World",
    description: "촉각, 시각, 청각 등 오감을 통한 경험과 자극",
    descriptionEn: "Experiences and stimulation through touch, sight, sound, and all five senses",
    dimensions: ["sensory"],
  },
  {
    id: "atmosphere-mood",
    name: "분위기와 연출",
    nameEn: "Atmosphere & Mood",
    description: "공간, 조명, 음악 등 환경과 분위기에 대한 감수성",
    descriptionEn: "Your sensitivity to setting, lighting, music, and the overall vibe",
    dimensions: ["atmosphere"],
  },
  {
    id: "adventure-thrill",
    name: "모험과 도전",
    nameEn: "Adventure & Thrill",
    description: "새로운 경험, 즉흥성, 미지의 것에 대한 개방성",
    descriptionEn: "Your openness to new experiences, spontaneity, and the unknown",
    dimensions: ["adventure"],
  },
  {
    id: "verbal-expression",
    name: "언어와 소통",
    nameEn: "Words & Expression",
    description: "말로 표현하고 대화로 연결하는 소통 방식의 선호",
    descriptionEn: "How you prefer to communicate through words and connect through conversation",
    dimensions: ["communication"],
  },
  {
    id: "intimacy-bond",
    name: "친밀감과 유대",
    nameEn: "Intimacy & Bond",
    description: "관계의 깊이, 친밀감, 유대감에 대한 가치관",
    descriptionEn: "How you value closeness, intimacy, and the bonds you share",
    dimensions: ["intimacy"],
  },
  {
    id: "fantasy-imagination",
    name: "상상과 판타지",
    nameEn: "Fantasy & Dreams",
    description: "상상력, 역할극, 내면의 판타지 세계에 대한 개방성",
    descriptionEn: "Your openness to imagination, role-play, and inner fantasy worlds",
    dimensions: ["fantasy"],
  },
  {
    id: "trust-vulnerability",
    name: "신뢰와 솔직함",
    nameEn: "Trust & Openness",
    description: "취약함을 보여주고 서로를 받아들이는 신뢰 구축 방식",
    descriptionEn: "How you build trust by showing vulnerability and accepting each other",
    dimensions: ["intimacy", "emotion"],
  },
  {
    id: "passion-intensity",
    name: "열정과 온도",
    nameEn: "Passion & Heat",
    description: "관계의 열정, 에너지, 강도에 대한 선호",
    descriptionEn: "Your preferences for passion, energy, and intensity in relationships",
    dimensions: ["sensory", "adventure"],
  },
];

export const questions: Question[] = [
  // ─── 관계 역할 (relationship-role) ───
  {
    id: "rr-1",
    type: "multiple-choice",
    category: "relationship-role",
    text: "새로운 관계가 시작될 때, 당신은 주로 어떤 역할을 하나요?",
    textEn: "When a new relationship begins, what role do you usually take?",
    choices: [
      {
        id: "rr-1a",
        text: "내가 먼저 다가가고 리드한다",
        textEn: "I make the first move and take the lead",
        scores: { dominance: 85, communication: 70 },
      },
      {
        id: "rr-1b",
        text: "상대방의 신호를 읽고 자연스럽게 따른다",
        textEn: "I read their signals and naturally follow along",
        scores: { dominance: 30, communication: 55 },
      },
      {
        id: "rr-1c",
        text: "서로 번갈아가며 리드하는 것이 좋다",
        textEn: "I prefer taking turns leading each other",
        scores: { dominance: 50, communication: 65 },
      },
      {
        id: "rr-1d",
        text: "상대방이 리드해주는 것이 편하다",
        textEn: "I feel more comfortable when the other person leads",
        scores: { dominance: 20, communication: 40 },
      },
    ],
  },
  {
    id: "rr-2",
    type: "slider",
    category: "relationship-role",
    text: "관계에서의 주도권에 대해 어떻게 생각하나요?",
    textEn: "How do you feel about taking the lead in a relationship?",
    lowLabel: "상대방에게 맡기고 싶다",
    lowLabelEn: "I'd rather let them take charge",
    highLabel: "내가 주도하고 싶다",
    highLabelEn: "I want to be the one in charge",
    sliderDimensions: [{ key: "dominance" }],
  },
  {
    id: "rr-3",
    type: "card-select",
    category: "relationship-role",
    text: "파트너에게 당신의 마음을 전하는 방식은?",
    textEn: "How do you express your feelings to a partner?",
    choices: [
      {
        id: "rr-3a",
        text: "직접적인 말과 표현으로",
        textEn: "Through direct words and open expression",
        scores: { communication: 90, dominance: 65 },
      },
      {
        id: "rr-3b",
        text: "행동과 스킨십으로",
        textEn: "Through actions and physical affection",
        scores: { communication: 30, dominance: 55, sensory: 70 },
      },
      {
        id: "rr-3c",
        text: "눈빛과 분위기로",
        textEn: "Through eye contact and the mood between us",
        scores: { communication: 25, atmosphere: 75, dominance: 45 },
      },
    ],
  },
  {
    id: "rr-4",
    type: "multiple-choice",
    category: "relationship-role",
    text: "친밀한 순간, 상대방이 당신에게 기대하는 역할은?",
    textEn: "In intimate moments, what role does your partner expect from you?",
    choices: [
      {
        id: "rr-4a",
        text: "상황을 이끌고 결정하는 리더",
        textEn: "The leader who takes charge and makes decisions",
        scores: { dominance: 90, communication: 60 },
      },
      {
        id: "rr-4b",
        text: "함께 호흡을 맞추는 파트너",
        textEn: "An equal partner who moves in sync",
        scores: { dominance: 50, communication: 70 },
      },
      {
        id: "rr-4c",
        text: "상대의 리드에 반응하며 따르는 역할",
        textEn: "Someone who responds to and follows their lead",
        scores: { dominance: 20, communication: 45 },
      },
      {
        id: "rr-4d",
        text: "상황에 따라 유연하게 변하는 역할",
        textEn: "A flexible role that shifts depending on the moment",
        scores: { dominance: 55, communication: 60 },
      },
    ],
  },
  {
    id: "rr-5",
    type: "slider",
    category: "relationship-role",
    text: "대화와 소통이 관계에서 얼마나 중요한가요?",
    textEn: "How important is dialogue and communication in a relationship?",
    lowLabel: "말보다 행동이 중요하다",
    lowLabelEn: "Actions speak louder than words",
    highLabel: "충분한 대화가 필수적이다",
    highLabelEn: "Meaningful conversation is essential",
    sliderDimensions: [{ key: "communication" }],
  },

  // ─── 감성과 분위기 (emotion-atmosphere) ───
  {
    id: "ea-1",
    type: "multiple-choice",
    category: "emotion-atmosphere",
    text: "이상적인 친밀한 시간의 분위기는 어떤 모습인가요?",
    textEn: "What does the ideal atmosphere for an intimate moment look like?",
    choices: [
      {
        id: "ea-1a",
        text: "캔들과 음악이 있는 로맨틱한 공간",
        textEn: "A romantic setting with candles and music",
        scores: { atmosphere: 90, emotion: 80 },
      },
      {
        id: "ea-1b",
        text: "자연스럽고 편안한 일상적인 순간",
        textEn: "A natural, comfortable everyday moment",
        scores: { atmosphere: 40, emotion: 60 },
      },
      {
        id: "ea-1c",
        text: "예상치 못한 곳에서의 즉흥적인 순간",
        textEn: "A spontaneous moment in an unexpected place",
        scores: { atmosphere: 20, emotion: 35, adventure: 80 },
      },
      {
        id: "ea-1d",
        text: "서로의 눈만 바라봐도 충분한 깊은 교감",
        textEn: "A deep connection where just looking into each other's eyes is enough",
        scores: { atmosphere: 65, emotion: 90, intimacy: 75 },
      },
    ],
  },
  {
    id: "ea-2",
    type: "card-select",
    category: "emotion-atmosphere",
    text: "당신에게 가장 감동적인 순간은?",
    textEn: "What kind of moment moves you the most?",
    choices: [
      {
        id: "ea-2a",
        text: "상대방이 나의 작은 것까지 기억해줄 때",
        textEn: "When they remember even the smallest things about me",
        scores: { emotion: 90, intimacy: 70 },
      },
      {
        id: "ea-2b",
        text: "함께 아름다운 경험을 공유할 때",
        textEn: "When we share a beautiful experience together",
        scores: { emotion: 70, atmosphere: 80 },
      },
      {
        id: "ea-2c",
        text: "강렬하고 열정적인 순간을 함께할 때",
        textEn: "When we share an intense, passionate moment",
        scores: { emotion: 50, sensory: 75, adventure: 65 },
      },
    ],
  },
  {
    id: "ea-3",
    type: "slider",
    category: "emotion-atmosphere",
    text: "분위기와 환경이 얼마나 중요한가요?",
    textEn: "How much do atmosphere and setting matter to you?",
    lowLabel: "장소와 분위기는 상관없다",
    lowLabelEn: "The place and vibe don't matter",
    highLabel: "완벽한 분위기가 꼭 필요하다",
    highLabelEn: "The perfect atmosphere is absolutely essential",
    sliderDimensions: [{ key: "atmosphere" }],
  },
  {
    id: "ea-4",
    type: "multiple-choice",
    category: "emotion-atmosphere",
    text: "감정적 교감 없는 신체적 친밀함에 대해 어떻게 생각하나요?",
    textEn: "How do you feel about physical closeness without emotional connection?",
    choices: [
      {
        id: "ea-4a",
        text: "감정적 교감이 없으면 의미가 없다",
        textEn: "Without emotional connection, it feels meaningless",
        scores: { emotion: 95, intimacy: 80 },
      },
      {
        id: "ea-4b",
        text: "감정적 교감이 있으면 더 좋지만 필수는 아니다",
        textEn: "Emotional connection is nice to have, but not a must",
        scores: { emotion: 60, intimacy: 50 },
      },
      {
        id: "ea-4c",
        text: "때로는 순수한 신체적 끌림만으로도 충분하다",
        textEn: "Sometimes pure physical attraction is enough",
        scores: { emotion: 30, sensory: 75 },
      },
      {
        id: "ea-4d",
        text: "상황에 따라 다르다",
        textEn: "It depends on the situation",
        scores: { emotion: 50, intimacy: 45 },
      },
    ],
  },
  {
    id: "ea-5",
    type: "slider",
    category: "emotion-atmosphere",
    text: "관계에서 감정적 교감은 어느 정도 중요한가요?",
    textEn: "How important is emotional connection in a relationship?",
    lowLabel: "감정보다 다른 것이 중요하다",
    lowLabelEn: "Other things matter more than emotions",
    highLabel: "감정적 연결이 가장 중요하다",
    highLabelEn: "Emotional connection is what matters most",
    sliderDimensions: [{ key: "emotion" }],
  },

  // ─── 감각과 체험 (sensory-experience) ───
  {
    id: "se-1",
    type: "card-select",
    category: "sensory-experience",
    text: "당신을 가장 설레게 하는 감각은?",
    textEn: "Which sensation excites you the most?",
    choices: [
      {
        id: "se-1a",
        text: "부드러운 촉감과 온기",
        textEn: "A gentle touch and warmth",
        scores: { sensory: 80, emotion: 60 },
      },
      {
        id: "se-1b",
        text: "매혹적인 향기",
        textEn: "A captivating scent",
        scores: { sensory: 85, atmosphere: 70 },
      },
      {
        id: "se-1c",
        text: "속삭이는 목소리",
        textEn: "A whispering voice",
        scores: { sensory: 70, communication: 65 },
      },
      {
        id: "se-1d",
        text: "시선이 만나는 순간",
        textEn: "The moment our eyes meet",
        scores: { sensory: 60, emotion: 75, intimacy: 60 },
      },
    ],
  },
  {
    id: "se-2",
    type: "multiple-choice",
    category: "sensory-experience",
    text: "새로운 경험을 시도하는 것에 대해 어떻게 생각하나요?",
    textEn: "How do you feel about trying new experiences?",
    choices: [
      {
        id: "se-2a",
        text: "항상 새로운 것을 찾고 시도한다",
        textEn: "I'm always seeking out and trying new things",
        scores: { adventure: 90, sensory: 65 },
      },
      {
        id: "se-2b",
        text: "파트너가 원한다면 기꺼이 시도한다",
        textEn: "I'm happy to try if my partner wants to",
        scores: { adventure: 65, emotion: 60 },
      },
      {
        id: "se-2c",
        text: "익숙한 것이 가장 편하고 좋다",
        textEn: "I'm most comfortable with what I already know",
        scores: { adventure: 20, intimacy: 65 },
      },
      {
        id: "se-2d",
        text: "가끔은 새로운 시도도 좋다",
        textEn: "Something new once in a while is nice",
        scores: { adventure: 55, sensory: 55 },
      },
    ],
  },
  {
    id: "se-3",
    type: "slider",
    category: "sensory-experience",
    text: "감각적 자극에 대한 선호도는?",
    textEn: "How much do you value sensory stimulation?",
    lowLabel: "감정적 연결이 더 중요하다",
    lowLabelEn: "Emotional connection matters more",
    highLabel: "감각적 경험이 매우 중요하다",
    highLabelEn: "Sensory experiences are very important to me",
    sliderDimensions: [{ key: "sensory" }],
  },
  {
    id: "se-4",
    type: "multiple-choice",
    category: "sensory-experience",
    text: "여행지에서의 즉흥적인 로맨스에 대해 어떻게 생각하나요?",
    textEn: "How do you feel about a spontaneous romance while traveling?",
    choices: [
      {
        id: "se-4a",
        text: "설레는 모험이 될 것 같다!",
        textEn: "That sounds like a thrilling adventure!",
        scores: { adventure: 90, sensory: 60, atmosphere: 50 },
      },
      {
        id: "se-4b",
        text: "상황이 맞으면 열려 있다",
        textEn: "I'd be open to it if the moment felt right",
        scores: { adventure: 65, sensory: 55 },
      },
      {
        id: "se-4c",
        text: "감정적 교감이 먼저라 어려울 것 같다",
        textEn: "I'd need an emotional connection first, so probably not",
        scores: { adventure: 30, emotion: 75, intimacy: 65 },
      },
      {
        id: "se-4d",
        text: "전혀 흥미가 없다",
        textEn: "Not interested at all",
        scores: { adventure: 10, intimacy: 70 },
      },
    ],
  },
  {
    id: "se-5",
    type: "slider",
    category: "sensory-experience",
    text: "새로운 모험에 대한 개방성은?",
    textEn: "How open are you to new adventures?",
    lowLabel: "안정적이고 익숙한 것이 좋다",
    lowLabelEn: "I prefer what's stable and familiar",
    highLabel: "새롭고 미지의 것을 원한다",
    highLabelEn: "I crave the new and unknown",
    sliderDimensions: [{ key: "adventure" }],
  },

  // ─── 친밀감과 신뢰 (intimacy-trust) ───
  {
    id: "it-1",
    type: "multiple-choice",
    category: "intimacy-trust",
    text: "진정한 친밀감이란 무엇이라고 생각하나요?",
    textEn: "What does true intimacy mean to you?",
    choices: [
      {
        id: "it-1a",
        text: "서로의 가장 깊은 비밀까지 나누는 것",
        textEn: "Sharing even our deepest secrets with each other",
        scores: { intimacy: 90, emotion: 80, communication: 70 },
      },
      {
        id: "it-1b",
        text: "말하지 않아도 서로를 이해하는 것",
        textEn: "Understanding each other without needing words",
        scores: { intimacy: 80, emotion: 75, communication: 30 },
      },
      {
        id: "it-1c",
        text: "함께 편안한 침묵을 나눌 수 있는 것",
        textEn: "Being able to share comfortable silence together",
        scores: { intimacy: 70, emotion: 60, atmosphere: 55 },
      },
      {
        id: "it-1d",
        text: "함께 새로운 경험을 쌓아가는 것",
        textEn: "Building new experiences together over time",
        scores: { intimacy: 55, adventure: 65, emotion: 50 },
      },
    ],
  },
  {
    id: "it-2",
    type: "slider",
    category: "intimacy-trust",
    text: "관계에서 원하는 친밀감의 깊이는?",
    textEn: "How deep do you want the intimacy in your relationship to be?",
    lowLabel: "가볍고 자유로운 관계",
    lowLabelEn: "Light and free-spirited",
    highLabel: "깊고 진지한 관계",
    highLabelEn: "Deep and committed",
    sliderDimensions: [{ key: "intimacy" }],
  },
  {
    id: "it-3",
    type: "card-select",
    category: "intimacy-trust",
    text: "신뢰를 쌓는 당신만의 방법은?",
    textEn: "What's your way of building trust?",
    choices: [
      {
        id: "it-3a",
        text: "시간을 들여 천천히 깊어지기",
        textEn: "Taking time and deepening things slowly",
        scores: { intimacy: 85, emotion: 70 },
      },
      {
        id: "it-3b",
        text: "강렬한 경험을 함께 나누기",
        textEn: "Sharing intense experiences together",
        scores: { intimacy: 60, adventure: 70, emotion: 55 },
      },
      {
        id: "it-3c",
        text: "솔직한 대화로 마음 열기",
        textEn: "Opening up through honest conversation",
        scores: { intimacy: 75, communication: 85, emotion: 65 },
      },
    ],
  },
  {
    id: "it-4",
    type: "multiple-choice",
    category: "intimacy-trust",
    text: "관계에서 감정적 취약함을 보이는 것에 대해?",
    textEn: "How do you feel about showing emotional vulnerability in a relationship?",
    choices: [
      {
        id: "it-4a",
        text: "자연스럽게 약한 모습도 보여준다",
        textEn: "I naturally show my softer, vulnerable side",
        scores: { emotion: 85, intimacy: 80, communication: 65 },
      },
      {
        id: "it-4b",
        text: "충분히 신뢰가 쌓이면 보여줄 수 있다",
        textEn: "I can open up once enough trust is built",
        scores: { emotion: 65, intimacy: 70 },
      },
      {
        id: "it-4c",
        text: "가능하면 강한 모습을 유지하고 싶다",
        textEn: "I prefer to keep up a strong front",
        scores: { emotion: 35, dominance: 70, intimacy: 40 },
      },
      {
        id: "it-4d",
        text: "상대방의 약한 모습을 받아주는 편이다",
        textEn: "I tend to be the one who holds space for their vulnerability",
        scores: { emotion: 75, intimacy: 75, dominance: 30 },
      },
    ],
  },
  {
    id: "it-5",
    type: "slider",
    category: "intimacy-trust",
    text: "감정적 교감의 중요도는?",
    textEn: "How important is emotional resonance to you?",
    lowLabel: "독립적으로 지내는 것이 편하다",
    lowLabelEn: "I'm more comfortable being independent",
    highLabel: "깊은 감정적 교감이 필수적이다",
    highLabelEn: "Deep emotional connection is essential",
    sliderDimensions: [{ key: "emotion" }],
  },

  // ─── 판타지와 상상 (fantasy-imagination) ───
  {
    id: "fi-1",
    type: "multiple-choice",
    category: "fantasy-imagination",
    text: "상상 속에서 당신의 이상적인 시나리오는?",
    textEn: "In your imagination, what's your ideal scenario?",
    choices: [
      {
        id: "fi-1a",
        text: "영화 같은 로맨틱한 장면",
        textEn: "A movie-like romantic scene",
        scores: { fantasy: 75, atmosphere: 80, emotion: 70 },
      },
      {
        id: "fi-1b",
        text: "미지의 세계에서의 대담한 모험",
        textEn: "A bold adventure in an unknown world",
        scores: { fantasy: 85, adventure: 85 },
      },
      {
        id: "fi-1c",
        text: "서로의 역할을 바꿔보는 재미있는 상황",
        textEn: "A playful situation where we swap roles",
        scores: { fantasy: 90, adventure: 65, dominance: 50 },
      },
      {
        id: "fi-1d",
        text: "현실에서 충분히 만족한다",
        textEn: "I'm perfectly satisfied with reality",
        scores: { fantasy: 20, intimacy: 60 },
      },
    ],
  },
  {
    id: "fi-2",
    type: "slider",
    category: "fantasy-imagination",
    text: "상상력과 판타지에 대한 당신의 개방성은?",
    textEn: "How open are you to imagination and fantasy?",
    lowLabel: "현실적인 것을 선호한다",
    lowLabelEn: "I prefer to keep things grounded in reality",
    highLabel: "풍부한 상상을 즐긴다",
    highLabelEn: "I love letting my imagination run wild",
    sliderDimensions: [{ key: "fantasy" }],
  },
  {
    id: "fi-3",
    type: "card-select",
    category: "fantasy-imagination",
    text: "역할극이나 시나리오 플레이에 대해?",
    textEn: "How do you feel about role-play or scenario play?",
    choices: [
      {
        id: "fi-3a",
        text: "매우 흥미롭다, 적극적으로 해보고 싶다",
        textEn: "Very intriguing — I'd love to dive in",
        scores: { fantasy: 90, adventure: 80 },
      },
      {
        id: "fi-3b",
        text: "상상으로는 즐기지만 실행은 어려울 것 같다",
        textEn: "Fun to imagine, but hard to actually do",
        scores: { fantasy: 70, adventure: 40 },
      },
      {
        id: "fi-3c",
        text: "별로 관심이 없다",
        textEn: "Not really my thing",
        scores: { fantasy: 20, adventure: 25 },
      },
    ],
  },
  {
    id: "fi-4",
    type: "multiple-choice",
    category: "fantasy-imagination",
    text: "평소 상상이나 공상을 얼마나 자주 하나요?",
    textEn: "How often do you daydream or fantasize?",
    choices: [
      {
        id: "fi-4a",
        text: "매일 다양한 상상을 즐긴다",
        textEn: "Every day — I enjoy all kinds of fantasies",
        scores: { fantasy: 90, adventure: 55 },
      },
      {
        id: "fi-4b",
        text: "가끔 특별한 상상을 한다",
        textEn: "Occasionally, when something special sparks it",
        scores: { fantasy: 60, adventure: 45 },
      },
      {
        id: "fi-4c",
        text: "거의 하지 않는다",
        textEn: "Rarely, if ever",
        scores: { fantasy: 15 },
      },
      {
        id: "fi-4d",
        text: "상상보다 실행을 선호한다",
        textEn: "I'd rather make things happen than just imagine them",
        scores: { fantasy: 30, adventure: 75, sensory: 65 },
      },
    ],
  },
  {
    id: "fi-5",
    type: "slider",
    category: "fantasy-imagination",
    text: "새로운 모험적 경험에 대한 태도는?",
    textEn: "What's your attitude toward adventurous new experiences?",
    lowLabel: "검증된 것만 하고 싶다",
    lowLabelEn: "I only want what's tried and tested",
    highLabel: "미지의 것도 적극 시도하고 싶다",
    highLabelEn: "I'm eager to explore the unknown",
    sliderDimensions: [{ key: "adventure" }],
  },

  // ─── 소통과 표현 (expression-connection) ───
  {
    id: "ec-1",
    type: "multiple-choice",
    category: "expression-connection",
    text: "친밀한 순간에 당신의 소통 방식은?",
    textEn: "How do you communicate during intimate moments?",
    choices: [
      {
        id: "ec-1a",
        text: "감정과 원하는 것을 말로 표현한다",
        textEn: "I put my feelings and desires into words",
        scores: { communication: 90, intimacy: 60 },
      },
      {
        id: "ec-1b",
        text: "표정과 몸짓으로 전달한다",
        textEn: "I communicate through expressions and body language",
        scores: { communication: 35, sensory: 65, intimacy: 55 },
      },
      {
        id: "ec-1c",
        text: "분위기와 상황으로 자연스럽게 전달된다",
        textEn: "The mood and moment naturally convey everything",
        scores: { communication: 25, atmosphere: 75, intimacy: 50 },
      },
      {
        id: "ec-1d",
        text: "사후에 이야기를 나누는 편이다",
        textEn: "I prefer to talk about it afterward",
        scores: { communication: 70, intimacy: 65 },
      },
    ],
  },
  {
    id: "ec-2",
    type: "slider",
    category: "expression-connection",
    text: "관계에서 언어적 소통의 중요성은?",
    textEn: "How important is verbal communication in a relationship?",
    lowLabel: "말보다 느낌이 중요하다",
    lowLabelEn: "Feelings matter more than words",
    highLabel: "명확한 소통이 매우 중요하다",
    highLabelEn: "Clear communication is absolutely vital",
    sliderDimensions: [{ key: "communication" }],
  },
  {
    id: "ec-3",
    type: "card-select",
    category: "expression-connection",
    text: "파트너와 더 가까워지는 방법은?",
    textEn: "How do you get closer to a partner?",
    choices: [
      {
        id: "ec-3a",
        text: "깊은 대화를 나누기",
        textEn: "Through deep, meaningful conversations",
        scores: { communication: 85, intimacy: 80 },
      },
      {
        id: "ec-3b",
        text: "함께 새로운 경험하기",
        textEn: "By sharing new experiences together",
        scores: { adventure: 70, intimacy: 60, communication: 45 },
      },
      {
        id: "ec-3c",
        text: "조용히 함께 시간 보내기",
        textEn: "By spending quiet time together",
        scores: { intimacy: 75, atmosphere: 60, communication: 30 },
      },
    ],
  },
  {
    id: "ec-4",
    type: "multiple-choice",
    category: "expression-connection",
    text: "파트너에게 피드백을 주거나 받는 것에 대해?",
    textEn: "How do you feel about giving or receiving feedback with a partner?",
    choices: [
      {
        id: "ec-4a",
        text: "적극적으로 솔직한 피드백을 주고받는다",
        textEn: "I actively exchange honest, direct feedback",
        scores: { communication: 90, intimacy: 70, dominance: 60 },
      },
      {
        id: "ec-4b",
        text: "부드럽게 돌려서 전달한다",
        textEn: "I soften it and deliver it gently",
        scores: { communication: 65, emotion: 70, intimacy: 60 },
      },
      {
        id: "ec-4c",
        text: "상대방의 반응을 보며 맞춰간다",
        textEn: "I adjust based on how they respond",
        scores: { communication: 45, emotion: 60, intimacy: 55 },
      },
      {
        id: "ec-4d",
        text: "말하기보다는 자연스럽게 탐색한다",
        textEn: "I explore naturally rather than saying it outright",
        scores: { communication: 20, sensory: 65, adventure: 55 },
      },
    ],
  },
  {
    id: "ec-5",
    type: "slider",
    category: "expression-connection",
    text: "관계에서 원하는 깊이는?",
    textEn: "How deep do you want your relationship to go?",
    lowLabel: "가볍고 즐거운 관계",
    lowLabelEn: "Light and fun",
    highLabel: "깊이 있고 진지한 관계",
    highLabelEn: "Deep and serious",
    sliderDimensions: [{ key: "intimacy" }],
  },

  // ─── 추가 질문: 관계 역할 (relationship-role) ───
  {
    id: "rr-6",
    type: "multiple-choice",
    category: "relationship-role",
    text: "파트너가 결정을 미룰 때 당신의 반응은?",
    textEn: "When your partner puts off making a decision, how do you react?",
    choices: [
      {
        id: "rr-6a",
        text: "내가 대신 결정하고 이끈다",
        textEn: "I step in, decide, and take the lead",
        scores: { dominance: 90, communication: 55 },
      },
      {
        id: "rr-6b",
        text: "함께 의논하면서 결론을 끌어낸다",
        textEn: "I talk it through with them until we reach a conclusion",
        scores: { dominance: 60, communication: 85 },
      },
      {
        id: "rr-6c",
        text: "상대방이 결정할 때까지 기다려준다",
        textEn: "I wait patiently until they're ready to decide",
        scores: { dominance: 20, emotion: 65 },
      },
      {
        id: "rr-6d",
        text: "분위기에 맞게 자연스럽게 흐르도록 둔다",
        textEn: "I let things flow naturally with the mood",
        scores: { dominance: 40, atmosphere: 60 },
      },
    ],
  },
  {
    id: "rr-7",
    type: "card-select",
    category: "relationship-role",
    text: "당신이 가장 매력적으로 느끼는 파트너의 모습은?",
    textEn: "What do you find most attractive in a partner?",
    choices: [
      {
        id: "rr-7a",
        text: "자신감 있게 리드하는 모습",
        textEn: "Confidently taking the lead",
        scores: { dominance: 25, atmosphere: 60 },
      },
      {
        id: "rr-7b",
        text: "나의 말에 진심으로 귀 기울이는 모습",
        textEn: "Truly listening to what I have to say",
        scores: { communication: 85, emotion: 70, intimacy: 65 },
      },
      {
        id: "rr-7c",
        text: "예측할 수 없는 즉흥적인 모습",
        textEn: "Being spontaneous and unpredictable",
        scores: { adventure: 80, dominance: 55 },
      },
      {
        id: "rr-7d",
        text: "조용히 나를 관찰하며 이해하는 모습",
        textEn: "Quietly observing and understanding me",
        scores: { intimacy: 75, communication: 30, emotion: 65 },
      },
    ],
  },
  {
    id: "rr-8",
    type: "slider",
    category: "relationship-role",
    text: "갈등 상황에서 당신의 태도는?",
    textEn: "How do you handle conflict?",
    lowLabel: "상대에게 맞추며 화해한다",
    lowLabelEn: "I adapt to them and make peace",
    highLabel: "내 의견을 분명히 표현한다",
    highLabelEn: "I clearly express my own opinion",
    sliderDimensions: [{ key: "dominance" }, { key: "communication" }],
  },

  // ─── 추가 질문: 감성과 분위기 (emotion-atmosphere) ───
  {
    id: "ea-6",
    type: "multiple-choice",
    category: "emotion-atmosphere",
    text: "오감 중 관계에서 가장 중요한 감각은?",
    textEn: "Of the five senses, which matters most in a relationship?",
    choices: [
      {
        id: "ea-6a",
        text: "촉각 — 피부가 닿는 온도와 질감",
        textEn: "Touch — the warmth and texture of skin on skin",
        scores: { sensory: 85, emotion: 55 },
      },
      {
        id: "ea-6b",
        text: "청각 — 목소리의 톤과 속삭임",
        textEn: "Sound — the tone of a voice and soft whispers",
        scores: { sensory: 70, communication: 65, atmosphere: 60 },
      },
      {
        id: "ea-6c",
        text: "시각 — 상대의 표정과 눈빛",
        textEn: "Sight — their expressions and the look in their eyes",
        scores: { sensory: 60, emotion: 80, intimacy: 55 },
      },
      {
        id: "ea-6d",
        text: "후각 — 상대의 체취와 향기",
        textEn: "Smell — their natural scent and fragrance",
        scores: { sensory: 90, atmosphere: 75 },
      },
    ],
  },
  {
    id: "ea-7",
    type: "card-select",
    category: "emotion-atmosphere",
    text: "다음 중 가장 끌리는 상황은?",
    textEn: "Which of these scenarios appeals to you the most?",
    choices: [
      {
        id: "ea-7a",
        text: "비 오는 밤, 창가에서 단둘이",
        textEn: "A rainy night, just the two of us by the window",
        scores: { atmosphere: 90, emotion: 75, intimacy: 65 },
      },
      {
        id: "ea-7b",
        text: "새벽, 예고 없이 찾아온 충동적인 순간",
        textEn: "An impulsive moment that strikes at dawn",
        scores: { atmosphere: 30, adventure: 80, sensory: 70 },
      },
      {
        id: "ea-7c",
        text: "오랜 대화 끝에 자연스럽게 가까워지는 순간",
        textEn: "Naturally growing closer after a long, heartfelt conversation",
        scores: { communication: 75, emotion: 85, intimacy: 70 },
      },
    ],
  },
  {
    id: "ea-8",
    type: "slider",
    category: "emotion-atmosphere",
    text: "사후 여운의 중요도는?",
    textEn: "How much does the emotional afterglow matter?",
    lowLabel: "순간이 지나면 끝",
    lowLabelEn: "Once the moment passes, it's over",
    highLabel: "여운과 감정의 지속이 중요하다",
    highLabelEn: "The lingering feelings afterward are just as important",
    sliderDimensions: [{ key: "emotion" }, { key: "atmosphere" }],
  },

  // ─── 추가 질문: 감각과 체험 (sensory-experience) ───
  {
    id: "se-6",
    type: "multiple-choice",
    category: "sensory-experience",
    text: "새로운 것을 시도한 후 실망했을 때의 반응은?",
    textEn: "How do you react when a new experience doesn't live up to expectations?",
    choices: [
      {
        id: "se-6a",
        text: "실패해도 시도 자체가 가치 있다",
        textEn: "Even if it fails, the attempt itself was worthwhile",
        scores: { adventure: 90, sensory: 55 },
      },
      {
        id: "se-6b",
        text: "다음에는 더 좋은 것을 찾아보겠다",
        textEn: "I'll find something even better next time",
        scores: { adventure: 70, sensory: 65 },
      },
      {
        id: "se-6c",
        text: "검증된 것으로 돌아가고 싶다",
        textEn: "I want to go back to what I know works",
        scores: { adventure: 20, intimacy: 60 },
      },
      {
        id: "se-6d",
        text: "파트너와 대화하며 다음 방향을 정한다",
        textEn: "I talk it over with my partner and decide what's next",
        scores: { adventure: 50, communication: 75, emotion: 55 },
      },
    ],
  },
  {
    id: "se-7",
    type: "card-select",
    category: "sensory-experience",
    text: "당신에게 가장 강렬한 경험이란?",
    textEn: "What counts as the most intense experience for you?",
    choices: [
      {
        id: "se-7a",
        text: "예상하지 못한 곳에서의 돌발 상황",
        textEn: "An unexpected turn of events in an unlikely place",
        scores: { adventure: 90, atmosphere: 25, sensory: 70 },
      },
      {
        id: "se-7b",
        text: "오랜 기다림 끝에 찾아온 완벽한 순간",
        textEn: "The perfect moment that finally arrives after a long wait",
        scores: { atmosphere: 85, emotion: 75, sensory: 60 },
      },
      {
        id: "se-7c",
        text: "서로의 한계를 넘어서는 도전",
        textEn: "Pushing past each other's boundaries together",
        scores: { adventure: 85, dominance: 65, sensory: 75 },
      },
    ],
  },
  {
    id: "se-8",
    type: "slider",
    category: "sensory-experience",
    text: "강도에 대한 당신의 선호는?",
    textEn: "What's your preference when it comes to intensity?",
    lowLabel: "부드럽고 섬세한 것이 좋다",
    lowLabelEn: "I prefer soft and delicate",
    highLabel: "강렬하고 선명한 것이 좋다",
    highLabelEn: "I prefer bold and vivid",
    sliderDimensions: [{ key: "sensory" }],
  },

  // ─── 추가 질문: 친밀감과 신뢰 (intimacy-trust) ───
  {
    id: "it-6",
    type: "multiple-choice",
    category: "intimacy-trust",
    text: "관계에서 '비밀'에 대한 당신의 태도는?",
    textEn: "How do you feel about 'secrets' in a relationship?",
    choices: [
      {
        id: "it-6a",
        text: "모든 것을 공유해야 진정한 관계다",
        textEn: "Sharing everything is what makes a relationship real",
        scores: { intimacy: 95, communication: 80 },
      },
      {
        id: "it-6b",
        text: "서로의 내밀한 영역은 존중해야 한다",
        textEn: "We should respect each other's private space",
        scores: { intimacy: 55, fantasy: 60 },
      },
      {
        id: "it-6c",
        text: "약간의 미스터리가 관계를 흥미롭게 한다",
        textEn: "A little mystery keeps things interesting",
        scores: { intimacy: 35, fantasy: 75, adventure: 55 },
      },
      {
        id: "it-6d",
        text: "상대가 준비될 때 자연스럽게 공유하면 된다",
        textEn: "They can share when they're ready — no rush",
        scores: { intimacy: 70, emotion: 65 },
      },
    ],
  },
  {
    id: "it-7",
    type: "card-select",
    category: "intimacy-trust",
    text: "가장 친밀함을 느끼는 순간은?",
    textEn: "When do you feel the most intimate?",
    choices: [
      {
        id: "it-7a",
        text: "서로의 가장 부끄러운 모습을 보여줄 수 있을 때",
        textEn: "When we can show each other our most embarrassing sides",
        scores: { intimacy: 90, emotion: 80 },
      },
      {
        id: "it-7b",
        text: "말 없이도 원하는 것을 알아챌 때",
        textEn: "When we sense what the other wants without a word",
        scores: { intimacy: 85, communication: 20, emotion: 70 },
      },
      {
        id: "it-7c",
        text: "함께 위험을 감수하고 성공했을 때",
        textEn: "When we take a risk together and come out on top",
        scores: { intimacy: 65, adventure: 80, dominance: 55 },
      },
    ],
  },
  {
    id: "it-8",
    type: "slider",
    category: "intimacy-trust",
    text: "관계 초기에 경계를 얼마나 빨리 낮추나요?",
    textEn: "How quickly do you lower your guard in a new relationship?",
    lowLabel: "천천히, 충분한 시간이 필요하다",
    lowLabelEn: "Slowly — I need plenty of time",
    highLabel: "빠르게, 직감을 믿는다",
    highLabelEn: "Quickly — I trust my instincts",
    sliderDimensions: [{ key: "intimacy", inverted: true }, { key: "adventure" }],
  },

  // ─── 추가 질문: 판타지와 상상 (fantasy-imagination) ───
  {
    id: "fi-6",
    type: "multiple-choice",
    category: "fantasy-imagination",
    text: "판타지와 현실 사이, 당신은 어디에 있나요?",
    textEn: "Between fantasy and reality, where do you stand?",
    choices: [
      {
        id: "fi-6a",
        text: "상상 속 세계가 더 매력적이다",
        textEn: "The world of imagination is more appealing",
        scores: { fantasy: 95, sensory: 40 },
      },
      {
        id: "fi-6b",
        text: "상상에서 영감을 받아 현실에서 실행한다",
        textEn: "I draw inspiration from fantasies and bring them to life",
        scores: { fantasy: 75, adventure: 70, sensory: 60 },
      },
      {
        id: "fi-6c",
        text: "현실의 경험 자체가 충분히 풍요롭다",
        textEn: "Real-life experiences are rich enough on their own",
        scores: { fantasy: 25, sensory: 75, intimacy: 60 },
      },
      {
        id: "fi-6d",
        text: "파트너의 판타지를 들어주고 함께 탐험한다",
        textEn: "I listen to my partner's fantasies and explore them together",
        scores: { fantasy: 65, communication: 70, emotion: 60 },
      },
    ],
  },
  {
    id: "fi-7",
    type: "card-select",
    category: "fantasy-imagination",
    text: "당신이 끌리는 서사의 유형은?",
    textEn: "What kind of narrative are you drawn to?",
    choices: [
      {
        id: "fi-7a",
        text: "금지된 것에 대한 은밀한 욕망",
        textEn: "A secret desire for the forbidden",
        scores: { fantasy: 90, atmosphere: 70 },
      },
      {
        id: "fi-7b",
        text: "운명처럼 찾아온 강렬한 만남",
        textEn: "An intense encounter that feels like fate",
        scores: { fantasy: 70, emotion: 80, adventure: 55 },
      },
      {
        id: "fi-7c",
        text: "서서히 깊어지는 일상 속의 관계",
        textEn: "A relationship that deepens slowly through everyday life",
        scores: { fantasy: 30, intimacy: 85, emotion: 70 },
      },
      {
        id: "fi-7d",
        text: "권력과 복종의 미묘한 긴장감",
        textEn: "The subtle tension between power and surrender",
        scores: { fantasy: 85, dominance: 75, atmosphere: 65 },
      },
    ],
  },
  {
    id: "fi-8",
    type: "slider",
    category: "fantasy-imagination",
    text: "상상을 파트너와 공유하는 것에 대해?",
    textEn: "How do you feel about sharing your fantasies with a partner?",
    lowLabel: "나만의 비밀로 간직한다",
    lowLabelEn: "I keep them as my own private secret",
    highLabel: "적극적으로 공유하고 실현한다",
    highLabelEn: "I actively share them and try to make them real",
    sliderDimensions: [{ key: "fantasy" }, { key: "communication" }],
  },

  // ─── 추가 질문: 소통과 표현 (expression-connection) ───
  {
    id: "ec-6",
    type: "multiple-choice",
    category: "expression-connection",
    text: "관계에서 '침묵'의 의미는?",
    textEn: "What does 'silence' mean in a relationship?",
    choices: [
      {
        id: "ec-6a",
        text: "불편한 신호, 대화가 필요하다",
        textEn: "An uncomfortable sign — we need to talk",
        scores: { communication: 85, intimacy: 60 },
      },
      {
        id: "ec-6b",
        text: "서로를 깊이 이해하는 편안함",
        textEn: "The comfort of deeply understanding each other",
        scores: { communication: 30, intimacy: 80, emotion: 70 },
      },
      {
        id: "ec-6c",
        text: "긴장감 있는 매력적인 순간",
        textEn: "A charged, alluring moment of tension",
        scores: { communication: 20, atmosphere: 85, sensory: 60 },
      },
      {
        id: "ec-6d",
        text: "상황에 따라 의미가 다르다",
        textEn: "It means different things depending on the situation",
        scores: { communication: 55, emotion: 55 },
      },
    ],
  },
  {
    id: "ec-7",
    type: "card-select",
    category: "expression-connection",
    text: "파트너에게 욕구를 전달하는 가장 자연스러운 방법은?",
    textEn: "What's the most natural way you communicate your desires to a partner?",
    choices: [
      {
        id: "ec-7a",
        text: "직접적이고 구체적인 언어로",
        textEn: "With direct, specific words",
        scores: { communication: 95, dominance: 65 },
      },
      {
        id: "ec-7b",
        text: "은유적이고 간접적인 힌트로",
        textEn: "Through suggestive, indirect hints",
        scores: { communication: 40, fantasy: 60, atmosphere: 65 },
      },
      {
        id: "ec-7c",
        text: "신체적 접촉과 행동으로",
        textEn: "Through physical touch and actions",
        scores: { communication: 15, sensory: 80, dominance: 55 },
      },
    ],
  },
  {
    id: "ec-8",
    type: "slider",
    category: "expression-connection",
    text: "사후 대화(debrief)의 중요성은?",
    textEn: "How important is talking things through afterward?",
    lowLabel: "그냥 자연스럽게 넘어간다",
    lowLabelEn: "I just let it flow and move on",
    highLabel: "느낀 점을 반드시 나눈다",
    highLabelEn: "I always share how I felt",
    sliderDimensions: [{ key: "communication" }, { key: "intimacy" }],
  },

  // ─── 심화 질문: 관계 역할 (relationship-role) ───
  {
    id: "rr-9",
    type: "multiple-choice",
    category: "relationship-role",
    text: "상대방이 당신의 의견에 반대할 때, 당신의 반응은?",
    textEn: "When your partner disagrees with you, how do you respond?",
    choices: [
      {
        id: "rr-9a",
        text: "설득력 있게 내 입장을 관철시킨다",
        textEn: "I make a compelling case and stand my ground",
        scores: { dominance: 85, communication: 75 },
      },
      {
        id: "rr-9b",
        text: "서로의 관점을 나누고 절충안을 찾는다",
        textEn: "We share perspectives and find a compromise",
        scores: { dominance: 50, communication: 90, emotion: 60 },
      },
      {
        id: "rr-9c",
        text: "상대방의 의견을 수용하는 편이다",
        textEn: "I tend to go along with their view",
        scores: { dominance: 15, emotion: 65, intimacy: 55 },
      },
      {
        id: "rr-9d",
        text: "감정적으로 대응하기보다 거리를 두고 생각한다",
        textEn: "I step back and think rather than reacting emotionally",
        scores: { dominance: 45, communication: 35, emotion: 30 },
      },
    ],
  },
  {
    id: "rr-10",
    type: "card-select",
    category: "relationship-role",
    text: "서프라이즈를 준비한다면 당신의 스타일은?",
    textEn: "If you were planning a surprise, what would your style be?",
    choices: [
      {
        id: "rr-10a",
        text: "완벽하게 계획하고 연출하는 서프라이즈",
        textEn: "A perfectly planned and orchestrated surprise",
        scores: { dominance: 80, atmosphere: 85, communication: 50 },
      },
      {
        id: "rr-10b",
        text: "순간적인 영감으로 즉흥 서프라이즈",
        textEn: "A spontaneous surprise born from a flash of inspiration",
        scores: { dominance: 60, adventure: 80, atmosphere: 35 },
      },
      {
        id: "rr-10c",
        text: "상대방이 나에게 서프라이즈를 해주길 바란다",
        textEn: "Honestly, I'd rather be the one surprised",
        scores: { dominance: 20, emotion: 75, intimacy: 65 },
      },
    ],
  },
  {
    id: "rr-11",
    type: "slider",
    category: "relationship-role",
    text: "관계에서 규칙이나 약속을 정하는 것에 대해?",
    textEn: "How do you feel about setting rules and agreements in a relationship?",
    lowLabel: "자유롭게 흘러가는 게 좋다",
    lowLabelEn: "I prefer letting things flow freely",
    highLabel: "명확한 규칙과 경계가 필요하다",
    highLabelEn: "Clear rules and boundaries are necessary",
    sliderDimensions: [{ key: "dominance" }, { key: "communication" }],
  },
  {
    id: "rr-12",
    type: "multiple-choice",
    category: "relationship-role",
    text: "관계에서 '주도권'이 바뀌는 상황에 대해?",
    textEn: "How do you feel about the dynamic shifting in a relationship?",
    choices: [
      {
        id: "rr-12a",
        text: "흥미롭다, 새로운 역동을 만든다",
        textEn: "Exciting — it creates a fresh dynamic",
        scores: { dominance: 55, adventure: 75, fantasy: 60 },
      },
      {
        id: "rr-12b",
        text: "나의 역할이 정해져 있는 것이 편하다",
        textEn: "I'm more comfortable with a defined role",
        scores: { dominance: 70, intimacy: 55 },
      },
      {
        id: "rr-12c",
        text: "상대방이 원한다면 기꺼이 맞춰준다",
        textEn: "I'm happy to adjust if my partner wants it",
        scores: { dominance: 35, emotion: 70, intimacy: 60 },
      },
      {
        id: "rr-12d",
        text: "자연스러운 상황이라면 좋지만 강제적이면 불편하다",
        textEn: "Fine if it happens naturally, but not if it's forced",
        scores: { dominance: 50, communication: 65, emotion: 55 },
      },
    ],
  },

  // ─── 심화 질문: 감성과 분위기 (emotion-atmosphere) ───
  {
    id: "ea-9",
    type: "multiple-choice",
    category: "emotion-atmosphere",
    text: "완벽한 밤을 위해 가장 중요한 요소는?",
    textEn: "What's the most important ingredient for a perfect night?",
    choices: [
      {
        id: "ea-9a",
        text: "두 사람만의 특별한 공간",
        textEn: "A special space that's just for the two of us",
        scores: { atmosphere: 90, intimacy: 70 },
      },
      {
        id: "ea-9b",
        text: "서로의 감정이 충분히 무르익은 상태",
        textEn: "Emotions that have fully ripened between us",
        scores: { emotion: 90, intimacy: 75, atmosphere: 55 },
      },
      {
        id: "ea-9c",
        text: "예상치 못한 우연한 기회",
        textEn: "An unexpected, serendipitous opportunity",
        scores: { adventure: 85, atmosphere: 20, sensory: 60 },
      },
      {
        id: "ea-9d",
        text: "서로에 대한 깊은 대화 이후",
        textEn: "Following a deep conversation about each other",
        scores: { communication: 80, emotion: 75, intimacy: 70 },
      },
    ],
  },
  {
    id: "ea-10",
    type: "card-select",
    category: "emotion-atmosphere",
    text: "당신이 만들고 싶은 관계의 색감은?",
    textEn: "If your ideal relationship had a color palette, what would it be?",
    choices: [
      {
        id: "ea-10a",
        text: "따뜻한 앰버 톤 — 안정감과 깊은 교감",
        textEn: "Warm amber — stability and deep connection",
        scores: { emotion: 85, intimacy: 75, atmosphere: 70 },
      },
      {
        id: "ea-10b",
        text: "짙은 레드 톤 — 열정과 강렬한 에너지",
        textEn: "Deep red — passion and intense energy",
        scores: { sensory: 80, adventure: 65, dominance: 60 },
      },
      {
        id: "ea-10c",
        text: "미스터리한 퍼플 톤 — 신비롭고 탐험적인",
        textEn: "Mysterious purple — enigmatic and exploratory",
        scores: { fantasy: 80, atmosphere: 75, adventure: 60 },
      },
      {
        id: "ea-10d",
        text: "투명한 블루 톤 — 자유롭고 가벼운 관계",
        textEn: "Clear blue — free-spirited and light",
        scores: { emotion: 35, adventure: 55, intimacy: 25 },
      },
    ],
  },
  {
    id: "ea-11",
    type: "slider",
    category: "emotion-atmosphere",
    text: "관계에서 '긴장감'은 어떤 의미인가요?",
    textEn: "What does 'tension' mean to you in a relationship?",
    lowLabel: "불편하고 피하고 싶은 것",
    lowLabelEn: "Something uncomfortable I'd rather avoid",
    highLabel: "설레고 매력적인 에너지",
    highLabelEn: "An exciting, magnetic energy",
    sliderDimensions: [{ key: "atmosphere" }, { key: "adventure" }],
  },
  {
    id: "ea-12",
    type: "multiple-choice",
    category: "emotion-atmosphere",
    text: "슬픈 영화를 본 후 파트너와의 시간에 대해?",
    textEn: "After watching a sad movie, how do you feel about spending time with your partner?",
    choices: [
      {
        id: "ea-12a",
        text: "감정이 고조되어 더 깊은 교감이 가능하다",
        textEn: "Heightened emotions make a deeper connection possible",
        scores: { emotion: 90, intimacy: 80, atmosphere: 65 },
      },
      {
        id: "ea-12b",
        text: "감정과 분리하고 다른 분위기를 만든다",
        textEn: "I separate from those feelings and shift the mood",
        scores: { emotion: 30, sensory: 60, dominance: 55 },
      },
      {
        id: "ea-12c",
        text: "감정을 나누는 대화가 먼저 필요하다",
        textEn: "I need to talk through my feelings first",
        scores: { communication: 85, emotion: 75, intimacy: 65 },
      },
      {
        id: "ea-12d",
        text: "그런 날은 조용히 안기기만 하고 싶다",
        textEn: "On nights like that, I just want to be held quietly",
        scores: { emotion: 70, sensory: 55, intimacy: 75, communication: 20 },
      },
    ],
  },

  // ─── 심화 질문: 감각과 체험 (sensory-experience) ───
  {
    id: "se-9",
    type: "multiple-choice",
    category: "sensory-experience",
    text: "음식과 관계를 비유한다면, 당신의 취향은?",
    textEn: "If you compared relationships to food, what's your taste?",
    choices: [
      {
        id: "se-9a",
        text: "매일 먹어도 질리지 않는 편안한 집밥",
        textEn: "Comforting home cooking you never tire of",
        scores: { sensory: 40, intimacy: 80, adventure: 15 },
      },
      {
        id: "se-9b",
        text: "매번 새로운 레스토랑의 코스 요리",
        textEn: "A tasting menu at a different restaurant every time",
        scores: { sensory: 85, adventure: 90, atmosphere: 70 },
      },
      {
        id: "se-9c",
        text: "함께 요리하며 만드는 특별한 한 끼",
        textEn: "A special meal we cook together",
        scores: { sensory: 65, communication: 60, intimacy: 70, emotion: 65 },
      },
      {
        id: "se-9d",
        text: "자극적이고 강렬한 매운 음식",
        textEn: "Bold, fiery spicy food",
        scores: { sensory: 90, adventure: 75, dominance: 60 },
      },
    ],
  },
  {
    id: "se-10",
    type: "card-select",
    category: "sensory-experience",
    text: "다음 중 가장 매력적인 데이트는?",
    textEn: "Which of these dates sounds the most appealing?",
    choices: [
      {
        id: "se-10a",
        text: "고급 스파에서 함께 릴렉스",
        textEn: "Relaxing together at a luxury spa",
        scores: { sensory: 90, atmosphere: 80, intimacy: 55 },
      },
      {
        id: "se-10b",
        text: "야외 어드벤처 (클라이밍, 스쿠버 등)",
        textEn: "An outdoor adventure (climbing, scuba diving, etc.)",
        scores: { adventure: 90, sensory: 65, dominance: 55 },
      },
      {
        id: "se-10c",
        text: "와인바에서 깊은 대화",
        textEn: "Deep conversation at a wine bar",
        scores: { communication: 80, atmosphere: 75, emotion: 70 },
      },
    ],
  },
  {
    id: "se-11",
    type: "slider",
    category: "sensory-experience",
    text: "물리적 끌림 vs 지적 끌림, 어디에 더 무게를 두나요?",
    textEn: "Physical attraction vs. intellectual attraction — where does the balance tip for you?",
    lowLabel: "마음과 지성이 끌려야 한다",
    lowLabelEn: "The mind and intellect must attract me first",
    highLabel: "본능적이고 물리적인 끌림이 우선",
    highLabelEn: "Instinctive, physical attraction comes first",
    sliderDimensions: [{ key: "sensory" }, { key: "emotion", inverted: true }],
  },
  {
    id: "se-12",
    type: "multiple-choice",
    category: "sensory-experience",
    text: "감각적 경험의 '강도'를 고를 수 있다면?",
    textEn: "If you could choose the 'intensity' of a sensory experience?",
    choices: [
      {
        id: "se-12a",
        text: "부드럽고 느린 페이스로 섬세하게",
        textEn: "Gentle and slow-paced, with delicate attention",
        scores: { sensory: 65, emotion: 75, atmosphere: 70 },
      },
      {
        id: "se-12b",
        text: "점점 고조되는 드라마틱한 흐름",
        textEn: "A dramatic build that gradually intensifies",
        scores: { sensory: 80, atmosphere: 80, fantasy: 60 },
      },
      {
        id: "se-12c",
        text: "처음부터 강렬하고 직접적으로",
        textEn: "Intense and direct from the very start",
        scores: { sensory: 90, dominance: 70, adventure: 65 },
      },
      {
        id: "se-12d",
        text: "상대방의 에너지에 맞춰서 유동적으로",
        textEn: "Fluid and adaptive, matching my partner's energy",
        scores: { sensory: 55, emotion: 65, communication: 60 },
      },
    ],
  },

  // ─── 심화 질문: 친밀감과 신뢰 (intimacy-trust) ───
  {
    id: "it-9",
    type: "multiple-choice",
    category: "intimacy-trust",
    text: "오랜 관계에서 친밀감을 유지하는 비결은?",
    textEn: "What's the secret to keeping intimacy alive in a long-term relationship?",
    choices: [
      {
        id: "it-9a",
        text: "끊임없이 서로를 알아가려는 노력",
        textEn: "Continuously making the effort to learn about each other",
        scores: { intimacy: 90, communication: 80, emotion: 70 },
      },
      {
        id: "it-9b",
        text: "새로운 경험을 함께 시도하며 신선함 유지",
        textEn: "Keeping things fresh by trying new experiences together",
        scores: { intimacy: 60, adventure: 85, sensory: 55 },
      },
      {
        id: "it-9c",
        text: "적당한 거리감과 개인 시간의 균형",
        textEn: "Balancing personal space and time apart",
        scores: { intimacy: 40, dominance: 50, emotion: 35 },
      },
      {
        id: "it-9d",
        text: "감정적 교감을 최우선으로 돌보기",
        textEn: "Prioritizing emotional connection above all else",
        scores: { intimacy: 80, emotion: 90, communication: 60 },
      },
    ],
  },
  {
    id: "it-10",
    type: "card-select",
    category: "intimacy-trust",
    text: "파트너가 깊은 상처를 고백했을 때?",
    textEn: "When your partner opens up about a deep wound, how do you respond?",
    choices: [
      {
        id: "it-10a",
        text: "말없이 꼭 안아주며 함께 있어준다",
        textEn: "I hold them tight without saying a word",
        scores: { emotion: 85, intimacy: 90, communication: 25 },
      },
      {
        id: "it-10b",
        text: "진심 어린 대화로 함께 헤쳐나간다",
        textEn: "I work through it together with heartfelt conversation",
        scores: { communication: 90, intimacy: 85, emotion: 75 },
      },
      {
        id: "it-10c",
        text: "기분 전환을 위한 새로운 활동을 제안한다",
        textEn: "I suggest a new activity to help lift their spirits",
        scores: { adventure: 65, dominance: 60, emotion: 45, intimacy: 50 },
      },
    ],
  },
  {
    id: "it-11",
    type: "slider",
    category: "intimacy-trust",
    text: "관계에서 독점욕에 대한 당신의 태도는?",
    textEn: "How do you feel about exclusivity in a relationship?",
    lowLabel: "자유롭고 열린 관계를 지향한다",
    lowLabelEn: "I believe in open, free relationships",
    highLabel: "나만의 특별한 사람이어야 한다",
    highLabelEn: "They should be mine and mine alone",
    sliderDimensions: [{ key: "intimacy" }],
  },
  {
    id: "it-12",
    type: "multiple-choice",
    category: "intimacy-trust",
    text: "관계에서 가장 두려운 것은?",
    textEn: "What's your biggest fear in a relationship?",
    choices: [
      {
        id: "it-12a",
        text: "상대에게 진심을 보여줬는데 거절당하는 것",
        textEn: "Showing my true self and being rejected",
        scores: { intimacy: 85, emotion: 90, communication: 55 },
      },
      {
        id: "it-12b",
        text: "관계가 지루해져서 열정이 식는 것",
        textEn: "The relationship becoming boring and the passion fading",
        scores: { adventure: 80, sensory: 65, intimacy: 50 },
      },
      {
        id: "it-12c",
        text: "자유와 독립성을 잃는 것",
        textEn: "Losing my freedom and independence",
        scores: { intimacy: 25, dominance: 60, adventure: 70 },
      },
      {
        id: "it-12d",
        text: "서로를 완전히 이해하지 못한 채 끝나는 것",
        textEn: "It ending before we truly understood each other",
        scores: { communication: 85, intimacy: 75, emotion: 70 },
      },
    ],
  },

  // ─── 심화 질문: 판타지와 상상 (fantasy-imagination) ───
  {
    id: "fi-9",
    type: "multiple-choice",
    category: "fantasy-imagination",
    text: "꿈에서 자주 등장하는 관계의 모습은?",
    textEn: "What kind of relationship scenarios appear in your dreams?",
    choices: [
      {
        id: "fi-9a",
        text: "낯선 이국적인 장소에서의 운명적 만남",
        textEn: "A fateful encounter in an exotic, unfamiliar place",
        scores: { fantasy: 90, adventure: 85, atmosphere: 70 },
      },
      {
        id: "fi-9b",
        text: "오래된 연인과의 깊고 편안한 순간",
        textEn: "A deep, comfortable moment with a long-time partner",
        scores: { fantasy: 45, intimacy: 85, emotion: 80 },
      },
      {
        id: "fi-9c",
        text: "현실에서는 할 수 없는 대담한 경험",
        textEn: "A daring experience that wouldn't happen in real life",
        scores: { fantasy: 95, adventure: 80, dominance: 65 },
      },
      {
        id: "fi-9d",
        text: "특별한 꿈을 꾸지 않는다",
        textEn: "I don't really have those kinds of dreams",
        scores: { fantasy: 10, sensory: 55 },
      },
    ],
  },
  {
    id: "fi-10",
    type: "card-select",
    category: "fantasy-imagination",
    text: "파트너가 새로운 판타지를 제안했을 때?",
    textEn: "When your partner suggests a new fantasy, how do you react?",
    choices: [
      {
        id: "fi-10a",
        text: "호기심이 생겨 적극적으로 동참한다",
        textEn: "I'm curious and jump in enthusiastically",
        scores: { fantasy: 85, adventure: 80, communication: 60 },
      },
      {
        id: "fi-10b",
        text: "내 판타지도 공유하며 서로 조율한다",
        textEn: "I share mine too and we find common ground",
        scores: { fantasy: 75, communication: 85, intimacy: 70 },
      },
      {
        id: "fi-10c",
        text: "상상으로는 좋지만 실행은 천천히 생각한다",
        textEn: "Fun to imagine, but I'd take it slow before actually doing it",
        scores: { fantasy: 60, adventure: 30, emotion: 55 },
      },
      {
        id: "fi-10d",
        text: "불편할 수 있어서 솔직히 거절한다",
        textEn: "I'd honestly decline if it felt uncomfortable",
        scores: { fantasy: 20, communication: 70, intimacy: 45 },
      },
    ],
  },
  {
    id: "fi-11",
    type: "slider",
    category: "fantasy-imagination",
    text: "관계에서 '미스터리'와 '투명성' 사이의 선호는?",
    textEn: "Where do you fall between 'mystery' and 'transparency' in a relationship?",
    lowLabel: "모든 것을 투명하게 공유한다",
    lowLabelEn: "I share everything openly",
    highLabel: "약간의 미스터리가 매력을 유지한다",
    highLabelEn: "A little mystery keeps the attraction alive",
    sliderDimensions: [{ key: "fantasy" }, { key: "intimacy", inverted: true }],
  },
  {
    id: "fi-12",
    type: "multiple-choice",
    category: "fantasy-imagination",
    text: "만약 하루 동안 다른 사람이 될 수 있다면?",
    textEn: "If you could be someone else for a day, what would you choose?",
    choices: [
      {
        id: "fi-12a",
        text: "파트너의 입장이 되어 나를 바라보고 싶다",
        textEn: "I'd want to see myself through my partner's eyes",
        scores: { fantasy: 70, emotion: 85, intimacy: 80 },
      },
      {
        id: "fi-12b",
        text: "전혀 다른 삶을 사는 사람을 경험해보고 싶다",
        textEn: "I'd experience the life of someone completely different",
        scores: { fantasy: 90, adventure: 90 },
      },
      {
        id: "fi-12c",
        text: "더 자신감 있고 대담한 버전의 나를 경험하고 싶다",
        textEn: "I'd become a bolder, more confident version of myself",
        scores: { fantasy: 75, dominance: 80, adventure: 60 },
      },
      {
        id: "fi-12d",
        text: "나 자신으로 충분하다, 바꾸고 싶지 않다",
        textEn: "I'm enough as I am — I wouldn't want to change",
        scores: { fantasy: 15, intimacy: 60, emotion: 50 },
      },
    ],
  },

  // ─── 심화 질문: 소통과 표현 (expression-connection) ───
  {
    id: "ec-9",
    type: "multiple-choice",
    category: "expression-connection",
    text: "파트너와 가장 깊이 연결된다고 느끼는 순간은?",
    textEn: "When do you feel the deepest connection with your partner?",
    choices: [
      {
        id: "ec-9a",
        text: "밤새 서로의 이야기를 나누는 깊은 대화",
        textEn: "Talking through the night, sharing each other's stories",
        scores: { communication: 90, intimacy: 85, emotion: 75 },
      },
      {
        id: "ec-9b",
        text: "말 없이도 통하는 눈빛의 교환",
        textEn: "An exchange of glances that says everything without words",
        scores: { communication: 20, intimacy: 80, emotion: 85, sensory: 60 },
      },
      {
        id: "ec-9c",
        text: "함께 극한 상황을 극복한 후의 유대감",
        textEn: "The bond forged after overcoming a challenge together",
        scores: { adventure: 80, intimacy: 70, dominance: 55, communication: 45 },
      },
      {
        id: "ec-9d",
        text: "물리적 친밀함 이후의 나른한 교감",
        textEn: "The drowsy tenderness that follows physical closeness",
        scores: { sensory: 75, intimacy: 65, emotion: 60, communication: 40 },
      },
    ],
  },
  {
    id: "ec-10",
    type: "card-select",
    category: "expression-connection",
    text: "사랑의 언어 중 당신에게 가장 와닿는 것은?",
    textEn: "Which love language resonates with you the most?",
    choices: [
      {
        id: "ec-10a",
        text: "인정하는 말 — 진심 어린 칭찬과 격려",
        textEn: "Words of affirmation — heartfelt praise and encouragement",
        scores: { communication: 90, emotion: 75 },
      },
      {
        id: "ec-10b",
        text: "스킨십 — 손잡기, 안아주기, 쓰다듬기",
        textEn: "Physical touch — holding hands, hugs, caresses",
        scores: { sensory: 85, intimacy: 70, communication: 25 },
      },
      {
        id: "ec-10c",
        text: "함께하는 시간 — 온전히 집중하는 시간",
        textEn: "Quality time — fully focused, undivided attention",
        scores: { intimacy: 80, emotion: 70, atmosphere: 60 },
      },
      {
        id: "ec-10d",
        text: "서비스 행동 — 무언가를 해주는 배려",
        textEn: "Acts of service — thoughtful gestures and caring actions",
        scores: { emotion: 65, dominance: 40, intimacy: 60, communication: 30 },
      },
    ],
  },
  {
    id: "ec-11",
    type: "slider",
    category: "expression-connection",
    text: "관계에서 유머와 장난의 비중은?",
    textEn: "How big a role do humor and playfulness play in your relationship?",
    lowLabel: "진지하고 깊은 교류가 좋다",
    lowLabelEn: "I prefer serious, meaningful exchanges",
    highLabel: "유머와 장난이 관계의 핵심이다",
    highLabelEn: "Humor and playfulness are the heart of it",
    sliderDimensions: [{ key: "communication" }, { key: "adventure" }],
  },
  {
    id: "ec-12",
    type: "multiple-choice",
    category: "expression-connection",
    text: "관계에서 가장 중요한 소통의 순간은?",
    textEn: "What's the most important moment of communication in a relationship?",
    choices: [
      {
        id: "ec-12a",
        text: "서로의 경계와 욕구를 확인할 때",
        textEn: "When we check in about boundaries and desires",
        scores: { communication: 95, intimacy: 75, dominance: 55 },
      },
      {
        id: "ec-12b",
        text: "감정적으로 힘들 때 서로 위로할 때",
        textEn: "When we comfort each other during tough times",
        scores: { emotion: 90, communication: 70, intimacy: 80 },
      },
      {
        id: "ec-12c",
        text: "새로운 시도를 함께 계획할 때",
        textEn: "When we plan new things to try together",
        scores: { communication: 75, adventure: 80, fantasy: 55 },
      },
      {
        id: "ec-12d",
        text: "일상적인 것을 공유하며 편안해질 때",
        textEn: "When we share everyday things and just feel at ease",
        scores: { communication: 55, intimacy: 70, emotion: 60 },
      },
    ],
  },
];

/**
 * Question → new category & tier mapping for the adaptive engine.
 * Each question belongs to exactly one of the 10 fine-grained categories.
 * Tier: 1=core, 2=deepening, 3=differentiating
 */
export const questionMeta: Record<string, QuestionMeta> = {
  // ── power-dynamics (주도와 리드) ──
  "rr-1":  { category: "power-dynamics",    tier: 1, primaryDimensions: ["dominance", "communication"] },
  "rr-2":  { category: "power-dynamics",    tier: 1, primaryDimensions: ["dominance"] },
  "rr-4":  { category: "power-dynamics",    tier: 2, primaryDimensions: ["dominance", "communication"] },
  "rr-6":  { category: "power-dynamics",    tier: 2, primaryDimensions: ["dominance", "communication"] },
  "rr-8":  { category: "power-dynamics",    tier: 2, primaryDimensions: ["dominance", "communication"] },
  "rr-9":  { category: "power-dynamics",    tier: 3, primaryDimensions: ["dominance", "communication"] },
  "rr-11": { category: "power-dynamics",    tier: 3, primaryDimensions: ["dominance", "communication"] },
  "rr-12": { category: "power-dynamics",    tier: 3, primaryDimensions: ["dominance", "adventure", "fantasy"] },

  // ── emotional-depth (감정의 깊이) ──
  "ea-4":  { category: "emotional-depth",   tier: 1, primaryDimensions: ["emotion", "intimacy"] },
  "ea-5":  { category: "emotional-depth",   tier: 1, primaryDimensions: ["emotion"] },
  "it-4":  { category: "emotional-depth",   tier: 2, primaryDimensions: ["emotion", "intimacy", "dominance"] },
  "it-5":  { category: "emotional-depth",   tier: 2, primaryDimensions: ["emotion"] },
  "ea-8":  { category: "emotional-depth",   tier: 2, primaryDimensions: ["emotion", "atmosphere"] },
  "ea-12": { category: "emotional-depth",   tier: 3, primaryDimensions: ["emotion", "communication", "intimacy"] },

  // ── sensory-world (감각의 세계) ──
  "se-1":  { category: "sensory-world",     tier: 1, primaryDimensions: ["sensory", "emotion"] },
  "se-3":  { category: "sensory-world",     tier: 1, primaryDimensions: ["sensory"] },
  "ea-6":  { category: "sensory-world",     tier: 2, primaryDimensions: ["sensory", "communication", "atmosphere"] },
  "se-8":  { category: "sensory-world",     tier: 2, primaryDimensions: ["sensory"] },
  "se-11": { category: "sensory-world",     tier: 3, primaryDimensions: ["sensory", "emotion"] },
  "se-12": { category: "sensory-world",     tier: 3, primaryDimensions: ["sensory", "emotion", "atmosphere", "dominance"] },

  // ── atmosphere-mood (분위기와 연출) ──
  "ea-1":  { category: "atmosphere-mood",   tier: 1, primaryDimensions: ["atmosphere", "emotion"] },
  "ea-3":  { category: "atmosphere-mood",   tier: 1, primaryDimensions: ["atmosphere"] },
  "ea-7":  { category: "atmosphere-mood",   tier: 2, primaryDimensions: ["atmosphere", "adventure", "communication"] },
  "ea-9":  { category: "atmosphere-mood",   tier: 2, primaryDimensions: ["atmosphere", "emotion", "intimacy"] },
  "ea-11": { category: "atmosphere-mood",   tier: 3, primaryDimensions: ["atmosphere", "adventure"] },
  "rr-10": { category: "atmosphere-mood",   tier: 3, primaryDimensions: ["dominance", "atmosphere", "adventure"] },

  // ── adventure-thrill (모험과 도전) ──
  "se-2":  { category: "adventure-thrill",  tier: 1, primaryDimensions: ["adventure", "sensory"] },
  "se-5":  { category: "adventure-thrill",  tier: 1, primaryDimensions: ["adventure"] },
  "se-4":  { category: "adventure-thrill",  tier: 2, primaryDimensions: ["adventure", "sensory", "emotion"] },
  "se-6":  { category: "adventure-thrill",  tier: 2, primaryDimensions: ["adventure", "sensory", "communication"] },
  "fi-5":  { category: "adventure-thrill",  tier: 2, primaryDimensions: ["adventure"] },
  "se-7":  { category: "adventure-thrill",  tier: 3, primaryDimensions: ["adventure", "atmosphere", "sensory"] },

  // ── verbal-expression (언어와 소통) ──
  "rr-5":  { category: "verbal-expression", tier: 1, primaryDimensions: ["communication"] },
  "ec-1":  { category: "verbal-expression", tier: 1, primaryDimensions: ["communication", "sensory", "atmosphere"] },
  "ec-2":  { category: "verbal-expression", tier: 1, primaryDimensions: ["communication"] },
  "ec-4":  { category: "verbal-expression", tier: 2, primaryDimensions: ["communication", "emotion", "dominance"] },
  "ec-6":  { category: "verbal-expression", tier: 2, primaryDimensions: ["communication", "intimacy", "atmosphere"] },
  "ec-7":  { category: "verbal-expression", tier: 2, primaryDimensions: ["communication", "dominance", "fantasy"] },
  "ec-8":  { category: "verbal-expression", tier: 3, primaryDimensions: ["communication", "intimacy"] },
  "rr-3":  { category: "verbal-expression", tier: 3, primaryDimensions: ["communication", "dominance", "sensory"] },

  // ── intimacy-bond (친밀감과 유대) ──
  "it-1":  { category: "intimacy-bond",     tier: 1, primaryDimensions: ["intimacy", "emotion", "communication"] },
  "it-2":  { category: "intimacy-bond",     tier: 1, primaryDimensions: ["intimacy"] },
  "it-3":  { category: "intimacy-bond",     tier: 2, primaryDimensions: ["intimacy", "emotion", "adventure"] },
  "it-6":  { category: "intimacy-bond",     tier: 2, primaryDimensions: ["intimacy", "communication", "fantasy"] },
  "it-8":  { category: "intimacy-bond",     tier: 2, primaryDimensions: ["intimacy", "adventure"] },
  "ec-5":  { category: "intimacy-bond",     tier: 2, primaryDimensions: ["intimacy"] },
  "it-9":  { category: "intimacy-bond",     tier: 3, primaryDimensions: ["intimacy", "communication", "adventure"] },
  "it-11": { category: "intimacy-bond",     tier: 3, primaryDimensions: ["intimacy"] },
  "it-12": { category: "intimacy-bond",     tier: 3, primaryDimensions: ["intimacy", "emotion", "adventure", "communication"] },

  // ── fantasy-imagination (상상과 판타지) ──
  "fi-1":  { category: "fantasy-imagination", tier: 1, primaryDimensions: ["fantasy", "atmosphere", "adventure"] },
  "fi-2":  { category: "fantasy-imagination", tier: 1, primaryDimensions: ["fantasy"] },
  "fi-3":  { category: "fantasy-imagination", tier: 2, primaryDimensions: ["fantasy", "adventure"] },
  "fi-4":  { category: "fantasy-imagination", tier: 2, primaryDimensions: ["fantasy", "adventure"] },
  "fi-6":  { category: "fantasy-imagination", tier: 2, primaryDimensions: ["fantasy", "adventure", "sensory"] },
  "fi-7":  { category: "fantasy-imagination", tier: 3, primaryDimensions: ["fantasy", "emotion", "intimacy", "dominance"] },
  "fi-8":  { category: "fantasy-imagination", tier: 2, primaryDimensions: ["fantasy", "communication"] },
  "fi-9":  { category: "fantasy-imagination", tier: 3, primaryDimensions: ["fantasy", "adventure", "intimacy"] },
  "fi-12": { category: "fantasy-imagination", tier: 3, primaryDimensions: ["fantasy", "emotion", "adventure", "dominance"] },

  // ── trust-vulnerability (신뢰와 솔직함) ──
  "it-7":  { category: "trust-vulnerability", tier: 1, primaryDimensions: ["intimacy", "emotion", "communication"] },
  "it-10": { category: "trust-vulnerability", tier: 1, primaryDimensions: ["emotion", "intimacy", "communication"] },
  "ea-2":  { category: "trust-vulnerability", tier: 2, primaryDimensions: ["emotion", "atmosphere", "sensory"] },
  "ec-9":  { category: "trust-vulnerability", tier: 2, primaryDimensions: ["communication", "intimacy", "emotion"] },
  "rr-7":  { category: "trust-vulnerability", tier: 2, primaryDimensions: ["dominance", "communication", "emotion"] },
  "ec-12": { category: "trust-vulnerability", tier: 3, primaryDimensions: ["communication", "emotion", "intimacy", "adventure"] },
  "fi-10": { category: "trust-vulnerability", tier: 3, primaryDimensions: ["fantasy", "adventure", "communication"] },

  // ── passion-intensity (열정과 온도) ──
  "se-9":  { category: "passion-intensity",  tier: 1, primaryDimensions: ["sensory", "intimacy", "adventure"] },
  "ea-10": { category: "passion-intensity",  tier: 1, primaryDimensions: ["emotion", "sensory", "fantasy"] },
  "se-10": { category: "passion-intensity",  tier: 2, primaryDimensions: ["sensory", "adventure", "communication"] },
  "ec-3":  { category: "passion-intensity",  tier: 2, primaryDimensions: ["communication", "adventure", "intimacy"] },
  "ec-10": { category: "passion-intensity",  tier: 2, primaryDimensions: ["communication", "sensory", "intimacy"] },
  "ec-11": { category: "passion-intensity",  tier: 3, primaryDimensions: ["communication", "adventure"] },
  "fi-11": { category: "passion-intensity",  tier: 3, primaryDimensions: ["fantasy", "intimacy"] },
};

/** Questions per category by difficulty (for legacy mode) */
const questionsPerCategory = {
  beginner: 3,
  intermediate: 5,
  expert: 8,
} as const;

export type Difficulty = "beginner" | "intermediate" | "expert";

/**
 * Get questions by category using the new meta mapping.
 * Returns questions from selected categories, sorted by tier.
 */
export function getQuestionsByCategories(
  categoryIds: string[],
  difficulty: Difficulty = "intermediate"
): Question[] {
  const limit = questionsPerCategory[difficulty];
  const categorySet = new Set(categoryIds);

  // Group questions by their new category
  const byCategory: Record<string, { question: Question; tier: number }[]> = {};

  for (const q of questions) {
    const meta = questionMeta[q.id];
    if (!meta) continue;
    if (!categorySet.has(meta.category)) continue;

    if (!byCategory[meta.category]) byCategory[meta.category] = [];
    byCategory[meta.category].push({ question: q, tier: meta.tier });
  }

  const result: Question[] = [];

  for (const catId of categoryIds) {
    const catQuestions = byCategory[catId] || [];
    // Sort by tier so core questions come first
    catQuestions.sort((a, b) => a.tier - b.tier);
    result.push(...catQuestions.slice(0, limit).map((c) => c.question));
  }

  return result;
}

/**
 * Get all questions available for the adaptive engine.
 * Includes questions from selected categories + supplement pool.
 */
export function getAdaptiveQuestionPool(
  selectedCategories: string[]
): Question[] {
  const categorySet = new Set(selectedCategories);
  const primary: Question[] = [];
  const supplement: Question[] = [];

  for (const q of questions) {
    const meta = questionMeta[q.id];
    if (!meta) continue;

    if (categorySet.has(meta.category)) {
      primary.push(q);
    } else {
      supplement.push(q);
    }
  }

  return [...primary, ...supplement];
}
