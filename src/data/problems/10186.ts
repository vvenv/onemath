import type { ProblemData } from "@/types/problem";

export default {
  id: "10186",
  title: "奇偶性·操作可行性",
  grade: "五年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "桌上有 7 个硬币，全部正面朝上。每次操作必须翻转恰好 4 个硬币。\n\n经过若干次操作后，能否使所有硬币全部反面朝上？如果能，最少需要多少次操作？",
  solutions: [
    {
      key: "parity-analysis",
      label: "奇偶性分析法",
      steps: [
        {
          text: "分析：初始 7 个正面（记为 7 个 1）。每次翻转 4 个硬币，若其中有 k 个 1，则翻转后 1 的个数变为 7 - k + (4 - k) = 11 - 2k。因为 2k 是偶数，所以 11 - 2k 的奇偶性与 11（奇数）相同。目标 0 个 1（偶数），奇偶性不同，无法实现。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "初始 1 的个数", rhs: "7（奇数）" },
                { lhs: "翻转后 1 的个数", rhs: "11 - 2k（奇数）" },
                { lhs: "目标 1 的个数", rhs: "0（偶数）", status: "keep" },
                { lhs: "结论", rhs: "奇偶性不同，无法实现", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "桌上有 9 个硬币，全部正面朝上。每次操作必须翻转恰好 5 个硬币。\n\n经过若干次操作后，能否使所有硬币全部反面朝下？",
    fields: [
      {
        key: "possible",
        label: "能否实现",
        type: "text",
        enum: ["能", "不能"],
      },
    ],
    answer: {
      possible: "不能",
    },
    hint: "初始 9 个 1（奇数），目标 0 个 1（偶数）。每次翻转 5 个，1 的个数奇偶性改变吗？",
  },
  tags: ["奇偶性"],
} satisfies ProblemData;
