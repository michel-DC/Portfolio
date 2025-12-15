"use client";

import React from "react";
import { motion } from "framer-motion";

const EntryAnimation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-7xl font-bold text-white"
      >
        Hello
      </motion.p>
    </motion.div>
  );
};

export default EntryAnimation;
