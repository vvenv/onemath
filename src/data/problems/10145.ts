import type { ProblemData } from "@/types/problem";

export default {
  id: "10145",
  title: "连续抛硬币·独立事件",
  grade: "六年级",
  difficulty: "进阶",
  module: "计数",
  question: "连续抛掷两枚质地均匀的硬币，求两次都是正面的概率是多少？",
  solutions: [
    {
      key: "independent",
      label: "独立事件概率",
      steps: [
        {
          text: "分析：两枚硬币的抛掷结果互不影响，是独立事件。",
        },
        {
          text: "每枚硬币出现正面的概率都是 1/2。",
        },
        {
          text: "独立事件同时发生的概率 = 各事件概率的乘积。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "第一枚正面概率 (P₁)", rhs: "1/2" },
                { lhs: "第二枚正面概率 (P₂)", rhs: "1/2" },
                { lhs: "两次都正面", rhs: "P₁ × P₂" },
                { lhs: "", rhs: "1/2 × 1/2" },
                { lhs: "", rhs: "1/4", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
    {
      key: "enumeration",
      label: "枚举法",
      steps: [
        {
          text: "列出所有可能的抛掷结果。",
        },
        {
          text: "找出满足条件的结果。",
        },
        {
          text: "用满足条件的结果数除以总结果数。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "所有可能 (4种)",
                  rhs: "(正,正)、(正,反)、(反,正)、(反,反)",
                },
                { lhs: "满足条件 (1种)", rhs: "(正,正)" },
                { lhs: "概率", rhs: "1 ÷ 4" },
                { lhs: "", rhs: "1/4", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "连续抛掷两枚质地均匀的硬币，求恰好有一次是正面的概率。",
    fields: [
      {
        key: "probability",
        label: "恰好一次正面的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "1/2",
    },
    hint: "枚举所有可能结果：(正,正)、(正,反)、(反,正)、(反,反)，其中恰好一次正面的有2种。",
  },
  tags: ["独立事件", "乘法原理"],
} satisfies ProblemData;
