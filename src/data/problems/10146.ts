import type { ProblemData } from "@/types/problem";

export default {
  id: "10146",
  title: "连续掷骰子·至少一次",
  grade: "六年级",
  difficulty: "挑战",
  module: "计数",
  question: "连续掷 3 次质地均匀的骰子，求至少有一次掷出 6 点的概率是多少？",
  solutions: [
    {
      key: "complement",
      label: "对立事件法",
      steps: [
        {
          text: "分析：直接计算至少一次掷出 6 点较复杂，改用对立事件计算。",
        },
        {
          text: "对立事件是三次都不是 6 点，即每次都掷出 1-5 点。",
        },
        {
          text: "每次不掷出 6 点的概率是 5/6。",
        },
        {
          text: "三次都不掷出 6 点的概率 = (5/6)³。",
        },
        {
          text: "至少一次掷出 6 点的概率 = 1 - (5/6)³。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "每次不掷出 6 点 (单次)", rhs: "5/6" },
                {
                  lhs: "三次都不掷出 6 点 (对立事件)",
                  rhs: "(5/6)³ = 125/216",
                },
                {
                  lhs: "至少一次掷出 6 点",
                  rhs: "1 − 125/216 = 91/216",
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
    question: "连续掷 4 次质地均匀的骰子，求至少有一次掷出点数大于 4 的概率。",
    fields: [
      {
        key: "probability",
        label: "至少一次大于4的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "65/81",
    },
    hint: "先求对立事件：四次都掷出 1-4 点的概率是 (4/6)⁴ = 16/81，再用 1 减去它。",
  },
  tags: ["对立事件", "独立事件"],
} satisfies ProblemData;
