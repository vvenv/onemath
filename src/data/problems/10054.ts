import type { ProblemData } from "@/types/problem";

export default {
  id: "10054",
  title: "流水行船·基础",
  grade: "五年级",
  difficulty: "基础",
  module: "行程",
  question:
    "一艘轮船从甲港开往乙港，顺水航行需要 4 小时，逆水返回需要 6 小时。已知甲、乙两港相距 120 千米。\n求这艘轮船在静水中的速度和水流的速度。",
  solutions: [
    {
      key: "water",
      label: "公式法",
      steps: [
        {
          text: "顺水速度 = 120 ÷ 4 = 30 km/h，逆水速度 = 120 ÷ 6 = 20 km/h。静水 = (30 + 20) ÷ 2 = 25 km/h，水流 = (30 − 20) ÷ 2 = 5 km/h。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "顺水速度", rhs: "120 ÷ 4 = 30", status: "keep" },
                { lhs: "逆水速度", rhs: "120 ÷ 6 = 20", status: "keep" },
              ],
            },
            {
              kind: "number-line",
              min: 0,
              max: 35,
              points: [
                { value: 20, label: "逆水 20", tone: "muted" },
                { value: 25, label: "静水 25", tone: "primary" },
                { value: 30, label: "顺水 30", tone: "accent" },
              ],
              segments: [
                { from: 20, to: 25, label: "水流 5", tone: "primary" },
                { from: 25, to: 30, label: "水流 5", tone: "primary" },
              ],
            },
            {
              kind: "result-badges",
              items: [
                { icon: "🚢", count: 25, label: "静水速度 (km/h)" },
                { icon: "💧", count: 5, label: "水流速度 (km/h)" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一艘船在静水中的速度是 15 千米/小时，水流速度是 3 千米/小时。该船从 A 地顺流而下到 B 地，再逆流返回 A 地，共用了 8 小时。A、B 两地相距多少千米？",
    fields: [
      {
        key: "distance",
        label: "A、B距离（千米）",
      },
    ],
    answer: {
      distance: 57.6,
    },
    hint: "先求顺水速度和逆水速度，再列方程求解",
  },
  tags: ["流水行船"],
} satisfies ProblemData;
