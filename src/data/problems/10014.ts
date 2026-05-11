import type { ProblemData } from "@/types/problem";

export default {
  id: "10014",
  title: "相遇问题·基本相遇",
  grade: "四年级",
  difficulty: "基础",
  module: "行程",
  question:
    "小明和小红从相距1200米的两地同时出发，相向而行。\n\n小明每分钟走70米，小红每分钟走50米。经过几分钟后两人相遇？",
  solutions: [
    {
      key: "sum_speed",
      label: "速度和法",
      steps: [
        {
          text: "相遇时间 = 总路程 ÷ 速度和 = 1200 ÷ (70 + 50) = 1200 ÷ 120 = 10 分钟。",
          scenes: [
            {
              kind: "number-line",
              min: 0,
              max: 1200,
              points: [
                { value: 0, label: "小明起点", tone: "primary" },
                { value: 1200, label: "小红起点", tone: "primary" },
                { value: 700, label: "相遇点", tone: "accent" },
              ],
              segments: [
                {
                  from: 0,
                  to: 700,
                  label: "小明 70×10=700 米",
                  tone: "primary",
                },
                {
                  from: 700,
                  to: 1200,
                  label: "小红 50×10=500 米",
                  tone: "muted",
                },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "小明 70", value: 70, max: 120, tone: "primary" },
                { label: "小红 50", value: 50, max: 120, tone: "muted" },
                {
                  label: "速度和 120",
                  value: 120,
                  max: 120,
                  tone: "primary",
                  marker: true,
                },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "相遇时间",
                  rhs: "1200 ÷ 120 = 10 分钟",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "两辆汽车从相距350千米的两城同时相对开出，甲车每小时行45千米，乙车每小时行55千米。\n\n几小时后两车相遇？",
    fields: [
      {
        key: "time",
        label: "相遇时间（小时）",
      },
    ],
    answer: {
      time: 3.5,
    },
    hint: "相遇时间 = 总路程 ÷ 速度和",
  },
  tags: ["相遇追及"],
} satisfies ProblemData;
