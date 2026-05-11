import svg1 from "./figures/10105-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10105",
  title: "立方体顶点·1 到 8",
  grade: "六年级",
  difficulty: "挑战",
  module: "杂题",
  question:
    "把 1, 2, 3, 4, 5, 6, 7, 8 这 8 个数字各用一次，填入一个立方体的 8 个顶点，使立方体 6 个面上 4 个顶点的数字之和都相等。\n\n问：这个相等的面和 S 必定等于多少？",
  figures: [
    {
      svg: svg1,
      alt: "立方体示意",
    },
  ],
  solutions: [
    {
      key: "sum",
      label: "累加法",
      steps: [
        {
          text: "分析：立方体有 6 个面，每个面由 4 个顶点围成；每个顶点正好是 3 个面的公共顶点。",
        },
        {
          text: "把 6 个面上的顶点数字之和加起来，每个顶点被算 3 次，结果 = 3 × (1+2+…+8) = 3 × 36 = 108。",
        },
        {
          text: "另一方面，6 个面和各为 S，总和 = 6S。",
        },
        {
          text: "所以 6S = 108，S = 18。",
        },
        {
          text: "结论：若这样填法存在，每面和必为 18。\n\n存在性：把 8 个数按『对顶点和 = 9』成对摆放（1↔8, 2↔7, 3↔6, 4↔5，每对占立方体对角线两端），即可验证每面和都是 18。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "每顶点属于 3 面", rhs: "6 面总和 = 3·(1+…+8)" },
                { lhs: "6S", rhs: "3 × 36 = 108" },
                { lhs: "S (面和)", rhs: "18", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "把 1–8 填入立方体 8 顶点使每面 4 顶点和相等。一对对角线上两端顶点的数字之和必定等于几？",
    fields: [
      {
        key: "diag",
        label: "对角两端之和",
        type: "number",
      },
    ],
    answer: {
      diag: 9,
    },
    hint: "每面和 = 18；考察底面与顶面，它们各为 18，顶底对角的两顶点之和 = 36 / 4 = 9（或由 1+8=2+7=…=9 的配对思路）。",
  },
  tags: ["累加法"],
} satisfies ProblemData;
