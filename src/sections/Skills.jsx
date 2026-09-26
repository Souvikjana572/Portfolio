import React, { useState, useMemo, useRef, useEffect } from "react";
import { FaJava, FaReact } from "react-icons/fa";
import {
  SiTypescript,
  SiPython,
  SiMongodb,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiExpress,
  SiCplusplus,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiThreedotjs,
  SiIntellijidea,
  SiAmazonwebservices,
  SiAmazonec2,
  SiAwslambda,
  SiAmazons3,
  SiAmazoncloudwatch,
  SiMysql,
  SiGithubactions,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { playUiSound } from "../utils/sound";
import ParticleBackground from "../components/Particlesbackground";

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "languages", label: "Languages" },
  { id: "web", label: "Frontend" },
  { id: "backend", label: "Backend & DB" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "tools", label: "Tools & Libs" },
];

const SKILLS_DATA = [
  // Languages
  { name: "Java", category: "languages", level: "Primary", icon: FaJava, color: "#f89820", tag: "Enterprise & AWS" },
  { name: "C/C++", category: "languages", level: "Advanced", icon: SiCplusplus, color: "#00599c", tag: "DSA & CP" },
  { name: "Python", category: "languages", level: "Proficient", icon: SiPython, color: "#3776ab", tag: "Scripting & AI" },
  { name: "JavaScript", category: "languages", level: "Advanced", icon: SiJavascript, color: "#f7df1e", tag: "Full Stack" },
  { name: "TypeScript", category: "languages", level: "Advanced", icon: SiTypescript, color: "#3178c6", tag: "Typed System" },
  { name: "SQL", category: "languages", level: "Proficient", icon: SiMysql, color: "#4479a1", tag: "Relational Queries" },

  // Web & Frontend
  { name: "React", category: "web", level: "Advanced", icon: FaReact, color: "#61dafb", tag: "UI Components" },
  { name: "Tailwind CSS", category: "web", level: "Advanced", icon: SiTailwindcss, color: "#38bdf8", tag: "Modern Styling" },
  { name: "HTML5", category: "web", level: "Proficient", icon: SiHtml5, color: "#e34f26", tag: "Semantic Markup" },
  { name: "CSS3", category: "web", level: "Proficient", icon: SiCss3, color: "#1572b6", tag: "Responsive UI" },
  { name: "Angular", category: "web", level: "Familiar", icon: SiAngular, color: "#dd0031", tag: "SPA Architecture" },

  // Backend & DB
  { name: "Node.js", category: "backend", level: "Advanced", icon: DiNodejsSmall, color: "#539e43", tag: "Runtime Services" },
  { name: "Express.js", category: "backend", level: "Advanced", icon: SiExpress, color: "#ffffff", tag: "REST APIs" },
  { name: "MongoDB", category: "backend", level: "Proficient", icon: SiMongodb, color: "#47a248", tag: "NoSQL Database" },
  { name: "MySQL", category: "backend", level: "Proficient", icon: SiMysql, color: "#00758f", tag: "RDBMS Schema" },
  { name: "Firebase", category: "backend", level: "Proficient", icon: SiFirebase, color: "#ffca28", tag: "Auth & Firestore" },

  // Cloud & DevOps
  { name: "AWS", category: "cloud", level: "Production", icon: SiAmazonwebservices, color: "#ff9900", tag: "Amazon Experience" },
  { name: "AWS EC2", category: "cloud", level: "Production", icon: SiAmazonec2, color: "#ff9900", tag: "Compute Instances" },
  { name: "AWS Lambda", category: "cloud", level: "Production", icon: SiAwslambda, color: "#ff9900", tag: "Serverless Handlers" },
  { name: "AWS S3", category: "cloud", level: "Production", icon: SiAmazons3, color: "#569a31", tag: "Object Storage" },
  { name: "CloudWatch", category: "cloud", level: "Production", icon: SiAmazoncloudwatch, color: "#ff4f8b", tag: "Logs & Alarms" },
  { name: "CI/CD", category: "cloud", level: "Proficient", icon: SiGithubactions, color: "#2088ff", tag: "Automated Deploy" },

  // Tools & Systems
  { name: "Git", category: "tools", level: "Advanced", icon: SiGit, color: "#f05032", tag: "Version Control" },
  { name: "VS Code", category: "tools", level: "Advanced", icon: VscVscode, color: "#007acc", tag: "Primary IDE" },
  { name: "IntelliJ", category: "tools", level: "Proficient", icon: SiIntellijidea, color: "#fe315d", tag: "Java Enterprise" },
  { name: "Three.js", category: "tools", level: "Creative", icon: SiThreedotjs, color: "#ffffff", tag: "WebGL 3D Visuals" },
  { name: "NumPy/Pandas", category: "tools", level: "Proficient", icon: SiPandas, color: "#150458", tag: "Data Analysis" },
  { name: "Jupyter", category: "tools", level: "Proficient", icon: SiJupyter, color: "#f37626", tag: "Notebooks" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("languages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Marquee ticker logic
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 35;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() - SPEED * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop && next <= -loop) {
        next += loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [x]);

  // Filter skills based on Category and Search Query
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesTab = activeTab === "all" || skill.category === activeTab;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.level.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section
      id="skills"
      className="relative w-full py-12 sm:py-20 bg-[#05070f] text-white overflow-hidden"
    >
      <ParticleBackground />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-transparent rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mb-2">
            Technical Stack
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>

          <p className="mt-1.5 sm:mt-2.5 text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
            Cloud architectures, competitive problem solving, and full-stack development.
          </p>
        </div>

        {/* Compact Filter Controls */}
        <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Category Tabs: smooth swipeable ribbon */}
          <div className="w-full sm:w-auto flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playUiSound("tab");
                    setActiveTab(cat.id);
                  }}
                  className={`relative px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                  data-cursor-text={cat.label}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 -z-10 shadow-sm shadow-blue-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-52 shrink-0">
            <input
              type="text"
              placeholder="Search tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 pl-8 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition-all backdrop-blur-md"
            />
            <span className="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 
          PHONE-OPTIMIZED RESPONSIVE GRID:
          - Phone (< 640px): 2 or 3 columns of sleek horizontal capsule pills with small 14px-16px icons.
            Takes minimal vertical height, fits on 1 screen without endless scrolling!
          - Tablet / Desktop (>= 640px): Expands into elegant glass cards with tech details.
        */}
        <motion.div
          layout
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playUiSound("click");
                    setSelectedSkill(isSelected ? null : skill);
                  }}
                  className={`group relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/70 border backdrop-blur-xl transition-all duration-200 cursor-pointer flex flex-row sm:flex-col items-center sm:justify-center text-left sm:text-center gap-2 sm:gap-1 overflow-hidden min-h-[44px] sm:min-h-[100px] ${
                    isSelected
                      ? "border-cyan-400 ring-1 ring-cyan-400/40 bg-slate-800/90"
                      : "border-white/10 hover:border-white/30 hover:bg-slate-800/60"
                  }`}
                  data-cursor-text={skill.name}
                >
                  {/* Subtle brand glow on hover */}
                  <div
                    className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200 blur-lg pointer-events-none"
                    style={{ backgroundColor: skill.color }}
                  />

                  {/* Level Tag (Desktop only) */}
                  <div className="hidden sm:flex w-full items-center justify-end mb-1">
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/5">
                      {skill.level}
                    </span>
                  </div>

                  {/* Icon Container: Micro badge on mobile, full tile on desktop */}
                  <div
                    className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ color: skill.color }}
                  >
                    <Icon className="text-xs sm:text-xl drop-shadow-sm" />
                  </div>

                  {/* Tech Name */}
                  <div className="min-w-0 flex-1 sm:w-full">
                    <h3 className="text-[11px] sm:text-xs font-semibold text-white group-hover:text-cyan-200 transition-colors truncate">
                      {skill.name}
                    </h3>
                    {/* Tech Tag (Desktop only) */}
                    <p className="hidden md:block text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                      {skill.tag}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <p className="text-xs sm:text-sm">No technologies match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Selected Skill Quick Callout */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-purple-950/70 border border-cyan-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-lg"
            >
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-black/50 border border-white/10 shrink-0"
                  style={{ color: selectedSkill.color }}
                >
                  <selectedSkill.icon />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    {selectedSkill.name}
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {selectedSkill.level}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-300 truncate">
                    Focus: <span className="text-white font-medium">{selectedSkill.tag}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="#projects"
                  onClick={() => playUiSound("click")}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                >
                  Projects →
                </a>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marquee Ticker */}
        <div className="mt-8 pt-5 border-t border-white/10 overflow-hidden">
          <div className="relative w-full overflow-hidden mask-gradient-x">
            <motion.div
              ref={trackRef}
              className="flex gap-4 sm:gap-6 items-center"
              style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
            >
              {[...SKILLS_DATA, ...SKILLS_DATA].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/40 border border-white/5 text-slate-300 hover:text-white transition-colors"
                  >
                    <Icon className="text-xs sm:text-sm" style={{ color: s.color }} />
                    <span className="text-[11px] sm:text-xs font-medium">{s.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
