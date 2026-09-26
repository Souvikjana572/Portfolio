import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import resumePdf from "../assets/Resume.pdf";
import { FaGithub, FaFilePdf, FaArrowRight } from "react-icons/fa6";
import { SiCodeforces, SiCodechef, SiLeetcode, SiGeeksforgeeks, SiChessdotcom } from "react-icons/si";
import ParticleBackground from "../components/Particlesbackground";
import Avatar3D from "../components/Avatar3D";
import { playUiSound } from "../utils/sound";

const socials = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Souvikjana572", color: "hover:text-white hover:border-white/40" },
  { Icon: SiLeetcode, label: "LeetCode", href: "https://leetcode.com/u/souvikjana/", color: "hover:text-yellow-400 hover:border-yellow-400/50" },
  { Icon: SiCodechef, label: "CodeChef", href: "https://www.codechef.com/users/sjana", color: "hover:text-amber-500 hover:border-amber-500/50" },
  { Icon: SiCodeforces, label: "Codeforces", href: "https://codeforces.com/profile/souvik_jana_", color: "hover:text-blue-400 hover:border-blue-400/50" },
  { Icon: SiGeeksforgeeks, label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/souvikjanaboss", color: "hover:text-emerald-400 hover:border-emerald-400/50" },
  { Icon: SiChessdotcom, label: "Chess.com", href: "https://www.chess.com/member/souvik_jana", color: "hover:text-green-400 hover:border-green-400/50" },
];

const highlights = [
  { value: "Amazon", label: "Dev Experience", badge: "Production" },
  { value: "1,100+", label: "LeetCode Solved", badge: "Top 4%" },
  { value: "1,890+", label: "CodeChef Rating", badge: "4-Star" },
  { value: "Rank 2", label: "GFG Institute", badge: "Top Tier" },
];

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => [
      "Software Developer",
      "Full Stack Engineer",
      "Competitive Programmer (4★)",
      "Cloud & Distributed Systems",
    ],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Mouse spotlight coordinates
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Typing effect logic
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1400);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 35 : 65);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref || containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full relative overflow-hidden bg-[#05070f] text-white flex items-center pt-24 pb-16"
    >
      <ParticleBackground />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Interactive Flashlight / Mouse Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.06), transparent 80%)`,
        }}
      />

      {/* Ambient glowing gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-[140px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/15 to-transparent blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <div className="flex justify-center lg:justify-start mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Software Engineer <span className="text-cyan-400 font-semibold">• Open for Opportunities</span>
              </span>
            </motion.div>
          </div>

          {/* Typing Role Header */}
          <motion.div
            className="mb-2 text-lg sm:text-2xl font-mono text-cyan-300 font-medium flex items-center justify-center lg:justify-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-slate-500">&gt;</span>
            <span>{roles[index].substring(0, subIndex)}</span>
            <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-0.5" />
          </motion.div>

          {/* Main Name Heading */}
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-slate-300 block text-2xl sm:text-3xl font-medium mb-1">
              Hi, I&apos;m
            </span>
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent font-display drop-shadow-[0_0_35px_rgba(59,130,246,0.3)]">
              Souvik Jana
            </span>
          </motion.h1>

          {/* Summary / Tagline */}
          <motion.p
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Passionate Software Engineer with hands-on experience building large-scale multi-region
            cloud services at <span className="text-cyan-300 font-semibold">Amazon</span>.
            Obsessed with high-performance architectures, intuitive web applications, and competitive problem-solving.
          </motion.p>

          {/* Key Metric Highlights Grid */}
          <motion.div
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {highlights.map((h, i) => (
              <div
                key={i}
                className="group relative p-3 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-300 text-left"
              >
                <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{h.badge}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {h.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">{h.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              onClick={() => playUiSound("click")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.7)] transition-all overflow-hidden"
              data-cursor-text="Projects"
            >
              <span className="relative z-10">Explore My Work</span>
              <FaArrowRight className="relative z-10 text-xs group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-transparent to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity" />
            </motion.a>

            <motion.a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUiSound("click")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-slate-900/80 border border-white/20 hover:border-cyan-400/60 hover:bg-slate-800 transition-all backdrop-blur-md shadow-lg"
              data-cursor-text="Resume"
            >
              <FaFilePdf className="text-rose-400 text-base" />
              <span>View Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Profiles Dock */}
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2 hidden sm:inline-block">
              Connect:
            </span>
            {socials.map(({ Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound("click")}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-text={label}
                className={`p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 text-lg transition-all duration-300 backdrop-blur-md hover:bg-slate-800/80 ${color}`}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Model Canvas */}
        <motion.div
          className="lg:col-span-5 relative hidden lg:flex items-center justify-center w-full h-[540px]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          {/* Glowing orbital halo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[420px] h-[420px] rounded-full"
            style={{
              filter: "blur(80px)",
              opacity: 0.45,
              background:
                "radial-gradient(circle, rgba(59,130,246,0.65) 0%, rgba(147,51,234,0.4) 50%, rgba(6,182,212,0.2) 75%, transparent 100%)",
            }}
          />

          {/* Floating interactive 3D Canvas */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Avatar3D />
          </div>

          {/* Floating Cyber Badge 1 */}
          <motion.div
            className="absolute -bottom-2 -left-4 p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-xl shadow-xl flex items-center gap-3"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono text-sm font-bold border border-cyan-500/40">
              AWS
            </div>
            <div>
              <p className="text-xs text-slate-400">Cloud Infrastructure</p>
              <p className="text-sm font-bold text-white">CDK • AppConfig</p>
            </div>
          </motion.div>

          {/* Floating Cyber Badge 2 */}
          <motion.div
            className="absolute -top-3 -right-2 p-3 rounded-2xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-xl shadow-xl flex items-center gap-3"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-sm font-bold border border-purple-500/40">
              DSA
            </div>
            <div>
              <p className="text-xs text-slate-400">Algorithms & CP</p>
              <p className="text-sm font-bold text-white">4★ CodeChef • Expert</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default Home;