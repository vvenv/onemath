import type { ProblemData } from "@/types/problem";

export default {
  id: "10037",
  title: "抽屉原理·摸球问题",
  grade: "四年级",
  module: "计数",
  difficulty: "进阶",
  question:
    "一个袋子里有红、黄、蓝三种颜色的球各 5 个。\n\n至少要摸出多少个球，才能保证摸出的球中一定有 2 个颜色相同？",
  solutions: [
    {
      key: "pigeonhole",
      label: "抽屉原理（最不利原则）",
      steps: [
        {
          text: "应用最不利原则：先摸出每种颜色各 1 个，再摸 1 个必同色。",
          scenes: [
            {
              kind: "statement-table",
              headers: {
                speaker: "摸球顺序",
                claim: "颜色",
                verdict: "累计",
              },
              rows: [
                {
                  speaker: "第 1 个",
                  claim: "红",
                  badge: "1 个",
                },
                {
                  speaker: "第 2 个",
                  claim: "黄",
                  badge: "2 个",
                },
                {
                  speaker: "第 3 个",
                  claim: "蓝",
                  badge: "3 个",
                },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "最不利情况摸球数",
                  rhs: "3 个",
                  status: "keep",
                },
                {
                  lhs: "再摸1个",
                  rhs: "必然与某个同色",
                  status: "keep",
                },
                {
                  lhs: "至少需要",
                  rhs: "3 + 1 = 4 个",
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
    question:
      "袋子里有红、黄、蓝、绿四种颜色的球各8个。至少要摸出多少个，才能保证有3个颜色相同？",
    fields: [
      {
        key: "count",
        label: "至少摸球数",
      },
    ],
    answer: {
      count: 9,
    },
    hint: "最不利：每种颜色先各摸2个（共8个），第9个必然使某种颜色达到3个。",
  },
  tags: ["最不利原则"],
} satisfies ProblemData;
