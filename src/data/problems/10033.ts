import type { ProblemData } from "@/types/problem";

export default {
  id: "10033",
  title: "枚举法·数字计数",
  grade: "三年级",
  difficulty: "基础",
  module: "计数",
  question:
    "用数字 1、2、3 可以组成多少个没有重复数字的两位数？请按从小到大的顺序写出来。",
  solutions: [
    {
      key: "enumeration",
      label: "枚举法",
      steps: [
        {
          text: "十位 1 → 12, 13；十位 2 → 21, 23；十位 3 → 31, 32；共 6 个两位数。",
          scenes: [
            {
              kind: "number-grid",
              rows: 3,
              cols: 2,
              cells: [
                { row: 0, col: 0, value: "12", tone: "primary" },
                { row: 0, col: 1, value: "13", tone: "primary" },
                { row: 1, col: 0, value: "21", tone: "primary" },
                { row: 1, col: 1, value: "23", tone: "primary" },
                { row: 2, col: 0, value: "31", tone: "primary" },
                { row: 2, col: 1, value: "32", tone: "primary" },
              ],
              rowLabel: "十位",
              colLabel: "个位选择",
            },
          ],
        },
      ],
    },
    {
      key: "multiplication",
      label: "乘法原理",
      steps: [
        {
          text: "十位 3 种选法，个位 2 种选法，总数 = 3 × 2 = 6 个。",
          scenes: [
            {
              kind: "number-grid",
              rows: 2,
              cols: 3,
              cells: [
                { row: 0, col: 0, value: "1", tone: "primary" },
                { row: 0, col: 1, value: "2", tone: "primary" },
                { row: 0, col: 2, value: "3", tone: "primary" },
                { row: 1, col: 0, value: "2", tone: "accent" },
                { row: 1, col: 1, value: "2", tone: "accent" },
                { row: 1, col: 2, value: "2", tone: "accent" },
              ],
              rowLabel: "数位",
              colLabel: "选法数",
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "十位选法 (从 1、2、3 中任选 1 个)", rhs: "3 种" },
                { lhs: "个位选法 (从剩下的 2 个数字中任选 1 个)", rhs: "2 种" },
                { lhs: "总数", rhs: "3 × 2 = 6（个）", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "用数字 0、2、5 可以组成多少个没有重复数字的两位数？",
    fields: [
      {
        key: "count",
        label: "个数",
      },
    ],
    answer: {
      count: 4,
    },
    hint: "注意：十位不能是 0。",
  },
  tags: ["枚举法", "乘法原理"],
} satisfies ProblemData;
