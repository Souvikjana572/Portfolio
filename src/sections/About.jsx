import { motion } from "framer-motion";
import p from "../assets/Souvik1.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Layered neon background accents */}
      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-400/20 opacity-25 blur-[120px] animate-pulse"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-400/20 opacity-20 blur-[140px] animate-pulse delay-300"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-15 blur-[100px]" />
      </motion.div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        
        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar / Card */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-400/40 group"
             whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 " />
            <img 
              src={p} 
              alt="Souvik Jana" 
            />
          </motion.div>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300">
              Souvik Jana
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Software Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
            I’m a final year Computer Science undergraduate passionate about software development, problem-solving, and scalable systems. I enjoy building real-world applications and writing clean, efficient code.

I have experience in data structures & algorithms, full-stack development, and cloud technologies, and have solved hundreds of DSA problems across platforms. I’ve built projects using React, Node.js, MongoDB, and worked with AWS during my internship at Amazon, gaining exposure to production-level systems and engineering best practices.

I’m continuously learning and exploring machine learning, system design, and backend engineering, while sharpening my competitive programming skills.</p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Experience", value: "1+ years" },
                { label: "Specialty", value: "Full Stack" },
                { label: "Focus", value: "Software " },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl px-4 py-3 text-center hover:border-blue-400/60 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-blue-300 font-medium">{item.label}</div>
                  <div className="text-base font-semibold text-white mt-1">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all"
                aria-label="View my projects"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md text-white px-6 py-3 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all"
                aria-label="Get in touch"
              >
                Get in Touch
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Body copy only — removed skills chip grid */}
        <div className="grid md:grid-cols-1">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              About Me
            </h3>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
             I’m a Software Developer, Competetive Programmer, and Web Developer — passionate about building fast, resilient applications and solving real world problems.
            </p>
            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              I love turning ideas into scalable, user‑friendly products that make an impact. 
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
