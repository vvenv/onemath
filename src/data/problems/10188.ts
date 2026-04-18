import type { ProblemData } from "@/types/problem";

export default {
  id: "10188",
  title: "最大公约数·多数分组",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "有 96 个苹果、144 个梨、180 个橘子和 240 个香蕉，要把它们分成若干份，每份中苹果、梨、橘子、香蕉的数量分别相同。\n最多能分成多少份？\n每份各有苹果、梨、橘子、香蕉多少个？",
  solutions: [
    {
      key: "gcd-application",
      label: "最大公约数应用",
      steps: [
        {
          text: "分析：份数必须是 96、144、180、240 的公约数，求最大公约数。\n最多分成 12 份，每份：苹果 96 ÷ 12 = 8，梨 144 ÷ 12 = 12，橘子 180 ÷ 12 = 15，香蕉 240 ÷ 12 = 20。",
        },
      ],
    },
  ],
  variant: {
    question:
      "有 120 支铅笔、180 块橡皮、240 把尺子和 300 个本子，要把它们分成若干份，每份中铅笔、橡皮、尺子、本子的数量分别相同。最多能分成多少份？",
    fields: [
      {
        key: "parts",
        label: "最多份数",
        type: "number",
      },
    ],
    answer: {
      parts: 60,
    },
    hint: "份数 = gcd(120, 180, 240, 300) = 60",
  },
  tags: ["最大公约数", "质因数分解"],
} satisfies ProblemData;
