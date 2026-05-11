import type { ProblemData } from "@/types/problem";

export default {
  id: "10004",
  title: "探险队分帐篷·盈亏转化",
  grade: "三年级",
  difficulty: "进阶",
  module: "应用题",
  question:
    "一支探险队准备在野外露营。\n\n如果每顶帐篷住 5 人，则有 14 人没有地方住；\n\n如果每顶帐篷住 7 人，则刚好空出 4 顶帐篷。\n\n问探险队共有多少人？帐篷共有多少顶？",
  solutions: [
    {
      key: "comparison",
      label: "比较法",
      steps: [
        {
          text: "帐篷数 = (14 + 7×4) ÷ (7−5) = 42 ÷ 2 = 21 顶；\n\n总人数 = 5 × 21 + 14 = 119 人。",
          scenes: [
            { kind: "heads", heads: { count: 21 } },
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "方案二（满员）",
                  value: 147,
                  max: 147,
                  tone: "primary",
                },
                {
                  label: "方案一（满员）",
                  value: 105,
                  max: 147,
                  tone: "muted",
                  marker: true,
                },
              ],
            },
            {
              kind: "heads-split",
              left: {
                count: 14,
                ticks: [{ count: 1 }],
                tone: "accent",
              },
              right: {
                count: 28,
                ticks: [{ count: 1 }],
              },
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
          text: "分析：设帐篷 x 顶。按方案一人数为 5x + 14，按方案二人数为 7(x − 4)，两者相等即可列方程。",
        },
        {
          text: "解方程求得 x = 21，总人数 5 × 21 + 14 = 119 人。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "5x + 14 (人数不变)", rhs: "7(x − 4)" },
                { lhs: "5x + 14 (展开右边)", rhs: "7x − 28", status: "keep" },
                { lhs: "14 + 28 (把 x 项、常数项移到同侧)", rhs: "7x − 5x" },
                { lhs: "42", rhs: "2x", status: "keep" },
                { lhs: "x", rhs: "21", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "学校给新生安排宿舍。如果每间住 6 人，则 22 人没床位；如果每间住 8 人，则空出 3 间宿舍。\n\n问新生有多少人？",
    fields: [
      {
        key: "students",
        label: "新生人数",
      },
    ],
    answer: {
      students: 160,
    },
    hint: "注意将“空出 3 间”转化为“缺少多少人”。",
  },
  tags: ["比较法", "方程法"],
} satisfies ProblemData;
