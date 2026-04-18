import type { ProblemData } from "@/types/problem";

export default {
  id: "10046",
  title: "余数性质·星期几",
  grade: "四年级",
  module: "数论",
  difficulty: "基础",
  question: "2024 年 1 月 1 日是星期一。\n2024 年 10 月 1 日是星期几？",
  solutions: [
    {
      key: "remainder",
      label: "余数计算法",
      steps: [
        {
          text: "1 至 9 月共 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 = 274 天。\n274 ÷ 7 = 39 余 1，星期一 + 1 = 星期二。",
        },
      ],
    },
  ],
  variant: {
    question: "2024 年 3 月 1 日是星期五。2024 年 6 月 1 日是星期几？",
    fields: [
      {
        key: "weekday",
        type: "text",
        label: "星期几",
        enum: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
      },
    ],
    answer: {
      weekday: "星期六",
    },
    hint: "3月31天，4月30天，5月31天，共92天。92 ÷ 7 = 13 周余 1 天。",
  },
  tags: ["周期问题"],
} satisfies ProblemData;
