"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";

interface StepTransitionProps {
  stepKey: string;
  children: React.ReactNode;
}

const stepVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
    transition: {
      duration: 0.35,
      ease: [0.55, 0, 1, 0.45] as const,
    },
  },
};

export default function StepTransition({
  stepKey,
  children,
}: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        variants={stepVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Decorative gold line on step change */}
        <motion.div
          className="pointer-events-none fixed left-0 right-0 top-0 z-30 h-[1px]"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          style={{ transformOrigin: "left" }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
