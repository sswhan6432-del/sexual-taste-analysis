import { dimensions, dimensionMap } from "./dimensions";
import type { DimensionScores, BdsmProfile } from "./scoring";
import type { Archetype } from "./types";

// ─── Types ───

export interface AiAnalysisResult {
  sections: AnalysisSection[];
}

export interface AnalysisSection {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  content: string;
}

interface ProfileContext {
  scores: DimensionScores;
  archetype: Archetype;
  similarity: number;
  secondaryArchetype: Archetype | null;
  bdsmProfile: BdsmProfile;
  traitTags: string[];
  dominantDims: string[];
  recessiveDims: string[];
}

// ─── Main Generator ───

export function generateAiAnalysis(ctx: ProfileContext): AiAnalysisResult {
  const sections: AnalysisSection[] = [
    generateProfileSummary(ctx),
    generateRelationshipDynamics(ctx),
    generateUniquePattern(ctx),
    generateHiddenDesire(ctx),
    generateIdealPartner(ctx),
    generateGrowthPoints(ctx),
    generateIntimacyStyle(ctx),
  ];

  return { sections };
}

// ─── Helpers ───

function s(ctx: ProfileContext, key: string): number {
  return ctx.scores[key] ?? 50;
}

function level(score: number): "low" | "mid" | "high" {
  if (score <= 35) return "low";
  if (score >= 65) return "high";
  return "mid";
}

function pct(ctx: ProfileContext, key: string): string {
  const raw = s(ctx, key);
  const dev = Math.round((raw - 50) * 2);
  return dev >= 0 ? `+${dev}%` : `${dev}%`;
}

// ─── Section 1: Comprehensive Profile ───

