import type { ProblemData } from "@/types/problem";

export default {
  id: "10029",
  title: "计算·定义新运算",
  grade: "四年级",
  difficulty: "进阶",
  module: "计算",
  question: "定义一种新运算“⊙”：a ⊙ b = 2 × a + b。\n求 (3 ⊙ 4) ⊙ 5 的值。",
  solutions: [
    {
      key: "stepwise",
      label: "分步代入法",
      steps: [
        {
          text: "3 ⊙ 4 = 2 × 3 + 4 = 10；\n10 ⊙ 5 = 2 × 10 + 5 = 25。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "3 ⊙ 4", rhs: "2 × 3 + 4 = 10" },
                { lhs: "10 ⊙ 5", rhs: "2 × 10 + 5 = 25", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "定义新运算“※”：x ※ y = (x + y) ÷ 2。求 12 ※ (8 ※ 20) 的值。",
    fields: [
      {
        key: "value",
        label: "计算结果",
      },
    ],
    answer: {
      value: 13,
    },
    hint: "先算 8 ※ 20 = (8 + 20)/2 = 14，再算 12 ※ 14 = (12 + 14)/2 = 13。",
  },
  tags: ["乘法原理"],
} satisfies ProblemData;
