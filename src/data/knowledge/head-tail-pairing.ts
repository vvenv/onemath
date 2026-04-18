import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "head-tail-pairing",
  name: "首尾配对",
  tag: "首尾配对",
  category: "numberCalc",
  summary: "等差数列求和：头尾两两配对，每对和相同，总和 = 对数 × 配对和。",
  intuition:
    "1 + 2 + 3 + … + 100 写成两排，一排顺、一排倒：1 + 100，2 + 99，…每对都是 101。共 50 对，于是总和 = 50 × 101 = 5050。这就是高斯小时候用的配对法。",
  derivation: [
    "等差数列 a₁, a₂, …, aₙ（公差 d）。",
    "首尾 a₁ + aₙ 与 a₂ + a_{n-1} 都等于 a₁ + aₙ（对称性）。",
    "共 n/2 对，总和 = n × (a₁ + aₙ) / 2。",
  ],
  keyPoints: [
    "等差数列求和公式：S = n × (首 + 末) ÷ 2。",
    "项数 n = (末 − 首) / d + 1。",
  ],
  examples: [
    {
      title: "连续整数",
      problem: "1 + 2 + … + 100 = ?",
      solution: ["S = 100 × (1 + 100) / 2 = 5050。"],
    },
    {
      title: "等差有公差",
      problem: "3 + 7 + 11 + … + 99 = ?",
      solution: [
        "项数 n = (99 − 3)/4 + 1 = 25。",
        "S = 25 × (3 + 99) / 2 = 1275。",
      ],
    },
  ],
  pitfalls: ["项数要用公式算清楚，不能数手指。"],
  relatedSlugs: ["arithmetic-sequence-method", "telescoping"],
};

export default entry;
