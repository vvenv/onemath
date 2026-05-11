import svg1 from "./figures/10197-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10197",
  title: "归纳与递推·汉诺塔",
  grade: "四年级",
  difficulty: "挑战",
  module: "计数",
  question:
    "汉诺塔问题：有 3 根柱子 A、B、C，A 柱上有 3 个大小不同的圆盘（小的在上面）。每次只能移动一个圆盘，且大圆盘不能放在小圆盘上面。要将所有圆盘从 A 柱移到 C 柱，最少需要移动多少次？",
  figures: [
    {
      svg: svg1,
      alt: "汉诺塔初始状态：3 根柱子，A 柱上有 3 个大小不同的圆盘",
    },
  ],
  solutions: [
    {
      key: "recurrence",
      label: "递推法",
      steps: [
        {
          text: "设 f(n) 表示移动 n 个圆盘所需的最少次数。",
        },
        {
          text: "要把 n 个圆盘从 A 移到 C，需要：",
        },
        {
          text: "先把上面 n−1 个圆盘从 A 移到 B（借助 C），需要 f(n−1) 次。",
        },
        {
          text: "再把最大的圆盘从 A 移到 C，需要 1 次。",
        },
        {
          text: "最后把 n−1 个圆盘从 B 移到 C（借助 A），需要 f(n−1) 次。",
        },
        {
          text: "递推公式：f(n) = 2 × f(n−1) + 1。",
        },
        {
          text: "基础情况：f(1) = 1（直接移动）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "f(1)", rhs: "1", status: "keep" },
              ],
            },
          ],
        },
        {
          text: "按递推公式计算：",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "f(2)", rhs: "2 × f(1) + 1 = 2 × 1 + 1 = 3" },
                { lhs: "f(3)", rhs: "2 × f(2) + 1 = 2 × 3 + 1 = 7", status: "keep" },
              ],
            },
          ],
        },
        {
          text: "移动 3 个圆盘最少需要 7 次。",
        },
      ],
    },
    {
      key: "pattern",
      label: "找规律法",
      steps: [
        {
          text: "从简单情况入手找规律：",
        },
        {
          text: "1 个圆盘：1 次",
        },
        {
          text: "2 个圆盘：3 次（上面 1 个移到 B，最大移到 C，上面 1 个移到 C）",
        },
        {
          text: "3 个圆盘：7 次（上面 2 个移到 B，最大移到 C，上面 2 个移到 C）",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "f(1)", rhs: "1 = 2¹ − 1" },
                { lhs: "f(2)", rhs: "3 = 2² − 1" },
                { lhs: "f(3)", rhs: "7 = 2³ − 1", status: "keep" },
              ],
            },
          ],
        },
        {
          text: "发现规律：f(n) = 2ⁿ − 1。",
        },
        {
          text: "验证：f(3) = 2³ − 1 = 8 − 1 = 7。",
        },
        {
          text: "最少需要移动 7 次。",
        },
      ],
    },
  ],
  variant: {
    question:
      "汉诺塔问题：有 4 个大小不同的圆盘，每次只能移动一个，大圆盘不能放在小圆盘上面。将所有圆盘从 A 柱移到 C 柱，最少需要移动多少次？",
    fields: [
      {
        key: "moves",
        label: "最少移动次数",
        type: "number",
      },
    ],
    answer: {
      moves: 15,
    },
    hint: "递推公式：f(n) = 2 × f(n−1) + 1。f(1)=1，f(2)=3，f(3)=7，f(4)=2×7+1=15。或用公式 f(n)=2ⁿ−1。",
  },
  tags: ["递推法"],
} satisfies ProblemData;
