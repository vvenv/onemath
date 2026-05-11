import type { ProblemData } from "@/types/problem";

export default {
  id: "10057",
  title: "分数比较大小·作差法",
  grade: "五年级",
  module: "计算",
  difficulty: "基础",
  question: "比较 2023/2024 和 2024/2025 的大小。",
  solutions: [
    {
      key: "difference",
      label: "作差法（与1比较）",
      steps: [
        {
          text: "1 − 2023/2024 = 1/2024，1 − 2024/2025 = 1/2025。\n\n1/2024 > 1/2025，故 2023/2024 < 2024/2025。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1 − 2023/2024", rhs: "1/2024", status: "keep" },
                { lhs: "1 − 2024/2025", rhs: "1/2025", status: "keep" },
                { lhs: "比较", rhs: "1/2024 > 1/2025", status: "keep" },
                { lhs: "结论", rhs: "2023/2024 < 2024/2025", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "比较 999/1000 和 1000/1001 的大小。",
    fields: [
      {
        key: "relation",
        type: "text",
        label: "大小关系",
        enum: [">", "<", "="],
      },
    ],
    answer: {
      relation: "<",
    },
    hint: "两个分数都接近 1，试试用 1 减去每个分数，比较差值",
  },
  tags: ["作差法"],
} satisfies ProblemData;