function generateProfileSummary(ctx: ProfileContext): AnalysisSection {
  const dom = s(ctx, "dominance");
  const emo = s(ctx, "emotion");
  const adv = s(ctx, "adventure");
  const sen = s(ctx, "sensory");
  const atm = s(ctx, "atmosphere");
  const com = s(ctx, "communication");
  const int = s(ctx, "intimacy");
  const fan = s(ctx, "fantasy");

  // Find the defining characteristic
  const sorted = dimensions
    .map((d) => ({ key: d.key, score: s(ctx, d.key), name: d.name }))
    .sort((a, b) => Math.abs(b.score - 50) - Math.abs(a.score - 50));

  const strongest = sorted[0];
  const secondStrongest = sorted[1];

  let opening = "";
  if (strongest.score >= 65) {
    opening = `당신의 가장 두드러진 특성은 **${strongest.name}**(${pct(ctx, strongest.key)})입니다. `;
  } else if (strongest.score <= 35) {
    opening = `당신은 **${dimensionMap[strongest.key]?.highLabel ?? strongest.name}**보다 **${dimensionMap[strongest.key]?.lowLabel ?? "반대 성향"}**에 가깝습니다(${pct(ctx, strongest.key)}). `;
  } else {
    opening = `당신은 전반적으로 균형 잡힌 프로필을 가지고 있습니다. `;
  }

  // Core personality pattern
  let corePattern = "";
  if (dom >= 65 && emo >= 65) {
    corePattern = "강한 주도력과 깊은 감성이 공존하는 당신은 침대 위의 **'카리스마 있는 포식자'**입니다. 파트너의 몸을 지배하면서도 그 눈빛에서 떨림을 읽어내고, 속삭임 하나로 상대를 무장해제시킵니다. 이끌면서 감정까지 움켜쥐는 이 드문 조합이 파트너를 중독시킵니다.";
  } else if (dom >= 65 && emo <= 35) {
    corePattern = "높은 주도성과 냉정한 감성은 당신을 **쾌락의 설계자**로 만듭니다. 감정에 흔들리지 않고 상대의 몸이 반응하는 순서를 정확히 계산하며, 그 절제된 지배력이 오히려 파트너를 더 깊이 빠져들게 만듭니다.";
  } else if (dom <= 35 && emo >= 65) {
    corePattern = "수용적 성향과 깊은 감성은 당신을 **침대 위의 감정적 유혹자**로 만듭니다. 파트너의 리드에 몸을 맡기면서도, 감정의 끈으로 상대를 당신에게 묶어놓는 독특한 역동을 만들어냅니다. 안긴 채로 지배하는 역설이 당신의 무기입니다.";
  } else if (adv >= 65 && int >= 65) {
    corePattern = "모험적 탐욕과 깊은 친밀감이 공존하는 당신은 **'깊이 있는 쾌락 탐험가'**입니다. 새로운 체위, 새로운 장소, 새로운 자극을 시도하되, 항상 영혼까지 연결된 상대와 함께해야 합니다. 사랑하는 사람과의 대담한 실험 — 이것이 당신의 최고 환상입니다.";
  } else if (sen >= 65 && atm >= 65) {
    corePattern = "감각과 분위기를 동시에 추구하는 당신은 **관능의 미학자**입니다. 살결 위를 미끄러지는 손끝의 온도, 어둠 속 촛불의 흔들림, 시트 위에 번지는 체온 — 모든 감각적 디테일이 완벽하게 조율된 밤에서만 진짜 쾌감을 허락합니다.";
  } else if (fan >= 65 && com <= 35) {
    corePattern = "풍부한 상상력과 말 없는 소통은 당신 안에 **검열 불가한 비밀의 극장**이 있음을 보여줍니다. 입 밖으로 꺼내지 못하는 장면들이 머릿속에서 끊임없이 상영 중이며, 그 판타지의 디테일은 놀라울 정도로 선명합니다. 겉모습과 내면의 이 극적인 괴리가 당신을 매혹적으로 만듭니다.";
  } else if (com >= 65 && int >= 65) {
    corePattern = "언어적 유혹과 깊은 교감을 동시에 추구하는 당신은 **'영혼까지 벗기는 대화의 지배자'**입니다. 서로의 가장 은밀한 욕망을 말로 꺼내놓는 것 자체가 전희이며, 그 위에 쌓이는 육체적 교감은 차원이 다릅니다.";
  } else {
    corePattern = `${ctx.archetype.name} 유형으로서 당신만의 독특한 쾌락의 균형점을 가지고 있습니다. ${secondStrongest.score >= 65 ? `특히 **${secondStrongest.name}** 영역에서의 강한 성적 성향(${pct(ctx, secondStrongest.key)})이 침대 위 당신의 스타일을 결정짓습니다.` : "극단적 편향 없이 파트너에 따라 유연하게 변하는 당신은 어떤 상대든 만족시킬 수 있는 다재다능한 연인입니다."}`;
  }

  const matchNote = `\n\n**${ctx.archetype.name}** 유형과 **${Math.round(ctx.similarity * 100)}%** 일치하며${ctx.secondaryArchetype ? `, 부분적으로 **${ctx.secondaryArchetype.name}** 유형의 특성도 함께 가지고 있습니다` : ""}.`;

  return {
    id: "profile-summary",
    title: "당신의 성적 DNA",
    titleEn: "Sexual DNA",
    icon: "I",
    content: opening + corePattern + matchNote,
  };
}

// ─── Section 2: Relationship Dynamics ───

