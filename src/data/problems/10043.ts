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
      steps: ["甲 × 乙 = 6 × 72 = 432，乙 = 432 ÷ 24 = 18。"],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "甲 × 乙",
              rhs: "(甲,乙) × [甲,乙]",
              status: "keep",
              badge: "公式",
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
              lhs: "乙",
              rhs: "432 ÷ 24 = 18",
              status: "keep",
              badge: "答案",
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
  knowledgePoints: [
    {
      slug: "gcd",
      name: "最大公约数",
      summary: "几个整数公有的约数中最大的那个。求法：质因数分解取“共有质因数的最小指数之积”，或用短除法。",
    },
    {
      slug: "lcm",
      name: "最小公倍数",
      summary: "几个整数公有的倍数中最小的那个。求法：质因数分解取“所有质因数的最大指数之积”，或用短除法。",
    },
    {
      slug: "short-division",
      name: "短除法",
      summary: "用一个共同的质因数依次去除所给的数，直到商两两互质；左侧所有除数之积即 gcd，左侧除数与底部商之积即 lcm。",
    },
  ],
  tags: ["最大公约数", "最小公倍数", "短除法"],
} satisfies ProblemData;
