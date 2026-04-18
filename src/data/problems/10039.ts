import type { ProblemData } from "@/types/problem";

export default {
  id: "10039",
  title: "数字计数·含特定数字",
  grade: "五年级",
  module: "计数",
  difficulty: "进阶",
  question: '在 1 到 100 的自然数中，数字"5"一共出现了多少次？',
  solutions: [
    {
      key: "position-counting",
      label: "按数位分类计数",
      steps: [
        {
          text: "个位是 5 的有 10 个，十位是 5 的有 10 个。\n总次数 = 10 + 10 = 20 次。",
          scenes: [
            {
              kind: "number-grid",
              rows: 10,
              cols: 10,
              cells: [
                {
                  row: 0,
                  col: 5,
                  value: "5",
                  tone: "accent",
                },
                {
                  row: 1,
                  col: 5,
                  value: "15",
                  tone: "accent",
                },
                {
                  row: 2,
                  col: 5,
                  value: "25",
                  tone: "accent",
                },
                {
                  row: 3,
                  col: 5,
                  value: "35",
                  tone: "accent",
                },
                {
                  row: 4,
                  col: 5,
                  value: "45",
                  tone: "accent",
                },
                {
                  row: 5,
                  col: 0,
                  value: "50",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 1,
                  value: "51",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 2,
                  value: "52",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 3,
                  value: "53",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 4,
                  value: "54",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 5,
                  value: "55",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 6,
                  value: "56",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 7,
                  value: "57",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 8,
                  value: "58",
                  tone: "primary",
                },
                {
                  row: 5,
                  col: 9,
                  value: "59",
                  tone: "primary",
                },
                {
                  row: 6,
                  col: 5,
                  value: "65",
                  tone: "accent",
                },
                {
                  row: 7,
                  col: 5,
                  value: "75",
                  tone: "accent",
                },
                {
                  row: 8,
                  col: 5,
                  value: "85",
                  tone: "accent",
                },
                {
                  row: 9,
                  col: 5,
                  value: "95",
                  tone: "accent",
                },
              ],
              rowLabel: "十位",
              colLabel: "个位",

            },
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "个位是5",
                  value: 10,
                  max: 20,
                  tone: "primary",
                },
                {
                  label: "十位是5",
                  value: 10,
                  max: 20,
                  tone: "primary",
                },
              ],

            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "5️⃣",
                  count: 10,
                  label: "个位出现5",
                },
                {
                  icon: "5️⃣",
                  count: 10,
                  label: "十位出现5",
                },
                {
                  icon: "✅",
                  count: 20,
                  label: "总计出现",
                },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: '在 1 到 200 的自然数中，数字"1"一共出现了多少次？',
    fields: [
      {
        key: "count",
        label: "出现次数",
      },
    ],
    answer: {
      count: 140,
    },
    hint: "个位：20次；十位：20次；百位：100次（100~199）。合计140次。",
  },
  tags: ["位值原理", "分类讨论"],
} satisfies ProblemData;