function generateRelationshipDynamics(ctx: ProfileContext): AnalysisSection {
  const dom = s(ctx, "dominance");
  const emo = s(ctx, "emotion");
  const com = s(ctx, "communication");
  const int = s(ctx, "intimacy");

  let dynamics = "";

  // Power dynamic
  if (dom >= 70) {
    dynamics += "침대 위에서 당신은 **타고난 지배자**입니다. 파트너의 손목을 잡고, 속도를 조절하고, 시선으로 명령하는 것에서 성적 에너지를 얻습니다. 상대가 당신의 터치에 몸을 떨며 반응할 때 — 그것이 당신의 절정입니다. ";
  } else if (dom <= 30) {
    dynamics += "침대 위에서 당신은 **몸을 맡기는 쾌락의 수용자**입니다. 파트너의 손에 완전히 자신을 내맡기는 순간의 해방감, 통제를 포기했을 때 밀려오는 쾌감 — 이것은 약함이 아닌, 극도의 신뢰에서만 가능한 관능적 용기입니다. ";
  } else {
    dynamics += "침대 위에서 당신은 **역할 전환의 마술사**입니다. 어느 순간엔 상대를 눌러 지배하고, 다음 순간엔 몸을 뒤집어 맡기며 — 이 예측불가한 전환이 파트너를 미치게 만듭니다. ";
  }

  // Emotional pattern
  if (emo >= 65 && int >= 65) {
    dynamics += "\n\n감정적 교감과 깊은 친밀감을 동시에 갈구하는 당신은 **몸만 섞는 관계에 흥분하지 않습니다**. 영혼까지 벗겨야 진짜 쾌락이 시작되며, 감정적 연결 없는 섹스는 빈 껍데기라고 느낍니다. 그래서 당신과의 밤은 항상 더 깊고, 더 뜨겁습니다.";
  } else if (emo <= 35 && int <= 35) {
    dynamics += "\n\n감정적 독립성과 가벼운 관계 선호는 당신을 **순수한 쾌락의 유목민**으로 만듭니다. 무거운 감정 없이 오직 감각적 쾌감에 집중하는 밤에서 최고의 퍼포먼스를 보여주며, 이 솔직함이 오히려 당신을 잊지 못할 상대로 만듭니다.";
  } else if (emo >= 65 && int <= 40) {
    dynamics += "\n\n감성은 뜨겁지만 깊이 빠지는 건 두려운 **모순적 관능**이 보입니다. 격정적으로 안기지만 아침이 되면 거리를 두고 싶은 — 이 밀당이 파트너를 미치도록 당신에게 끌리게 만듭니다.";
  }

  // Communication in relationships
  if (com >= 65) {
    dynamics += "\n\n당신은 **더티토크의 달인**입니다. '거기... 더', '이렇게 해줘' — 원하는 것을 정확히 말하고, 상대의 반응을 이끌어내는 언어적 유혹이 당신의 전희를 완성합니다. 대화 자체가 성적 에너지를 폭발시키는 도화선입니다.";
  } else if (com <= 35) {
    dynamics += "\n\n당신은 **말 없는 관능의 세계**에 살고 있습니다. 거친 숨소리, 손끝의 압력, 등을 긁는 손톱, 목덜미에 닿는 뜨거운 입술 — 말보다 몸으로 전하는 메시지가 당신의 언어이며, 이 비언어적 교감이 더 원초적인 쾌감을 만듭니다.";
  }

  return {
    id: "relationship-dynamics",
    title: "침대 위의 권력 구조",
    titleEn: "Power Dynamics",
    icon: "II",
    content: dynamics,
  };
}

// ─── Section 3: Unique Pattern ───

