import type { ProblemData } from "@/types/problem";

export default {
  id: "10010",
  title: "归一问题·基本归一",
  grade: "三年级",
  difficulty: "基础",
  module: "应用题",
  question:
    "一台织布机 3 小时织布 24 米。照这样计算，8 台同样的织布机 5 小时可以织布多少米？",
  solutions: [
    {
      key: "unit_rate",
      label: "归一法·单产",
      steps: [
        {
          text: "8 × 8 × 5 = 320（米）",
          scenes: [
            {
              kind: "result-badges",
              items: [
                { icon: "🧵", count: 24, label: "米" },
                { icon: "🖨️", count: 3, label: "台·小时" },
              ],
              separator: "÷",

            },
            {
              kind: "result-badges",
              items: [
                { icon: "⚙️", count: 8, label: "米/台·小时（单产）" },
                { icon: "🖨️", count: 8, label: "台" },
                { icon: "⏱️", count: 5, label: "小时" },
              ],
              separator: "×",

            },
          ],
        },
      ],
    },
    {
      key: "ratio",
      label: "倍比法·台时换算",
      steps: [
        {
          text: "原方案的「台·时」总数：1 × 3 = 3（台·时）→ 织 24 米。",
        },
        {
          text: "新方案的「台·时」总数：8 × 5 = 40（台·时）。",
        },
        {
          text: "「台·时」扩大到 40 ÷ 3 倍，产量也按相同倍数扩大。",
        },
        {
          text: "总产量：24 × (40 ÷ 3) = 24 ÷ 3 × 40 = 8 × 40 = 320（米）。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "原方案 (1×3)", value: 3, max: 40, tone: "muted" },
                {
                  label: "新方案 (8×5)",
                  value: 40,
                  max: 40,
                  tone: "primary",
                  marker: true,
                },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "24 × (40 ÷ 3)", rhs: "24 ÷ 3 × 40" },
                { lhs: "= 8 × 40", rhs: "320（米）", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "5辆卡车4次共运货160吨。照这样计算，同样的7辆卡车运6次，一共可以运货多少吨？",
    fields: [
      {
        key: "total",
        label: "运货总吨数",
      },
    ],
    answer: {
      total: 336,
    },
    hint: "先算出“一辆卡车一次”的运货量。",
  },
  tags: ["比例法"],
} satisfies ProblemData;
