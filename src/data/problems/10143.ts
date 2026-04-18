import type { ProblemData } from "@/types/problem";

export default {
  id: "10143",
  title: "走楼梯·递推法",
  grade: "四年级",
  difficulty: "基础",
  module: "计数",
  question:
    "一段楼梯共有 10 级台阶。小明每次可以跨上 1 级或 2 级。\n问他从地面走到第 10 级，一共有多少种不同的走法？",
  solutions: [
    {
      key: "recurrence",
      label: "递推法",
      steps: [
        {
          text: "分析最后一步：要到达第 n 级，要么从第 n-1 级跨 1 步上来，要么从第 n-2 级跨 2 步上来。",
        },
        {
          text: "所以到达第 n 级的走法数 = 到达第 n-1 级的走法数 + 到达第 n-2 级的走法数。",
        },
        {
          text: "设 a_n 为到达第 n 级的走法数，则递推公式为 a_n = a_{n-1} + a_{n-2}。",
        },
        {
          text: "初值：a_1 = 1（只有 1 种：跨 1 级），a_2 = 2（两种：1+1 或直接跨 2 级）。",
        },
        {
          text: "依次递推，直到算出 a_{10}。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "a_1 (初值：只跨 1 级)", rhs: "1" },
                { lhs: "a_2 (初值：1+1 或 2)", rhs: "2" },
                { lhs: "a_3 (递推 ③)", rhs: "a_2 + a_1 = 2 + 1 = 3" },
                { lhs: "a_4 (递推 ④)", rhs: "a_3 + a_2 = 3 + 2 = 5" },
                { lhs: "a_5 (递推 ⑤)", rhs: "a_4 + a_3 = 5 + 3 = 8" },
                { lhs: "a_6 (递推 ⑥)", rhs: "a_5 + a_4 = 8 + 5 = 13" },
                { lhs: "a_7 (递推 ⑦)", rhs: "a_6 + a_5 = 13 + 8 = 21" },
                { lhs: "a_8 (递推 ⑧)", rhs: "a_7 + a_6 = 21 + 13 = 34" },
                { lhs: "a_9 (递推 ⑨)", rhs: "a_8 + a_7 = 34 + 21 = 55" },
                {
                  lhs: "a_{10} (递推 答案)",
                  rhs: "a_9 + a_8 = 55 + 34 = 89",
                  status: "keep",
                },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "🪜", count: 89, label: "种走法" }],

            },
          ],
        },
      ],
    },
    {
      key: "enumeration",
      label: "枚举法",
      steps: [
        {
          text: "对前几步直接枚举，验证递推关系。",
        },
        {
          text: "枚举结果 1, 2, 3, 5 与递推公式一致，说明规律正确。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "第 1 级 (1 种)", rhs: "[1]" },
                { lhs: "第 2 级 (2 种)", rhs: "[1,1]、[2]" },
                { lhs: "第 3 级 (3 种)", rhs: "[1,1,1]、[1,2]、[2,1]" },
                {
                  lhs: "第 4 级 (5 种)",
                  rhs: "[1,1,1,1]、[1,1,2]、[1,2,1]、[2,1,1]、[2,2]",
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
      "用 1×1 和 1×2 两种瓷砖铺一条 1×8 的长地面（两种瓷砖可以混用，不能不铺），一共有多少种不同的铺法？",
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
  tags: ["递推法"],
} satisfies ProblemData;
