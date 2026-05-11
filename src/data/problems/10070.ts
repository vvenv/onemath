import type { ProblemData } from "@/types/problem";

export default {
  id: "10070",
  title: "排队打水·等待时间最短",
  grade: "四年级",
  difficulty: "基础",
  module: "杂题",
  question:
    "同一个水龙头下，5 个人都要接水。他们各自接水用时分别为 1 分钟、6 分钟、3 分钟、5 分钟、4 分钟（每人只有一个水桶，水龙头一次只能供一个人用）。\n\n现在需要安排一个接水顺序，使所有人（从开始排队到自己接完水为止）花的时间之和最少。\n\n这个最小总时间是多少分钟？",
  solutions: [
    {
      key: "shortFirst",
      label: "小往大靠排序法",
      steps: [
        {
          text: "升序排列 1, 3, 4, 5, 6，总时间 = 5×1 + 4×3 + 3×4 + 2×5 + 1×6 = 5 + 12 + 12 + 10 + 6 = 45 分钟。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "位置系数 (按排队顺序)",
                  rhs: "5×t₁ + 4×t₂ + 3×t₃ + 2×t₄ + 1×t₅",
                },
                {
                  lhs: "升序代入 1, 3, 4, 5, 6",
                  rhs: "5·1 + 4·3 + 3·4 + 2·5 + 1·6",
                },
                {
                  lhs: "合计 (最小)",
                  rhs: "5 + 12 + 12 + 10 + 6 = 45",
                  status: "keep",
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
      "6 个人排队在同一水龙头下接水，各自接水用时为 2、7、3、6、4、5 分钟。安排合理顺序后，最少总时间（所有人各自完成接水所用时间之和）是多少分钟？",
    fields: [
      {
        key: "answer",
        label: "最小总时间",
        type: "number",
      },
    ],
    answer: {
      answer: 70,
    },
    hint: "升序 2,3,4,5,6,7，总和 = 6·2 + 5·3 + 4·4 + 3·5 + 2·6 + 1·7 = 12+15+16+15+12+7 = 70。",
  },
  tags: ["排序优化"],
} satisfies ProblemData;
