import type { ProblemData } from "@/types/problem";

export default {
  id: "10143",
  title: "走楼梯·递推法",
  grade: "四年级",
  difficulty: "基础",
  module: "计数",
  question:
    "一段楼梯共有 10 级台阶。小明每次可以跨上 1 级或 2 级。\n\n问他从地面走到第 10 级，一共有多少种不同的走法？",
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
          text: "设 f(n) 为到达第 n 级的走法数，则递推公式为 f(n) = f(n-1) + f(n-2)。",
        },
        {
          text: "初值：f(1) = 1（只有 1 种：跨 1 级），f(2) = 2（两种：1+1 或直接跨 2 级）。",
        },
        {
          text: "依次递推，直到算出 f(10)。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "f(1) (初值：只跨 1 级)", rhs: "1" },
                { lhs: "f(2) (初值：1+1 或 2)", rhs: "2" },
                { lhs: "f(3) (递推 ③)", rhs: "f(2) + f(1) = 2 + 1 = 3" },
                { lhs: "f(4) (递推 ④)", rhs: "f(3) + f(2) = 3 + 2 = 5" },
                { lhs: "f(5) (递推 ⑤)", rhs: "f(4) + f(3) = 5 + 3 = 8" },
                { lhs: "f(6) (递推 ⑥)", rhs: "f(5) + f(4) = 8 + 5 = 13" },
                { lhs: "f(7) (递推 ⑦)", rhs: "f(6) + f(5) = 13 + 8 = 21" },
                { lhs: "f(8) (递推 ⑧)", rhs: "f(7) + f(6) = 21 + 13 = 34" },
                { lhs: "f(9) (递推 ⑨)", rhs: "f(8) + f(7) = 34 + 21 = 55" },
                {
                  lhs: "f(10) (递推 答案)",
                  rhs: "f(9) + f(8) = 55 + 34 = 89",
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
