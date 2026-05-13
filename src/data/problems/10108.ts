import svg1 from "./figures/10108-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10108",
  title: "圆周三径数阵·圆心与公共和",
  grade: "五年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "如图，把 1–7 各用一次填入这 7 个位置，要求：\n\n- 每条直径上 3 个数之和都相等；\n- 圆周 6 个数之和等于 21。\n\n求圆心填几？\n\n每条直径的公共和 S 是多少？",
  figures: [
    {
      svg: svg1,
      alt: "圆周 + 3 条直径的 7 位置数阵",
    },
  ],
  solutions: [
    {
      key: "accumulate",
      label: "累加法",
      steps: [
        {
          text: "分析：设圆心填 c。由 1+2+…+7 = 28，圆周 6 数之和 = 28 − c。",
        },
        {
          text: "把 3 条直径之和累加：圆周 6 个位置各算 1 次，圆心 O 被算 3 次，故 3S = 圆周和 + 3c。",
        },
        {
          text: "代入条件圆周和 = 21，解出 c 与 S。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "28 − c", rhs: "21 → c = 7" },
                { lhs: "3S", rhs: "21 + 3 × 7 = 42" },
                { lhs: "S", rhs: "14", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "在同一图形中，若改为规定圆心填 1，求每条直径的公共和 S。",
    fields: [
      {
        key: "sum",
        label: "S",
        type: "number",
      },
    ],
    answer: {
      sum: 10,
    },
    hint: "圆周和 = 28 − 1 = 27；3S = 27 + 3 = 30，所以 S = 10。",
  },
  tags: ["累加法", "中心数法"],
} satisfies ProblemData;