function generateUniquePattern(ctx: ProfileContext): AnalysisSection {
  const scores = dimensions.map((d) => ({
    key: d.key,
    name: d.name,
    score: s(ctx, d.key),
    dev: Math.abs(s(ctx, d.key) - 50),
  }));

  // Find surprising combinations (high contrast pairs)
  const pairs: { a: string; b: string; contrast: number; text: string }[] = [];

  const pairCheck = (
    k1: string,
    k2: string,
    condition: boolean,
    text: string
  ) => {
    if (condition) {
      pairs.push({
        a: k1,
        b: k2,
        contrast: Math.abs(s(ctx, k1) - s(ctx, k2)),
        text,
      });
    }
  };

  pairCheck(
    "dominance",
    "emotion",
    s(ctx, "dominance") >= 65 && s(ctx, "emotion") >= 65,
    "**지배 + 감성** — 파트너의 목을 감싸 쥐면서도 눈물이 고인 눈을 바라보는 능력. 이 조합은 전체 응답자 중 약 12%에 불과합니다. 거칠게 몰아붙이다가도 '괜찮아?'라는 한마디에 상대가 녹아내리는 — 이 극적인 온도차가 파트너를 중독시킵니다."
  );

  pairCheck(
    "adventure",
    "atmosphere",
    s(ctx, "adventure") >= 65 && s(ctx, "atmosphere") >= 65,
    "**모험 + 분위기** — 새로운 체위, 새로운 장소, 새로운 도구를 시도하되 그 환경까지 완벽하길 원하는 성향. 호텔 스위트의 조명 아래서 처음 시도하는 자세, 와인잔이 놓인 욕조 안에서의 탐색 — 아름답게 연출된 모험만이 당신을 흥분시킵니다."
  );

  pairCheck(
    "fantasy",
    "intimacy",
    s(ctx, "fantasy") >= 60 && s(ctx, "intimacy") >= 60,
    "**판타지 + 깊은 교감** — 가장 은밀한 상상을 오직 영혼까지 신뢰하는 상대에게만 속삭이는 성향. '오늘 밤, 내가 상상했던 거... 해볼까?'라는 말을 꺼낼 수 있는 관계에서만 진짜 쾌락의 문이 열립니다. 당신의 판타지는 신뢰의 증거입니다."
  );

  pairCheck(
    "sensory",
    "communication",
    s(ctx, "sensory") >= 60 && s(ctx, "communication") >= 60,
    "**감각 + 언어** — '거기... 아, 소름 돋아'처럼 느끼는 감각을 실시간으로 언어화하는 능력. 손끝이 닿은 곳의 감촉을 말로 묘사하고, 그 말이 다시 파트너의 흥분을 증폭시키는 — 감각과 언어의 피드백 루프가 당신의 침대를 특별하게 만듭니다."
  );

  pairCheck(
    "dominance",
    "fantasy",
    s(ctx, "dominance") >= 60 && s(ctx, "fantasy") >= 60,
    "**지배 + 판타지** — 머릿속에서 시나리오를 짜고, 침대 위에서 그것을 실행하는 **'에로틱 감독'** 성향. '오늘 밤은 이렇게 할 거야'라고 선언하며 파트너를 당신의 판타지 속으로 끌어들이는 — 상상을 현실로 만드는 지배적 창작자입니다."
  );

  pairCheck(
    "emotion",
    "sensory",
    s(ctx, "emotion") <= 35 && s(ctx, "sensory") >= 65,
    "**냉정한 마음 + 뜨거운 몸** — 감정보다 순수한 육체적 쾌감을 추구하는 본능형. 사랑 고백보다 등을 타고 내려가는 손끝에 먼저 반응하며, 이 솔직한 감각주의가 침대 위에서 가장 원초적이고 강렬한 에너지를 만듭니다."
  );

  pairCheck(
    "intimacy",
    "adventure",
    s(ctx, "intimacy") <= 35 && s(ctx, "adventure") >= 65,
    "**자유 + 모험** — 한 사람에게 정착하기엔 세상에 경험할 쾌락이 너무 많은 '육체적 유목민'. 오늘 밤의 불꽃 같은 만남, 내일은 또 다른 모험 — 깊은 구속 없이 매번 새로운 열기를 추구하는 이 자유로움이 당신의 치명적 매력입니다."
  );

  let content = "";

  if (pairs.length > 0) {
    const topPairs = pairs.sort((a, b) => b.contrast - a.contrast).slice(0, 2);
    content = "당신의 프로필에서 발견된 특별한 성향 조합:\n\n";
    content += topPairs.map((p) => p.text).join("\n\n");
  } else {
    // Balanced profile insight
    const avgDev =
      scores.reduce((sum, s) => sum + s.dev, 0) / scores.length;
    if (avgDev < 10) {
      content =
        "당신의 프로필은 **극도로 균형 잡힌** 형태를 보입니다. 이것은 '특색 없음'이 아닌, 어떤 파트너든 만족시킬 수 있는 **만능형 연인**이라는 뜻입니다.\n\n대부분의 사람은 침대 위에서 한두 가지 확실한 기호가 있지만, 당신은 모든 스펙트럼에서 유연합니다. 상대가 거칠길 원하면 거칠게, 부드럽길 원하면 부드럽게 — 파트너의 욕망을 거울처럼 반영하는 이 능력이 당신을 **잊지 못할 연인**으로 만듭니다.";
    } else {
      const top = scores.sort((a, b) => b.dev - a.dev)[0];
      content = `당신의 성적 프로필에서 가장 도드라지는 것은 **${top.name}** 차원(${pct(ctx, top.key)})입니다. 이 성향이 침대 위 당신의 모든 행동을 관통하는 핵심 축이며, 전희부터 절정까지 모든 순간의 표현 방식에 영향을 줍니다.\n\n이 차원에서의 당신의 위치는 쾌락에서 무엇을 가장 먼저 갈구하는지를 보여줍니다.`;
    }
  }

  return {
    id: "unique-pattern",
    title: "당신만의 은밀한 조합",
    titleEn: "Secret Combination",
    icon: "III",
    content,
  };
}

