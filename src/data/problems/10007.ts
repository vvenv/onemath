import type { ProblemData } from "@/types/problem";

export default {
  id: "10007",
  title: "分糖·盈亏问题",
  grade: "三年级",
  difficulty: "基础",
  module: "应用题",
  question:
    "老师给小朋友们分糖果。\n如果每人分 6 颗，会多出 15 颗；\n如果每人分 8 颗，则还差 9 颗。\n请问一共有多少位小朋友？\n一共有多少颗糖果？",
  solutions: [
    {
      key: "comparison",
      label: "比较法",
      steps: [
        {
          text: "人数 = (15 + 9) ÷ (8 − 6) = 12 人；糖果 = 12 × 6 + 15 = 87 颗。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "第一种分法 (盈)", value: 15, max: 24, tone: "muted" },
                {
                  label: "第二种分法 (亏)",
                  value: 9,
                  max: 24,
                  tone: "primary",
                },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "第一种 (6颗/人)", value: 6, max: 8, tone: "muted" },
                { label: "第二种 (8颗/人)", value: 8, max: 8, tone: "primary" },
              ],

            },
            {
              kind: "heads",
              heads: {
                count: 12,
                ticks: [{ count: 6 }, { count: 2, tone: "accent" }],
              },

            },
            {
              kind: "result-badges",
              items: [
                { icon: "👧", count: 12, label: "小朋友" },
                { icon: "🍬", count: 87, label: "糖果总数" },
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
          text: "设有 x 位小朋友。",
        },
        {
          text: "糖果总数不变：6x + 15 = 8x − 9。",
        },
        {
          text: "移项：15 + 9 = 8x − 6x ⇒ 24 = 2x ⇒ x = 12。",
        },
        {
          text: "糖果总数：6 × 12 + 15 = 87。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "6x + 15 (糖果数相同)", rhs: "8x − 9" },
                { lhs: "15 + 9 (同类项移到同侧)", rhs: "8x − 6x" },
                { lhs: "24", rhs: "2x", status: "keep" },
                { lhs: "x", rhs: "12", status: "keep" },
              ],

            },
            {
              kind: "result-badges",
              items: [
                { icon: "👧", count: 12, label: "人" },
                { icon: "🍬", count: 87, label: "糖果" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "学校安排宿舍。如果每间住 4 人，则有 10 人没床位；如果每间住 6 人，则空出 2 间宿舍。请问有多少间宿舍？多少名学生？",
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
      rooms: 11,
      students: 54,
    },
    hint: "第二种分法可以转化为“如果住满需要再增加多少人”，或者直接用方程试试。",
  },
  tags: ["方程法", "对应思想"],
} satisfies ProblemData;
