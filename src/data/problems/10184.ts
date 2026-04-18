import type { ProblemData } from "@/types/problem";

export default {
  id: "10184",
  title: "同余问题·中国剩余定理",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "有一筐苹果，3个3个数余2个，5个5个数余3个，7个7个数余4个。\n这筐苹果最少有多少个？",
  solutions: [
    {
      key: "chinese-remainder",
      label: "中国剩余定理",
      steps: [
        {
          text: "分析：设苹果数为 N，则 N ≡ 2 (mod 3)，N ≡ 3 (mod 5)，N ≡ 4 (mod 7)。\n从 N ≡ 4 (mod 7) 开始逐步求解：N = 7k + 4，代入得 k ≡ 2 (mod 5)，即 k = 5m + 2；N = 35m + 18，代入得 m ≡ 1 (mod 3)，即 m = 3n + 1；故 N = 105n + 53，最小解 n = 0 时 N = 53。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "N ≡ 4 (mod 7)", rhs: "N = 7k + 4" },
                {
                  lhs: "N ≡ 3 (mod 5)",
                  rhs: "7k + 4 ≡ 3 ⇒ k ≡ 2 (mod 5)",
                  status: "keep",
                },
                { lhs: "k = 5m + 2", rhs: "N = 35m + 18" },
                {
                  lhs: "N ≡ 2 (mod 3)",
                  rhs: "35m + 18 ≡ 2 ⇒ m ≡ 1 (mod 3)",
                  status: "keep",
                },
                { lhs: "m = 3n + 1", rhs: "N = 105n + 53" },
                { lhs: "最小解", rhs: "n = 0, N = 53", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "有一箱橘子，4个4个数余3个，6个6个数余5个，9个9个数余2个。这箱橘子最少有多少个？",
    fields: [
      {
        key: "oranges",
        label: "最少橘子数",
        type: "number",
      },
    ],
    answer: {
      oranges: 83,
    },
    hint: "用中国剩余定理逐步求解，注意 4、6、9 不两两互质，需要先检查条件。",
  },
  tags: ["同余"],
} satisfies ProblemData;
