import type { ProblemData } from "@/types/problem";

export default {
  id: "10180",
  title: "操作与策略·博弈问题",
  grade: "六年级",
  difficulty: "挑战",
  module: "杂题",
  question:
    "甲、乙两人轮流从一堆 20 个石子中取石子，每次只能取 1 个或 2 个，取到最后一个石子的人获胜。\n\n甲先取，甲有没有必胜策略？如果有，应该怎么取？",
  solutions: [
    {
      key: "backward",
      label: "倒推法",
      steps: [
        {
          text: "分析：3 的倍数（3、6、9、12、15、18...）是必败位置，其他数是必胜位置。",
        },
        {
          text: "20 不是 3 的倍数，甲先取 20 − 18 = 2 个，给乙留下 18 个。之后乙取 k 个，甲取 3 − k 个，保持给乙留下 3 的倍数。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "必败位置",
                  rhs: "3, 6, 9, 12, 15, 18...",
                  status: "keep",
                },
                { lhs: "初始石子", rhs: "20" },
                { lhs: "甲第一次取", rhs: "20 − 18 = 2", status: "keep" },
                { lhs: "给乙留下", rhs: "18（3的倍数）", status: "keep" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "初始石子", value: 20, max: 20, tone: "muted" },
                { label: "甲取2个", value: 2, max: 20, tone: "primary" },
                { label: "给乙留下", value: 18, max: 20, tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "modulo",
      label: "模运算分析法",
      steps: [
        {
          text: "分析：在模 3 意义下操作，若石子数不是 3 的倍数，可取适当数量使其变为 3 的倍数。\n\n20 ÷ 3 = 6 余 2，甲先取 2 个，使石子数变为 18。之后乙取 k 个，甲取 3 − k 个。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "20 ÷ 3", rhs: "6 余 2" },
                { lhs: "甲取", rhs: "2", status: "keep" },
                { lhs: "剩余", rhs: "18（3的倍数）", status: "keep" },
                { lhs: "策略", rhs: "乙取k，甲取3−k", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙两人轮流从一堆 25 个石子中取石子，每次只能取 1 个或 2 个，取到最后一个石子的人获胜。甲先取，甲有没有必胜策略？如果有，第一次应该取几个？",
    fields: [
      {
        key: "strategy",
        label: "甲第一次取几个",
        type: "number",
      },
    ],
    answer: {
      strategy: 1,
    },
    hint: "25 ÷ 3 = 8 余 1，甲应该取 1 个，给乙留下 24 个。",
  },
  tags: ["不变量"],
} satisfies ProblemData;
