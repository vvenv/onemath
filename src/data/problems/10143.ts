import type { ProblemData } from "@/types/problem";

export default {
  id: "10143",
  title: "走楼梯·递推法",
  grade: "四年级",
  module: "计数",
  difficulty: "基础",
  question: "一段楼梯共有 10 级台阶。小明每次可以跨上 1 级或 2 级。问他从地面走到第 10 级，一共有多少种不同的走法？",
  solutions: [
    {
      key: "recurrence",
      label: "递推法",
      steps: [
        "分析最后一步：要到达第 n 级，要么从第 n-1 级跨 1 步上来，要么从第 n-2 级跨 2 步上来。",
        "所以到达第 n 级的走法数 = 到达第 n-1 级的走法数 + 到达第 n-2 级的走法数。",
        "设 a_n 为到达第 n 级的走法数，则递推公式为 a_n = a_{n-1} + a_{n-2}。",
        "初值：a_1 = 1（只有 1 种：跨 1 级），a_2 = 2（两种：1+1 或直接跨 2 级）。",
        "依次递推，直到算出 a_{10}。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "a_1", rhs: "1", note: "只跨 1 级", badge: "初值" },
            { lhs: "a_2", rhs: "2", note: "1+1 或 2", badge: "初值" },
            { lhs: "a_3", rhs: "a_2 + a_1 = 2 + 1 = 3", note: "递推", badge: "③" },
            { lhs: "a_4", rhs: "a_3 + a_2 = 3 + 2 = 5", note: "递推", badge: "④" },
            { lhs: "a_5", rhs: "a_4 + a_3 = 5 + 3 = 8", note: "递推", badge: "⑤" },
            { lhs: "a_6", rhs: "a_5 + a_4 = 8 + 5 = 13", note: "递推", badge: "⑥" },
            { lhs: "a_7", rhs: "a_6 + a_5 = 13 + 8 = 21", note: "递推", badge: "⑦" },
            { lhs: "a_8", rhs: "a_7 + a_6 = 21 + 13 = 34", note: "递推", badge: "⑧" },
            { lhs: "a_9", rhs: "a_8 + a_7 = 34 + 21 = 55", note: "递推", badge: "⑨" },
            { lhs: "a_{10}", rhs: "a_9 + a_8 = 55 + 34 = 89", note: "递推", badge: "答案", status: "keep" },
          ],
          caption: "从 a_1、a_2 出发，每一步都等于前两步之和，这就是斐波那契数列。",
        },
        {
          kind: "result-badges",
          items: [{ icon: "🪜", count: 89, label: "种走法" }],
          caption: "到达第 10 级共有 89 种不同的走法。",
        },
      ],
    },
    {
      key: "enumeration",
      label: "枚举验证",
      steps: [
        "对前几步直接枚举，验证递推关系。",
        "枚举结果 1, 2, 3, 5 与递推公式一致，说明规律正确。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "第 1 级", rhs: "[1]", badge: "1 种" },
            { lhs: "第 2 级", rhs: "[1,1]、[2]", badge: "2 种" },
            { lhs: "第 3 级", rhs: "[1,1,1]、[1,2]、[2,1]", badge: "3 种" },
            { lhs: "第 4 级", rhs: "[1,1,1,1]、[1,1,2]、[1,2,1]、[2,1,1]、[2,2]", badge: "5 种" },
          ],
          note: "种数序列 1, 2, 3, 5 正是 a_n = a_{n-1} + a_{n-2} 的前几项，与递推法一致。",
        },
      ],
    },
  ],
  variant: {
    question: "用 1×1 和 1×2 两种瓷砖铺一条 1×8 的长地面（两种瓷砖可以混用，不能不铺），一共有多少种不同的铺法？",
    fields: [
      {
        key: "answer",
        label: "铺法总数",
        type: "number",
      },
    ],
    answer: {
      answer: 34,
    },
    hint: "考虑地面最右端：要么竖着铺一块 1×1，要么横着铺一块 1×2。这和走楼梯是同一个递推关系。",
  },
  knowledgePoints: [
    {
      slug: "recurrence",
      name: "递推法",
    },
  ],
  tags: ["递推法"],
} satisfies ProblemData;
