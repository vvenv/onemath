import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "difference-of-squares",
  name: "平方差",
  tag: "平方差",
  category: "numberCalc",
  summary: "a² − b² = (a + b)(a − b)：把平方之差立刻改写为一次乘积。",
  intuition:
    "两个正方形面积的差，可以把一个套在另一个里——多出的那一“L 形”正好是 (a + b) × (a − b)。一张图记住一辈子。",
  derivation: [
    "展开：(a + b)(a − b) = a² − ab + ab − b² = a² − b²。",
    "正用：两个相邻 / 相近平方数之差 = 和 × 差。",
    "反用：一个式子写成两平方之差后，立即提为一次乘积。",
  ],
  keyPoints: [
    "a² − b² = (a + b)(a − b)。",
    "两个连续整数平方之差 = 它们的和（因为 a − b = 1）。",
  ],
  examples: [
    {
      title: "速算",
      problem: "计算 101² − 99²。",
      solution: ["= (101 + 99)(101 − 99) = 200 × 2 = 400。"],
    },
    {
      title: "因式分解",
      problem: "求 2024² − 2023²。",
      solution: ["= (2024 + 2023)(2024 − 2023) = 4047 × 1 = 4047。"],
      takeaway: "连续整数平方差 = 它们之和，心算即可。",
    },
    {
      title: "整除",
      problem: "证明 13² − 7² 能被 6 整除。",
      solution: [
        "13² − 7² = (13 + 7)(13 − 7) = 20 × 6 = 120。",
        "120 = 6 × 20，能被 6 整除。",
      ],
    },
  ],
  pitfalls: [
    "只对“差”成立；a² + b² 没有类似的简单因式分解（实数范围内）。",
    "注意符号：别把 (a − b)(a + b) 写反。",
  ],
  relatedSlugs: ["distributive-law", "prime-factorization"],
};

export default entry;
