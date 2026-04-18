import type { ProblemData } from "@/types/problem";

export default {
  id: "10187",
  title: "质因数分解·复杂乘积",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question: "三个连续偶数的乘积是 7920，求这三个数的和。",
  solutions: [
    {
      key: "factorization",
      label: "质因数分解法",
      steps: [
        {
          text: "分析：7920 = 2³ × 990 = 2³ × 3² × 110 = 2³ × 3² × 2 × 5 × 11 = 2⁴ × 3² × 5 × 11。\n三个连续偶数可表示为 2n-2、2n、2n+2，乘积为 8n(n²-1) = 7920，即 n(n²-1) = 990。",
        },
        {
          text: "尝试 n=10：10×99=990 ✓。故 n=10，三个数为 18、20、22，和为 60。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "7920", rhs: "2⁴ × 3² × 5 × 11" },
                { lhs: "设中间数为 2n", rhs: "乘积 = 8n(n²-1) = 7920" },
                { lhs: "化简", rhs: "n(n²-1) = 990" },
                { lhs: "尝试 n=10", rhs: "10 × 99 = 990 ✓", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "三个连续奇数的乘积是 693，求这三个数的和。",
    fields: [
      {
        key: "sum",
        label: "三个数的和",
        type: "number",
      },
    ],
    answer: {
      sum: 21,
    },
    hint: "693 = 3 × 231 = 3 × 3 × 77 = 3² × 7 × 11。三个连续奇数是 7、9、11。",
  },
  tags: ["质因数分解"],
} satisfies ProblemData;
