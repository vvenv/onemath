import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "short-division",
  name: "短除法",
  tag: "短除法",
  category: "numberCalc",
  summary:
    "用一个共同的质因数依次去除所给的数，直到商两两互质；左侧所有除数之积即 gcd，左侧除数与底部商之积即 lcm。",
  intuition:
    "把“依次提取公共质因数”的过程压缩成一张倒立的长除式：每一行分一个公因数出去，最后留下的就是再也分不动的“互质骨架”。",
  derivation: [
    "把要求的几个数横排写好，左侧画一道竖线。",
    "选一个能整除所有数的质数 p，写在左侧；下一行每个数都除以 p。",
    "继续选下一个公共质因数，直到一行里的数两两互质（再无公共质因数）。",
    "gcd = 左侧所有除数之积。",
    "lcm = 左侧所有除数 × 最后一行所有剩余商之积。",
  ],
  keyPoints: [
    "求 gcd 时，必须用“所有数都能整除”的质数；求 lcm 时，可放宽到“至少两个数能整除”的质数（不能整除的数原样落下）。",
    "短除法适合 2~4 个数同时求 gcd / lcm，比反复用恒等式更直观。",
  ],
  examples: [
    {
      title: "短除求 gcd 与 lcm",
      problem: "用短除法求 gcd(36, 60) 与 lcm(36, 60)。",
      solution: [
        "2 | 36, 60 → 18, 30；2 | 18, 30 → 9, 15；3 | 9, 15 → 3, 5（互质）。",
        "gcd = 2 × 2 × 3 = 12。",
        "lcm = 2 × 2 × 3 × 3 × 5 = 180。",
      ],
    },
    {
      title: "三数同时短除",
      problem: "求 lcm(12, 18, 30)。",
      solution: [
        "2 | 12, 18, 30 → 6, 9, 15。",
        "3 | 6, 9, 15 → 2, 3, 5（两两互质）。",
        "lcm = 2 × 3 × 2 × 3 × 5 = 180。",
      ],
      takeaway: "三数及以上同时操作，能省掉两两递推。",
    },
  ],
  pitfalls: [
    "短除时只能用质数，用合数会重复或漏掉因子。",
    "求 lcm 一定要把“没被这一行整除的数”原样抄下，不能丢弃。",
  ],
  relatedSlugs: ["gcd", "lcm", "divisibility"],
};

export default entry;
