import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "lcm",
  name: "最小公倍数",
  tag: "最小公倍数",
  category: "numberCalc",
  summary:
    "几个整数公有的倍数中最小的那个。求法：质因数分解取“所有质因数的最大指数之积”，或用短除法。",
  intuition:
    "两个齿轮齿数不同，第一次回到“同一个起始位”所转过的总齿数就是 lcm；同样，多个红绿灯第一次同时变绿的时间也是 lcm。",
  derivation: [
    "质因数分解：lcm(a, b) = p₁^max(α₁,β₁) · p₂^max(α₂,β₂) · …。",
    "短除法：与求 gcd 同步进行，把左侧除数与最后剩下的两个互质数全部相乘，得到 lcm。",
    "恒等式：lcm(a, b) = a × b ÷ gcd(a, b)，先求 gcd 再求 lcm 通常更省力。",
  ],
  keyPoints: [
    "lcm 取“所有质因数的最大指数”；gcd 取“共有质因数的最小指数”。",
    "若 a | b，则 lcm(a, b) = b；若互质，lcm(a, b) = a × b。",
  ],
  examples: [
    {
      title: "用恒等式求 lcm",
      problem: "求 lcm(24, 36)。",
      solution: [
        "gcd(24, 36) = 12。",
        "lcm(24, 36) = 24 × 36 ÷ 12 = 72。",
      ],
    },
    {
      title: "再次相遇",
      problem:
        "甲、乙两人绕同一环形跑道跑步。甲跑一圈要 48 秒，乙跑一圈要 60 秒。两人同时同地出发，多少秒后第一次在起点同时相遇？",
      solution: [
        "需要找“甲的整数圈用时”与“乙的整数圈用时”的最早交汇。",
        "时间 = lcm(48, 60) = 240 秒。",
        "也就是 4 分钟。",
      ],
      takeaway: "“同时再回到同一状态”这类问题就是在求 lcm。",
    },
  ],
  pitfalls: [
    "“最小公倍数”不是“最小的倍数”——任何数最小的倍数是它本身，公倍数才是关键。",
    "三数 lcm 可两两递推：lcm(a, b, c) = lcm(lcm(a, b), c)。",
  ],
  relatedSlugs: ["gcd", "short-division", "divisibility"],
};

export default entry;
