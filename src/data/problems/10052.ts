import type { ProblemData } from "@/types/problem";

export default {
  id: "10052",
  title: "浓度还原·逆向操作",
  grade: "六年级",
  difficulty: "挑战",
  module: "应用题",
  question:
    "一桶浓度为 80% 的酒精溶液。第一次倒出 20 升，再用水加满；第二次倒出 30 升，再用水加满。此时桶内酒精浓度降为 40%。\n\n桶的容量（原来酒精溶液的体积）是多少升？",
  solutions: [
    {
      key: "concentration-ratio",
      label: "浓度保留比例法",
      steps: [
        {
          text: "分析：每次倒出再加水，酒精量按比例减少。设桶容量为 V 升，第一次保留比例为 (V−20)/V，第二次为 (V−30)/V，两次操作后酒精保留比例为两者乘积。",
        },
        {
          text: "根据浓度变化列方程求解：80% × (V−20)/V × (V−30)/V = 40%，化简得 V² − 100V + 1200 = 0，解得 V = 50 + 10√13 ≈ 86.06 升（舍去小于 30 的根）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "第一次保留", rhs: "(V - 20) / V", status: "keep" },
                { lhs: "第二次保留", rhs: "(V - 30) / V", status: "keep" },
                {
                  lhs: "最终浓度",
                  rhs: "80% × (V-20)/V × (V-30)/V = 40%",
                  status: "keep",
                },
                { lhs: "化简", rhs: "(V-20)(V-30) / V² = 0.5", status: "keep" },
                { lhs: "方程", rhs: "V² − 100V + 1200 = 0", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一桶 80% 的酒精溶液共 40 升。第一次倒出 10 升再用水加满；第二次倒出 20 升再用水加满。最终浓度是多少？（填百分数，如 30）",
    fields: [
      {
        key: "percent",
        label: "最终浓度（%）",
      },
    ],
    answer: {
      percent: 30,
    },
    hint: "酒精保留比例 = (40−10)(40−20) / 40² = 3/8，最终浓度 = 80% × 3/8 = 30%。",
  },
  tags: ["方程法"],
} satisfies ProblemData;
