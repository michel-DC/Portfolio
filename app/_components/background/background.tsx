"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Background() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Initialize window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-slate-900" />
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        animate={{
          x: position.x - windowSize.width / 2,
          y: position.y - windowSize.height / 2,
        }}
        transition={{
          type: "spring",
          damping: 8, // Lower damping for faster response
          stiffness: 200, // Higher stiffness for quicker movement
          mass: 0.3, // Lower mass for lighter, faster motion
          restDelta: 0.001, // Smaller rest delta for smoother finish
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800/40 blur-[100px]" />
      </motion.div>
    </>
  );
}
