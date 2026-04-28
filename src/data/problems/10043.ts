import type { ProblemData } from "@/types/problem";

export default {
  id: "10043",
  title: "最大公约数·短除模型",
  grade: "五年级",
  module: "数论",
  difficulty: "进阶",
  question:
    "甲、乙两个数的最大公约数是 6，最小公倍数是 72。已知甲数是 24，求乙数。",
  solutions: [
    {
      key: "formula",
      label: "公式法",
      steps: [{ text: "甲 × 乙 = 6 × 72 = 432，乙 = 432 ÷ 24 = 18。" }],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "甲 × 乙 (公式)",
              rhs: "(甲,乙) × [甲,乙]",
              status: "keep",
            },
            {
              lhs: "24 × 乙",
              rhs: "6 × 72",
              status: "keep",
            },
            {
              lhs: "24 × 乙",
              rhs: "432",
              status: "keep",
            },
            {
              lhs: "乙 (答案)",
              rhs: "432 ÷ 24 = 18",
              status: "keep",
            },
          ],
          caption: "利用公式：两数之积 = 最大公约数 × 最小公倍数",
        },
      ],
    },
  ],
  variant: {
    question:
      "两个数的最大公约数是 8，最小公倍数是 48。已知一个数是 16，求另一个数。",
    fields: [
      {
        key: "other",
        label: "另一个数",
      },
    ],
    answer: {
      other: 24,
    },
    hint: "两数之积 = 最大公约数 × 最小公倍数",
  },
  tags: ["最大公约数", "最小公倍数", "短除法"],
} satisfies ProblemData;
