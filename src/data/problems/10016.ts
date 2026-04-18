import type { ProblemData } from "@/types/problem";

export default {
  id: "10016",
  title: "盈亏问题·一盈一亏",
  grade: "四年级",
  difficulty: "进阶",
  module: "应用题",
  question:
    "老师给小朋友们分糖果。\n如果每人分 5 颗，则少 3 颗；\n如果每人分 4 颗，则多 2 颗。\n请问有多少个小朋友？\n有多少颗糖果？",
  solutions: [
    {
      key: "formula",
      label: "公式法",
      steps: [
        {
          text: "人数 = (3 + 2) ÷ (5 − 4) = 5 人。",
        },
        {
          text: "糖果 = 5 × 5 − 3 = 22 颗。",
          scenes: [
            {
              kind: "heads-split",
              left: {
                count: 3,
                ticks: [{ count: 1, tone: "accent" }],
                tone: "accent",

              },
              right: {
                count: 2,
                ticks: [{ count: 1 }],

              },

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "方案一每人 5", value: 5, max: 5, tone: "primary" },
                {
                  label: "方案二每人 4",
                  value: 4,
                  max: 5,
                  tone: "muted",
                  marker: true,
                },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "人数",
                  rhs: "盈亏总额 ÷ 分配差 = 5 ÷ 1 = 5",
                  status: "keep",
                },
                { lhs: "糖果", rhs: "5×5 − 3 = 22", note: "或 4×5 + 2 = 22" },
              ],

            },
            {
              kind: "result-badges",
              items: [
                { icon: "👧", count: 5, label: "小朋友" },
                { icon: "🍬", count: 22, label: "糖果" },
              ],

            },
          ],
        },
      ],
    },
    {
      key: "equation",
      label: "方程法",
      steps: [
        {
          text: "设小朋友 x 人。",
        },
        {
          text: "糖果总数不变：5x − 3 = 4x + 2。",
        },
        {
          text: "移项：5x − 4x = 2 + 3 ⇒ x = 5。",
        },
        {
          text: "糖果：5 × 5 − 3 = 22 颗。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "5x − 3", rhs: "4x + 2", note: "糖果数相同" },
                { lhs: "5x − 4x", rhs: "2 + 3", status: "keep" },
                { lhs: "x", rhs: "5", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "学校安排宿舍，如果每间住6人，则少2个床位；如果每间住5人，则多出3个床位。问有多少间宿舍？多少人？",
    fields: [
      {
        key: "rooms",
        label: "宿舍间数",
      },
      {
        key: "students",
        label: "学生人数",
      },
    ],
    answer: {
      rooms: 5,
      students: 28,
    },
    hint: "（盈+亏）÷ 两次分配之差 = 份数",
  },
  tags: ["假设法", "方程法"],
} satisfies ProblemData;
