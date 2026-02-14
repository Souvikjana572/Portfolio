const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const memoryCache = new Map();

async function fetchWithCache(url) {
  const now = Date.now();
  const cached = memoryCache.get(url);
  if (cached && now - cached.time < CACHE_TTL_MS) {
    return cached.value;
  }
  const response = await fetch(url);
  memoryCache.set(url, { time: now, value: response });
  return response;
}

export default async function handler(req, res) {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ];
  if (process.env.CORS_ORIGIN) {
    allowedOrigins.push(...process.env.CORS_ORIGIN.split(",").map(s => s.trim()).filter(Boolean));
  }
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  res.setHeader("Content-Type", "application/json");
  // Cache at the edge for 15 minutes, serve stale while revalidating for 1 day
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");

  try {
    const endpoints = {
      codeforces: "https://codeforces.com/api/user.info?handles=souvik_jana_",
      codeforcesStatus: "https://codeforces.com/api/user.status?handle=souvik_jana_",
      codeforcesRating: "https://codeforces.com/api/user.rating?handle=souvik_jana_",
      codechef: "https://codechef-api.vercel.app/handle/sjana",
      leetcode: "https://alfa-leetcode-api.onrender.com/souvikjana/profile",
      geeksforgeeks: "https://geeks-for-geeks-stats-api.vercel.app/souvikjanaboss",
    };

    const results = await Promise.allSettled([
      fetchWithCache(endpoints.codeforces),
      fetchWithCache(endpoints.codeforcesStatus),
      fetchWithCache(endpoints.codeforcesRating),
      fetchWithCache(endpoints.codechef),
      fetchWithCache(endpoints.leetcode),
      fetchWithCache(endpoints.geeksforgeeks),
    ]);

    const toJson = async (result) => {
      if (result.status !== "fulfilled") {
        return { error: result.reason?.message || "Network error" };
      }
      const res = result.value;
      if (!res.ok) {
        return { error: `HTTP ${res.status}` };
      }
      try {
        return await res.json();
      } catch (e) {
        return { error: e?.message || "Invalid JSON" };
      }
    };

    const [cfJson, cfStatusJson, cfRatingJson, ccJson, lcJson, gfgJson] = await Promise.all(results.map(toJson));

    const codeforces = {};
    if (cfJson?.result?.[0]) {
      const u = cfJson.result[0];
      codeforces.rating = u.rating ?? null;
      codeforces.rank = u.rank ?? null;
      codeforces.maxRating = u.maxRating ?? null;
      codeforces.maxRank = u.maxRank ?? null;
      codeforces.contribution = u.contribution ?? null;
    } else if (cfJson?.error) {
      codeforces.error = cfJson.error;
    }
    if (cfStatusJson?.result && Array.isArray(cfStatusJson.result)) {
      const solvedSet = new Set();
      for (const sub of cfStatusJson.result) {
        if (sub?.verdict === "OK" && sub.problem) {
          const key = `${sub.problem.contestId || ""}:${sub.problem.index || ""}`;
          solvedSet.add(key);
        }
      }
      codeforces.solved = solvedSet.size;
    } else if (cfStatusJson?.error && !codeforces.error) {
      codeforces.error = cfStatusJson.error;
    }
    if (cfRatingJson?.result && Array.isArray(cfRatingJson.result)) {
      codeforces.contests = cfRatingJson.result.length;
    } else if (cfRatingJson?.error && !codeforces.error) {
      codeforces.error = cfRatingJson.error;
    }

    const codechef = {};
    if (ccJson && !ccJson.error) {
      const u = ccJson.data || ccJson || {};
      codechef.rating = u.rating ?? null;
      codechef.stars = u.stars ?? null;
      codechef.solved = u.problemsSolved ?? u.solved ?? null;
      codechef.contests = u.contests ?? u.contestCount ?? null;
    } else if (ccJson?.error) {
      codechef.error = ccJson.error;
    }

    const leetcode = {};
    if (lcJson && !lcJson.error) {
      const u = lcJson.ranking ? lcJson : lcJson.profile || lcJson;
      leetcode.solved = u.totalSolved ?? u.solved ?? null;
      leetcode.easy = u.easySolved ?? u.easy ?? null;
      leetcode.medium = u.mediumSolved ?? u.medium ?? null;
      leetcode.hard = u.hardSolved ?? u.hard ?? null;
      leetcode.globalRank = Number(u.ranking ?? u.rank ?? u.globalRank) || null;
    } else if (lcJson?.error) {
      leetcode.error = lcJson.error;
    }

    const geeksforgeeks = {};
    if (gfgJson && !gfgJson.error) {
      geeksforgeeks.totalSolved = Number(gfgJson.totalProblemsSolved ?? gfgJson.totalSolved ?? 0) || 0;
      geeksforgeeks.easy = Number(gfgJson.Easy ?? gfgJson.easy ?? 0) || 0;
      geeksforgeeks.medium = Number(gfgJson.Medium ?? gfgJson.medium ?? 0) || 0;
      geeksforgeeks.hard = Number(gfgJson.Hard ?? gfgJson.hard ?? 0) || 0;
      geeksforgeeks.easyCount = geeksforgeeks.easy;
      geeksforgeeks.mediumCount = geeksforgeeks.medium;
      geeksforgeeks.hardCount = geeksforgeeks.hard;
      geeksforgeeks.rank = gfgJson.instituteRank ?? gfgJson.rank ?? null;
      geeksforgeeks.score = gfgJson.codingScore ?? gfgJson.score ?? null;
    } else if (gfgJson?.error) {
      geeksforgeeks.error = gfgJson.error;
    }

    res.status(200).json({
      timestamp: new Date().toISOString(),
      codeforces,
      codechef,
      leetcode,
      geeksforgeeks,
    });
  } catch (error) {
    res.status(500).json({
      error: error?.message || "Server error",
      timestamp: new Date().toISOString(),
    });
  }
}
