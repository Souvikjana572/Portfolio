// Importing React for building UI components
import React from "react";
// Importing motion components and scroll hooks from Framer Motion for animations
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "../components/Particlesbackground";
// Importing Amazon certificate
import amazonCert from "../assets/Amazon.pdf";

// Array of experience objects containing job details
const experiences = [
  {
    role: "Programmer/Analyst Intern",
    company: "Amazon",
    duration: "6 months ",
    location: "hyd13 (Amazon Hyderabad Development Center), India",
    startDate: "2024",
    certificate: amazonCert,
    description:
      "Worked on an end-to-end service migration project to expand the system to new geographic regions. Prepared services for region onboarding, updated configurations for regional deployments, and ensured cross-environment compatibility. Assisted in planning and executing controlled traffic shifts to gradually route user requests to new regions while minimizing risk. Monitored system behavior during rollout, identified and resolved issues, and performed functional and regression testing to validate stability, performance, and data correctness.",
    achievements: [
      "Successfully migrated services to new geographic regions, enabling expansion",
      "Implemented automated testing improving system reliability and deployment safety",
      "Reduced deployment time by optimizing configurations and release workflows",
      "Collaborated with cross-functional teams on infrastructure scaling"
    ],
    technologies: ["AWS", "Java", "TypeScript" ,"System Architecture","CI/CD Pipelines", "DevOps", "Testing"],
    highlights: "Large-scale service migration project"
  },
];

// Reusable component to render featured experience item
function ExperienceCard({ exp, scrollYProgress }) {
  const cardY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const achievementsY = useTransform(scrollYProgress, [0.2, 0.5], [80, 0]);
  const achievementsOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {/* Main Featured Card */}
      <motion.div
        style={{ opacity: cardOpacity, y: cardY }}
        className="relative group"
      >
        {/* Gradient background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent rounded-2xl blur-3xl" />
        
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Animated border on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />

          {/* Header Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-700/30">
          {/* Company & Role */}
            <div className="md:col-span-2">
              <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full mb-4">
                <p className="text-sm font-medium text-blue-300">Featured Experience</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  {exp.role}
                </h3>
                {exp.certificate && (
                  <motion.a
                    href={exp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 rounded-full hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-500/40 transition-all duration-200 w-fit"
                  >
                    <span className="text-sm font-semibold text-blue-200 hover:text-blue-100">View Certificate</span>
                  </motion.a>
                )}
              </div>
              <p className="text-2xl text-blue-300 font-semibold mt-2">{exp.company}</p>
              <p className="text-gray-400 mt-3 flex flex-wrap gap-4">
                <span>📅 {exp.duration}</span>
                <span>📍 {exp.location}</span>
              </p>
            </div>

            {/* Metrics Box */}
            <div className="flex flex-col gap-3">
              <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Duration</p>
                <p className="text-xl font-semibold text-white mt-1">July - Dec , 2025</p>
              </div>
              <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Type</p>
                <p className="text-xl font-semibold text-white mt-1">On-site</p>
              </div>
            </div>
          </div>

          {/* Main Description */}
          <div className="mb-10">
            <h4 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-3">About This Role</h4>
            <p className="text-gray-200 text-lg leading-relaxed">
              {exp.description}
            </p>
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-5 mb-10">
            <p className="flex items-center gap-3 text-blue-300 font-semibold">
              <span className="text-2xl">⭐</span>
              {exp.highlights}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-10">
            <h4 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">Technologies & Skills</h4>
            <div className="flex flex-wrap gap-3">
              {exp.technologies.map((tech, idx) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full"
                >
                  <span className="text-sm font-medium text-blue-200">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <motion.div
            style={{ opacity: achievementsOpacity, y: achievementsY }}
          >
            <h4 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">Key Achievements</h4>
            <div className="space-y-3">
              {exp.achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 bg-gray-800/20 rounded-lg border border-gray-700/30 hover:border-blue-400/30 hover:bg-gray-800/40 transition-all duration-300"
                >
                  <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-200">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Main Experience component
const Experience = () => {
  const sceneRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end center"] });

  // Animated background elements
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="experience" className="relative bg-black text-white overflow-hidden">
      <ParticleBackground />
      {/* Animated background elements */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"
      />

      {/* Main container */}
      <div ref={sceneRef} className="relative z-10">
        {/* Section Header */}
        <div className="relative pt-20 md:pt-32 pb-20 md:pb-40">
          <div className="text-center mb-16 md:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Professional Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Leveraging technical expertise to solve real-world problems at scale
            </motion.p>
          </div>

          {/* Experience Cards */}
          <div className="relative">
            {experiences.map((exp, idx) => (
              <ExperienceCard
                key={`${exp.company}-${exp.role}-${idx}`}
                exp={exp}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Bottom spacing with decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 text-sm">
            Open to new opportunities and exciting projects
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; // Exporting Experience component          
