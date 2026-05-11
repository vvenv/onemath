import svg1 from "./figures/10064-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10064",
  title: "最短路径·标数法",
  grade: "五年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "在由 4 行 5 列格点组成的方格网中（点共 4 × 5 = 20 个），小明要从左下角 A 走到右上角 B，每一步只能沿着格子线向右走一格或向上走一格。\n\n问从 A 到 B 一共有多少条不同的最短路径？",
  figures: [
    {
      svg: svg1,
      alt: "4行5列方格网",
    },
  ],
  solutions: [
    {
      key: "label",
      label: "标数法",
      steps: [
        {
          text: "按从左下向右上依次相加填数，填到右上角 B 得 35 条最短路径。",
          scenes: [
            {
              kind: "number-grid",
              rows: 4,
              cols: 5,
              cells: [
                { row: 0, col: 0, value: 1, tone: "primary" },
                { row: 0, col: 1, value: 4 },
                { row: 0, col: 2, value: 10 },
                { row: 0, col: 3, value: 20 },
                { row: 0, col: 4, value: 35, tone: "accent" },
                { row: 1, col: 0, value: 1 },
                { row: 1, col: 1, value: 3 },
                { row: 1, col: 2, value: 6 },
                { row: 1, col: 3, value: 10 },
                { row: 1, col: 4, value: 15 },
                { row: 2, col: 0, value: 1 },
                { row: 2, col: 1, value: 2 },
                { row: 2, col: 2, value: 3 },
                { row: 2, col: 3, value: 4 },
                { row: 2, col: 4, value: 5 },
                { row: 3, col: 0, value: 1, tone: "primary" },
                { row: 3, col: 1, value: 1 },
                { row: 3, col: 2, value: 1 },
                { row: 3, col: 3, value: 1 },
                { row: 3, col: 4, value: 1 },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "combination",
      label: "组合公式法",
      steps: [
        {
          text: "从 A 到 B 一共需要向右走 4 步、向上走 3 步，总共 7 步。",
        },
        {
          text: "每条最短路径就是把 7 步中的 3 步选出来向上走（其余向右）的一种方法。",
        },
        {
          text: "即从 7 步中选 3 步向上，共 C(7, 3) = 7 × 6 × 5 ÷ (3 × 2 × 1) = 35。",
        },
        {
          text: "一共有 35 条最短路径。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "向右步数", rhs: "5 − 1 = 4" },
                { lhs: "向上步数", rhs: "4 − 1 = 3" },
                { lhs: "路径数 (结论)", rhs: "C(7, 3) = 35", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在 4 行 4 列格点组成的方格网中（水平方向 3 格，竖直方向 3 格），从左下角 A 走到右上角 B，每步只能向右或向上。共有多少条最短路径？",
    fields: [
      {
        key: "answer",
        label: "路径数",
        type: "number",
      },
    ],
    answer: {
      answer: 20,
    },
    hint: "向右 3 步，向上 3 步，共 6 步，其中选 3 步向上：C(6, 3) = 20。",
  },
  tags: ["标数法", "组合"],
} satisfies ProblemData;
