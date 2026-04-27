import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "gcd",
  name: "最大公约数",
  tag: "最大公约数",
  category: "numberCalc",
  summary:
    "几个整数公有的约数中最大的那个。求法：质因数分解取“共有质因数的最小指数之积”，或用短除法。",
  intuition:
    "把一块 a × b 的长方形地板恰好铺成正方形瓷砖，瓷砖最大边长就是 gcd(a, b)。两数公共的“可整除粒度”里最大的那一档。",
  derivation: [
    "质因数分解：a = p₁^α₁ · p₂^α₂ · …，b = p₁^β₁ · p₂^β₂ · …，gcd(a, b) = p₁^min(α₁,β₁) · p₂^min(α₂,β₂) · …。",
    "短除法：用一个共同的质因数依次除两数，直到商互质，左侧所有除数之积即 gcd。",
    "辗转相除（更相减损/欧几里得）：gcd(a, b) = gcd(b, a mod b)，一直递归到余 0。",
    "重要恒等式：gcd(a, b) × lcm(a, b) = a × b。",
  ],
  keyPoints: [
    "gcd 取“共有质因数的最小指数”；lcm 取“所有质因数的最大指数”，正好相反。",
    "若 a | b，则 gcd(a, b) = a；若 a、b 互质，则 gcd(a, b) = 1。",
  ],
  examples: [
    {
      title: "短除法求 gcd",
      problem: "求 gcd(24, 36)。",
      solution: [
        "24 = 2³ × 3，36 = 2² × 3²。",
        "共有质因数 2 取最小指数 2，3 取最小指数 1。",
        "gcd(24, 36) = 2² × 3 = 12。",
      ],
    },
    {
      title: "切方块",
      problem:
        "一块 60 厘米 × 84 厘米的长方形板，要切成完全一样的最大正方形且不浪费材料。正方形边长是多少？最多切几块？",
      solution: [
        "边长 = gcd(60, 84) = 12 厘米。",
        "块数 = (60 ÷ 12) × (84 ÷ 12) = 5 × 7 = 35 块。",
      ],
      takeaway: "“最大不浪费”就是 gcd 的几何形象。",
    },
  ],
  pitfalls: [
    "“最大公因数”和“最小公倍数”常被混淆——一个取小指数，一个取大指数。",
    "三数 gcd 可两两递推：gcd(a, b, c) = gcd(gcd(a, b), c)。",
  ],
  relatedSlugs: ["lcm", "short-division", "divisibility"],
};

export default entry;
