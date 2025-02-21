"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

export default function Background() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-screen h-screen -z-10 "
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{ type: "tween", duration: 0 }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500 via-blue-700 to-teal-500 opacity-30 blur-3xl" />
    </motion.div>
  );
}
