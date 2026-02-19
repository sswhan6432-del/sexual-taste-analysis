export interface ArchetypeProfile {
  dominance: number;
  emotion: number;
  adventure: number;
  sensory: number;
  atmosphere: number;
  communication: number;
  intimacy: number;
  fantasy: number;
}

export interface Archetype {
  id: string;
  name: string;
  nameEn: string;
  numeral: string;
  description: string;
  descriptionEn: string;
  detailDescription: string;
  detailDescriptionEn: string;
  profile: ArchetypeProfile;
  compatibleTypes: string[];
  color: string;
}

export const archetypes: Archetype[] = [
  {
    id: "passionate-explorer",
    name: "열정적 탐험가",
    nameEn: "Passionate Explorer",
    numeral: "I",
    description: "설렘의 미지를 향해 파트너의 손을 잡고 뛰어드는 탐험가",
    descriptionEn: "An explorer who takes their partner's hand and dives into uncharted connection",
    detailDescription:
      "당신은 관계 속에서 끊임없이 새로운 설렘의 지도를 그리는 사람입니다. '해본 적 없는 것'이라는 말에 심장이 뛰고, 파트너에게서 아직 발견하지 못한 감성의 영역을 탐구하는 것에 끌립니다. 주도적으로 이끌되, 그 여정 자체가 둘만의 비밀스러운 모험이 됩니다.",
    detailDescriptionEn:
      "You're someone who constantly maps new territories of connection. The phrase 'never tried before' makes your heart race, and you're drawn to discovering uncharted emotional realms with your partner. You lead the way, but the journey itself becomes a secret adventure for two.",
    profile: {
      dominance: 80,
      emotion: 50,
      adventure: 90,
      sensory: 65,
      atmosphere: 45,
      communication: 55,
      intimacy: 50,
      fantasy: 70,
    },
    compatibleTypes: ["tender-guardian", "romantic-dreamer", "deep-connector"],
    color: "#C9A96E",
  },
  {
    id: "romantic-dreamer",
    name: "로맨틱 드리머",
    nameEn: "Romantic Dreamer",
    numeral: "II",
    description: "촛불 아래 속삭이는 감성, 감정이 곧 연결의 시작인 로맨티스트",
    descriptionEn: "A romanticist whose emotions are the ultimate connection, whispering heart to heart by candlelight",
    detailDescription:
      "당신에게 진정한 교감은 몸이 아닌 마음에서 시작됩니다. 눈빛이 마주치는 순간의 전율, 손끝이 닿기 직전의 긴장감, 귓가에 닿는 뜨거운 숨결 — 이 모든 감정적 전주곡이 충분해야만 마음이 열립니다. 완벽한 분위기 속에서 상상 이상의 순간을 꿈꾸는 당신, 감정이 깊을수록 연결도 깊어집니다.",
    detailDescriptionEn:
      "For you, true connection begins in the heart, not the body. The thrill of locking eyes, the tension just before fingertips touch, the warm breath on your ear — all these emotional preludes must be fulfilled before your heart opens. Dreaming of a moment beyond imagination in the perfect atmosphere, the deeper the emotion, the deeper the connection.",
    profile: {
      dominance: 35,
      emotion: 90,
      adventure: 45,
      sensory: 55,
      atmosphere: 85,
      communication: 60,
      intimacy: 75,
      fantasy: 85,
    },
    compatibleTypes: [
      "passionate-explorer",
      "gentle-commander",
      "dreamy-artist",
    ],
    color: "#A68B4B",
  },
  {
    id: "sensory-aesthete",
    name: "감각의 미학자",
    nameEn: "Sensory Aesthete",
    numeral: "III",
    description: "피부 위를 흐르는 손끝의 궤적까지 예술로 만드는 감각주의자",
    descriptionEn: "A sensualist who turns every fingertip tracing across skin into art",
    detailDescription:
      "당신에게 교감은 예술입니다. 실크 위의 피부 감촉, 어둠 속에서 더 선명해지는 향기, 귀를 간지르는 숨소리 — 오감의 모든 채널이 활짝 열려있어야 깊은 몰입에 닿습니다. 조명의 각도, 시트의 질감, 방 안의 온도까지 — 모든 감각적 요소가 완벽하게 조율된 순간에만 진정한 몰입을 허락합니다.",
    detailDescriptionEn:
      "For you, connection is art. The feel of skin on silk, scents that sharpen in the dark, breath that tickles your ear — all five senses must be wide open to reach deep immersion. The angle of light, the texture of sheets, the temperature of the room — only when every sensory element is perfectly orchestrated do you allow true immersion.",
    profile: {
      dominance: 45,
      emotion: 60,
      adventure: 40,
      sensory: 90,
      atmosphere: 90,
      communication: 40,
      intimacy: 55,
      fantasy: 60,
    },
    compatibleTypes: [
      "charismatic-director",
      "dreamy-artist",
      "harmonious-partner",
    ],
    color: "#DEC598",
  },
  {
    id: "gentle-commander",
    name: "부드러운 지배자",
    nameEn: "Gentle Commander",
    numeral: "IV",
    description: "파트너를 이끌되 그 안에서 마음을 열게 만드는 부드러운 리더",
    descriptionEn: "A gentle leader who guides yet makes their partner open up with warmth",
    detailDescription:
      "당신의 리드는 강요가 아닌 유혹입니다. 파트너의 손을 잡는 그립에서 느껴지는 단단함, 그러나 그 눈빛에서 읽히는 따뜻한 열망 — 이 모순이 상대를 무장해제시킵니다. 관계에서 당신이 원하는 것을 정확히 알고 있고, 그것을 파트너에게 안전하게 경험하게 해주는 것이 당신의 능력입니다.",
    detailDescriptionEn:
      "Your lead is seduction, not force. The firmness in how you hold your partner's hand, yet the warm desire read in your eyes — this contradiction disarms them completely. You know exactly what you want in relationships, and your gift is letting your partner experience it safely.",
    profile: {
      dominance: 85,
      emotion: 80,
      adventure: 55,
      sensory: 55,
      atmosphere: 60,
      communication: 70,
      intimacy: 70,
      fantasy: 45,
    },
    compatibleTypes: [
      "romantic-dreamer",
      "tender-guardian",
      "deep-connector",
    ],
    color: "#8B7340",
  },
  {
    id: "deep-connector",
    name: "깊은 교감자",
    nameEn: "Deep Connector",
    numeral: "V",
    description: "영혼까지 나눠야 진짜 교감이 시작되는 깊은 연결의 중독자",
    descriptionEn: "An addict of deep connection who needs to bare souls before true connection begins",
    detailDescription:
      "당신에게 피상적인 만남은 빈 껍데기입니다. 상대의 가장 깊은 내면을 알고, 가장 취약한 순간을 함께 나눌 수 있을 때 — 그때서야 진짜 교감이 시작됩니다. 서로의 이야기를 말로 꺼내놓고, 서로를 함께 이해하는 대화 자체가 당신에게는 가장 강렬한 연결의 시작입니다.",
    detailDescriptionEn:
      "For you, a shallow encounter is an empty shell. Only when you know your partner's deepest inner world and share your most vulnerable moments together — that's when real connection begins. Voicing each other's stories and understanding each other deeply is, for you, the most intense form of bonding.",
    profile: {
      dominance: 50,
      emotion: 75,
      adventure: 35,
      sensory: 40,
      atmosphere: 55,
      communication: 90,
      intimacy: 90,
      fantasy: 35,
    },
    compatibleTypes: [
      "gentle-commander",
      "tender-guardian",
      "harmonious-partner",
    ],
    color: "#E8DCC8",
  },
  {
    id: "free-spirit",
    name: "자유로운 영혼",
    nameEn: "Free Spirit",
    numeral: "VI",
    description: "누구에게도 묶이지 않지만 모두를 매혹하는 설렘의 유목민",
    descriptionEn: "A nomad of sensation who captivates everyone yet belongs to no one",
    detailDescription:
      "당신은 한 사람에게 정착하기엔 세상에 경험할 것이 너무 많다고 느낍니다. 지금 이 순간의 파트너와 만드는 불꽃 같은 순간, 그리고 다음 날 아무런 미련 없이 돌아서는 자유 — 이 조합이 당신의 관계 방식을 정의합니다. 가볍지만 강렬한, 자유롭지만 잊히지 않는 순간을 선사합니다.",
    detailDescriptionEn:
      "You feel there's too much to experience to settle for just one person. The spark-like moment with your current partner, followed by walking away without regret the next day — this combination defines your way of connecting. You deliver moments that are light yet intense, free yet unforgettable.",
    profile: {
      dominance: 55,
      emotion: 35,
      adventure: 85,
      sensory: 60,
      atmosphere: 30,
      communication: 45,
      intimacy: 25,
      fantasy: 65,
    },
    compatibleTypes: [
      "passionate-explorer",
      "spontaneous-hedonist",
      "secret-fantasist",
    ],
    color: "#C9A96E",
  },
  {
    id: "secret-fantasist",
    name: "은밀한 판타지스트",
    nameEn: "Secret Fantasist",
    numeral: "VII",
    description: "겉은 단정하지만 머릿속은 이미 검열 불가인 비밀의 상상가",
    descriptionEn: "Prim on the outside, uncensored on the inside — a secret dreamer of forbidden scenarios",
    detailDescription:
      "아무도 모릅니다. 지금 이 순간에도 당신의 머릿속에서는 누군가를 상대로 한 정교한 시나리오가 상영 중이라는 것을. 말로 꺼내지 못하는 감정일수록 더 강렬하게 상상하고, 그 판타지의 디테일은 놀라울 정도로 선명합니다. 당신의 진짜 세계는 현실이 아닌 상상 속에 있습니다 — 아직은.",
    detailDescriptionEn:
      "Nobody knows. Even at this very moment, an elaborate scenario is playing in your mind. The more unexpressed the feeling, the more intensely you imagine it, and the details of those fantasies are astonishingly vivid. Your true world lives in imagination, not reality — for now.",
    profile: {
      dominance: 40,
      emotion: 45,
      adventure: 55,
      sensory: 50,
      atmosphere: 65,
      communication: 20,
      intimacy: 45,
      fantasy: 95,
    },
    compatibleTypes: [
      "free-spirit",
      "dreamy-artist",
      "passionate-explorer",
    ],
    color: "#A68B4B",
  },
  {
    id: "harmonious-partner",
    name: "조화의 동반자",
    nameEn: "Harmonious Partner",
    numeral: "VIII",
    description: "파트너가 원하는 것이면 무엇이든 맞춰줄 수 있는 만능 연인",
    descriptionEn: "A versatile lover who can match whatever their partner desires",
    detailDescription:
      "당신의 가장 강력한 무기는 '적응력'입니다. 파트너가 강한 에너지를 원하면 강하게, 부드러운 연결을 원하면 부드럽게 — 상대의 마음을 읽고 거울처럼 반영하는 능력이 있습니다. 극단적인 한 가지에 매몰되지 않기에 어떤 유형의 파트너와도 케미가 맞으며, 관계에서의 다재다능함이 당신의 매력입니다.",
    detailDescriptionEn:
      "Your greatest weapon is adaptability. Energetic when they want energy, gentle when they want gentleness — you have the ability to read and mirror your partner's needs. Never stuck in one extreme, you have chemistry with any type, and your versatility in relationships is your charm.",
    profile: {
      dominance: 50,
      emotion: 60,
      adventure: 45,
      sensory: 50,
      atmosphere: 60,
      communication: 60,
      intimacy: 65,
      fantasy: 40,
    },
    compatibleTypes: [
      "deep-connector",
      "sensory-aesthete",
      "tender-guardian",
    ],
    color: "#DEC598",
  },
  {
    id: "spontaneous-hedonist",
    name: "즉흥의 탐험가",
    nameEn: "Spontaneous Explorer",
    numeral: "IX",
    description: "계획은 없지만 본능만으로도 순간을 달궈버리는 즉흥의 탐험가",
    descriptionEn: "No plans needed — pure instinct that ignites the moment",
    detailDescription:
      "당신에게 '분위기 만들기'는 불필요합니다. 설렘이 느껴지는 그 순간, 그 장소가 곧 무대가 됩니다. 어떤 상황에서든 — 순간적으로 치솟는 에너지에 즉각 반응하는 것이 당신의 방식입니다. 감각적 강렬함을 최우선으로 추구하며, 예측 불가능한 순간에 가장 빛납니다.",
    detailDescriptionEn:
      "Setting the mood is unnecessary for you. The moment connection sparks, that place becomes your stage. Anywhere, anytime — instantly responding to surging energy is your way. Sensory intensity is your top priority, and you shine brightest in unpredictable moments.",
    profile: {
      dominance: 60,
      emotion: 30,
      adventure: 80,
      sensory: 85,
      atmosphere: 20,
      communication: 35,
      intimacy: 30,
      fantasy: 50,
    },
    compatibleTypes: [
      "free-spirit",
      "passionate-explorer",
      "sensory-aesthete",
    ],
    color: "#C9A96E",
  },
  {
    id: "tender-guardian",
    name: "다정한 수호자",
    nameEn: "Tender Guardian",
    numeral: "X",
    description: "당신을 온전히 맡겨도 안전한, 마음과 영혼을 감싸는 수호자",
    descriptionEn: "A guardian who wraps heart and soul in safety — you can surrender completely",
    detailDescription:
      "당신은 파트너가 모든 것을 내려놓을 수 있는 안전한 품입니다. '괜찮아, 다 받아줄게'라는 무언의 메시지가 당신에게서 흘러나옵니다. 상대가 가장 취약한 순간 — 깊이 열린 그 순간을 따뜻하게 안아주는 것이 당신의 사랑법입니다. 사후 돌봄의 달인, 당신과의 시간은 가장 깊이 연결된 순간 이후에야 진정한 의미를 갖습니다.",
    detailDescriptionEn:
      "You are the safe harbor where your partner can let everything go. An unspoken message of 'It's okay, I've got you' radiates from within you. Warmly embracing your partner at their most vulnerable moment — their most open and unguarded moment — is your way of love. A master of aftercare, time with you only gains its true meaning after the deepest connection.",
    profile: {
      dominance: 25,
      emotion: 85,
      adventure: 30,
      sensory: 45,
      atmosphere: 70,
      communication: 65,
      intimacy: 90,
      fantasy: 30,
    },
    compatibleTypes: [
      "gentle-commander",
      "passionate-explorer",
      "deep-connector",
    ],
    color: "#8B7340",
  },
  {
    id: "charismatic-director",
    name: "카리스마 연출가",
    nameEn: "Charismatic Director",
    numeral: "XI",
    description: "관계의 연출가 — 분위기, 속도, 강도 모두 당신이 설계한다",
    descriptionEn: "The director of every dynamic — you command the mood, pace, and intensity",
    detailDescription:
      "당신의 관계는 당신이 연출하는 무대입니다. 언제 침묵을 주고, 어떤 속도로 이끌고, 어디서 먼저 시선을 잡을지 — 모든 것이 당신의 시나리오대로 흘러갑니다. '이리 와', '거기 움직이지 마'라는 한마디에 파트너가 숨을 멈추는 순간, 당신의 리더십은 정점에 달합니다. 말과 분위기로 상대를 이끄는 가장 세련된 리더.",
    detailDescriptionEn:
      "Your dynamic is a stage you direct. When to hold silence, what pace to set, where to draw focus first — everything flows according to your script. The moment your partner pauses at 'Come here' or 'Stay still' — that's when your presence peaks. The most sophisticated form of a leader who guides through words and atmosphere.",
    profile: {
      dominance: 90,
      emotion: 50,
      adventure: 60,
      sensory: 55,
      atmosphere: 80,
      communication: 85,
      intimacy: 55,
      fantasy: 55,
    },
    compatibleTypes: [
      "sensory-aesthete",
      "tender-guardian",
      "romantic-dreamer",
    ],
    color: "#E8DCC8",
  },
  {
    id: "dreamy-artist",
    name: "몽환의 예술가",
    nameEn: "Dreamy Artist",
    numeral: "XII",
    description: "현실과 환상의 경계에서 감성을 빚어내는 관능의 예술가",
    descriptionEn: "A sensual artist who crafts emotion at the boundary of reality and fantasy",
    detailDescription:
      "당신과의 시간은 한 편의 영화 같습니다. 촛불의 흔들림, 와인의 향, 살결 위를 미끄러지는 손끝 — 모든 감각적 요소가 당신의 풍부한 상상력과 만나 비현실적일 만큼 아름다운 순간을 만들어냅니다. 때로는 역할극 속 인물이 되고, 때로는 꿈속의 연인이 되며, 당신만의 방식으로 가장 예술적인 교감을 창조합니다.",
    detailDescriptionEn:
      "Time with you is like a beautifully directed film. Flickering candles, the scent of wine, fingertips gliding across skin — every sensory element meets your rich imagination to create moments of surreal beauty. Sometimes you become a character in a roleplay, sometimes a dream lover, creating the most artistic connection in your own way.",
    profile: {
      dominance: 35,
      emotion: 65,
      adventure: 50,
      sensory: 80,
      atmosphere: 85,
      communication: 40,
      intimacy: 50,
      fantasy: 90,
    },
    compatibleTypes: [
      "romantic-dreamer",
      "secret-fantasist",
      "sensory-aesthete",
    ],
    color: "#DEC598",
  },
];

export const archetypeMap = Object.fromEntries(
  archetypes.map((a) => [a.id, a])
);
