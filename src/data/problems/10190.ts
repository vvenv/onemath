import type { ProblemData } from "@/types/problem";

export default {
  id: "10190",
  title: "位值原理·三位数交换",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "一个三位数，百位数字是个位数字的 2 倍，十位数字比百位数字小 3。如果把百位数字和个位数字交换位置，得到的新数比原数小 198。\n求原数。",
  solutions: [
    {
      key: "place-value",
      label: "位值原理法",
      steps: [
        {
          text: "分析：设个位为 b，则百位 a = 2b，十位 = a - 3 = 2b - 3。原数 = 100a + 10(a - 3) + b = 221b - 30。\n交换后新数 = 100b + 10(a - 3) + a = 122b - 30。原数 - 新数 = (221b - 30) - (122b - 30) = 99b = 198，解得 b = 2。",
        },
        {
          text: "个位 b = 2，百位 a = 4，十位 = 1。原数为 412，新数为 214，412 - 214 = 198 ✓。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "设个位 b", rhs: "百位 a = 2b，十位 = 2b - 3" },
                { lhs: "原数", rhs: "100a + 10(a-3) + b = 221b - 30" },
                {
                  lhs: "新数（交换百位个位）",
                  rhs: "100b + 10(a-3) + a = 122b - 30",
                },
                { lhs: "原数 - 新数", rhs: "99b = 198", status: "keep" },
                { lhs: "b (个位)", rhs: "2", status: "keep" },
                { lhs: "a (百位)", rhs: "4", status: "keep" },
                { lhs: "十位", rhs: "1", status: "keep" },
                { lhs: "原数", rhs: "412", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个三位数，百位数字比个位数字大 2，十位数字是百位数字的一半。如果把百位数字和个位数字交换位置，得到的新数比原数小 99。求原数。",
    fields: [
      {
        key: "original",
        label: "原数",
        type: "number",
      },
    ],
    answer: {
      original: 531,
    },
    hint: "设个位为 x，则百位为 x + 2，十位为 (x + 2) / 2。原数 - 新数 = 99。",
  },
  tags: ["位值原理", "方程法"],
} satisfies ProblemData;
