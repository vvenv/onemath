import type { ProblemData } from "@/types/problem";

export default {
  id: "10162",
  title: "最大公约数·和的分解",
  grade: "六年级",
  module: "数论",
  difficulty: "进阶",
  question: "两个自然数的最大公约数是 12，这两个数的和是 120。求这两个数。",
  solutions: [
    {
      key: "gcd-transformation",
      label: "约分转化法",
      steps: [
        "分析：设两数为 12a 和 12b，其中 a、b 互质。则 12a + 12b = 120，即 a + b = 10。",
        "枚举互质的正整数对 (a, b) 满足 a + b = 10：(1, 9)、(3, 7)、(7, 3)、(9, 1)。",
        "对应的两数对为 (12, 108)、(36, 84)、(84, 36)、(108, 12)，共 4 组解。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "设两数为",
              rhs: "12a, 12b（a、b互质）",
              status: "keep",
            },
            {
              lhs: "由和得",
              rhs: "12a + 12b = 120 ⇒ a + b = 10",
              status: "keep",
            },
            {
              lhs: "互质数对",
              rhs: "(1,9), (3,7), (7,3), (9,1)",
              status: "keep",
            },
            {
              lhs: "对应两数",
              rhs: "(12,108), (36,84), (84,36), (108,12)",
              status: "keep",
              badge: "答案",
            },
          ],
          caption: "枚举互质数对，转化为 a + b = 10 的分解问题",
        },
      ],
    },
  ],
  variant: {
    question: "两个自然数的最大公约数是 15，这两个数的和是 90。求这两个数。",
    fields: [
      {
        key: "count",
        label: "解的组数",
      },
    ],
    answer: {
      count: 4,
    },
    hint: "设两数为 15a、15b，a + b = 6，枚举互质数对 (1,5)、(5,1)",
  },
  knowledgePoints: [
    {
      slug: "gcd",
      name: "最大公约数",
      summary: "几个整数公有的约数中最大的那个。求法：质因数分解取“共有质因数的最小指数之积”，或用短除法。",
    },
  ],
  tags: ["最大公约数"],
} satisfies ProblemData;
