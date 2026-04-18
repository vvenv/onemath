import type { ProblemData } from "@/types/problem";

export default {
  id: "10177",
  title: "位值原理·数字交换",
  grade: "五年级",
  difficulty: "进阶",
  module: "数论",
  question:
    "一个两位数，个位数字比十位数字大 3。如果把个位数字和十位数字交换位置，得到的新数比原数大 27。\n求原数。",
  solutions: [
    {
      key: "digit",
      label: "位值原理法",
      steps: [
        {
          text: "分析：设十位为 a，个位为 a + 3，原数 = 10a + b，新数 = 10b + a。",
        },
        {
          text: "新数 − 原数 = 9(b − a) = 27，得 b − a = 3，设 a = 1，则 b = 4，原数 = 14。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "设十位 a，个位 b", rhs: "b = a + 3" },
                { lhs: "原数", rhs: "10a + b" },
                { lhs: "新数", rhs: "10b + a" },
                { lhs: "新数 − 原数", rhs: "9(b − a) = 27" },
                { lhs: "b − a", rhs: "3", status: "keep" },
                { lhs: "原数", rhs: "14", status: "keep" },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "🔢", count: 14, label: "原数" }],

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
          text: "分析：个位数字比十位数字大 3 的两位数有：14、25、36、47、58、69。\n分别计算交换后的新数与原数的差。14 → 41，差 27；25 → 52，差 27；36 → 63，差 27；47 → 74，差 27；58 → 85，差 27；69 → 96，差 27。\n所有符合条件的数都满足差为 27，最小的解是 14。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "14 → 41", rhs: "差 27" },
                { lhs: "25 → 52", rhs: "差 27" },
                { lhs: "36 → 63", rhs: "差 27" },
                { lhs: "47 → 74", rhs: "差 27" },
                { lhs: "58 → 85", rhs: "差 27" },
                { lhs: "69 → 96", rhs: "差 27" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个两位数，个位数字比十位数字大 2。如果把个位数字和十位数字交换位置，得到的新数比原数大 18。求原数。",
    fields: [
      {
        key: "number",
        label: "原数",
      },
    ],
    answer: {
      number: 13,
    },
    hint: "设十位为 a，个位为 a+2，则 9 × 2 = 18，符合题意。",
  },
  tags: ["位值原理"],
} satisfies ProblemData;
