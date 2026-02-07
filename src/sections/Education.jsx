import React from "react";
import { motion } from "framer-motion";
import ParticleBackground from "../components/Particlesbackground";
export default function Education() {
	return (
        		<section id="education" className="w-full py-20 bg-black text-white relative overflow-hidden">
			<ParticleBackground />
			<div className="max-w-5xl mx-auto px-6 relative z-10">
				<motion.h2
					className="text-4xl font-bold mb-6 text-center mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-100 to-blue-300"
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Education
				</motion.h2>

				<div className="grid md:grid-cols-3 gap-6">
					{/* Class X */}
					<div className="bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
						<h3 className="text-lg font-semibold text-white">Digha Vidyabhawan</h3>
						<p className="text-sm text-gray-300 mt-2">Secondary(Class-X)</p>
						<p className="text-2xl font-bold text-white mt-3">91.42%</p>
						<p className="text-sm text-gray-300 mt-2">West Bengal Board of Secondary Education</p>
						<p className="text-xs text-gray-400 mt-3">Year: 2019-20</p>
					</div>

					{/* Class XII */}
					<div className="bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
						<h3 className="text-lg font-semibold text-white">Digha Vidyabhawan</h3>
						<p className="text-sm text-gray-300 mt-2">Higher Secondary(Class-XII)</p>
                        <p className="text-sm text-gray-300 mt-2">Stream - Science (PCMB)</p>
						<p className="text-2xl font-bold text-white mt-3">88.6%</p>
						<p className="text-sm text-gray-300 mt-2">West Bengal Council of Higher Secondary Education</p>
						<p className="text-xs text-gray-400 mt-3">Year: 2021-22</p>
					</div>

					{/* College */}
					<div className="bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
						<h3 className="text-lg font-semibold text-white">JIS College of Engineering, Nadia</h3>
						<p className="text-sm text-gray-300 mt-2">B.Tech in Computer Science & Engineering</p>
						<p className="text-2xl font-bold text-white mt-3">CGPA: 9.02</p>
						<p className="text-xs text-gray-400 mt-3">Duration: 2022–2026</p>
					</div>
				</div>

				
			</div>
		</section>
	);
}
