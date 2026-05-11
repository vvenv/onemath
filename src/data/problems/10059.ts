import type { ProblemData } from "@/types/problem";

export default {
  id: "10059",
  title: "算式比较大小·拆项法",
  grade: "四年级",
  difficulty: "基础",
  module: "计算",
  question:
    "不通过计算（不直接算出具体乘积），比较 31 × 29 和 30 × 30 的大小，\n\n并说明理由。",
  solutions: [
    {
      key: "split",
      label: "拆项法（平方差思想）",
      steps: [
        {
          text: "31 × 29 = (30 + 1)(30 − 1) = 30² − 1² = 900 − 1 = 899，比 30 × 30 = 900 少 1。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "31 × 29", rhs: "(30 + 1)(30 − 1)", status: "keep" },
                { lhs: "", rhs: "30² − 1² (平方差)" },
                { lhs: "", rhs: "900 − 1", status: "keep" },
                { lhs: "", rhs: "899", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "不通过计算，比较 25 × 25 和 24 × 26 的大小。",
    fields: [
      {
        key: "relation",
        label: "大小关系（在 25 × 25 ○ 24 × 26 中填 >、< 或 =）",
        type: "text",
        enum: [">", "<", "="],
      },
    ],
    answer: {
      relation: ">",
    },
    hint: "把 24 × 26 写成 (25 − 1)(25 + 1) = 25 × 25 − 1，所以 25 × 25 比 24 × 26 多 1。",
  },
  tags: ["平方差"],
} satisfies ProblemData;
