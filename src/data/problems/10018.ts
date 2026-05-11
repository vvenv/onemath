import type { ProblemData } from "@/types/problem";

export default {
  id: "10018",
  title: "牛吃草·匀速生长",
  grade: "五年级",
  difficulty: "进阶",
  module: "应用题",
  question:
    "一片匀速生长的草地，可供 27 头牛吃 6 周，或者供 23 头牛吃 9 周。\n\n那么这片草地可供 21 头牛吃几周？",
  solutions: [
    {
      key: "newton",
      label: "核心公式法",
      steps: [
        {
          text: "分析：每头牛每周吃 1 份。同一片草地被 27 头吃 6 周（共 162 份）与被 23 头吃 9 周（共 207 份），两次耗草的差额正好是多出来的 3 周新长的草，因此每周新长 (207 − 162) ÷ (9 − 6) = 15 份；原有草 = 162 − 15 × 6 = 72 份。",
        },
        {
          text: "21 头牛中，15 头吃新草，6 头吃原有草。\n\n原有草 72 份 ÷ 6 头 = 12 周。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "27头6周 (162)", value: 162, max: 207, tone: "muted" },
                {
                  label: "23头9周 (207)",
                  value: 207,
                  max: 207,
                  tone: "primary",
                },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "草生长速度 (每周)", rhs: "(207 − 162) ÷ (9−6) = 15" },
                { lhs: "原草量", rhs: "162 − 15 × 6 = 72" },
                { lhs: "剩余吃老草的牛", rhs: "21 − 15 = 6 头" },
                { lhs: "总时间", rhs: "72 ÷ 6 = 12 周", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个水池底部有一个常开的排水管，上部有若干个同样粗细的进水管。打开 3 个进水管，5 小时注满；打开 4 个进水管，3 小时注满。如果打开 6 个进水管，几小时注满？",
    fields: [
      {
        key: "hours",
        label: "注满时间",
      },
    ],
    answer: {
      hours: "5/3",
    },
    hint: "排水管相当于反向的“牛吃草”：设每进水管每小时 1 份，则排水每小时 1.5 份、总容量 7.5 份。6 个进水管净速率 6 − 1.5 = 4.5 份/时，注满用 7.5 ÷ 4.5 = 5/3 小时。",
  },
  tags: ["假设法"],
} satisfies ProblemData;
