"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "age-verified";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setVerified(stored === "true");
  }, []);

  const handleConfirm = () => {
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "true");
      setVerified(true);
    }, 600);
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com";
  };

  // SSR / hydration: render nothing until checked
  if (verified === null) return null;

  if (verified) return <>{children}</>;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="age-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-4"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[200px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-sm w-full text-center"
          >
            {/* Top ornament */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mx-auto mb-10 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            />

            {/* Warning icon */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 text-3xl font-light text-gold/60"
            >
              18+
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-3 text-2xl font-normal text-text-primary sm:text-3xl"
            >
              성인 인증
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-2 text-[10px] uppercase tracking-[0.3em] text-gold/40"
            >
              Age Verification Required
            </motion.p>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="mx-auto my-8 h-px w-10 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

              <p className="mb-2 text-sm leading-relaxed text-text-secondary">
                본 사이트는 성인 전용 콘텐츠를 포함하고 있습니다.
              </p>
              <p className="mb-8 text-xs leading-relaxed text-text-muted">
                만 18세 이상만 이용 가능합니다.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={handleConfirm}
                className="group relative w-full border border-gold/30 py-4 text-sm font-normal tracking-wider text-gold transition-all duration-500 hover:border-gold/60 hover:bg-gold/[0.05]"
              >
                네, 만 18세 이상입니다
                {/* Corner accents */}
                <span className="absolute left-0 top-0 h-3 w-px bg-gold/0 transition-all duration-500 group-hover:bg-gold/50" />
                <span className="absolute left-0 top-0 h-px w-3 bg-gold/0 transition-all duration-500 group-hover:bg-gold/50" />
                <span className="absolute bottom-0 right-0 h-3 w-px bg-gold/0 transition-all duration-500 group-hover:bg-gold/50" />
                <span className="absolute bottom-0 right-0 h-px w-3 bg-gold/0 transition-all duration-500 group-hover:bg-gold/50" />
              </button>

              <button
                onClick={handleDeny}
                className="w-full py-3 text-xs tracking-wider text-text-muted/50 transition-colors duration-300 hover:text-text-muted"
              >
                아니오, 나가겠습니다
              </button>
            </motion.div>

            {/* Bottom ornament */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mx-auto mt-12 h-px w-10 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}

      {exiting && (
        <motion.div
          key="age-gate-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
