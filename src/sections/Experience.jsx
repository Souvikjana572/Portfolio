import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ParticleBackground from "../components/Particlesbackground";
import amazonCert from "../assets/Amazon.pdf";

const experiences = [
  {
    role: "Programmer/Analyst Intern",
    company: "Amazon",
    duration: "July - Dec 2025",
    startLabel: "July 2025",
    startDateTime: "2025-07",
    endLabel: "Dec 2025",
    endDateTime: "2025-12",
    // location: "HYD13, Amazon Hyderabad Development Center",
    type: "Internship",
    certificate: amazonCert,
    description:
      "Worked on an end-to-end service migration project to expand systems to new geographic regions. Prepared services for region onboarding, updated deployment configurations, supported controlled traffic shifts, and validated stability through functional and regression testing.",
    highlights: [
      "Contributed to large-scale multi-region service migration work",
      "Migrated the local business configuration by integrating AWS AppConfig, ensuring a 0% downtime experience. Dialed in US Marketplace.",
      "Delivering secure raw data access from the data lake, addressing data privacy risk and completing end-to-end infrastructure setup using AWS CDK.",
    ],
    technologies: [
      "AWS",
      "Java",
      "TypeScript",
      "System Architecture",
      "CI/CD",
      "DevOps",
      "Testing",
    ],
  },
  {
    role: "Developer",
    company: "Solix",
    duration: "June - July 2026",
    startLabel: "June 2026",
    startDateTime: "2026-06",
    endLabel: "July 2026",
    endDateTime: "2026-07",
    location: "India",
    type: "Freelance",
    description:
      "Developed An A.I. health monitoring app that tracks user health data, provides insights, and integrates with Gemini API for advanced analytics.",
    highlights: [
      "Designed and implemented a user-friendly interface using Flutter",
      "Integrated Rule-based AI and Gemini API for personalized health insights and chatbot functionality",
      "Optimized performance and ensured responsive design across devices",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Gemini API", "Cloud Firestore"],
  },
  {
    role: "Programmer/Analyst",
    company: "Amazon",
    duration: "July 2026 - Present",
    startLabel: "July 2026",
    startDateTime: "2026-07",
    endLabel: "Present",
    location: "India",
    type: "Full Time",
    description:
      "Building production-ready software with a focus on clean implementation, responsive user experiences, and reliable backend integrations. Working across modern web technologies while applying strong problem-solving fundamentals from competitive programming and software engineering.",
    highlights: [
      "Developing user-facing features with React and modern JavaScript",
      "Designing maintainable components and reusable UI patterns",
      "Improving application reliability through testing, debugging, and performance tuning",
    ],
    technologies: ["Typescript","Java","AWS","Softwares","Distributed Systems","Pipelines","CI/CD"],
  },
];

const cardVariants = {
  hidden: (isLeft) => ({
    opacity: 0,
    x: isLeft ? -56 : 56,
    y: 24,
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

  const tickPosition = isMobile
    ? "left-1/2"
    : isLeft
      ? "left-1/2"
      : "right-1/2";

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.55 }}
      className={`absolute left-4 z-30 -translate-x-1/2 md:left-1/2 ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
    >
      <span
        className={`absolute top-1/2 h-px w-7 -translate-y-1/2 bg-blue-300/70 ${tickPosition}`}
        aria-hidden="true"
      />
      <time
        dateTime={dateTime}
        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-blue-400/40 bg-gray-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100 shadow-[0_0_22px_rgba(59,130,246,0.22)] backdrop-blur ${labelPosition}`}
      >
        {label}
      </time>
    </motion.div>
  );
}

function TimelineItem({ experience, index, isMobile }) {
  const isLeft = !isMobile && index % 2 === 0;
  const alignment = isMobile
    ? "ml-12 pl-5"
    : isLeft
      ? "md:mr-[calc(50%+2rem)] md:pr-8"
      : "md:ml-[calc(50%+2rem)] md:pl-8";

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

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        viewport={{ once: true, amount: 0.45 }}
        className="absolute left-4 top-8 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-black bg-blue-300 shadow-[0_0_28px_rgba(96,165,250,0.85)] md:left-1/2"
        aria-hidden="true"
      />

      <motion.article
        custom={isLeft}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`relative ${alignment}`}
      >
        <div className="group relative overflow-hidden rounded-xl border border-gray-700/60 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-400/60 sm:p-6 lg:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent opacity-80" />

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                {experience.type}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {experience.role}
              </h3>
              <p className="mt-2 text-lg font-semibold text-blue-300">
                {experience.company}
              </p>
            </div>

            {/* <div className="shrink-0 rounded-lg border border-gray-700/70 bg-gray-900/70 px-4 py-3 text-left sm:text-right"> */}
              {/* <p className="text-sm font-semibold text-white">{experience.duration}</p> */}
              {/* <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-gray-400"> */}
                {/* {experience.location} */}
              {/* </p> */}
            {/* </div> */}
          </div>

          <p className="text-sm leading-7 text-gray-300 sm:text-base">
            {experience.description}
          </p>

          <div className="mt-6 space-y-3">
            {experience.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 text-sm text-gray-200">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-300" />
                <p>{highlight}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {experience.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: techIndex * 0.04 }}
                viewport={{ once: true }}
                className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-100"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {experience.certificate && (
            <motion.a
              href={experience.certificate}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex rounded-lg border border-blue-400/50 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 transition-colors hover:border-blue-300 hover:bg-blue-500/25"
            >
              View Certificate
            </motion.a>
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
      className="relative overflow-hidden bg-black py-20 text-white md:py-28"
      aria-label="Professional experience"
    >
      <ParticleBackground />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-[-10rem] h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-5 text-base leading-7 text-gray-300 sm:text-lg"
          >
            A scroll-linked timeline of my work and  experience.
          </motion.p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-gray-800 md:left-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-blue-300 via-purple-300 to-blue-300 md:left-1/2"
          />

          <div className="space-y-28 md:space-y-24">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={`${experience.company}-${experience.role}`}
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
