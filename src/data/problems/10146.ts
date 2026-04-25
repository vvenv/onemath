import type { ProblemData } from "@/types/problem";

export default {
  id: "10146",
  title: "连续掷骰子·至少一次",
  grade: "六年级",
  module: "计数",
  difficulty: "挑战",
  question: "连续掷 3 次质地均匀的骰子，求至少有一次掷出 6 点的概率是多少？",
  solutions: [
    {
      key: "complement",
      label: "对立事件法",
      steps: [
        "分析：直接计算至少一次掷出 6 点较复杂，改用对立事件计算。",
        "对立事件是三次都不是 6 点，即每次都掷出 1-5 点。",
        "每次不掷出 6 点的概率是 5/6。",
        "三次都不掷出 6 点的概率 = (5/6)³。",
        "至少一次掷出 6 点的概率 = 1 - (5/6)³。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "每次不掷出 6 点", rhs: "5/6", badge: "单次" },
            { lhs: "三次都不掷出 6 点", rhs: "(5/6)³ = 125/216", badge: "对立事件" },
            { lhs: "至少一次掷出 6 点", rhs: "1 − 125/216 = 91/216", status: "keep" },
          ],
          caption: "对立事件法：P(至少一次) = 1 − P(一次都没有)",
        },
        {
          kind: "result-badges",
          items: [{ icon: "🎲", count: "91/216", label: "概率" }],
          caption: "至少一次掷出 6 点的概率是 91/216",
        },
      ],
    },
    {
      key: "direct",
      label: "直接分类法",
      steps: [
        "直接计算：恰好 1 次 6 点 + 恰好 2 次 6 点 + 恰好 3 次 6 点。",
        "用独立事件概率和组合数计算每种情况。",
        "求和得到总概率。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "恰好 1 次 6 点", rhs: "C(3,1) × (1/6) × (5/6)² = 75/216", badge: "1次" },
            { lhs: "恰好 2 次 6 点", rhs: "C(3,2) × (1/6)² × (5/6) = 15/216", badge: "2次" },
            { lhs: "恰好 3 次 6 点", rhs: "C(3,3) × (1/6)³ = 1/216", badge: "3次" },
            { lhs: "至少一次 6 点", rhs: "75/216 + 15/216 + 1/216 = 91/216", status: "keep" },
          ],
          caption: "分类求和：用组合数 C(n,k) 选出 k 次掷出 6 点的位置",
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
  knowledgePoints: [
    {
      slug: "complementary-events",
      name: "对立事件",
    },
  ],
  tags: ["对立事件", "独立事件"],
} satisfies ProblemData;
