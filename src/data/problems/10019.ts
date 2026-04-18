import type { ProblemData } from "@/types/problem";

export default {
  id: "10019",
  title: "环形跑道·相遇与追及",
  grade: "五年级",
  difficulty: "进阶",
  module: "行程",
  question:
    "甲、乙两人在 400 米的环形跑道上练习跑步。甲每秒跑 6 米，乙每秒跑 4 米。\n两人同时同地反向出发，经过多少秒两人第一次相遇？如果是同向出发，经过多少秒甲第一次追上乙？",
  solutions: [
    {
      key: "relative",
      label: "相对速度法",
      steps: [
        {
          text: "反向相遇 = 400 ÷ (6 + 4) = 40 秒；\n同向追及 = 400 ÷ (6 − 4) = 200 秒。",
          scenes: [
            {
              kind: "number-line",
              min: 0,
              max: 400,
              points: [
                { value: 0, label: "同点起跑", tone: "primary" },
                {
                  value: 240,
                  label: "甲走 6×40",
                  sublabel: "240",
                  tone: "primary",
                },
                { value: 400, label: "环绕一圈", tone: "accent" },
              ],
              segments: [
                { from: 0, to: 240, label: "甲 →", tone: "primary" },
                { from: 240, to: 400, label: "← 乙 4×40 = 160", tone: "muted" },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "速度和 (反向)", value: 10, max: 10, tone: "primary" },
                {
                  label: "速度差 (同向)",
                  value: 2,
                  max: 10,
                  tone: "primary",
                  marker: true,
                },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "相遇时间 (反向)", rhs: "400 ÷ (6 + 4) = 40 秒" },
                {
                  lhs: "追及时间 (同向)",
                  rhs: "400 ÷ (6 − 4) = 200 秒",
                  status: "keep",
                },
              ],

            },
            {
              kind: "result-badges",
              items: [
                { icon: "🔄", count: 40, label: "反向相遇(秒)" },
                { icon: "➡️", count: 200, label: "同向追及(秒)" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个湖的周长是 2 千米。张、李二人从同一地点出发。张每小时走 5 千米，李每小时走 4 千米。如果反向而行，多少小时后相遇？如果同向而行，多少小时后张追上李？",
    fields: [
      {
        key: "meet",
        label: "反向相遇时间",
      },
      {
        key: "catch",
        label: "同向追及时间",
      },
    ],
    answer: {
      meet: "2/9",
      catch: 2,
    },
    hint: "注意单位的一致性。",
  },
  tags: ["相遇追及"],
} satisfies ProblemData;
