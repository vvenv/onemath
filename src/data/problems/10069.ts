import type { ProblemData } from "@/types/problem";

export default {
  id: "10069",
  title: "沏茶问题·最短总时间",
  grade: "四年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "小明要请客人喝茶，需要完成以下 5 件事：\n洗水壶 1 分钟、烧开水 10 分钟、洗茶杯 2 分钟、拿茶叶 1 分钟、沏茶 1 分钟。\n其中烧开水必须在洗完水壶之后才能开始；\n沏茶必须等到开水烧好，并且茶杯、茶叶都准备好了才能开始。\n小明想让客人尽快喝上茶，最少要用多少分钟？",
  solutions: [
    {
      key: "parallel",
      label: "并行安排法",
      steps: [
        {
          text: "并行安排：在烧开水时同时完成洗茶杯和拿茶叶。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "串行安排（逐件做）",
                  rhs: "1 + 10 + 2 + 1 + 1 = 15 分钟",
                  status: "cancel",
                },
                {
                  lhs: "并行：烧水时同时洗杯、拿茶叶",
                  rhs: "1 + 10 + 1 = 12 分钟",
                  status: "keep",
                  badge: "最优",
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
      "小红要给客人煮面，需要完成：洗锅 2 分钟、烧水 8 分钟、切菜 3 分钟、取调料 1 分钟、下面并煮熟 4 分钟。烧水必须在洗完锅之后；下面必须等水烧开，且切菜、调料都备好。最少用多少分钟？",
    fields: [
      {
        key: "answer",
        label: "最少分钟数",
        type: "number",
      },
    ],
    answer: {
      answer: 14,
    },
    hint: "把切菜和取调料安排到烧水的 8 分钟里同时完成：2 + 8 + 4 = 14。",
  },
  tags: ["时间统筹"],
} satisfies ProblemData;
