import React from "react";
import { motion } from "framer-motion";
import ParticleBackground from "../components/Particlesbackground";
import { FaGraduationCap, FaAward, FaUniversity, FaSchool } from "react-icons/fa";

const educationData = [
  {
    icon: FaUniversity,
    institution: "JIS College of Engineering, Nadia",
    degree: "B.Tech in Computer Science & Engineering",
    score: "8.50 CGPA",
    scoreLabel: "Cumulative Grade",
    period: "2022 – 2026",
    status: "Graduating 2026",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-cyan-500/50",
    badge: "Undergraduate Degree",
    details: [
      "Specialization in Software Systems, Cloud & Algorithms",
      "Key Courses: Data Structures & Algorithms, Operating Systems, DBMS, Distributed Systems, Computer Networks",
    ],
  },
  {
    icon: FaSchool,
    institution: "Digha Vidyabhawan",
    degree: "Higher Secondary (Class-XII)",
    score: "88.6%",
    scoreLabel: "Board Score",
    period: "2021 – 2022",
    status: "WBCHSE Board",
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "hover:border-purple-500/50",
    badge: "Science (PCMB)",
    details: [
      "Stream: Physics, Chemistry, Mathematics, Biology",
      "Distinction in Mathematics and Physical Sciences",
    ],
  },
  {
    icon: FaSchool,
    institution: "Digha Vidyabhawan",
    degree: "Secondary Education (Class-X)",
    score: "91.42%",
    scoreLabel: "Board Score",
    period: "2019 – 2020",
    status: "WBBSE Board",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "hover:border-emerald-500/50",
    badge: "Secondary Distinction",
    details: [
      "High Honors with 91.42% overall aggregate",
      "Top percentile in Mathematical and Analytical subjects",
    ],
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="w-full py-24 bg-[#05070f] text-white relative overflow-hidden"
    >
      <ParticleBackground />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <FaGraduationCap className="text-sm" />
            <span>Academic Foundation</span>
          </div>

          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Education &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Milestones
            </span>
          </motion.h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Consistent academic excellence combining rigorous Computer Science fundamentals with practical engineering applications.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {educationData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl p-6 sm:p-7 bg-slate-900/60 border border-white/10 ${item.borderColor} backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between shadow-2xl overflow-hidden`}
              >
                {/* Background ambient corner glow */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none`}
                />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-cyan-300 text-xl group-hover:scale-110 transition-transform">
                      <Icon />
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                      {item.period}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mt-1">
                    {item.institution}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-1">
                    {item.degree}
                  </p>

                  {/* Score Highlight Box */}
                  <div className="my-5 p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {item.scoreLabel}
                      </div>
                      <div className="text-2xl font-extrabold text-white mt-0.5">
                        {item.score}
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      <FaAward className="text-lg" />
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{item.status}</span>
                  <span className="text-emerald-400">Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
