import type { ProblemData } from "@/types/problem";

export default {
  id: "10194",
  title: "卡片淘汰",
  grade: "五年级",
  difficulty: "进阶",
  module: "数论",
  question:
    "有 100 张卡片，从上到下依次编号为 1~100。\n\n每次操作：丢掉最上面的一张卡片，然后把下一张卡片放到最下面。\n\n重复操作直到只剩一张卡片，这张卡片是几号？",
  solutions: [
    {
      key: "binary-method",
      label: "二进制法",
      steps: [
        {
          text: "观察规律：当卡片数 n 是 2 的幂时（如 1、2、4、8、16…），最后剩下的卡片号就是 n 本身。当 n 不是 2 的幂时，找出不超过 n 的最大 2 的幂 2^m，则答案 = 2 × (n - 2^m)。",
          scenes: [
            {
              kind: "equation-list",
              note: "小规模验证：",
              rows: [
                { lhs: "n=1", rhs: "剩 1" },
                { lhs: "n=2", rhs: "剩 2" },
                { lhs: "n=3", rhs: "剩 2 = 2×(3-2)" },
                { lhs: "n=4", rhs: "剩 4" },
                { lhs: "n=5", rhs: "剩 2 = 2×(5-4)" },
                { lhs: "n=6", rhs: "剩 4 = 2×(6-4)" },
                { lhs: "n=7", rhs: "剩 6 = 2×(7-4)" },
                { lhs: "n=8", rhs: "剩 8" },
              ],
            },
          ],
        },
        {
          text: "找出不超过 100 的最大 2 的幂：2^6 = 64。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "2^6", rhs: "64" },
                { lhs: "2^7", rhs: "128 > 100（舍去）" },
              ],
            },
          ],
        },
        {
          text: "计算答案：100 - 64 = 36，2 × 36 = 72。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "n - 2^m", rhs: "100 - 64 = 36" },
                {
                  lhs: "答案",
                  rhs: "2 × 36 = 72",
                  status: "keep",
                  badge: "答案",
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
      "有 50 张卡片，从上到下依次编号为 1~50。每次操作：丢掉最上面的一张卡片，然后把下一张卡片放到最下面。重复操作直到只剩一张卡片，这张卡片是几号？",
    fields: [
      {
        key: "answer",
        label: "卡片号",
        type: "number",
      },
    ],
    answer: {
      answer: 36,
    },
    hint: "找出不超过 50 的最大 2 的幂是 32，答案 = 2 × (50 - 32) = 36。",
  },
  tags: ["二进制法"],
} satisfies ProblemData;
