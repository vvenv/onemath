import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "addition-principle",
  name: "加法原理",
  tag: "加法原理",
  category: "counting",
  summary: "一件事可以按并列的几“类”独立完成时，类数相加就是总方案。",
  intuition:
    "如果从 A 到 B 可以坐汽车，也可以坐火车，两者是“或”的关系，那么总走法就是两种方式的方案数之和——“或”走哪一类都算完成。",
  derivation: [
    "完成一件事有 n 类办法，彼此互斥（不能同时属于两类）。",
    "每类分别有 a₁, a₂, …, aₙ 种具体做法。",
    "总方案数 = a₁ + a₂ + … + aₙ。",
  ],
  keyPoints: ["关键词：“或”“分类”“并列”。", "分类必须互斥，不然会重复计数。"],
  examples: [
    {
      title: "分类出行",
      problem:
        "从甲地到乙地有 3 班汽车、2 班火车、1 班飞机。共有多少种走法？",
      solution: ["三种方式互斥并列，加法：3 + 2 + 1 = 6 种。"],
    },
    {
      title: "数位分类",
      problem: "用 0–9 组成一位或两位的自然数，共有多少个？",
      solution: [
        "一位：1–9 共 9 个。",
        "两位：十位 1–9、个位 0–9，9 × 10 = 90。",
        "一位与两位互斥，总共 9 + 90 = 99 个。",
      ],
      takeaway: "外层按“位数”分类加，内层按“数位”分步乘。",
    },
  ],
  pitfalls: ["不同类有重叠时不能直接加，要用容斥。"],
  relatedSlugs: [
    "multiplication-principle",
    "additive-multiplicative",
    "inclusion-exclusion",
  ],
};

export default entry;
