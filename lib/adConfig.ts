/**
 * Ad Configuration
 *
 * ExoClick 가입 후 발급받은 Zone ID를 아래에 입력하세요.
 * https://www.exoclick.com/ 에서 가입 → Sites → Add Site → Zone 생성
 *
 * 각 슬롯별 권장 광고 사이즈:
 * - banner_top: 728x90 (leaderboard) or 300x250 (medium rectangle)
 * - banner_mid: 300x250 (medium rectangle)
 * - banner_bottom: 728x90 (leaderboard) or 300x100 (large mobile)
 * - native: Native ad format
 */

export const AD_CONFIG = {
  enabled: true,
  provider: "exoclick" as const,

  // ExoClick Zone IDs — 가입 후 실제 값으로 교체하세요
  zones: {
    result_top: "5853758", // 결과 페이지 상단 300x250
    result_mid: "5853760", // 결과 페이지 중간 300x250
    result_bottom: "5853762", // 결과 페이지 하단 728x90
    couple_result_top: "5853764", // 커플 결과 상단 300x250
    couple_result_bottom: "5853766", // 커플 결과 하단 728x90
    home_bottom: "5853768", // 메인 페이지 하단 728x90
  },
} as const;

export type AdSlot = keyof typeof AD_CONFIG.zones;
