import type { ProblemData } from "@/types/problem";

export default {
  id: "10012",
  title: "和倍问题·基本和倍",
  grade: "三年级",
  difficulty: "基础",
  module: "应用题",
  question:
    "小明和小红一共有 63 张卡片，小明的卡片数量是小红的 2 倍。\n\n请问小明和小红各有多少张卡片？",
  solutions: [
    {
      key: "multiple",
      label: "和倍·份数法",
      steps: [
        {
          text: "小红 1 份，小明 2 份，共 3 份 = 63 张 ⇒ 1 份 = 21 张。小明 42 张，小红 21 张。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "小红 1 份", value: 21, max: 63, tone: "muted" },
                { label: "小明 2 份", value: 42, max: 63, tone: "primary" },
                {
                  label: "合计 3 份",
                  value: 63,
                  max: 63,
                  tone: "primary",
                  marker: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "equation",
      label: "方程法",
      steps: [
        {
          text: "设小红 x 张，小明 2x 张。",
        },
        {
          text: "总数：x + 2x = 63 ⇒ 3x = 63 ⇒ x = 21。",
        },
        {
          text: "小红 21 张，小明 42 张。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "x + 2x", rhs: "63" },
                { lhs: "3x", rhs: "63", status: "keep" },
                { lhs: "x", rhs: "21", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "水果店运来苹果和梨共300千克，苹果的重量是梨的4倍。苹果和梨各有多少千克？",
    fields: [
      {
        key: "apple",
        label: "苹果重量（千克）",
      },
      {
        key: "pear",
        label: "梨重量（千克）",
      },
    ],
    answer: {
      apple: 240,
      pear: 60,
    },
    hint: "先把总数按倍数关系分成（1+4）份。",
  },
  tags: ["份数法", "方程法"],
} satisfies ProblemData;
