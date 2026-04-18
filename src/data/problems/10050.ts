import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10050-1.svg?raw";

export default {
  id: "10050",
  title: "浓度三角·最值配比",
  grade: "六年级",
  module: "应用题",
  difficulty: "挑战",
  question:
    "有浓度为 5% 的盐水 100 克和浓度为 20% 的盐水 200 克。\n现在要用这两种盐水配制成浓度为 15% 的盐水，\n最多能配制多少克？",
  solutions: [
    {
      key: "max_weight",
      label: "极端分析法",
      steps: [
        {
          text: "十字交叉得 5%:20% = 1:2，现有 100g:200g 恰好符合比例。\n总质量 = 100 + 200 = 300 克。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,
            },
            {
              kind: "statement-table",
              headers: {
                speaker: "方案",
                claim: "5%用量",
                verdict: "20%用量",
                badge: "总质量",
              },
              rows: [
                {
                  speaker: "方案1",
                  claim: "100g (用完)",
                  verdict: "true",
                  badge: "200g (用完)",
                },
                {
                  speaker: "方案2",
                  claim: "50g",
                  verdict: "true",
                  badge: "100g",
                },
                {
                  speaker: "方案3",
                  claim: "20g",
                  verdict: "true",
                  badge: "40g",
                },
              ],
            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "🧪",
                  count: 300,
                  label: "最多配制（克）",
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
      "有 10% 盐水 150 克和 30% 盐水 200 克，要配成 18% 的盐水，最多能配多少克？",
    fields: [
      {
        key: "max_weight",
        label: "最多配制（克）",
      },
    ],
    answer: {
      max_weight: 250,
    },
    hint: "十字交叉得 10%:30% = 3:2。150 克 10% 需配 100 克 30%，总 250 克；或 200 克 30% 需配 300 克 10%（不足），所以取前者。",
  },
  tags: ["十字交叉法"],
} satisfies ProblemData;