// ─── Section 4: Hidden Desire ───

function generateHiddenDesire(ctx: ProfileContext): AnalysisSection {
  const dom = s(ctx, "dominance");
  const emo = s(ctx, "emotion");
  const adv = s(ctx, "adventure");
  const sen = s(ctx, "sensory");
  const fan = s(ctx, "fantasy");
  const int = s(ctx, "intimacy");
  const com = s(ctx, "communication");

  let content = "";

  // Analyze contradictions and suppressed desires
  if (dom >= 65 && int >= 60) {
    content =
      "항상 위에서 지배하는 당신이지만, 가장 깊은 곳에는 **눌려보고 싶은 욕구**가 숨어 있습니다. 침대 시트를 움켜쥐고 파트너에게 완전히 지배당하는 상상 — 인정하기 어렵지만 그 장면이 당신을 가장 뜨겁게 달궈놓습니다. 주도권을 내려놓을 수 있는 단 한 사람을 만났을 때, 당신은 완전히 다른 쾌락의 차원을 경험하게 됩니다.";
  } else if (dom <= 35 && fan >= 60) {
    content =
      "겉으로는 순종적으로 몸을 맡기지만, 당신의 머릿속에서는 **은밀한 감독**이 시나리오를 짜고 있습니다. '다음엔 저 자세로, 그리고 거기를 먼저...' — 상상 속에서 이미 모든 것을 연출해놓고, 파트너가 그 대본대로 움직이길 은근히 유도합니다. 당신의 진짜 지배는 복종의 가면 아래에 있습니다.";
  } else if (emo <= 40 && sen >= 60) {
    content =
      "감정 없이 몸만 즐기겠다고 하지만, 당신의 숨겨진 욕구는 **절정의 순간 무너지는 감정의 벽**입니다. 오르가즘의 순간, 자신도 모르게 파트너의 이름을 부르거나 눈물이 나는 경험 — 그 무방비한 순간의 감정적 폭발이 사실 당신이 가장 갈망하는 쾌락입니다. 몸이 열릴 때 마음도 함께 열리는 것이 두렵지만, 그것이 당신의 진짜 욕구입니다.";
  } else if (com <= 35 && emo >= 60) {
    content =
      "말없이 몸으로만 소통하는 당신이지만, 내면 깊은 곳에는 **가장 야한 말을 속삭이고 싶은 욕구**가 있습니다. '더 세게', '거기가 좋아' — 이런 말을 입 밖에 꺼내는 순간의 수치심과 흥분이 뒤섞인 감정을 상상합니다. 당신을 완전히 안전하게 만들어주는 파트너 앞에서 그 말문이 열리는 날, 쾌락의 새 차원이 펼쳐집니다.";
  } else if (adv <= 35 && fan >= 55) {
    content =
      "현실에서는 안정적인 침대만 고수하지만, **머릿속에서는 이미 모든 금기를 깬 모험가**입니다. 사무실 책상 위, 비행기 화장실, 눈가리개와 수갑 — 상상으로는 이미 수백 번 경험했지만 현실로 옮기지 못한 시나리오가 있습니다. 완전히 안전한 환경과 완전히 신뢰하는 파트너가 만났을 때, 그 판타지의 빗장이 풀릴 준비가 되어 있습니다.";
  } else if (int >= 65 && dom >= 55) {
    content =
      "깊은 유대 안에서 주도하는 당신의 가장 은밀한 욕구는 **완전한 복종의 쾌감**입니다. 눈을 가리고, 손을 묶이고, 파트너가 당신의 몸 구석구석을 탐험하는 것을 그저 느끼기만 하는 — 항상 통제하던 당신이 통제를 잃는 순간의 해방감. 인정하기 어렵지만, 그것이 당신의 가장 뜨거운 판타지일 수 있습니다.";
  } else {
    content = `당신의 ${ctx.bdsmProfile.role} 성향 안에는 **아직 꺼내지 못한 은밀한 갈증**이 있습니다. ${
      fan >= 50
        ? "자위할 때 떠올리는 장면들 중 파트너에게 아직 말하지 못한 것이 있습니다. 그 상상이 당신의 진짜 욕구를 말해줍니다."
        : "아직 탐험하지 않은 성적 영역에 대한 조용한 호기심이 몸 안에 잠들어 있습니다."
    } 이것은 부족함이 아닌, 아직 열리지 않은 쾌락의 문입니다. 적절한 파트너와 완전한 신뢰가 만났을 때, 당신도 몰랐던 새로운 성적 자아를 발견하게 됩니다.`;
  }

  return {
    id: "hidden-desire",
    title: "당신도 모르는 은밀한 욕구",
    titleEn: "Hidden Desires",
    icon: "IV",
    content,
  };
}

