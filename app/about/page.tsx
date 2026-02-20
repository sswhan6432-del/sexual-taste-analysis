import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Velvet Compass",
  description: "Velvet Compass는 72문항으로 당신의 친밀함 아키타입을 분석합니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 font-serif text-3xl font-normal text-text-primary">About Velvet Compass</h1>

      <div className="space-y-8 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">Velvet Compass란?</h2>
          <p>
            Velvet Compass는 72문항의 심리 테스트를 통해 당신의 친밀함 성향을 과학적으로
            분석하는 서비스입니다. 8가지 차원을 종합적으로 분석하여 12가지 아키타입 중
            당신에게 가장 잘 맞는 유형을 찾아드립니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">8가지 분석 차원</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>주도성</strong> — 관계에서의 주도/수용 성향</li>
            <li><strong>감성적 연결</strong> — 감정적 교감의 중요도</li>
            <li><strong>모험성</strong> — 새로운 경험에 대한 개방성</li>
            <li><strong>감각 선호</strong> — 감각적 자극의 선호도</li>
            <li><strong>분위기</strong> — 상황과 환경의 중요도</li>
            <li><strong>커뮤니케이션</strong> — 소통 방식 선호</li>
            <li><strong>친밀감</strong> — 친밀도 깊이 선호</li>
            <li><strong>판타지</strong> — 상상력과 창의적 탐구 성향</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">12가지 아키타입</h2>
          <p>
            분석 결과를 바탕으로 12가지 아키타입 중 당신에게 가장 가까운 유형과
            보조 유형을 제시합니다. 각 아키타입에 대한 상세 설명과 함께
            궁합이 맞는 유형도 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">커플 테스트</h2>
          <p>
            개인 테스트 외에도 파트너와 함께하는 커플 궁합 테스트를 제공합니다.
            두 사람의 성향을 비교 분석하여 호환성 점수와 맞춤 추천을 제공합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">개인정보 보호</h2>
          <p>
            Velvet Compass는 회원가입이 필요 없으며, 테스트 결과는 서버에 저장되지 않습니다.
            모든 데이터는 사용자의 브라우저 내에서만 처리됩니다. 자세한 내용은{" "}
            <a href="/privacy" className="text-gold underline">개인정보처리방침</a>을
            참고해주세요.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">연락처</h2>
          <p>
            문의사항이 있으시면 아래로 연락해주세요.
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              이메일:{" "}
              <a href="mailto:sswhan6432@gmail.com" className="text-gold underline">
                sswhan6432@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
