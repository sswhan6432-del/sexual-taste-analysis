"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !adRef.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
      pushed.current = true;
    } catch {
      // AdSense not loaded
    }
  }, []);

  return (
    <div className={`mx-auto max-w-2xl px-4 py-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: 100 }}
        data-ad-client="ca-pub-3056597383286208"
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
