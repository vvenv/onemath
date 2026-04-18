import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10036-1.svg?raw";

export default {
  id: "10036",
  title: "容斥原理·重叠计数",
  grade: "四年级",
  module: "计数",
  difficulty: "进阶",
  question:
    "某班有45人，其中参加数学兴趣小组的有28人，参加语文兴趣小组的有25人，两个小组都参加的有12人。\n请问：两个小组都没有参加的有多少人？",
  solutions: [
    {
      key: "inclusion-exclusion",
      label: "容斥原理",
      steps: [
        {
          text: "分析：要求两个小组都没参加的人数，可以先求至少参加一个小组的人数，再用全班人数减去它。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,

            },
          ],
        },
        {
          text: "应用容斥原理计算。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "至少参加一个",
                  rhs: "数学 + 语文 − 两个都参加",
                  status: "keep",
                },
                {
                  lhs: "",
                  rhs: "28 + 25 − 12",
                  status: "keep",
                },
                {
                  lhs: "",
                  rhs: "41 人",
                  badge: "容斥结果",
                },
                {
                  lhs: "都没参加",
                  rhs: "全班 − 至少参加一个",
                  status: "keep",
                },
                {
                  lhs: "",
                  rhs: "45 − 41",
                  status: "keep",
                },
                {
                  lhs: "",
                  rhs: "4 人",
                  badge: "答案",
                },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "在1~100的自然数中，能被2整除或能被3整除的数有多少个？",
    fields: [
      {
        key: "count",
        label: "个数",
      },
    ],
    answer: {
      count: 67,
    },
    hint: "能被2整除：50个；能被3整除：33个；能被6整除（重叠）：16个。50+33-16=67。",
  },
  tags: ["容斥原理"],
} satisfies ProblemData;
