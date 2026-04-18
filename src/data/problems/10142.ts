import type { ProblemData } from "@/types/problem";

export default {
  id: "10142",
  title: "速算·隐藏“乘 1”的分配律",
  grade: "五年级",
  difficulty: "进阶",
  module: "计算",
  question: "用简便方法计算：47 × 36 + 47 × 63 + 47。",
  solutions: [
    {
      key: "hidden-one",
      label: "乘法分配律·补出隐藏的 ×1",
      steps: [
        {
          text: "47 × 36 + 47 × 63 + 47 = 47 × 36 + 47 × 63 + 47 × 1 = 47 × (36 + 63 + 1) = 47 × 100 = 4700。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "47 × 36 + 47 × 63 + 47 × 1" },
                { lhs: "", rhs: "47 × (36 + 63 + 1) (提公因数)" },
                { lhs: "", rhs: "47 × 100", status: "keep" },
                { lhs: "", rhs: "4700", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "用简便方法计算：99 × 99 + 99。",
    fields: [
      {
        key: "result",
        label: "结果",
      },
    ],
    answer: {
      result: 9900,
    },
    hint: "把第二个 99 看成 99 × 1，提公因数：99 × (99 + 1) = 99 × 100。",
  },
  tags: ["乘法分配律"],
} satisfies ProblemData;
