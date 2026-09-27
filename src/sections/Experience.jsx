import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaAward, FaBuilding } from "react-icons/fa";
import ParticleBackground from "../components/Particlesbackground";
import amazonCert from "../assets/Amazon.pdf";
import amazon_logo from "../assets/amazon_logo1.png";
import solix_logo from "../assets/solix_logo.png";
import amazon_logo2 from "../assets/amazon_logo2.png";
import { playUiSound } from "../utils/sound";

const experiences = [
  {
    role: "Programmer/Analyst",
    company: "Amazon",
    duration: "July - Dec 2025",
    startLabel: "July 2025",
    startDateTime: "2025-07",
    endLabel: "Dec 2025",
    endDateTime: "2025-12",
    location: "HYD13, Amazon Hyderabad Development Center",
    type: "Internship",
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    certificate: amazonCert,
    description:
      "Engineered an end-to-end service migration to onboard core logistics services to new geographic regions. Updated deployment configurations, orchestrated controlled canary traffic shifting, and validated 100% regional stability.",
    highlights: [
      "Contributed to large-scale multi-region service migration across Amazon's internal ecosystem",
      "Migrated local business configs via AWS AppConfig with 0% downtime across US Marketplaces",
      "Delivered secure raw data access from data lake using AWS CDK with zero compliance risk",
    ],
    technologies: [
      "AWS CDK",
      "Java",
      "TypeScript",
      "AppConfig",
      "Distributed Systems",
      "CI/CD Pipelines",
      "CloudWatch",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Solix",
    duration: "June - July 2026",
    startLabel: "June 2026",
    startDateTime: "2026-06",
    endLabel: "July 2026",
    endDateTime: "2026-07",
    location: "Remote",
    type: "Freelance",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    description:
      "Spearheaded development of an AI-powered health tracking application with biometric vitals telemetry, intelligent insight generation, and integrated Gemini AI chatbot.",
    highlights: [
      "Implemented responsive cross-platform client architecture using Flutter & Dart",
      "Integrated Gemini API for custom personalized medical insights and health recommendations",
      "Engineered real-time data sync with Firebase Cloud Firestore for rapid sub-second access",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Gemini API", "Cloud Firestore", "Auth"],
  },
  {
    role: "Programmer / Analyst",
    company: "Amazon",
    duration: "July 2026 - Present",
    startLabel: "July 2026",
    startDateTime: "2026-07",
    endLabel: "Present",
    location: "HYD13, Amazon Hyderabad Development Center",
    type: "Full Time",
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    description:
      "Designing and operating high-throughput backend services and resilient distributed architectures powering carrier logistics and millions of daily shipment workflows.",
    highlights: [
      "Developing services handling hundreds of logistics carriers and millions of requests/day",
      "Designing highly maintainable distributed architecture and reusable service patterns",
      "Enhancing fault tolerance, automated alarms, and end-to-end regression validation pipelines",
    ],
    technologies: [
      "TypeScript",
      "Java",
      "AWS",
      "Distributed Systems",
      "System Architecture",
      "CI/CD",
      "DevOps",
    ],
  },
];

const cardVariants = {
  hidden: (isLeft) => ({
    opacity: 0,
    x: isLeft ? -45 : 45,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

function TimelineDateMarker({ label, dateTime, position, isLeft, isMobile }) {
  const labelPosition = isMobile
    ? "left-8"
    : isLeft
      ? "left-8"
      : "right-8";

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.55 }}
      className={`absolute left-4 z-30 -translate-x-1/2 md:left-1/2 ${position === "top" ? "top-0" : "bottom-0"
        }`}
    >
      <time
        dateTime={dateTime}
        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-950/90 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur ${labelPosition}`}
      >
        {label}
      </time>
    </motion.div>
  );
}

function TimelineItem({ experience, index, isMobile }) {
  const isLeft = !isMobile && index % 2 === 0;
  const alignment = isMobile
    ? "ml-10 pl-4"
    : isLeft
      ? "md:mr-[calc(50%+2.5rem)] md:pr-4"
      : "md:ml-[calc(50%+2.5rem)] md:pl-4";

  return (
    <div className="relative min-h-[340px] md:min-h-[380px]">
      <TimelineDateMarker
        label={experience.startLabel}
        dateTime={experience.startDateTime}
        position="top"
        isLeft={isLeft}
        isMobile={isMobile}
      />
      <TimelineDateMarker
        label={experience.endLabel}
        dateTime={experience.endDateTime}
        position="bottom"
        isLeft={isLeft}
        isMobile={isMobile}
      />

      {/* Glowing Orb Node on Timeline */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="absolute left-4 top-10 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-slate-950 bg-cyan-400 shadow-[0_0_20px_#22d3ee] md:left-1/2"
      />

      <motion.article
        custom={isLeft}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className={`relative ${alignment}`}
      >
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80">
          {/* Subtle gradient top edge glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Header Row */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider ${experience.badgeColor}`}
                >
                  {experience.type}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <FaBuilding className="text-cyan-400 text-[10px]" />
                  {experience.company}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                {experience.role}
              </h3>

              {experience.location && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <span>{experience.location}</span>
                </p>
              )}
            </div>

            {/* Company Logo Badge */}
            <div className="h-10 sm:h-12 w-24 shrink-0 flex items-center justify-center p-1.5 rounded-xl bg-slate-950/70 border border-white/10">
              <img
                src={
                  experience.company === "Amazon"
                    ? isMobile
                      ? amazon_logo
                      : amazon_logo2
                    : solix_logo
                }
                alt={`${experience.company} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {experience.description}
          </p>

          {/* Key Achievements */}
          <div className="mt-4 space-y-2">
            {experience.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <p className="leading-snug">{highlight}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Certificate Link if applicable */}
          {experience.certificate && (
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <motion.a
                href={experience.certificate}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound("click")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-500/20"
                data-cursor-text="Verify"
              >
                <FaAward className="text-amber-400 text-sm" />
                <span>View Amazon Recommendation / Certificate</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </motion.a>
            </div>
          )}
        </div>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const timelineRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 45%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#05070f] py-24 text-white"
      aria-label="Professional experience"
    >
      <ParticleBackground />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-24 h-96 w-96 rounded-full bg-blue-500/15 blur-[140px]" />
        <div className="absolute bottom-20 right-[-10rem] h-96 w-96 rounded-full bg-purple-500/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
            Career Journey
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Real-world systems engineering, multi-region cloud service migrations, and distributed architectures.
          </motion.p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Base timeline rail */}
          <div className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 bg-slate-800 md:left-1/2" />

          {/* Active glowing laser timeline */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-4 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_#22d3ee] md:left-1/2"
          />

          <div className="space-y-24 md:space-y-28">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={`${experience.company}-${experience.role}-${experience.duration}`}
                experience={experience}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
