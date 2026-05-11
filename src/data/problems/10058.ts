import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10058-1.svg?raw";

export default {
  id: "10058",
  title: "乘法巧算·提取公因数",
  grade: "四年级",
  difficulty: "基础",
  module: "计算",
  question: "计算：36 × 47 + 64 × 47",
  solutions: [
    {
      key: "factor",
      label: "提取公因数法",
      steps: [
        {
          text: "两项都含因数 47，提出 47 后另一因数变为 36 + 64 = 100，正好凑整。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "36 × 47 + 64 × 47", status: "keep" },
                { lhs: "", rhs: "(36 + 64) × 47 (提公因数)", status: "keep" },
                { lhs: "", rhs: "100 × 47", status: "keep" },
                { lhs: "", rhs: "4700", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：125 × 28 − 25 × 28",
    fields: [
      {
        key: "result",
        label: "结果",
        type: "number",
      },
    ],
    answer: {
      result: 2800,
    },
    hint: "提取公因数 28：(125 − 25) × 28 = 100 × 28",
  },
  tags: ["提取公因数"],
} satisfies ProblemData;
