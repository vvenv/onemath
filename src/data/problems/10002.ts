import type { ProblemData } from "@/types/problem";

export default {
  id: "10002",
  title: "奇异动物聚会·多元消元",
  grade: "五年级",
  difficulty: "挑战",
  module: "应用题",
  question:
    "一些奇异的动物在草坪上聚会。有独脚兽（1个头、1只脚）、双头龙（2个头、4只脚）、三脚猫（1个头、3只脚）和四脚蛇（1个头、4只脚）。\n如果草坪上的动物共有 58 个头、160 只脚，且四脚蛇的数量恰好是双头龙的 2 倍，那么其中独脚兽有几只？",
  solutions: [
    {
      key: "substitution",
      label: "代换消元",
      steps: [
        {
          text: "d=2b，代入得 a+4b+c=58, a+12b+3c=160。",

          scenes: [
            {
              kind: "result-badges",
              items: [
                { icon: "🐉", count: 1, label: "（2头4脚）" },
                { icon: "🐍", count: 2, label: "（1头4脚 × 2）" },
              ],
              separator: "↔",

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "a + 2b + c + d", rhs: "58", note: "头数" },
                { lhs: "a + 4b + 3c + 4d", rhs: "160", note: "脚数" },
                { lhs: "d", rhs: "2b", note: "条件", status: "keep" },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "a + 4b + c",
                  rhs: "58",
                  note: "代入 d=2b 到头数",
                  badge: "①",
                },
                {
                  lhs: "a + 12b + 3c",
                  rhs: "160",
                  note: "代入 d=2b 到脚数",
                  badge: "②",
                },
              ],

            },
          ],
        },
        {
          text: "②−①得 8b+2c=102 ⇒ 4b+c=51，回代①得 a=58−51=7 只。",

          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "脚", value: 160, max: 160, tone: "primary" },
                {
                  label: "头",
                  value: 58,
                  max: 160,
                  tone: "muted",
                  marker: true,
                },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "总头", value: 58, max: 58, tone: "primary" },
                {
                  label: "4b+c",
                  value: 51,
                  max: 58,
                  tone: "muted",
                  marker: true,
                },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "🦄", count: 7, label: "独脚兽" }],

            },
          ],
        },
      ],
    },
    {
      key: "insight",
      label: "巧解·整体代换",
      steps: [
        {
          text: "分析：由 d = 2b 把「1 条双头龙 + 2 条四脚蛇」打包成 4 头 12 脚的一组；独脚兽和三脚猫都是单头动物。对题目做「脚 − 头」：每只独脚兽贡献 0、每只三脚猫贡献 2，打包后的组合贡献 12 − 4 = 8。故 8b + 2c = 160 − 58 = 102，即 4b + c = 51。",
        },
        {
          text: "代入头数 a + (4b + c) = 58 ⇒ a = 7。答案只取决于 a，不依赖 b、c 具体取值。",
          scenes: [
            {
              kind: "heads-split",
              left: {
                count: 4,
                ticks: [{ count: 3, tone: "accent" }],
                tone: "accent",

              },
              right: {
                count: 2,
                ticks: [{ count: 1 }, { count: 2 }],

              },

            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "脚 − 头",
                  rhs: "160 − 58 = 102",
                  note: "整体相减消 a、c 的 1 头 1 脚",
                },
                { lhs: "8b + 2c", rhs: "102", status: "keep" },
                { lhs: "4b + c", rhs: "51", note: "两边 ÷ 2", status: "keep" },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "🦄", count: 7, label: "独脚兽" }],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "同样是独脚兽、双头龙、三脚猫、四脚蛇的聚会：共 40 个头、100 只脚，四脚蛇数量仍是双头龙的 2 倍。独脚兽有几只？",
    fields: [
      {
        key: "unicorn",
        label: "独脚兽数量",
      },
    ],
    answer: {
      unicorn: 10,
    },
    hint: "提示：先用 d = 2b 化简头、脚两式，再用脚式减头式消去 a。",
  },
  tags: ["整体代换"],
} satisfies ProblemData;
