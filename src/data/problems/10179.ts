import type { ProblemData } from "@/types/problem";

export default {
  id: "10179",
  title: "最值问题·极端原理",
  grade: "六年级",
  difficulty: "挑战",
  module: "杂题",
  question:
    "把 20 个球放入 5 个盒子中，每个盒子至少放 1 个球。\n要使其中一个盒子中的球数尽可能多，最多能放多少个球？",
  solutions: [
    {
      key: "extreme",
      label: "极端原理法",
      steps: [
        {
          text: "分析：要使一个盒子球数最多，其他盒子球数要最少，即各放 1 个。",
        },
        {
          text: "目标盒子最多放 20 − 4 = 16 个球。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "其他盒子最少", rhs: "4 × 1 = 4", status: "keep" },
                { lhs: "目标盒子最多", rhs: "20 − 4 = 16", status: "keep" },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "目标盒子", value: 16, max: 20, tone: "primary" },
                { label: "其他4个盒子", value: 4, max: 20, tone: "muted" },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "🔮", count: 16, label: "最多球数" }],

            },
          ],
        },
      ],
    },
    {
      key: "inequality",
      label: "不等式法",
      steps: [
        {
          text: "设目标盒子放 x 个，其他 4 个盒子各至少放 1 个，则 x + a + b + c + d = 20。",
        },
        {
          text: "要使 x 最大，需 a + b + c + d 最小，即 a = b = c = d = 1，得 x = 16。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "x + a + b + c + d", rhs: "20" },
                { lhs: "a, b, c, d ≥ 1", rhs: "" },
                { lhs: "a + b + c + d 最小", rhs: "4", status: "keep" },
                { lhs: "x 最大", rhs: "20 − 4 = 16", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "把 30 个苹果放入 6 个篮子中，每个篮子至少放 2 个苹果。要使其中一个篮子中的苹果数尽可能多，最多能放多少个苹果？",
    fields: [
      {
        key: "max",
        label: "最多苹果数",
      },
    ],
    answer: {
      max: 20,
    },
    hint: "其他 5 个篮子各放 2 个苹果，共 10 个，剩下 20 个放入目标篮子。",
  },
  tags: ["极端原理"],
} satisfies ProblemData;
