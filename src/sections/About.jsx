import { motion } from "framer-motion";
import p from "../assets/Souvik1.jpg";
import ParticleBackground from "../components/Particlesbackground";
import CodingProfiles from "../components/CodingProfiles";
import { FaGraduationCap, FaBriefcase, FaCode, FaCloud, FaDownload } from "react-icons/fa";
import resumePdf from "../assets/Resume.pdf";
import { playUiSound } from "../utils/sound";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full relative bg-[#05070f] text-white py-24 overflow-hidden"
      aria-label="About Souvik Jana"
    >
      <ParticleBackground />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Ambient background light orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-10 -left-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-transparent blur-[140px]"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[480px] h-[480px] rounded-full bg-gradient-to-r from-purple-600/20 via-pink-500/15 to-transparent blur-[150px]"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col gap-16">
        {/* Top Profile Card Container */}
        <motion.div
          className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle top edge neon line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Left Avatar / Photo Frame */}
          <div className="relative group shrink-0">
            {/* Ambient halo behind photo */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-white/20 bg-slate-950 shadow-2xl">
              <img
                src={p}
                alt="Souvik Jana"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Verified badge */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/15 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-300 font-semibold">@souvikjana</span>
                <span className="text-emerald-400 flex items-center gap-1">● Active</span>
              </div>
            </div>
          </div>

          {/* Right Bio & Info */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3 mx-auto lg:mx-0 w-fit">
              About Me
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Engineering with{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Precision &amp; Scale
              </span>
            </h2>

            <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              I&apos;m <span className="text-white font-semibold">Souvik Jana</span>, a Software Engineer dedicated to architecting scalable distributed systems and turning difficult algorithmic problems into clean, robust production services.
            </p>

            <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">
              Having contributed to <span className="text-cyan-300 font-semibold">Amazon</span> logistics backend migrations across multiple geographic regions with zero downtime, I understand what it takes to build software that handles real production load. When I&apos;m not writing code, I love competing in algorithmic contests on LeetCode and CodeChef.
            </p>

            {/* Quick Spec Pills */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: FaBriefcase, label: "Experience", value: "Amazon (HYD13)" },
                { icon: FaCode, label: "Core Stack", value: "Java • React • Node" },
                { icon: FaCloud, label: "Infrastructure", value: "AWS CDK • Cloud" },
                { icon: FaGraduationCap, label: "Academics", value: "8.50 CGPA B.Tech" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-black/40 border border-white/5 text-left hover:border-cyan-500/30 transition-colors"
                  >
                    <Icon className="text-cyan-400 text-sm mb-1.5" />
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {item.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3.5 justify-center lg:justify-start">
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound("click")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-blue-500/25 transition-all"
                data-cursor-text="Resume"
              >
                <FaDownload className="text-xs" />
                <span>Download Resume (PDF)</span>
              </a>
              <a
                href="#contact"
                onClick={() => playUiSound("click")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-white/20 text-white font-semibold text-xs sm:text-sm hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                data-cursor-text="Contact"
              >
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Coding Profiles Trophy Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CodingProfiles />
        </motion.div>
      </div>
    </section>
  );
}
