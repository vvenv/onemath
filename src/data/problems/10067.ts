import type { ProblemData } from "@/types/problem";

export default {
  id: "10067",
  title: "装信错排·欧拉问题",
  grade: "六年级",
  module: "杂题",
  difficulty: "挑战",
  question:
    '有 4 封信分别写给 4 位不同的收信人，对应有 4 个编号的信封（第 i 封信的"正确信封"就是编号为 i 的那个）。\n\n现在把这 4 封信装进 4 个信封里，每个信封恰好装 1 封。要求每封信都装错——即 4 封信全部都没有装进自己的正确信封。\n\n一共有多少种装法？',
  solutions: [
    {
      key: "enumerate",
      label: "枚举法",
      steps: [
        {
          text: "按信封1装的信号分类，每类剩余3信全错位各有3种，合计求和。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "信封 1 装信 2",
                  rhs: "3 种",
                },
                {
                  lhs: "信封 1 装信 3",
                  rhs: "3 种",
                },
                {
                  lhs: "信封 1 装信 4",
                  rhs: "3 种",
                },
                {
                  lhs: "合计",
                  rhs: "3 + 3 + 3 = 9",
                  badge: "结论",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "recurrence",
      label: "递推公式法（错排数 D_n）",
      steps: [
        {
          text: "错排递推 D_n = (n−1)(D_{n−1}+D_{n−2})：D_1=0, D_2=1, D_3=2, D_4=3×(2+1)=9。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "D_1",
                  rhs: "0",
                },
                {
                  lhs: "D_2",
                  rhs: "1",
                },
                {
                  lhs: "D_3",
                  rhs: "2 × (1 + 0) = 2",
                },
                {
                  lhs: "D_4",
                  rhs: "3 × (2 + 1) = 9",
                  badge: "结论",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "inclusionExclusion",
      label: "容斥原理",
      steps: [
        {
          text: "容斥：总装法 4!=24，至少一封装对 24−12+4−1=15，全部错 = 24−15=9。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "总装法",
                  rhs: "4! = 24",
                },
                {
                  lhs: "至少一封对",
                  rhs: "24 − 12 + 4 − 1 = 15",
                },
                {
                  lhs: "全部错",
                  rhs: "24 − 15 = 9",
                  badge: "结论",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "5 封信分别对应 5 个信封，要求每封信都装错（没有任何一封放入自己的信封），共有多少种装法？",
    fields: [
      {
        key: "answer",
        label: "装法数",
        type: "number",
      },
    ],
    answer: {
      answer: 44,
    },
    hint: "用错排递推 D_n = (n−1)(D_{n−1} + D_{n−2})：D_5 = 4 × (9 + 2) = 44。",
  },
  tags: ["递推法", "容斥原理", "枚举法"],
} satisfies ProblemData;