// ─── Section 5: Ideal Partner ───

function generateIdealPartner(ctx: ProfileContext): AnalysisSection {
  const dom = s(ctx, "dominance");
  const emo = s(ctx, "emotion");
  const adv = s(ctx, "adventure");
  const com = s(ctx, "communication");
  const int = s(ctx, "intimacy");
  const sen = s(ctx, "sensory");

  const points: string[] = [];

  // D/s complement
  if (dom >= 65) {
    points.push(
      "당신의 지배적 터치에 **몸을 떨며 맡기는 파트너**가 이상적입니다. 수동적으로 누워있기만 하는 것이 아니라, 당신의 리드에 신음으로 반응하고, 복종하면서도 자신만의 매력으로 당신을 자극하는 사람 — 이끌면서도 끌려가고 싶게 만드는 상대가 최고의 시너지를 만듭니다."
    );
  } else if (dom <= 35) {
    points.push(
      "당신에게는 **단단한 손으로 부드럽게 지배하는 파트너**가 필요합니다. '가만히 있어' 한마디에 온몸이 긴장되는 순간의 흥분, 하지만 그 손길은 항상 당신의 경계를 존중하는 — 안전한 지배 안에서만 당신의 몸이 완전히 열립니다."
    );
  } else {
    points.push(
      "위아래를 넘나드는 당신에게는 **함께 역할극을 즐기는 파트너**가 이상적입니다. 한 라운드에서는 당신이 위에, 다음에는 아래에 — 고정된 포지션 없이 서로의 몸 위에서 자유롭게 주도권을 교환할 수 있는 상대가 최고의 쾌락을 선사합니다."
    );
  }

  // Emotional compatibility
  if (emo >= 65) {
    points.push(
      "섹스 후 눈물이 날 만큼 감정이 충만해야 하는 당신에게는 **사후 교감에 진심인 파트너**가 중요합니다. 절정 후 안아주며 '좋았어'라고 속삭여주는 한마디가 다음 밤을 기대하게 만듭니다. 끝나자마자 등 돌리고 자는 사람과는 장기적 성적 만족이 불가능합니다."
    );
  } else if (emo <= 35) {
    points.push(
      "감정 없이 순수한 육체적 쾌감에 집중하는 당신에게는 **집착 없이 뜨겁게 즐기는 파트너**가 필요합니다. 서로의 자유를 존중하면서 만났을 때만큼은 완전히 불태우는 관계 — 이 가볍지만 강렬한 조합이 이상적입니다."
    );
  }

  // Communication match
  if (com >= 65 && int >= 60) {
    points.push(
      "**'오늘 밤 뭐 해볼까?'라는 대화로 시작되는 섹스**가 당신의 이상입니다. 서로의 판타지, 경계, 새로운 시도를 침대 위에서 솔직하게 나누는 파트너 — 그 대화 자체가 전희이고, 대화의 깊이만큼 쾌락도 깊어집니다."
    );
  }

  // Adventure/sensory
  if (adv >= 60 && sen >= 60) {
    points.push(
      "감각적 모험을 함께 즐길 수 있는 파트너가 장기적 성적 만족을 보장합니다. 아이스큐브, 깃털, 새로운 오일 — 새로운 자극에 호기심을 보이면서도 그 감각을 함께 깊이 음미할 줄 아는 사람이 당신의 몸과 가장 잘 맞습니다."
    );
  }

  // Warning sign
  let warning = "";
  if (dom >= 65) {
    warning = "**주의**: 동일하게 지배적인 파트너와는 침대 위 권력 충돌이 발생합니다. 누가 위에 올라갈지 매번 싸우는 관계는 피로해집니다.";
  } else if (emo >= 65 && com <= 40) {
    warning = "**주의**: 말로 사랑을 표현하는 것보다 몸으로 보여주는 파트너가 당신에게 맞습니다. 행동 없는 달콤한 말은 오히려 거부감을 줍니다.";
  } else if (adv >= 65) {
    warning = "**주의**: '항상 같은 자세, 같은 장소'만 고수하는 파트너와는 성적 권태가 빠르게 찾아옵니다. 새로움을 함께 추구할 상대가 필요합니다.";
  }

  let content = points.join("\n\n");
  if (warning) content += "\n\n" + warning;

  return {
    id: "ideal-partner",
    title: "최고의 밤을 만들 파트너",
    titleEn: "Ideal Bed Partner",
    icon: "V",
    content,
  };
}

