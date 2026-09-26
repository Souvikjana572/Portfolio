import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the outer ring/aura
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device - if so, don't show custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Interactive element detection
    const handleElementHover = (e) => {
      const target = e.target.closest("a, button, [role='button'], input, textarea, select, .interactive-card");
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute("data-cursor-text") || "";
        setHoverText(customText);
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center glowing micro-dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-cyan-400"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 6 : 8,
          height: isHovered ? 6 : 8,
          boxShadow: "0 0 10px #22d3ee, 0 0 20px #06b6d4",
          transition: "width 0.2s, height 0.2s",
        }}
      />

      {/* Smooth outer magnetic ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 52 : 34,
          height: isHovered ? 52 : 34,
          border: isHovered
            ? "1.5px solid rgba(34, 211, 238, 0.9)"
            : "1.5px solid rgba(168, 85, 247, 0.6)",
          background: isHovered
            ? "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(168,85,247,0.05) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          scale: isClicked ? 0.8 : 1,
          boxShadow: isHovered
            ? "0 0 25px rgba(34, 211, 238, 0.35), inset 0 0 15px rgba(168, 85, 247, 0.2)"
            : "0 0 12px rgba(59, 130, 246, 0.2)",
          transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background 0.2s, box-shadow 0.2s",
        }}
      >
        {hoverText && (
          <span className="text-[9px] font-mono tracking-wider font-semibold text-cyan-200 uppercase">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Ambient soft glow trailing behind */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full blur-2xl opacity-40"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 90,
          height: 90,
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)",
        }}
      />
    </>
  );
}