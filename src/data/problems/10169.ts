import type { ProblemData } from "@/types/problem";

export default {
  id: "10169",
  title: "比较大小·通分法",
  grade: "五年级",
  module: "计算",
  difficulty: "基础",
  question: "比较大小：3/7 和 4/9，哪个更大？",
  solutions: [
    {
      key: "cross",
      label: "交叉相乘法",
      steps: [
        { text: "3 × 9 = 27，4 × 7 = 28，因为 27 < 28，所以 3/7 < 4/9。" },
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "3/7",
              rhs: "3 × 9 = 27",
            },
            {
              lhs: "4/9",
              rhs: "4 × 7 = 28",
            },
            {
              lhs: "比较",
              rhs: "27 < 28",
              status: "keep",
            },
            {
              lhs: "结论",
              rhs: "3/7 < 4/9",
              status: "keep",
            },
          ],
          caption: "交叉相乘比较",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "3/7 (27)",
              value: 27,
              max: 28,
              tone: "muted",
            },
            {
              label: "4/9 (28)",
              value: 28,
              max: 28,
              tone: "primary",
            },
          ],
          caption: "交叉乘积比较",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔼",
              count: "4/9",
            },
          ],
          caption: "4/9 更大",
        },
      ],
    },
    {
      key: "common",
      label: "通分法",
      steps: [
        {
          text: "3/7 = 27/63，4/9 = 28/63，因为 27/63 < 28/63，所以 3/7 < 4/9。",
        },
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "3/7",
              rhs: "27/63",
            },
            {
              lhs: "4/9",
              rhs: "28/63",
            },
            {
              lhs: "比较",
              rhs: "27/63 < 28/63",
              status: "keep",
            },
          ],
          caption: "通分后比较",
        },
      ],
    },
  ],
  variant: {
    question: "比较大小：5/8 和 7/12，哪个更大？",
    fields: [
      {
        key: "larger",
        label: "更大的分数",
        type: "text",
        enum: ["5/8", "7/12"],
      },
    ],
    answer: {
      larger: "5/8",
    },
    hint: "可以用交叉相乘法：5 × 12 = 60，7 × 8 = 56。",
  },
  tags: ["分数比较"],
} satisfies ProblemData;
