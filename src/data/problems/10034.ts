import svg1 from "./figures/10034-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10034",
  title: "加乘原理·路线选择",
  grade: "四年级",
  difficulty: "基础",
  module: "计数",
  question:
    "如图，从 A 地到 B 地有 3 条路可走，从 B 地到 C 地有 4 条路可走，从 A 地直接到 C 地有 2 条路可走。\n\n那么从 A 地到 C 地一共有多少种不同的走法？",
  figures: [
    {
      svg: svg1,
      alt: "路线图：A、B、C三地之间的道路连接情况",
    },
  ],
  solutions: [
    {
      key: "addition-multiplication",
      label: "加乘原理分析法",
      steps: [
        {
          text: "按是否经过 B 把所有走法分成两类：经过 B（A→B→C）用乘法原理，直达（A→C）单独计数，再用加法原理合并。\n\n经过 B：3 × 4 = 12 种；直达：2 种；总计：12 + 2 = 14 种。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "经过 B", rhs: "3 × 4 = 12 种" },
                { lhs: "直达", rhs: "2 种" },
                { lhs: "总计", rhs: "12 + 2 = 14 种", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "从甲地到乙地有 2 条路，乙地到丙地有 5 条路，甲地直接到丙地有 3 条路。\n\n从甲地到丙地有多少种走法？",
    fields: [
      {
        key: "total",
        label: "总走法数",
      },
    ],
    answer: {
      total: 13,
    },
    hint: "经过乙地：2 × 5 = 10 种；直达：3 种。合计 13 种。",
  },
  tags: ["加乘原理"],
} satisfies ProblemData;
