import type { ProblemData } from "@/types/problem";

export default {
  id: "10015",
  title: "方阵问题·实心方阵",
  grade: "四年级",
  difficulty: "基础",
  module: "几何",
  question:
    "四年级同学排成一个实心方阵进行广播操表演，最外层每边站了12人。\n请问这个方阵一共有多少人？\n最外层一共有多少人？",
  solutions: [
    {
      key: "layer",
      label: "面积法 + 外层分段",
      steps: [
        {
          text: "用面积法求总人数，用外层分段法求最外层人数。",
          scenes: [
            {
              kind: "lattice",
              lattice: { rows: 12, cols: 12, tone: "accent" },

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "总人数", rhs: "12 × 12 = 144", status: "keep" },
                {
                  lhs: "外层 (4 条边，每条 11 人)",
                  rhs: "(12 − 1) × 4 = 44",
                  status: "keep",
                },
              ],

            },
          ],
        },
      ],
    },
    {
      key: "subtract",
      label: "嵌套相减法",
      steps: [
        {
          text: "最外层人数 = 总人数 − 内层（10 × 10 = 100）人数 = 144 − 100 = 44 人。",
        },
        {
          text: "这种方法把「外层」当作两个同心方阵的差，最直观。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "外层 12×12", value: 144, max: 144, tone: "primary" },
                {
                  label: "内层 10×10",
                  value: 100,
                  max: 144,
                  tone: "muted",
                  marker: true,
                },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "12² − 10²", rhs: "144 − 100 = 44", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个实心方阵花坛，最外层每边摆了15盆花。\n这个花坛一共用了多少盆花？\n最外层有多少盆？",
    fields: [
      {
        key: "total",
        label: "总盆数",
      },
      {
        key: "outer",
        label: "最外层盆数",
      },
    ],
    answer: {
      total: 225,
      outer: 56,
    },
    hint: "最外层人数 = (每边人数 - 1) × 4",
  },
  tags: ["平方差"],
} satisfies ProblemData;
