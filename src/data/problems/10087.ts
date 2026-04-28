import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10087-1.svg?raw";

export default {
  id: "10087",
  title: "补全三阶幻方",
  grade: "四年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "下面是一个未填完的 3 × 3 幻方，所填数字取自 1–9 且每个数字只用一次，要求每行、每列、两条对角线上三数之和都相等。已知部分格子如下，请把其余格子填完。",
  figures: [
    {
      svg: svg1,
      caption: "已知 4 个格子的三阶幻方",
      alt: "部分已填三阶幻方",
    },
  ],
  solutions: [
    {
      key: "compare",
      label: "比较法（逐格推出）",
      steps: [
        {
          text: "分析：1–9 合计 45，3 行等和得幻和 S = 15。中心 5 与一角 4、一线 6 已给，且标准三阶幻方中心必为 5，恰好吻合；于是反向对角线 6 + 5 + 4 = 15 自动成立。接下来每一行、列只要看有两格已知，就用 15 减去它们得到第 3 格。",
          scenes: [],
        },
        {
          text: "按「两格已知 → 第三格 = 15 − 之和」逐格推：第 2 行 9，第 3 列 8，第 3 行中 3，第 2 列上 7，第 1 行左 2。",
          scenes: [],
        },
        {
          text: "填完整局：2 7 6 / 9 5 1 / 4 3 8。",
          scenes: [
            {
              kind: "number-grid",
              rows: 3,
              cols: 3,
              cells: [
                {
                  row: 0,
                  col: 0,
                  value: 2,
                  tone: "primary",
                },
                {
                  row: 0,
                  col: 1,
                  value: 7,
                  tone: "primary",
                },
                {
                  row: 0,
                  col: 2,
                  value: 6,
                },
                {
                  row: 1,
                  col: 0,
                  value: 9,
                  tone: "primary",
                },
                {
                  row: 1,
                  col: 1,
                  value: 5,
                },
                {
                  row: 1,
                  col: 2,
                  value: 1,
                },
                {
                  row: 2,
                  col: 0,
                  value: 4,
                },
                {
                  row: 2,
                  col: 1,
                  value: 3,
                  tone: "primary",
                },
                {
                  row: 2,
                  col: 2,
                  value: 8,
                  tone: "primary",
                },
              ],
              caption: "标蓝为推出的新数",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三阶幻方 1–9 中，已知右上角是 2，中心是 5。请问：左下角是几？幻和是几？",
    fields: [
      {
        key: "bl",
        label: "左下角",
        type: "number",
      },
      {
        key: "sum",
        label: "幻和",
        type: "number",
      },
    ],
    answer: {
      bl: 8,
      sum: 15,
    },
    hint: "幻和=15；关于中心对称的两格之和恒等于 2×中心 = 10，所以与右上角 2 对称的左下角 = 10 − 2 = 8。",
  },
  tags: ["比较法", "累加法"],
} satisfies ProblemData;
