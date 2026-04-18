import svg1 from "./figures/10096-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10096",
  title: "四线共心辐射阵·求中心",
  grade: "四年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "把 1 到 9 这 9 个数字各用一次，填入如图 4 条过中心的直线上（1 个中心圆 + 4 × 2 = 8 个外围圆），使每条直线 3 个数字之和都等于 15。\n请问中心圆里必须填几？并写出一种完整的填法。",
  figures: [
    {
      svg: svg1,
      alt: "四线共心辐射阵",
    },
  ],
  solutions: [
    {
      key: "center",
      label: "中心数法",
      steps: [
        {
          text: "分析：中心圆被 4 条直线共用。把 4 条直线的数字之和加起来，中心被算 4 次，其他 8 个数各算 1 次。",
        },
        {
          text: "4S = 4·c + (1+2+…+9 − c) = 4c + (45 − c) = 45 + 3c。",
        },
        {
          text: "代入 S = 15：4 × 15 = 45 + 3c，即 60 = 45 + 3c，所以 c = 5。",
        },
        {
          text: "中心填 5 后，其余 8 个数 {1,2,3,4,6,7,8,9} 必须两两配对，每对和为 15 − 5 = 10：{1,9}, {2,8}, {3,7}, {4,6}。",
        },
        {
          text: "一种填法：水平 {1, 5, 9}，竖直 {2, 5, 8}，左上↘右下 {3, 5, 7}，左下↗右上 {4, 5, 6}。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "4S", rhs: "45 + 3c" },
                { lhs: "S = 15", rhs: "60 = 45 + 3c" },
                { lhs: "c (中心)", rhs: "5", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "填 1–9 进 4 条过中心的直线，中心 1 个圆 + 8 个外围圆，要求每条线三数和相等。问中心必须填几？该和等于多少？",
    fields: [
      {
        key: "center",
        label: "中心",
        type: "number",
      },
      {
        key: "sum",
        label: "线和 S",
        type: "number",
      },
    ],
    answer: {
      center: 5,
      sum: 15,
    },
    hint: "4S = 45 + 3c，c = 5 时 S = 15；只有 c = 5 能让剩余 8 数恰分 4 对每对和 10。",
  },
  tags: ["中心数法", "累加法"],
} satisfies ProblemData;
