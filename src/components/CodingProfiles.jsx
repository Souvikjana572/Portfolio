import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiCodeforces, SiCodechef, SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaTrophy, FaCheckCircle, FaStar, FaFire, FaExternalLinkAlt } from "react-icons/fa";
import { playUiSound } from "../utils/sound";

const CodingProfiles = () => {
  const [stats, setStats] = useState({
    codeforces: {},
    codechef: {},
    leetcode: {},
    geeksforgeeks: {},
    loading: false,
    lastUpdated: null,
    error: null,
  });

  const fetchStats = async () => {
    try {
      setStats((prev) => ({ ...prev, loading: true }));
      const apiBase = import.meta.env.VITE_API_BASE || "";
      const res = await fetch(`${apiBase}/api/getStats`);
      if (!res.ok) throw new Error(`API ${res.status}`);
      const text = await res.text();
      let data = JSON.parse(text);

      setStats({
        codeforces: data.codeforces || {},
        codechef: data.codechef || {},
        leetcode: data.leetcode || {},
        geeksforgeeks: data.geeksforgeeks || {},
        loading: false,
        lastUpdated: data.timestamp || new Date().toLocaleString(),
        error: null,
      });
    } catch (e) {
      // Graceful fallback to verified stats
      setStats((prev) => ({
        ...prev,
        loading: false,
        lastUpdated: new Date().toLocaleDateString(),
      }));
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 1800000);
    return () => clearInterval(interval);
  }, []);

  const profiles = [
    {
      Icon: SiLeetcode,
      name: "LeetCode",
      href: "https://leetcode.com/u/souvikjana/",
      color: "from-amber-500/20 to-yellow-600/20",
      borderColor: "hover:border-yellow-500/50",
      accentColor: "#eab308",
      badge: "Top 4% Global",
      badgeClass: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
      primaryLabel: "Problems Solved",
      primaryValue: stats.leetcode?.solved || "1,100+",
      primarySub: "Global Rank ~18k",
      metrics: [
        { label: "Easy", count: stats.leetcode?.easy || "300+", color: "bg-emerald-500" },
        { label: "Medium", count: stats.leetcode?.medium || "650+", color: "bg-amber-500" },
        { label: "Hard", count: stats.leetcode?.hard || "150+", color: "bg-rose-500" },
      ],
      tagline: "Data Structures & Advanced Algorithms",
    },
    {
      Icon: SiCodechef,
      name: "CodeChef",
      href: "https://www.codechef.com/users/sjana",
      color: "from-orange-500/20 to-amber-600/20",
      borderColor: "hover:border-orange-500/50",
      accentColor: "#f97316",
      badge: "4★ Star Rated",
      badgeClass: "bg-orange-500/20 text-orange-300 border-orange-500/40",
      primaryLabel: "Peak Rating",
      primaryValue: stats.codechef?.rating || "1,890+",
      primarySub: "4 Stars Division 1",
      metrics: [
        { label: "Contests", count: stats.codechef?.contests || "50+", color: "bg-orange-500" },
        { label: "Solved", count: stats.codechef?.solved || "180+", color: "bg-amber-400" },
        { label: "Tier", count: "Div 1", color: "bg-rose-500" },
      ],
      tagline: "Competitive Div 1 Problem Solving",
    },
    {
      Icon: SiCodeforces,
      name: "Codeforces",
      href: "https://codeforces.com/profile/souvik_jana_",
      color: "from-blue-500/20 to-cyan-600/20",
      borderColor: "hover:border-blue-500/50",
      accentColor: "#3b82f6",
      badge: "Expert Level",
      badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      primaryLabel: "Max Rating",
      primaryValue: stats.codeforces?.maxRating || "1,600+",
      primarySub: "50+ Rated Rounds",
      metrics: [
        { label: "Solved", count: stats.codeforces?.solved || "360+", color: "bg-blue-400" },
        { label: "Rank", count: stats.codeforces?.rank || "Expert", color: "bg-cyan-400" },
        { label: "Rounds", count: "50+", color: "bg-indigo-400" },
      ],
      tagline: "Speed, Precision & Math Problem Solving",
    },
    {
      Icon: SiGeeksforgeeks,
      name: "GeeksforGeeks",
      href: "https://www.geeksforgeeks.org/profile/souvikjanaboss",
      color: "from-emerald-500/20 to-teal-600/20",
      borderColor: "hover:border-emerald-500/50",
      accentColor: "#10b981",
      badge: "Institute Rank 2",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      primaryLabel: "Institute Rank",
      primaryValue: stats.geeksforgeeks?.rank || "#2",
      primarySub: "1,000+ Problems Solved",
      metrics: [
        { label: "Score", count: "5000+", color: "bg-emerald-400" },
        { label: "Medium", count: stats.geeksforgeeks?.mediumCount || "560+", color: "bg-teal-400" },
        { label: "Hard", count: stats.geeksforgeeks?.hardCount || "110+", color: "bg-cyan-400" },
      ],
      tagline: "Core CS, System Concepts & DSA",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
            <FaTrophy className="text-amber-400" />
            <span>Competitive Benchmarks</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Competitive Programming{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Trophies
            </span>
          </h3>
        </div>
        <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Verified Profiles • 2,600+ Total Problems Solved</span>
        </div>
      </div>

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {profiles.map((profile, idx) => (
          <motion.a
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiSound("click")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`group relative rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10 ${profile.borderColor} backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-6 shadow-xl`}
            data-cursor-text="Profile"
          >
            {/* Top ambient colored lighting */}
            <div
              className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${profile.color} rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none`}
            />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform"
                  style={{ color: profile.accentColor }}
                >
                  <profile.Icon />
                </div>
                <span
                  className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${profile.badgeClass}`}
                >
                  {profile.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h4 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                {profile.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                {profile.tagline}
              </p>

              {/* Hero Metric Box */}
              <div className="my-5 p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {profile.primaryLabel}
                </div>
                <div className="text-3xl font-extrabold text-white mt-0.5 flex items-baseline gap-2">
                  <span>{profile.primaryValue}</span>
                </div>
                <div className="text-xs text-cyan-300 font-medium mt-0.5">
                  {profile.primarySub}
                </div>
              </div>

              {/* Sub-metrics Pills */}
              <div className="grid grid-cols-3 gap-2">
                {profile.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-slate-950/60 border border-white/5 text-center"
                  >
                    <div className="text-[10px] text-slate-400 font-mono">{m.label}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{m.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action link */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300 transition-colors font-medium">
              <span>View Verified Account</span>
              <FaExternalLinkAlt className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default CodingProfiles;
