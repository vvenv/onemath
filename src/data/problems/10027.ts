import type { ProblemData } from "@/types/problem";

export default {
  id: "10027",
  title: "计算·等差数列",
  grade: "四年级",
  difficulty: "进阶",
  module: "计算",
  question: "计算：1 + 3 + 5 + 7 + ... + 19",
  solutions: [
    {
      key: "pairing",
      label: "首尾配对法",
      steps: [
        {
          text: "项数 = (19 − 1) ÷ 2 + 1 = 10，首尾配对每对和 20。\n总和 = 20 × 5 = 100。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "项数", rhs: "(19 − 1) ÷ 2 + 1 = 10" },
                { lhs: "对数", rhs: "10 ÷ 2 = 5" },
                { lhs: "每对和", rhs: "1 + 19 = 20", status: "keep" },
                { lhs: "总和", rhs: "20 × 5 = 100", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：2 + 5 + 8 + 11 + ... + 29",
    fields: [
      {
        key: "sum",
        label: "计算结果",
      },
    ],
    answer: {
      sum: 155,
    },
    hint: "先计算项数，再使用首尾配对法。",
  },
  tags: ["首尾配对"],
} satisfies ProblemData;
