export type Locale = "ko" | "en";

const dictionary: Record<string, { ko: string; en: string }> = {
  // ─── AgeGate ───
  "age.title": {
    ko: "시작 전 확인",
    en: "Before You Begin",
  },
  "age.subtitle": {
    ko: "Relationship Archetype Discovery",
    en: "Relationship Archetype Discovery",
  },
  "age.description": {
    ko: "본 테스트는 관계 역학과 심층 심리를 분석합니다.",
    en: "This test explores relationship dynamics and deep psychology.",
  },
  "age.minimum": {
    ko: "솔직하고 진지한 자기 탐색이 준비된 분께 권장합니다.",
    en: "Recommended for those ready for honest self-reflection.",
  },
  "age.confirm": {
    ko: "네, 시작하겠습니다",
    en: "Yes, I'm ready",
  },
  "age.deny": {
    ko: "아니오, 나가겠습니다",
    en: "No, take me back",
  },

  // ─── Hero ───
  "hero.tagline": {
    ko: "Relationship Archetype Discovery",
    en: "Relationship Archetype Discovery",
  },
  "hero.subtitle": {
    ko: "당신의 관계 성향을 12가지 아키타입으로 탐색합니다",
    en: "Discover your relationship style through 12 archetypes",
  },
  "hero.stats": {
    ko: "72 questions · 8 dimensions · 12 archetypes",
    en: "72 questions · 8 dimensions · 12 archetypes",
  },
  "hero.selectDepth": {
    ko: "Select Depth",
    en: "Select Depth",
  },
  "hero.beginner": {
    ko: "첫경험",
    en: "First Time",
  },
  "hero.intermediate": {
    ko: "중급자",
    en: "Experienced",
  },
  "hero.expert": {
    ko: "전문가",
    en: "Connoisseur",
  },
  "hero.beginner.desc": {
    ko: "당신의 성향을 처음 엿보는 입문",
    en: "A quick peek into your nature",
  },
  "hero.intermediate.desc": {
    ko: "당신의 내면을 탐구하는 심층 분석",
    en: "An in-depth analysis of your inner self",
  },
  "hero.expert.desc": {
    ko: "가장 깊은 내면까지 완전한 탐색",
    en: "A full exploration of your deepest self",
  },

  // ─── CategorySelect ───
  "category.title": {
    ko: "관심 있는 영역을 선택하세요",
    en: "Select areas of interest",
  },
  "category.count": {
    ko: "개 선택됨",
    en: "selected",
  },
  "category.range": {
    ko: "개 선택",
    en: "select",
  },

  // ─── QuizContainer ───
  "quiz.prev": {
    ko: "← 이전 질문",
    en: "← Previous",
  },

  // ─── SliderQuestion ───
  "slider.confirm": {
    ko: "Confirm",
    en: "Confirm",
  },
  "slider.confirmed": {
    ko: "Confirmed",
    en: "Confirmed",
  },

  // ─── AiAnalysis ───
  "ai.title": {
    ko: "AI 개인화 분석",
    en: "AI Personalized Analysis",
  },
  "ai.description": {
    ko: "8개 차원의 점수 조합과 성향 패턴을 기반으로\n당신만을 위한 심층 분석을 생성합니다",
    en: "Generating a deep analysis based on your\n8-dimension score pattern and tendencies",
  },
  "ai.generating": {
    ko: "분석 생성 중...",
    en: "Generating analysis...",
  },
  "ai.footer": {
    ko: "분석 결과는 동일한 점수에 대해 항상 같은 결과를 생성합니다",
    en: "Analysis results are deterministic for the same scores",
  },

  // ─── ScoreBreakdown ───
  "score.positive": {
    ko: "양수",
    en: "Positive",
  },
  "score.negative": {
    ko: "음수",
    en: "Negative",
  },
  "score.hasTrait": {
    ko: "는 성향이 있음",
    en: " indicates presence",
  },
  "score.noTrait": {
    ko: "는 성향이 없음",
    en: " indicates absence",
  },
  "score.strongNote": {
    ko: "수치가 높을수록",
    en: "Higher values =",
  },
  "score.strong": {
    ko: "강함",
    en: "stronger",
  },
  "score.softNote": {
    ko: "낮을수록",
    en: "lower =",
  },
  "score.soft": {
    ko: "소프트함",
    en: "softer",
  },

  // ─── ViralCard ───
  "viral.dimScoreLabel": {
    ko: "양수 = 성향 강함 · 음수 = 성향 약함",
    en: "Positive = strong trait · Negative = weak trait",
  },
  "viral.saveImage": {
    ko: "Save Image",
    en: "Save Image",
  },
  "viral.share": {
    ko: "Share",
    en: "Share",
  },

  // ─── ShareCard ───
  "share.saveImage": {
    ko: "Save Image",
    en: "Save Image",
  },
  "share.copyLink": {
    ko: "Copy Link",
    en: "Copy Link",
  },

  // ─── Result page / general ───
  "result.retake": {
    ko: "다시 테스트하기",
    en: "Retake Test",
  },

  // ─── ProgressBar / category labels will use nameEn ───

  // ─── Header ───
  "header.list": {
    ko: "목록",
    en: "Menu",
  },
  "header.results": {
    ko: "테스트 결과",
    en: "Test Results",
  },
  "header.community": {
    ko: "커뮤니티",
    en: "Community",
  },
  "header.contact": {
    ko: "Contact Us",
    en: "Contact Us",
  },
  "header.login": {
    ko: "로그인",
    en: "Login",
  },
  "header.signup": {
    ko: "회원가입",
    en: "Sign Up",
  },
  "header.logout": {
    ko: "로그아웃",
    en: "Logout",
  },
  "header.mypage": {
    ko: "마이페이지",
    en: "My Page",
  },

  // ─── Login page ───
  "login.title": {
    ko: "로그인",
    en: "Login",
  },
  "login.email": {
    ko: "이메일",
    en: "Email",
  },
  "login.password": {
    ko: "비밀번호",
    en: "Password",
  },
  "login.submit": {
    ko: "로그인",
    en: "Login",
  },
  "login.noAccount": {
    ko: "계정이 없으신가요?",
    en: "Don't have an account?",
  },
  "login.socialGoogle": {
    ko: "Google로 로그인",
    en: "Login with Google",
  },
  "login.socialKakao": {
    ko: "Kakao로 로그인",
    en: "Login with Kakao",
  },
  "login.or": {
    ko: "또는",
    en: "or",
  },

  // ─── Signup page ───
  "signup.title": {
    ko: "회원가입",
    en: "Sign Up",
  },
  "signup.email": {
    ko: "이메일",
    en: "Email",
  },
  "signup.password": {
    ko: "비밀번호",
    en: "Password",
  },
  "signup.confirmPassword": {
    ko: "비밀번호 확인",
    en: "Confirm Password",
  },
  "signup.nickname": {
    ko: "닉네임",
    en: "Nickname",
  },
  "signup.terms": {
    ko: "이용약관에 동의합니다",
    en: "I agree to the Terms of Service",
  },
  "signup.submit": {
    ko: "회원가입",
    en: "Sign Up",
  },
  "signup.hasAccount": {
    ko: "이미 계정이 있으신가요?",
    en: "Already have an account?",
  },

  // ─── Results page ───
  "results.title": {
    ko: "테스트 결과",
    en: "Test Results",
  },
  "results.loginRequired": {
    ko: "로그인하면 테스트 결과를 저장하고 확인할 수 있습니다.",
    en: "Login to save and view your test results.",
  },
  "results.goLogin": {
    ko: "로그인하기",
    en: "Go to Login",
  },
  "results.empty": {
    ko: "아직 저장된 테스트 결과가 없습니다.",
    en: "No saved test results yet.",
  },
  "results.takeTest": {
    ko: "테스트 하러 가기",
    en: "Take the Test",
  },
  "results.matchRate": {
    ko: "유사도",
    en: "Match",
  },

  // ─── Community page ───
  "community.title": {
    ko: "커뮤니티",
    en: "Community",
  },
  "community.write": {
    ko: "글쓰기",
    en: "Write Post",
  },
  "community.empty": {
    ko: "아직 게시글이 없습니다. 첫 번째 게시글을 작성해보세요!",
    en: "No posts yet. Be the first to write!",
  },
  "community.author": {
    ko: "작성자",
    en: "Author",
  },
  "community.date": {
    ko: "날짜",
    en: "Date",
  },

  // ─── Contact page ───
  "contact.title": {
    ko: "Contact Us",
    en: "Contact Us",
  },
  "contact.description": {
    ko: "문의사항이 있으시면 아래 양식을 통해 연락해주세요.",
    en: "Have a question? Reach out to us using the form below.",
  },
  "contact.name": {
    ko: "이름",
    en: "Name",
  },
  "contact.email": {
    ko: "이메일",
    en: "Email",
  },
  "contact.subject": {
    ko: "제목",
    en: "Subject",
  },
  "contact.message": {
    ko: "내용",
    en: "Message",
  },
  "contact.submit": {
    ko: "보내기",
    en: "Send",
  },
  "contact.success": {
    ko: "메시지가 성공적으로 전송되었습니다. 감사합니다!",
    en: "Your message has been sent successfully. Thank you!",
  },

  // ─── Couple Mode ───
  "couple.title": {
    ko: "커플 퀴즈",
    en: "Couple Quiz",
  },
  "couple.subtitle": {
    ko: "두 사람의 관계 성향을 분석합니다",
    en: "Discover your relationship compatibility together",
  },
  "couple.partner1": {
    ko: "파트너 1",
    en: "Partner 1",
  },
  "couple.partner2": {
    ko: "파트너 2",
    en: "Partner 2",
  },
  "couple.start": {
    ko: "커플 퀴즈 시작",
    en: "Start Couple Quiz",
  },
  "couple.enterNames": {
    ko: "두 사람의 이름을 입력하세요",
    en: "Enter both names",
  },
  "couple.transition.done": {
    ko: "완료!",
    en: "is done!",
  },
  "couple.transition.next": {
    ko: "의 차례입니다",
    en: "'s turn now",
  },
  "couple.transition.handover": {
    ko: "기기를 전달해주세요",
    en: "Please hand the device over",
  },
  "couple.result.compatibility": {
    ko: "궁합 점수",
    en: "Compatibility",
  },
  "couple.result.dimensions": {
    ko: "8차원 비교 분석",
    en: "8-Dimension Analysis",
  },
  "couple.result.style": {
    ko: "관계 성향 비교",
    en: "Relationship Style Comparison",
  },
  "couple.result.strengths": {
    ko: "잘 맞는 영역",
    en: "Where You Click",
  },
  "couple.result.growth": {
    ko: "성장 가능 영역",
    en: "Room to Grow",
  },
  "couple.result.plays": {
    ko: "추천 플레이",
    en: "Recommended Plays",
  },
  "couple.result.share": {
    ko: "X에 공유하기",
    en: "Share on X",
  },
  "couple.result.home": {
    ko: "홈으로 돌아가기",
    en: "Back to Home",
  },
  "couple.hero.button": {
    ko: "파트너와 함께",
    en: "With Partner",
  },
};

export function t(key: string, locale: Locale): string {
  const entry = dictionary[key];
  if (!entry) return key;
  return entry[locale] ?? entry.ko;
}
