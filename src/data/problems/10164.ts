import type { ProblemData } from "@/types/problem";

export default {
  id: "10164",
  title: "最大公约数·分组问题",
  grade: "六年级",
  difficulty: "进阶",
  module: "数论",
  question:
    "有 84 个苹果、126 个梨和 168 个橘子，要把它们分成若干份，每份中苹果、梨、橘子的数量分别相同。\n最多能分成多少份？每份各有苹果、梨、橘子多少个？",
  solutions: [
    {
      key: "gcd-application",
      label: "最大公约数应用",
      steps: [
        {
          text: "分析：要使每份中三种水果的数量分别相同，份数必须是 84、126、168 的公约数。\n求最大公约数：84 = 2² × 3 × 7，126 = 2 × 3² × 7，168 = 2³ × 3 × 7，gcd = 2 × 3 × 7 = 42。",
        },
        {
          text: "最多能分成 42 份，每份苹果 = 84 ÷ 42 = 2 个，梨 = 126 ÷ 42 = 3 个，橘子 = 168 ÷ 42 = 4 个。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "84", rhs: "2² × 3 × 7", status: "keep" },
                { lhs: "126", rhs: "2 × 3² × 7", status: "keep" },
                { lhs: "168", rhs: "2³ × 3 × 7", status: "keep" },
                {
                  lhs: "gcd(84, 126, 168) (份数)",
                  rhs: "2 × 3 × 7 = 42",
                  status: "keep",
                },
                { lhs: "每份苹果", rhs: "84 ÷ 42 = 2", status: "keep" },
                { lhs: "每份梨", rhs: "126 ÷ 42 = 3", status: "keep" },
                { lhs: "每份橘子", rhs: "168 ÷ 42 = 4", status: "keep" },
              ],

            },
            {
              kind: "result-badges",
              layout: "label-first",
              items: [
                { icon: "🍎", count: 2, label: "苹果/份" },
                { icon: "🍐", count: 3, label: "梨/份" },
                { icon: "🍊", count: 4, label: "橘子/份" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "有 60 支铅笔、90 块橡皮和 120 把尺子，要把它们分成若干份，每份中铅笔、橡皮、尺子的数量分别相同。最多能分成多少份？",
    fields: [
      {
        key: "parts",
        label: "最多份数",
      },
    ],
    answer: {
      parts: 30,
    },
    hint: "份数 = gcd(60, 90, 120) = 30",
  },
  tags: ["最大公约数"],
} satisfies ProblemData;
