import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10062-1.svg?raw";

export default {
  id: "10062",
  title: "分苹果·隔板法",
  grade: "五年级",
  module: "计数",
  difficulty: "进阶",
  question:
    "把 10 个完全相同的苹果分给 3 个小朋友，要求每个小朋友至少分到 1 个苹果。\n\n一共有多少种不同的分法？",
  figures: [
    {
      svg: svg1,
      alt: "10个苹果和3个小朋友",
    },
  ],
  solutions: [
    {
      key: "divider",
      label: "隔板法",
      steps: [
        {
          text: "用隔板法：在苹果形成的空隙中放隔板来分苹果。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "苹果排成一排",
                  rhs: "10 个 → 9 个空隙",
                },
                {
                  lhs: "放 2 块隔板",
                  rhs: "C(9, 2)",
                },
                {
                  lhs: "分法总数",
                  rhs: "C(9, 2) = 9 × 8 ÷ 2 = 36",
                  badge: "结论",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "把 12 个完全相同的练习本分给 4 个同学，每人至少 1 本，一共有多少种不同的分法？",
    fields: [
      {
        key: "answer",
        label: "分法数",
        type: "number",
      },
    ],
    answer: {
      answer: 165,
    },
    hint: "隔板法：12 本之间有 11 个空隙，放 3 块隔板：C(11, 3) = 165。",
  },
  tags: ["隔板法"],
} satisfies ProblemData;
