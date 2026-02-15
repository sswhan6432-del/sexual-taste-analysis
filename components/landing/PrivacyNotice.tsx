"use client";

import { motion } from "framer-motion";

export default function PrivacyNotice() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="mx-auto max-w-md px-4 pb-20"
    >
      <div className="border-t border-b border-gold/[0.08] py-6 text-center">
        <p className="text-xs font-normal leading-relaxed tracking-wider text-text-muted">
          All data is stored locally on your device.
          <br />
          Nothing is transmitted to any server.
        </p>
      </div>
    </motion.section>
  );
}
