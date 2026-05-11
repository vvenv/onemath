import type { ProblemData } from "@/types/problem";

export default {
  id: "10048",
  title: "等量互换·浓度相等",
  grade: "六年级",
  difficulty: "挑战",
  module: "应用题",
  question:
    "甲容器有浓度为 12% 的盐水 500 克，乙容器有浓度为 20% 的盐水 300 克。\n\n分别从两个容器中各取出等量的一杯盐水进行交换，交换后两个容器中的盐水浓度恰好相等。\n\n那么取出的这杯盐水重多少克？",
  solutions: [
    {
      key: "equal_conc",
      label: "最终浓度相等法",
      steps: [
        {
          text: "分析：交换等量盐水后，两容器浓度相等，说明最终浓度等于混合后的整体平均浓度。甲容器盐量增加量等于从乙容器换入的盐量减去换出的盐量。",
        },
        {
          text: "计算整体平均浓度，并求出甲容器盐量的变化量。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "原式",
                  rhs: "(500×12% + 300×20%) ÷ (500+300)",
                  status: "keep",
                },
                { lhs: "", rhs: "120 ÷ 800 = 15%", status: "keep" },
                { lhs: "甲原盐量", rhs: "500 × 12% = 60g", status: "keep" },
                { lhs: "甲最终盐量", rhs: "500 × 15% = 75g", status: "keep" },
                {
                  lhs: "盐量增加",
                  rhs: "75 - 60 = 15g",
                  status: "keep",
                },
              ],
            },
          ],
        },
        {
          text: "设交换量为 x 克，根据盐量变化列方程求解。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "盐量增加",
                  rhs: "x×20% - x×12% = 0.08x",
                  status: "keep",
                },
                { lhs: "方程", rhs: "0.08x = 15", status: "keep" },
                { lhs: "解得 x", rhs: "187.5 克", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "甲杯 400g 浓度 8%，乙杯 200g 浓度 14%。交换等量后浓度相等，求交换量。",
    fields: [
      {
        key: "amount",
        label: "交换量（克）",
      },
    ],
    answer: {
      amount: "400/3",
    },
    hint: "计算整体平均浓度，根据盐量变化列方程求解。",
  },
  tags: ["不变量"],
} satisfies ProblemData;
