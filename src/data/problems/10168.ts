import type { ProblemData } from "@/types/problem";

export default {
  id: "10168",
  title: "分数与小数混合运算·裂项法",
  grade: "五年级",
  difficulty: "进阶",
  module: "计算",
  question: "计算：1/2 + 1/6 + 1/12 + 1/20 + 1/30",
  solutions: [
    {
      key: "splitting",
      label: "裂项法",
      steps: [
        {
          text: "分析：分母都是连续两个自然数的乘积，用裂项公式 1/(n×(n+1)) = 1/n − 1/(n+1)。",
        },
        {
          text: "原式 = (1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) + (1/4 − 1/5) + (1/5 − 1/6) = 1 − 1/6 = 5/6。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1/2", rhs: "1 − 1/2" },
                { lhs: "1/6", rhs: "1/2 − 1/3" },
                { lhs: "1/12", rhs: "1/3 − 1/4" },
                { lhs: "1/20", rhs: "1/4 − 1/5" },
                { lhs: "1/30", rhs: "1/5 − 1/6" },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "原式",
                  rhs: "1 − 1/2 + 1/2 − 1/3 + 1/3 − 1/4 + 1/4 − 1/5 + 1/5 − 1/6",
                },
                { lhs: "", rhs: "1 − 1/6", status: "keep" },
                { lhs: "", rhs: "5/6", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：1/1×2 + 1/2×3 + 1/3×4 + ... + 1/9×10",
    fields: [
      {
        key: "result",
        label: "计算结果（分数）",
      },
    ],
    answer: {
      result: "9/10",
    },
    hint: "利用裂项公式 1/(n×(n+1)) = 1/n − 1/(n+1)，中间项会相互抵消。",
  },
  tags: ["裂项"],
} satisfies ProblemData;
