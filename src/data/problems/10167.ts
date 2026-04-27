import type { ProblemData } from "@/types/problem";

export default {
  id: "10167",
  title: "最优化问题·烙饼问题",
  grade: "四年级",
  module: "杂题",
  difficulty: "挑战",
  question:
    "烙饼时，一口锅每次只能烙 2 张饼，每面需要烙 3 分钟。如果要烙 7 张饼，最少需要多少分钟？",
  solutions: [
    {
      key: "optimization",
      label: "最优策略法",
      steps: [
        "分析：锅每次只能烙 2 张饼，每张饼烙两面。要让锅尽可能不空。",
        "前 3 张用交替烙法需 3 × 3 = 9 分钟，后 4 张两两烙需 (4 ÷ 2) × 6 = 12 分钟。",
        "总时间 = 9 + 12 = 21 分钟。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "前 3 张（交替）",
              rhs: "3 × 3 = 9",
              note: "分钟",
            },
            {
              lhs: "后 4 张（两两）",
              rhs: "4 ÷ 2 × 6 = 12",
              note: "分钟",
            },
            {
              lhs: "总时间",
              rhs: "9 + 12 = 21",
              status: "keep",
            },
          ],
          caption: "分组策略计算",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "交替烙 3 张",
              value: 9,
              max: 21,
              tone: "primary",
            },
            {
              label: "两两烙 4 张",
              value: 12,
              max: 21,
              tone: "primary",
            },
            {
              label: "总时间",
              value: 21,
              max: 21,
              tone: "primary",
            },
          ],
          caption: "时间分配",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "⏱️",
              count: 21,
              label: "最少时间（分钟）",
            },
          ],
          caption: "烙 7 张饼最少需要 21 分钟",
        },
      ],
    },
    {
      key: "formula",
      label: "公式法",
      steps: [
        "分析：单数饼的最优策略是前 3 张用交替烙法，其余用两两烙法。",
        "前 3 张交替烙需要 3 × 3 = 9 分钟。",
        "后 4 张两两烙需要 (4 ÷ 2) × 6 = 12 分钟。",
        "总时间 = 9 + 12 = 21 分钟。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "前 3 张交替",
              rhs: "3 × 3 = 9",
            },
            {
              lhs: "后 4 张两两",
              rhs: "(4 ÷ 2) × 6 = 12",
            },
            {
              lhs: "总时间",
              rhs: "9 + 12 = 21",
              status: "keep",
            },
          ],
          caption: "单数饼的最优策略",
        },
      ],
    },
  ],
  variant: {
    question:
      "烙饼时，一口锅每次只能烙 2 张饼，每面需要烙 2 分钟。如果要烙 9 张饼，最少需要多少分钟？",
    fields: [
      {
        key: "time",
        label: "最少时间（分钟）",
      },
    ],
    answer: {
      time: 18,
    },
    hint: "9 张饼可以分成 3 组，每组 3 张用交替烙法，每组需要 6 分钟。",
  },
  tags: ["时间统筹"],
} satisfies ProblemData;
