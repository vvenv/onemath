import type { ProblemData } from "@/types/problem";

export default {
  id: "10002",
  title: "奇异动物聚会·多元消元",
  grade: "五年级",
  difficulty: "挑战",
  module: "应用题",
  question:
    "一些奇异的动物在草坪上聚会。有独脚兽（1个头、1只脚）、双头龙（2个头、4只脚）、三脚猫（1个头、3只脚）和四脚蛇（1个头、4只脚）。\n\n\n\n如果草坪上的动物共有 58 个头、160 只脚，且四脚蛇的数量恰好是双头龙的 2 倍，那么其中独脚兽有几只？",
  solutions: [
    {
      key: "substitution",
      label: "整体代换",
      steps: [
        {
          text: "设独脚兽 a 只、双头龙 b 条、三脚猫 c 只、四脚蛇 d 条。由 d = 2b，把 1 条双头龙 + 2 条四脚蛇打包成一组，该组共 4 头 12 脚。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1 条双头龙", rhs: "2 头 4 脚" },
                { lhs: "2 条四脚蛇", rhs: "2 头 8 脚" },
                { lhs: "打包一组", rhs: "4 头 12 脚", status: "keep" },
              ],
            },
          ],
        },
        {
          text: "打包后，头数方程为 a + 4b + c = 58，脚数方程为 a + 12b + 3c = 160。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "头数", rhs: "a + 4b + c = 58" },
                { lhs: "脚数", rhs: "a + 12b + 3c = 160" },
              ],
            },
          ],
        },
        {
          text: "两式相减消去 a，化简得 4b + c = 51。代入头式可直接求出 a。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "脚式 − 头式", rhs: "8b + 2c = 102", status: "keep" },
                { lhs: "化简", rhs: "4b + c = 51", status: "keep" },
                { lhs: "代入头式", rhs: "a + 51 = 58" },
                { lhs: "a", rhs: "7", status: "keep" },
              ],
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
    hint: "提示：先把双头龙和四脚蛇按 1:2 分组，再计算脚数与头数的差。",
  },
  tags: ["整体代换"],
} satisfies ProblemData;
