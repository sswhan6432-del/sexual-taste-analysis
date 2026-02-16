export type Locale = "ko" | "en";

const dictionary: Record<string, { ko: string; en: string }> = {
  // ─── AgeGate ───
  "age.title": {
    ko: "성인 인증",
    en: "Age Verification",
  },
  "age.subtitle": {
    ko: "Age Verification Required",
    en: "Age Verification Required",
  },
  "age.description": {
    ko: "본 사이트는 성인 전용 콘텐츠를 포함하고 있습니다.",
    en: "This site contains adult-only content.",
  },
  "age.minimum": {
    ko: "만 18세 이상만 이용 가능합니다.",
    en: "You must be 18 or older to access.",
  },
  "age.confirm": {
    ko: "네, 만 18세 이상입니다",
    en: "Yes, I am 18 or older",
  },
  "age.deny": {
    ko: "아니오, 나가겠습니다",
    en: "No, take me back",
  },

  // ─── Hero ───
  "hero.tagline": {
    ko: "Intimate Archetype Discovery",
    en: "Intimate Archetype Discovery",
  },
  "hero.subtitle": {
    ko: "당신의 은밀한 욕망을 12가지 아키타입으로 해부합니다",
    en: "Discover your intimate desires through 12 archetypes",
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
    ko: "당신의 욕망을 살짝 엿보는 입문",
    en: "A quick peek into your desires",
  },
  "hero.intermediate.desc": {
    ko: "침대 위 당신을 해부하는 심층 분석",
    en: "An in-depth analysis of your intimate self",
  },
  "hero.expert.desc": {
    ko: "가장 은밀한 곳까지 완전한 탐색",
    en: "A full exploration to your deepest desires",
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
};

export function t(key: string, locale: Locale): string {
  const entry = dictionary[key];
  if (!entry) return key;
  return entry[locale] ?? entry.ko;
}