// ─── Section 6: Growth Points ───

function generateGrowthPoints(ctx: ProfileContext): AnalysisSection {
  const points: string[] = [];

  // Find extreme dimensions
  for (const dim of dimensions) {
    const score = s(ctx, dim.key);
    if (score >= 80) {
      points.push(
        `**${dim.name}(${pct(ctx, dim.key)})** 이 극단적으로 높습니다. 이 강렬한 성향이 당신을 특별하게 만들지만, 파트너가 따라가지 못할 수 있습니다. 상대의 몸이 보내는 신호 — 숨의 빠르기, 근육의 긴장도 — 를 읽는 연습이 더 만족스러운 밤을 만듭니다.`
      );
    } else if (score <= 20) {
      points.push(
        `**${dim.name}(${pct(ctx, dim.key)})** 이 극단적으로 낮습니다. 이것이 진짜 당신이라면 존중받아야 하지만, 혹시 과거의 불쾌한 경험이나 수치심이 이 영역을 닫아버린 것은 아닌지 — 안전한 파트너와 함께 조심스럽게 탐색해볼 가치가 있습니다.`
      );
    }
  }

  // Cross-dimensional growth
  const dom = s(ctx, "dominance");
  const com = s(ctx, "communication");
  const emo = s(ctx, "emotion");

  if (dom >= 65 && com <= 40) {
    points.push(
      "지배하면서도 말이 없으면 파트너는 '이용당한다'고 느낄 수 있습니다. 행위 중 '좋아?', '더 해줄까?' 같은 짧은 확인 한마디가 상대의 흥분도를 폭발적으로 높입니다. 지배에 소통을 더하면 당신은 완벽한 도미넌트가 됩니다."
    );
  }

  if (emo >= 65 && dom <= 35) {
    points.push(
      "감성적이면서 순종적인 당신은 자신의 쾌감을 희생하고 상대만 만족시키려 할 수 있습니다. '나도 이게 좋아', '여기를 만져줘' — 당신의 욕구를 솔직하게 표현하는 것이 파트너에게도 더 뜨거운 밤을 선물합니다."
    );
  }

  if (points.length === 0) {
    points.push(
      "당신의 프로필은 극단적 편향이 적어 다재다능한 연인의 조건을 갖추고 있습니다. 성장 포인트는 가장 강한 차원을 더 의식적으로 무기화하는 것, 그리고 가장 약한 차원에서 파트너와 함께 작은 실험을 시도해보는 것입니다. 새로운 시도 하나가 성적 레퍼토리를 넓혀줍니다."
    );
  }

  return {
    id: "growth-points",
    title: "더 뜨거워지는 법",
    titleEn: "Level Up",
    icon: "VI",
    content: points.join("\n\n"),
  };
}

