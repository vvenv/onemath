import type { ProblemData } from "@/types/problem";

export default {
  id: "10173",
  title: "行程问题·多次相遇",
  grade: "六年级",
  difficulty: "挑战",
  module: "行程",
  question:
    "甲、乙两车同时从 A、B 两地相向而行，在距 A 地 60 千米处第一次相遇。相遇后继续前行，分别到达对方出发点后立即返回，在距 B 地 40 千米处第二次相遇。\nA、B 两地相距多少千米？",
  solutions: [
    {
      key: "proportion",
      label: "比例分析法",
      steps: [
        {
          text: "分析：第一次相遇共行 1 个全程，甲行 60 千米；第二次相遇共行 3 个全程。\n甲共行 60 × 3 = 180 千米，全程 = 180 − 40 = 140 千米。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "第一次相遇甲行", rhs: "60", status: "keep" },
                { lhs: "第二次相遇甲行", rhs: "60 × 3 = 180", status: "keep" },
                { lhs: "全程", rhs: "180 − 40 = 140", status: "keep" },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "第一次相遇（1个全程）",
                  value: 60,
                  max: 180,
                  tone: "muted",
                },
                {
                  label: "第二次相遇（3个全程）",
                  value: 180,
                  max: 180,
                  tone: "primary",
                },
                { label: "A-B距离", value: 140, max: 180, tone: "primary" },
              ],

            },
            {
              kind: "result-badges",
              items: [
                { icon: "📍", count: 140, label: "A-B距离", note: "千米" },
              ],

            },
          ],
        },
      ],
    },
    {
      key: "distance",
      label: "路程计算法",
      steps: [
        {
          text: "设全程为 S 千米，速度比 60 : (S − 60) = (S + 40) : (2S − 40)。",
        },
        {
          text: "解得 S = 140 千米。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "(S + 40) : (2S − 40)", rhs: "60 : (S − 60)" },
                { lhs: "(S + 40)(S − 60)", rhs: "60(2S − 40)" },
                { lhs: "S² − 20S − 2400", rhs: "120S − 2400" },
                { lhs: "S² − 140S", rhs: "0" },
                { lhs: "S", rhs: "140", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙两车同时从 A、B 两地相向而行，在距 A 地 80 千米处第一次相遇。相遇后继续前行，分别到达对方出发点后立即返回，在距 A 地 30 千米处第二次相遇。A、B 两地相距多少千米？",
    fields: [
      {
        key: "distance",
        label: "A-B距离（千米）",
      },
    ],
    answer: {
      distance: 130,
    },
    hint: "第二次相遇距 A 地 30 千米，说明甲行了全程 − 30 千米，即 2 × 80 − 30 = 130 千米。",
  },
  tags: ["相遇追及", "比例法"],
} satisfies ProblemData;
