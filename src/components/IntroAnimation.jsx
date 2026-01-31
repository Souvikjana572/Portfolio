import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function IntroAnimation({ onFinish }) {
  const greetings = [
    "Hello", "নমস্কার","नमस्ते", "Hola", "Bonjour",
    "Ciao", "Olá", "Здравствуйте",
    "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
  ];

  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (exiting) return;

    // advance greetings quickly, then start the exit animation
    if (index < greetings.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 180);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setExiting(true), 300);
    return () => clearTimeout(t);
  }, [index, exiting, greetings.length]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onFinish?.(), 1800);
    return () => clearTimeout(t);
  }, [exiting, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center text-white overflow-hidden pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100vh" : 0 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          className="text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.12 }}
        >
          {greetings[index]}
        </motion.h1>
      </AnimatePresence>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path fill="black" d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>
    </motion.div>
  );
}