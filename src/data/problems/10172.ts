import type { ProblemData } from "@/types/problem";

export default {
  id: "10172",
  title: "行程问题·环形跑道",
  grade: "五年级",
  difficulty: "挑战",
  module: "行程",
  question:
    "甲、乙两人同时从同一点出发，沿周长 400 米的环形跑道同向跑步。甲的速度是 5 米/秒，乙的速度是 3 米/秒。\n出发后多少秒两人第一次相遇？",
  solutions: [
    {
      key: "relative",
      label: "相对速度法",
      steps: [
        {
          text: "分析：同向跑步，快的人比慢的人多跑一圈时相遇。",
        },
        {
          text: "相对速度 = 5 − 3 = 2 米/秒，相遇时间 = 400 ÷ 2 = 200 秒。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "相对速度", rhs: "5 − 3 = 2", status: "keep" },
                { lhs: "路程差", rhs: "400", status: "keep" },
                { lhs: "相遇时间", rhs: "400 ÷ 2 = 200", status: "keep" },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "甲速度", value: 5, max: 5, tone: "primary" },
                { label: "乙速度", value: 3, max: 5, tone: "muted" },
                { label: "相对速度", value: 2, max: 5, tone: "primary" },
              ],

            },
            {
              kind: "result-badges",
              items: [
                { icon: "⏱️", count: 200, label: "相遇时间", note: "秒" },
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
          text: "分析：设 t 秒后两人相遇。甲跑的路程 = 5t 米，乙跑的路程 = 3t 米。\n相遇时甲比乙多跑了一圈：5t − 3t = 400。解得 2t = 400，t = 200 秒。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "5t − 3t", rhs: "400" },
                { lhs: "2t", rhs: "400" },
                { lhs: "t", rhs: "200", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙两人同时从同一点出发，沿周长 600 米的环形跑道反向跑步。甲的速度是 4 米/秒，乙的速度是 2 米/秒。出发后多少秒两人第一次相遇？",
    fields: [
      {
        key: "time",
        label: "相遇时间（秒）",
      },
    ],
    answer: {
      time: 100,
    },
    hint: "反向跑步时，相对速度 = 甲速 + 乙速。",
  },
  tags: ["相遇追及"],
} satisfies ProblemData;
