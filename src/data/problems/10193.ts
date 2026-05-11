import type { ProblemData } from "@/types/problem";

export default {
  id: "10193",
  title: "拼数乘积最大·五数字分组",
  grade: "五年级",
  difficulty: "进阶",
  module: "数论",
  question:
    "把 1、2、3、4、5 这五个数字分成两组，分别组成两个数（每个数字恰好用一次），使这两个数的乘积尽可能大。\n\n这两个数分别是多少？最大的乘积是多少？",
  solutions: [
    {
      key: "pair-and-append",
      label: "拼数极值法",
      steps: [
        {
          text: "分析：要让乘积最大，两条原则缺一不可——\n\n- 两个数的位数尽量接近：5 个数字应拆成 3 位 + 2 位。\n\n- 把数字降序逐个分配：\n\n  - 最大的两个数字各占一数的最高位；\n\n  - 之后每一步把当前最大的未用数字接到目前较小的那个数末尾。\n\n 这样能让两数尽量接近、几何均值最大，从而乘积最大。",
          scenes: [
            {
              kind: "equation-list",
              note: "位数搭配：5 个数字拆成 3 位 + 2 位。",
              rows: [
                { lhs: "总位数", rhs: "5" },
                { lhs: "拆分方案", rhs: "3 + 2" },
              ],
            },
          ],
        },
        {
          text: "首位分配：把最大的两个数字 5、4 分别作为两数的最高位。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "首位 5", rhs: "A = 5" },
                { lhs: "首位 4", rhs: "B = 4" },
              ],
            },
          ],
        },
        {
          text: "放 3：比较当前两数，B = 4 较小，把 3 接到 B 的末尾。",
          scenes: [
            {
              kind: "equation-list",
              rows: [{ lhs: "B = 4 较小", rhs: "B = 43" }],
            },
          ],
        },
        {
          text: "放 2：比较当前两数，A = 5 较小，把 2 接到 A 的末尾。",
          scenes: [
            {
              kind: "equation-list",
              rows: [{ lhs: "A = 5 较小", rhs: "A = 52" }],
            },
          ],
        },
        {
          text: "放 1：比较当前两数，B = 43 较小，把 1 接到 B 的末尾。得到 A = 52，B = 431，最大乘积 = 52 × 431 = 22412。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "B = 43 较小", rhs: "B = 431" },
                {
                  lhs: "最大乘积",
                  rhs: "52 × 431 = 22412",
                  status: "keep",
                  badge: "最大",
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
      "把 1、2、3、4 这四个数字分成两组，分别组成两个两位数（每个数字恰好用一次），使乘积最大。\n\n最大乘积是多少？",
    fields: [
      {
        key: "answer",
        label: "最大乘积",
        type: "number",
      },
    ],
    answer: {
      answer: 1312,
    },
    hint: "首位放最大的 4、3；接下来 2 接到较小的 3 后 → 32，1 接到较小的 4 后 → 41。最大乘积 41 × 32 = 1312。",
  },
  tags: ["拼数极值", "极端原理"],
} satisfies ProblemData;
