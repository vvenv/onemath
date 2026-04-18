import type { ProblemData } from "@/types/problem";

export default {
  id: "10165",
  title: "速算与巧算·凑整法",
  grade: "三年级",
  difficulty: "基础",
  module: "计算",
  question: "计算：125 × 32",
  solutions: [
    {
      key: "grouping",
      label: "凑整法",
      steps: [
        {
          text: "125 × 32 = 125 × (4 × 8) = (125 × 8) × 4 = 1000 × 4 = 4000。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "125 × (4 × 8)" },
                { lhs: "", rhs: "(125 × 8) × 4 (结合律)" },
                { lhs: "", rhs: "1000 × 4", status: "keep" },
                { lhs: "", rhs: "4000", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：25 × 48",
    fields: [
      {
        key: "result",
        label: "计算结果",
      },
    ],
    answer: {
      result: 1200,
    },
    hint: "25 × 4 = 100，试着把 48 拆成 4 × 12。",
  },
  tags: ["凑整法"],
} satisfies ProblemData;
