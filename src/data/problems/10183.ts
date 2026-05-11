import type { ProblemData } from "@/types/problem";

export default {
  id: "10183",
  title: "周期问题·多重周期",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "甲、乙、丙三人在环形跑道上跑步，跑道长 400 米。甲每 2 分钟跑一圈，乙每 3 分钟跑一圈，丙每 5 分钟跑一圈。\n\n三人同时从同一起点出发，至少经过多少分钟后三人会再次在起点相遇？此时各跑了多少圈？",
  solutions: [
    {
      key: "lcm",
      label: "最小公倍数法",
      steps: [
        {
          text: "分析：三人同时在起点相遇，所需时间必须是 2、3、5 的公倍数。\n\n相遇时间 30 分钟，各跑圈数：甲 30 ÷ 2 = 15 圈，乙 30 ÷ 3 = 10 圈，丙 30 ÷ 5 = 6 圈。",
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙、丙三人在环形跑道上跑步，跑道长 600 米。甲每 4 分钟跑一圈，乙每 6 分钟跑一圈，丙每 8 分钟跑一圈。三人同时从同一起点出发。\n\n至少经过多少分钟后三人会再次在起点相遇？",
    fields: [
      {
        key: "minutes",
        label: "相遇时间（分钟）",
        type: "number",
      },
    ],
    answer: {
      minutes: 24,
    },
    hint: "求 4、6、8 的最小公倍数。",
  },
  tags: ["周期问题", "最小公倍数"],
} satisfies ProblemData;