// ─── Section 7: Intimacy Style ───

function generateIntimacyStyle(ctx: ProfileContext): AnalysisSection {
  const dom = s(ctx, "dominance");
  const sen = s(ctx, "sensory");
  const atm = s(ctx, "atmosphere");
  const fan = s(ctx, "fantasy");
  const adv = s(ctx, "adventure");
  const emo = s(ctx, "emotion");
  const int = s(ctx, "intimacy");

  const traits: string[] = [];

  // Approach style
  if (dom >= 60 && sen >= 60) {
    traits.push(
      "**전희 스타일**: 감각을 무기로 쓰는 포식자형. 목덜미를 스치는 입술, 허벅지를 타고 올라가는 손끝, 귀에 닿는 낮은 목소리 — 의도적으로 파트너의 감각을 하나씩 깨워가며, 상대가 숨을 참지 못할 때까지 천천히 조여갑니다."
    );
  } else if (dom <= 40 && emo >= 60) {
    traits.push(
      "**전희 스타일**: 감정이 곧 전희인 수용형. 눈빛이 마주치고, 손가락이 얽히고, 심장 박동이 빨라지는 — 마음이 충분히 열려야 몸도 열립니다. 서두르는 파트너보다 천천히 감정부터 달궈주는 상대에게 가장 뜨겁게 반응합니다."
    );
  } else if (adv >= 60) {
    traits.push(
      "**전희 스타일**: 매번 다른 시나리오를 원하는 탐험형. 어제는 침대, 오늘은 주방 테이블, 내일은 차 안 — 같은 루틴의 반복은 성적 흥미를 죽입니다. '오늘은 뭘 해볼까?'라는 설렘이 당신의 최고의 최음제입니다."
    );
  } else {
    traits.push(
      "**전희 스타일**: 그날의 기분에 따라 완전히 달라지는 변신형. 파트너의 에너지가 거칠면 맞받아치고, 부드러우면 녹아들며 — 이 예측불가한 적응력이 상대를 매번 새로운 당신에게 빠지게 만듭니다."
    );
  }

  // Environment needs
  if (atm >= 65) {
    traits.push(
      "**최적 환경**: 촛불, 재즈 음악, 고급 시트, 은은한 향 — 환경이 완벽해야 몸도 완전히 열립니다. 조명 하나, 온도 1도 차이가 오르가즘의 강도를 좌우합니다. 준비된 공간에서의 섹스가 즉흥적 상황보다 수 배 강렬합니다."
    );
  } else if (atm <= 35) {
    traits.push(
      "**최적 환경**: 장소 불문, 분위기 불문 — 욕망이 차오르는 그 순간이 곧 무대입니다. 엘리베이터, 주차장, 사무실 — 어디서든 불꽃이 튀면 환경은 신경 쓰지 않습니다. 이 야생적 즉흥성이 가장 기억에 남는 밤을 만듭니다."
    );
  }

  // Fantasy integration
  if (fan >= 65) {
    traits.push(
      `**판타지 활용**: 풍부한 성적 상상력(${pct(ctx, "fantasy")})이 침대를 무대로 바꿉니다. 역할극(선생과 학생, 상사와 부하), 시나리오(모르는 사람과의 첫 만남), 코스튬 — 상상을 현실에 옮기는 과정 자체가 강렬한 흥분이며, 파트너와 판타지를 공유하는 순간 쾌락이 배가됩니다.`
    );
  }

  // BDSM integration
  traits.push(
    `\n**BDSM 스펙트럼**: ${ctx.bdsmProfile.role}(${ctx.bdsmProfile.roleEn})로서, ${ctx.bdsmProfile.dsLabel} 성향의 ${ctx.bdsmProfile.intensityLabel.toLowerCase()} 강도를 보입니다. ${ctx.bdsmProfile.roleDescription}`
  );

  return {
    id: "intimacy-style",
    title: "당신의 섹스 스타일",
    titleEn: "Your Sex Style",
    icon: "VII",
    content: traits.join("\n\n"),
  };
}
