"use client";

import { useEffect, useRef } from "react";
import { AD_CONFIG, type AdSlot } from "@/lib/adConfig";

declare global {
  interface Window {
    AdProvider?: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  slot: AdSlot;
  className?: string;
}

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const zoneId = AD_CONFIG.zones[slot];
  const isPlaceholder = zoneId.startsWith("YOUR_ZONE_ID");

  useEffect(() => {
    if (!AD_CONFIG.enabled || isPlaceholder || initialized.current) return;
    initialized.current = true;

    // Push ad serve request
    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({ serve: {} });
  }, [isPlaceholder]);

  if (!AD_CONFIG.enabled) return null;

  // Development placeholder
  if (isPlaceholder) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div
        className={`mx-auto flex max-w-2xl items-center justify-center border border-dashed border-white/10 py-6 ${className}`}
      >
        <p className="text-[10px] uppercase tracking-widest text-white/20">
          Ad Slot: {slot}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mx-auto flex max-w-2xl items-center justify-center overflow-hidden ${className}`}
    >
      <ins className="eas6a97888e" data-zoneid={zoneId} />
    </div>
  );
}
