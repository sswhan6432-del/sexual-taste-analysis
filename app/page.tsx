"use client";

import AgeGate from "@/components/landing/AgeGate";
import Hero from "@/components/landing/Hero";
import PrivacyNotice from "@/components/landing/PrivacyNotice";

export default function LandingPage() {
  return (
    <AgeGate>
      <main>
        <Hero />
        <PrivacyNotice />
      </main>
    </AgeGate>
  );
}
