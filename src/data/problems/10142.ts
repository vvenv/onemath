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
          text: "分析：最后一项 47 可写成 47 × 1，三项都有公因数 47，且 36 + 63 + 1 = 100，逆用分配律提取 47 即可凑整。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "47 × 36 + 47 × 63 + 47 × 1" },
                { lhs: "提公因数 (分配律反用)", rhs: "47 × (36 + 63 + 1)" },
                { lhs: "凑整 (36+63+1=100)", rhs: "47 × 100", status: "keep" },
                { lhs: "得数", rhs: "4700", status: "keep" },
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
    hint: "尝试将其中一个 99 改写为 99 × 1，提取公因数凑整。",
  },
  tags: ["乘法分配律"],
} satisfies ProblemData;
