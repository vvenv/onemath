import type { ProblemData } from "@/types/problem";

export default {
  id: "10182",
  title: "概率进阶·独立事件",
  grade: "六年级",
  module: "计数",
  difficulty: "挑战",
  question: "掷两枚均匀的骰子，求两枚骰子的点数之和为 7 的概率。",
  solutions: [
    {
      key: "enumeration",
      label: "枚举法",
      steps: [
        {
          text: "两枚骰子共 36 种结果，点数之和为 7 的有 (1,6)、(2,5)、(3,4)、(4,3)、(5,2)、(6,1) 共 6 种，概率 = 6/36 = 1/6。",
        },
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "总事件数",
              rhs: "6 × 6 = 36",
              status: "keep",
            },
            {
              lhs: "有利事件",
              rhs: "(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)",
              status: "keep",
            },
            {
              lhs: "有利事件数",
              rhs: "6",
              status: "keep",
            },
            {
              lhs: "概率",
              rhs: "6 ÷ 36 = 1/6",
              status: "keep",
            },
          ],
          caption: "枚举所有可能结果",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "总事件",
              value: 36,
              max: 36,
              tone: "muted",
            },
            {
              label: "有利事件",
              value: 6,
              max: 36,
              tone: "primary",
            },
          ],
          caption: "事件数比较",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🎲",
              count: "1/6",
              label: "概率",
            },
          ],
          caption: "点数之和为 7 的概率是 1/6",
        },
      ],
    },
    {
      key: "table",
      label: "表格法",
      steps: [
        {
          text: "点数之和为 7 的组合共 6 种，总组合数 36，概率 = 6/36 = 1/6。",
        },
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "第一枚=1",
              rhs: "第二枚=6 ✓",
            },
            {
              lhs: "第一枚=2",
              rhs: "第二枚=5 ✓",
            },
            {
              lhs: "第一枚=3",
              rhs: "第二枚=4 ✓",
            },
            {
              lhs: "第一枚=4",
              rhs: "第二枚=3 ✓",
            },
            {
              lhs: "第一枚=5",
              rhs: "第二枚=2 ✓",
            },
            {
              lhs: "第一枚=6",
              rhs: "第二枚=1 ✓",
            },
            {
              lhs: "共 6 种",
              rhs: "概率 = 6/36 = 1/6",
              status: "keep",
            },
          ],
          caption: "表格统计法",
        },
      ],
    },
  ],
  variant: {
    question: "掷两枚均匀的骰子，求两枚骰子的点数之和为 8 的概率。",
    fields: [
      {
        key: "probability",
        label: "概率（分数）",
        type: "text",
      },
    ],
    answer: {
      probability: "5/36",
    },
    hint: "点数之和为 8 的情况有：(2,6)、(3,5)、(4,4)、(5,3)、(6,2)，共 5 种。",
  },
  tags: ["独立事件"],
} satisfies ProblemData;
