import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10089-1.svg?raw";

export default {
  id: "10089",
  title: "五阶幻方·幻和求值",
  grade: "五年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "把 1, 2, 3, …, 25 这 25 个数字各用一次，填入 5 × 5 方格中，使每一行、每一列、两条对角线上 5 个数之和都相等。\n\n问：这个公共和（幻和）是多少？",
  figures: [
    {
      svg: svg1,
      alt: "5×5 空网格",
    },
  ],
  solutions: [
    {
      key: "sum",
      label: "累加法",
      steps: [
        {
          text: "分析：5 行把 1–25 每个数字各覆盖一次，因此 5 行之和等于 1+2+…+25。",
        },
        {
          text: "1+2+…+25 = (1+25) × 25 / 2 = 325。",
        },
        {
          text: "得幻和 S = 65。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1+2+…+25", rhs: "(1+25)·25/2 = 325" },
                { lhs: "5S", rhs: "325" },
                { lhs: "S (幻和)", rhs: "65", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "middle",
      label: "等差数列法",
      steps: [
        {
          text: "分析：1 到 25 是等差数列，中位数为 13（第 13 大）。",
        },
        {
          text: "n 阶幻方（n 为奇数）填 1 到 n² 时，幻和 = n × 中位数 = n × (n²+1)/2。",
        },
        {
          text: "代入 n=5 得幻和 S = 65。",
        },
      ],
    },
  ],
  variant: {
    question: "n 阶幻方（n 为奇数）填入 1 到 n²，问 n=7 时幻和等于多少？",
    fields: [
      {
        key: "sum",
        label: "幻和",
        type: "number",
      },
    ],
    answer: {
      sum: 175,
    },
    hint: "公式：S = n × (n²+1) / 2。n=7 时 S = 7 × 50/2 = 175。",
  },
  tags: ["累加法", "等差数列法"],
} satisfies ProblemData;
