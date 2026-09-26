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
  SiChartdotjs,
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
  { id: "web", label: "Frontend & Web" },
  { id: "backend", label: "Backend & DB" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "tools", label: "Tools & Libraries" },
];

const SKILLS_DATA = [
  // Languages
  { name: "Java", category: "languages", level: "Primary", icon: FaJava, color: "#f89820", tag: "Enterprise & AWS" },
  { name: "C/C++", category: "languages", level: "Advanced", icon: SiCplusplus, color: "#00599c", tag: "Data Structures & CP" },
  { name: "Python", category: "languages", level: "Proficient", icon: SiPython, color: "#3776ab", tag: "Scripting & AI" },
  { name: "JavaScript", category: "languages", level: "Advanced", icon: SiJavascript, color: "#f7df1e", tag: "Full Stack" },
  { name: "TypeScript", category: "languages", level: "Advanced", icon: SiTypescript, color: "#3178c6", tag: "Typed Architecture" },
  { name: "SQL", category: "languages", level: "Proficient", icon: SiMysql, color: "#4479a1", tag: "Relational Queries" },

  // Web & Frontend
  { name: "React", category: "web", level: "Advanced", icon: FaReact, color: "#61dafb", tag: "UI & Component Design" },
  { name: "Tailwind CSS", category: "web", level: "Advanced", icon: SiTailwindcss, color: "#38bdf8", tag: "Modern Styling" },
  { name: "HTML5", category: "web", level: "Proficient", icon: SiHtml5, color: "#e34f26", tag: "Semantic Markup" },
  { name: "CSS3", category: "web", level: "Proficient", icon: SiCss3, color: "#1572b6", tag: "Responsive Design" },
  { name: "Angular", category: "web", level: "Familiar", icon: SiAngular, color: "#dd0031", tag: "Enterprise SPA" },

  // Backend & DB
  { name: "Node.js", category: "backend", level: "Advanced", icon: DiNodejsSmall, color: "#539e43", tag: "Runtime & Microservices" },
  { name: "Express.js", category: "backend", level: "Advanced", icon: SiExpress, color: "#ffffff", tag: "REST APIs" },
  { name: "MongoDB", category: "backend", level: "Proficient", icon: SiMongodb, color: "#47a248", tag: "NoSQL Database" },
  { name: "MySQL", category: "backend", level: "Proficient", icon: SiMysql, color: "#00758f", tag: "RDBMS Schema" },
  { name: "Firebase", category: "backend", level: "Proficient", icon: SiFirebase, color: "#ffca28", tag: "Auth & Cloud Firestore" },

  // Cloud & DevOps
  { name: "AWS", category: "cloud", level: "Production", icon: SiAmazonwebservices, color: "#ff9900", tag: "Amazon Experience" },
  { name: "AWS EC2", category: "cloud", level: "Production", icon: SiAmazonec2, color: "#ff9900", tag: "Virtual Compute" },
  { name: "AWS Lambda", category: "cloud", level: "Production", icon: SiAwslambda, color: "#ff9900", tag: "Serverless Handlers" },
  { name: "AWS S3", category: "cloud", level: "Production", icon: SiAmazons3, color: "#569a31", tag: "Object Storage" },
  { name: "AWS CloudWatch", category: "cloud", level: "Production", icon: SiAmazoncloudwatch, color: "#ff4f8b", tag: "Monitoring & Alarms" },
  { name: "CI/CD & Actions", category: "cloud", level: "Proficient", icon: SiGithubactions, color: "#2088ff", tag: "Automated Deploy" },

  // Tools & Systems
  { name: "Git & GitHub", category: "tools", level: "Advanced", icon: SiGit, color: "#f05032", tag: "Version Control" },
  { name: "VS Code", category: "tools", level: "Advanced", icon: VscVscode, color: "#007acc", tag: "Primary IDE" },
  { name: "IntelliJ IDEA", category: "tools", level: "Proficient", icon: SiIntellijidea, color: "#fe315d", tag: "Java Enterprise" },
  { name: "Three.js", category: "tools", level: "Creative", icon: SiThreedotjs, color: "#ffffff", tag: "WebGL 3D Visuals" },
  { name: "NumPy & Pandas", category: "tools", level: "Proficient", icon: SiPandas, color: "#150458", tag: "Data Analysis" },
  { name: "Jupyter", category: "tools", level: "Proficient", icon: SiJupyter, color: "#f37626", tag: "Notebooks" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Marquee ticker logic
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 45; // Smooth scroll speed

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
      className="relative w-full py-24 bg-[#05070f] text-white overflow-hidden"
    >
      <ParticleBackground />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Ambient background glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4"
          >
            Technical Arsenal
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            Proven toolkit built from hands-on large scale cloud migrations at Amazon,
            competitive algorithmic problem solving, and full-stack production deployments.
          </motion.p>
        </div>

        {/* Interactive Controls Bar: Category Tabs & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playUiSound("tab");
                    setActiveTab(cat.id);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  data-cursor-text={cat.label}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 -z-10 shadow-lg shadow-blue-500/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search tech (e.g. AWS, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition-all backdrop-blur-md"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4"
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
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playUiSound("click");
                    setSelectedSkill(isSelected ? null : skill);
                  }}
                  className={`group relative p-4 rounded-2xl bg-slate-900/60 border backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden min-h-[140px] ${
                    isSelected
                      ? "border-cyan-400 ring-2 ring-cyan-400/40 bg-slate-800/80"
                      : "border-white/10 hover:border-white/30 hover:bg-slate-800/60"
                  }`}
                  data-cursor-text={skill.name}
                >
                  {/* Subtle brand glow hover background */}
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl pointer-events-none"
                    style={{ backgroundColor: skill.color }}
                  />

                  {/* Level Pill */}
                  <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                      {skill.level}
                    </span>
                  </div>

                  {/* Tech Icon with brand color glow */}
                  <div className="my-2 transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      className="text-4xl sm:text-5xl transition-colors duration-300 drop-shadow-md"
                      style={{ color: skill.color }}
                    />
                  </div>

                  {/* Tech Name & Tag */}
                  <div className="w-full mt-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {skill.tag}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No technologies match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-3 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Selected Skill Quick Detail Modal / Callout */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-purple-950/60 border border-cyan-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl bg-black/40 border border-white/10"
                  style={{ color: selectedSkill.color }}
                >
                  <selectedSkill.icon />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    {selectedSkill.name}
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {selectedSkill.level}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Focus: <span className="text-white font-medium">{selectedSkill.tag}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#projects"
                  onClick={() => playUiSound("click")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
                >
                  View Related Projects →
                </a>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕ Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kinetic Tech Marquee Ticker */}
        <div className="mt-16 pt-8 border-t border-white/10 overflow-hidden">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
            Continuous Kinetic Stream
          </p>
          <div className="relative w-full overflow-hidden mask-gradient-x">
            <motion.div
              ref={trackRef}
              className="flex gap-8 text-2xl sm:text-3xl items-center"
              style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
            >
              {[...SKILLS_DATA, ...SKILLS_DATA].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/40 border border-white/5 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
                  >
                    <Icon style={{ color: s.color }} />
                    <span className="text-xs sm:text-sm font-semibold">{s.name}</span>
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
