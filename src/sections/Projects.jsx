import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaGooglePlay, FaCheck, FaThLarge, FaFilm } from "react-icons/fa";
import { playUiSound } from "../utils/sound";

// Project images (desktop & mobile)
import img1 from "../assets/SOLIX.png";
import img2 from "../assets/StudentMS.png";
import img3 from "../assets/chess1.png";
import img4 from "../assets/Lagao.png";
import photo1 from "../assets/solixMobile.png";
import photo2 from "../assets/studentms1.png";
import photo3 from "../assets/CHESS.png";
import photo4 from "../assets/lagaoMobile.png";

const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    setIsMobile(mql.matches);
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState("showcase"); // "showcase" or "grid"
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = useMemo(
    () => [
      {
        id: "solix",
        category: "mobile",
        title: "Solix - AI Health Monitoring",
        tagline: "Intelligent healthcare tracking with Gemini AI analytics",
        playStore: "https://play.google.com/store/apps/details?id=app.solix.com&pcampaignid=web_share",
        image: isMobile ? photo1 : img1,
        color: "#0284c7",
        accent: "from-cyan-500/20 to-blue-600/20",
        description:
          "An advanced A.I.-powered health monitoring mobile application that tracks vital biometrics, provides real-time health insights, and connects to Google Gemini API for personalized automated diagnostic recommendations.",
        techList: ["Flutter", "Dart", "Firebase", "Gemini API", "Cloud Firestore", "Auth"],
        highlights: [
          "Published & live on Google Play Store with real user base",
          "Automated conversational AI assistant powered by Gemini API",
          "Real-time vitals synchronization with Firebase Firestore",
        ],
        status: "Live on Play Store",
      },
      {
        id: "lagao",
        category: "web",
        title: "Lagao - E-Commerce Plant Store",
        tagline: "Scalable full-stack plant marketplace with geolocation & payments",
        live: "https://lagao-store.vercel.app/",
        image: isMobile ? photo4 : img4,
        color: "#10b981",
        accent: "from-emerald-500/20 to-teal-600/20",
        description:
          "Modern full-stack plant nursery and botanical e-commerce platform. Features responsive catalog browsing, geolocation-assisted nursery discovery, cart state management, and secure online payment integration.",
        techList: ["React", "Node.js", "Tailwind CSS", "TypeScript", "PostgreSQL", "Razorpay / Stripe", "JWT"],
        highlights: [
          "Complete payment lifecycle with automated invoice generation",
          "Google Navigator API for local nursery pickup detection",
          "Optimized responsive catalog with instant filter & search",
        ],
        status: "Production Deployment",
      },
      {
        id: "studentms",
        category: "web",
        title: "Student Management System",
        tagline: "Comprehensive role-based institutional management platform",
        repo: "https://github.com/Souvikjana572/Student-Management-System",
        image: isMobile ? photo2 : img2,
        color: "#8b5cf6",
        accent: "from-purple-500/20 to-indigo-600/20",
        description:
          "Role-based enterprise management system tailored for educational institutions. Provides dedicated workflows for Admins, Teachers, and Students covering attendance, marks submission, course scheduling, and grading.",
        techList: ["React", "Express.js", "Node.js", "MongoDB", "Mongoose", "JWT Auth", "Axios"],
        highlights: [
          "Secure role-based access control (RBAC) across 3 user tiers",
          "Automated GPA calculation & analytics report generator",
          "RESTful architecture designed for minimal latency queries",
        ],
        status: "Open Source",
      },
      {
        id: "chess",
        category: "realtime",
        title: "Chess 1v1 Real-Time Engine",
        tagline: "Multiplayer live chess with WebSockets & spectator mode",
        repo: "https://github.com/Souvikjana572/Chess",
        image: isMobile ? photo3 : img3,
        color: "#ec4899",
        accent: "from-pink-500/20 to-rose-600/20",
        description:
          "Real-time 1v1 multiplayer chess application powered by Socket.IO. Features instant board move synchronization, legal move validation with chess.js, room-based matchmaking, and live spectator observation.",
        techList: ["Socket.IO", "Node.js", "Express", "chess.js", "Vanilla JS", "Tailwind CSS"],
        highlights: [
          "Sub-50ms live board synchronization across distributed clients",
          "Spectator broadcasting room support with live move history",
          "Full FEN notation validation and automated checkmate detection",
        ],
        status: "Open Source",
      },
    ],
    [isMobile]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // Scroll Showcase logic
  const sceneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (viewMode !== "showcase") return;
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = Math.min(
        projects.length - 1,
        Math.floor(v * projects.length)
      );
      setActiveIndex(idx >= 0 ? idx : 0);
    });
    return () => unsubscribe();
  }, [scrollYProgress, projects.length, viewMode]);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="projects"
      className="relative text-white bg-[#05070f] selection:bg-purple-500/30"
    >
      {/* Top Header & View Controls Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-2">
            Selected Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        {/* View Switcher & Category Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            {[
              { id: "all", label: "All" },
              { id: "mobile", label: "Mobile / AI" },
              { id: "web", label: "Web Apps" },
              { id: "realtime", label: "Real-time" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playUiSound("tab");
                  setActiveCategory(cat.id);
                  if (viewMode === "showcase" && cat.id !== "all") {
                    setViewMode("grid");
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => {
                playUiSound("toggle");
                setViewMode("showcase");
              }}
              title="Cinematic Scroll Showcase"
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                viewMode === "showcase"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaFilm className="text-sm" />
              <span className="hidden sm:inline font-medium">Showcase</span>
            </button>
            <button
              onClick={() => {
                playUiSound("toggle");
                setViewMode("grid");
              }}
              title="Interactive Card Grid"
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaThLarge className="text-sm" />
              <span className="hidden sm:inline font-medium">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: CINEMATIC SHOWCASE SCROLL STORY */}
      {viewMode === "showcase" && (
        <div
          ref={sceneRef}
          className="relative"
          style={{ height: `${120 * projects.length}vh` }}
        >
          {/* Sticky Viewport Stage */}
          <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8 py-10">
            {/* Dynamic Ambient Background Glow */}
            <div
              className="pointer-events-none absolute inset-0 transition-all duration-700 opacity-25"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${activeProject.color} 0%, transparent 60%)`,
              }}
            />

            {/* Quick Project Jump Pagination Dots */}
            <div className="relative z-30 mb-4 flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playUiSound("tab");
                    setActiveIndex(idx);
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    activeIndex === idx
                      ? "bg-white text-black font-bold shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline">{p.title.split("-")[0]}</span>
                </button>
              ))}
            </div>

            {/* Showcase Project Card Stage */}
            <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                >
                  {/* Left Column: Project Visual & Preview */}
                  <div className="lg:col-span-7 relative group">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/70 shadow-2xl backdrop-blur-xl h-[300px] sm:h-[400px] md:h-[450px] flex items-center justify-center p-4">
                      {/* Image Preview */}
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Status Tag Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-xs font-mono text-cyan-300 backdrop-blur-md">
                        {activeProject.status}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Info & Actions */}
                  <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-4">
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-cyan-300 font-medium">
                      {activeProject.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeProject.description}
                    </p>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 py-1">
                      {activeProject.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <FaCheck className="text-emerald-400 mt-1 flex-shrink-0 text-[10px]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeProject.techList.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-3">
                      {activeProject.playStore && (
                        <a
                          href={activeProject.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiSound("click")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-cyan-500/25 transition-all"
                        >
                          <FaGooglePlay /> Google Play Store
                        </a>
                      )}
                      {activeProject.live && (
                        <a
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiSound("click")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/25 transition-all"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {activeProject.repo && (
                        <a
                          href={activeProject.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiSound("click")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white font-semibold text-xs sm:text-sm hover:border-white/40 transition-all"
                        >
                          <FaGithub /> GitHub Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: INTERACTIVE 3D GRID VIEW */}
      {viewMode === "grid" && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-2xl"
              >
                {/* Visual Image Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40 flex items-center justify-center p-6 border-b border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-full max-w-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-xs font-mono text-cyan-300 backdrop-blur-md">
                    {project.status}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-400 font-medium mt-1">
                      {project.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <FaCheck className="text-emerald-400 mt-1 flex-shrink-0 text-[10px]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techList.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Card Action CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiSound("click")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
                        >
                          <FaGooglePlay /> Play Store
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiSound("click")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiSound("click")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-medium text-xs transition-colors"
                        >
                          <FaGithub /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
