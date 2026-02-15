"use client";

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Gold sweep overlay — enters then exits */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{ transformOrigin: "right" }}
      >
        <div className="h-full w-full bg-black" />
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </motion.div>

      {/* Entering sweep — reveals content */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full w-full bg-black" />
      </motion.div>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.15,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
