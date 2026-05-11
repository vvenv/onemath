import type { ProblemData } from "@/types/problem";

export default {
  id: "10068",
  title: "环形排列·圆桌就座",
  grade: "六年级",
  difficulty: "挑战",
  module: "计数",
  question:
    "5 个小朋友围着一张圆桌坐下玩游戏。如果两种坐法可以通过整体旋转圆桌而互相重合，就看作同一种坐法（例如：大家都向左挪一个座位，不算新的一种）。\n\n那么一共有多少种不同的坐法？",
  solutions: [
    {
      key: "fixReference",
      label: "固定参照物法",
      steps: [
        {
          text: "固定1人打破旋转对称，剩下4人全排 4! = 24 种，环形坐法 = (5−1)! = 24。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "固定小 A", rhs: "打破旋转对称" },
                { lhs: "剩下 4 人排 4 个位置", rhs: "4! = 24" },
                {
                  lhs: "环形坐法 (结论)",
                  rhs: "(5 − 1)! = 24",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "quotient",
      label: "直线排列除以旋转数",
      steps: [
        {
          text: "先把 5 个人排成一条直线，共有 5! = 120 种排法。",
        },
        {
          text: "再考虑环形的特点：把直线首尾相连形成一个圆，每个圆上的坐法都能通过“依次整体旋转”产生 5 种首尾不同的直线排法（对应 5 个不同的起点）。",
        },
        {
          text: "也就是说，直线排法是环形排法的 5 倍，所以要除以 5。",
        },
        {
          text: "环形坐法 = 5! ÷ 5 = 120 ÷ 5 = 24。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "直线排列", rhs: "5! = 120" },
                { lhs: "每个环对应直线数", rhs: "5（旋转起点）" },
                { lhs: "环形坐法 (结论)", rhs: "120 ÷ 5 = 24", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "7 个人围着圆桌坐，旋转看作同一种坐法。\n\n一共有多少种不同的坐法？",
    fields: [
      {
        key: "answer",
        label: "坐法数",
        type: "number",
      },
    ],
    answer: {
      answer: 720,
    },
    hint: "环形排列公式：(n − 1)!，当 n = 7 时为 6! = 720。",
  },
  tags: ["固定参照物法", "消序法"],
} satisfies ProblemData;
