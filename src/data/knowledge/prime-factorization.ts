import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "prime-factorization",
  name: "质因数分解",
  tag: "质因数分解",
  category: "numberCalc",
  summary:
    "每个合数都能唯一写成质数的乘积；求约数个数、公约数、最小公倍数的底层语言。",
  intuition:
    "质因数像一个数的“基因”。两个数比较约数、倍数关系，不看它们的十进制长相，只看基因组成。",
  derivation: [
    "任何 > 1 的整数 = 质数的乘积，且分解方式唯一（算术基本定理）。",
    "约数个数：若 n = p₁^a₁ · p₂^a₂ · … · pₖ^aₖ，则约数个数 = (a₁+1)(a₂+1)…(aₖ+1)。",
    "最大公约数：每个质因数取最小指数相乘。",
    "最小公倍数：每个质因数取最大指数相乘。",
  ],
  keyPoints: [
    "分解：试除法，从最小质数 2 开始除。",
    "GCD × LCM = a × b（两数之积）。",
  ],
  examples: [
    {
      title: "约数个数",
      problem: "360 有多少个正约数？",
      solution: ["360 = 2³ × 3² × 5。", "约数个数 = (3+1)(2+1)(1+1) = 24。"],
    },
    {
      title: "GCD 与 LCM",
      problem: "求 gcd(84, 90) 与 lcm(84, 90)。",
      solution: [
        "84 = 2² · 3 · 7；90 = 2 · 3² · 5。",
        "GCD：2¹ · 3¹ = 6。",
        "LCM：2² · 3² · 5 · 7 = 1260。",
        "验证：6 × 1260 = 7560 = 84 × 90。",
      ],
    },
  ],
  pitfalls: [
    "判断质数时要到 √n 就够了。",
    "写分解时按升序排质因数，便于比较。",
  ],
  relatedSlugs: ["divisibility"],
};

export default entry;
