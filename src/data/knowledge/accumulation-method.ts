import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "accumulation-method",
  name: "累加法",
  tag: "累加法",
  category: "magicSquare",
  summary:
    "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
  intuition:
    "幻方里每行、每列、每对角线的和都相等，都等于“幻和”。把所有行加在一起，其实就是把每个格子加了一次——于是总和 = 行数 × 幻和。反过来就能求幻和。",
  derivation: [
    "幻方 n × n 的格子总和 S = 所有数字之和。",
    "所有行的和之和 = n × 幻和 = S。",
    "所以 幻和 = S ÷ n。",
    "结合某一行/列已有的部分数字，即可解出其余。",
  ],
  keyPoints: [
    "3 阶幻方用 1..9，总和 45，幻和 = 15。",
    "n 阶幻方（用 1..n²）幻和 = n(n² + 1) / 2。",
  ],
  examples: [
    {
      title: "三阶幻和",
      problem: "用 1–9 填入 3×3 幻方，每行/列/对角线之和相等。求这个和。",
      solution: [
        "总和 = 1 + 2 + … + 9 = 45。",
        "3 行相加 = 3 × 幻和 = 45，幻和 = 15。",
      ],
    },
    {
      title: "部分已填",
      problem: "三阶幻方中某行已知两个数 8 和 3，求该行第三个。",
      solution: ["幻和 = 15；第三个数 = 15 − 8 − 3 = 4。"],
    },
  ],
  pitfalls: ["当填入的数字不是 1..n² 时，幻和要按给定数字集合重新算。"],
  relatedSlugs: ["center-number-method"],
};

export default entry;
