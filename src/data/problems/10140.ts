import type { ProblemData } from "@/types/problem";

export default {
  id: "10140",
  title: "速算·拆成整百再分配",
  grade: "四年级",
  difficulty: "基础",
  module: "计算",
  question: "用简便方法计算：99 × 73。",
  solutions: [
    {
      key: "split",
      label: "乘法分配律·正用拆开",
      steps: [
        {
          text: "99 × 73 = (100 − 1) × 73 = 100 × 73 − 1 × 73 = 7300 − 73 = 7227。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "(100 − 1) × 73" },
                { lhs: "", rhs: "100 × 73 − 1 × 73 (分配律)" },
                { lhs: "", rhs: "7300 − 73", status: "keep" },
                { lhs: "", rhs: "7227", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "用简便方法计算：98 × 46。",
    fields: [
      {
        key: "result",
        label: "结果",
      },
    ],
    answer: {
      result: 4508,
    },
    hint: "把 98 写成 (100 − 2)，用乘法分配律：(100 − 2) × 46 = 4600 − 92。",
  },
  tags: ["乘法分配律"],
} satisfies ProblemData;
