import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiCodeforces, SiCodechef, SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const CodingProfiles = () => {
  const [stats, setStats] = useState({
    codeforces: {},
    codechef: {},
    leetcode: {},
    geeksforgeeks: {},
    loading: true,
    lastUpdated: null,
    error: null,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setIsRefreshing(true);
      setStats(prev => ({ ...prev, loading: true }));
      const apiBase = import.meta.env.VITE_API_BASE || (import.meta.env.PROD ? "" : "");
      const res = await fetch(`${apiBase}/api/getStats`);
      if (!res.ok) throw new Error(`API ${res.status}`);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("API did not return JSON. If you're running Vite dev, set VITE_API_BASE to your deployed URL or use vercel dev.");
      }

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
      console.error('API fetch failed:', e.message || e);
      setStats(prev => ({ ...prev, loading: false, error: e.message || String(e), lastUpdated: new Date().toLocaleString() }));
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchStats, 1800000);
    return () => clearInterval(interval);
  }, []);

  const profiles = [
    {
      Icon: SiCodeforces,
      name: "Codeforces",
      href: "https://codeforces.com/profile/souvik_jana_",
      color: "from-blue-500 to-blue-600",
      badge: stats.codeforces?.rank || "Expert",
      stats: [
        { label: "Rating", value: stats.codeforces?.rating || "1600+", icon: "⭐" },
        { label: "Problems Solved", value: stats.codeforces?.solved || "350+", icon: "✓" },
      ],
      details: [
        { label: "Max Rating", value: stats.codeforces?.maxRating || "1600+" },
        { label: "Contests", value: stats.codeforces?.contests || "50+" },
      ],
    },
    {
      Icon: SiCodechef,
      name: "CodeChef",
      href: "https://www.codechef.com/users/sjana",
      color: "from-orange-500 to-orange-600",
      badge: stats.codechef?.stars ? `${stats.codechef.stars}★` : "4★",
      stats: [
        { label: "Rating", value: stats.codechef?.rating || "1890+", icon: "⭐" },
        { label: "Problems Solved", value: stats.codechef?.solved || "180+", icon: "✓" },
      ],
      details: [
        { label: "Stars", value: stats.codechef?.stars || "4" },
        { label: "Contests", value: stats.codechef?.contests || "50+" },
      ],
    },
    {
      Icon: SiLeetcode,
      name: "LeetCode",
      href: "https://leetcode.com/u/souvikjana/",
      color: "from-yellow-500 to-yellow-600",
      badge: "Hard",
      stats: [
        { label: "Global Ranking", value: stats.leetcode?.globalRank ?? stats.leetcode?.ranking ?? "22k", icon: "⭐" },
        { label: "Problems Solved", value: stats.leetcode?.solved || "1100+", icon: "✓" },
      ],
      details: [
        { label: "Easy", value: stats.leetcode?.easy ?? "300+" },
        { label: "Medium", value: stats.leetcode?.medium ?? "600+" },
        { label: "Hard", value: stats.leetcode?.hard ?? "150+" },
      ],
    },
    {
      Icon: SiGeeksforgeeks,
      name: "GeeksforGeeks",
      href: "https://www.geeksforgeeks.org/profile/souvikjanaboss",
      color: "from-green-500 to-green-600",
      badge: "Top",
      stats: [
        { label: "Institute Rank", value: stats.geeksforgeeks?.rank || "2", icon: "🏆" },
        { label: "Problem Solved", value: stats.geeksforgeeks?.totalSolved || stats.geeksforgeeks?.problems || "1000+", icon: "✓" },
      ],
      details: [
        { label: "School&basic", value: stats.geeksforgeeks?.score || "50+" },
        { label: "Easy", value: stats.geeksforgeeks?.easyCount || "260+" },
        { label: "Medium", value: stats.geeksforgeeks?.mediumCount || "560+" },
        { label: "Hard", value: stats.geeksforgeeks?.hardCount || "110+" },

      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Header with Refresh Button */}
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Competitive Programming Achievements
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            Passionate about solving challenging problems and competitive programming. Actively engaged
            across multiple platforms with a focus on data structures, algorithms, and system design.
          </p>
        </div>
        <motion.button
          onClick={fetchStats}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition-all whitespace-nowrap ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Syncing...' : 'Sync Now'}
        </motion.button>
      </div>

      {/* Last Updated Status */}
      {stats.lastUpdated && (
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <span>Last synced: {stats.lastUpdated}</span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          {stats.error && (
            <span className="ml-2 text-yellow-500">
              ⚠️ {stats.error}
            </span>
          )}
        </div>
      )}

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles.map((profile, idx) => (
          <motion.a
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative rounded-xl overflow-hidden"
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            />

            {/* Card content */}
            <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 h-full flex flex-col justify-between group-hover:border-gray-600/70 transition-all duration-300">
              {/* Icon and Badge */}
              <div className="flex items-start justify-between mb-4">
                <profile.Icon className="text-4xl text-gray-300 group-hover:text-white transition-colors" />
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${profile.color} text-white`}
                >
                  {profile.badge}
                </span>
              </div>

              {/* Profile Name and Main Stats */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  {profile.name}
                </h4>

                {/* Two Main Stats Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {profile.stats.map((stat, i) => (
                    <div key={i} className="bg-gray-800/40 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <span>{stat.icon}</span>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional Details */}
                <div className="space-y-2 bg-gray-800/30 rounded-lg p-3">
                  {profile.details.map((detail, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{detail.label}</span>
                      <span className="text-white font-semibold">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover CTA */}
              <div className="mt-4 text-xs text-gray-400 group-hover:text-blue-300 transition-colors flex items-center gap-1">
                View Profile →
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Note about live updates */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg text-sm text-gray-300">
        <p>
          <span className="text-blue-300 font-semibold">💡 Live Updates:</span> Data is pulled directly from public APIs. 
          If a platform rate-limits requests, please try again later.
        </p>
      </div>
    </div>
  );
};

export default CodingProfiles;
