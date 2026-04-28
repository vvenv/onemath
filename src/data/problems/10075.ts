import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10075-1.svg?raw";

export default {
  id: "10075",
  title: "物资调运·最省运费",
  grade: "六年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "有两个仓库 A、B，分别存货 15 吨和 25 吨；两个工地甲、乙，分别需要 20 吨和 20 吨。仓库到工地的单位运费（元/吨）见下图。要把仓库里 40 吨货物全部运到两个工地并满足各自需求。请设计调运方案，使总运费最少。最少运费是多少元？",
  figures: [
    {
      svg: svg1,
      caption: "仓库→工地的单位运费（元/吨）",
      alt: "两仓两工地运输示意",
    },
  ],
  solutions: [
    {
      key: "paramSearch",
      label: "设变量分析法",
      steps: [
        "分析：用一个变量串起四路运量。设 A→甲 = x 吨，则 A→乙 = 15 − x、B→甲 = 20 − x、B→乙 = 5 + x，可行域 0 ≤ x ≤ 15。",
        "化简后总运费 = −5x + 220，关于 x 递减，取上界 x = 15 最省：方案 A→甲 15、B→甲 5、B→乙 20、A→乙 0，最少运费 145 元。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "总运费 f(x)",
              rhs: "4x + 7(15−x) + 5(20−x) + 3(5+x)",
            },
            {
              lhs: "化简",
              rhs: "−5x + 220",
            },
            {
              lhs: "x 可行范围",
              rhs: "0 ≤ x ≤ 15",
            },
            {
              lhs: "最优 x = 15 (最少)",
              rhs: "f(15) = 145",
              status: "keep",
            },
          ],
          caption: "用一个变量把 4 个运量串起来",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🚚",
              count: 145,
              label: "元",
            },
          ],
          caption: "最少运费",
        },
      ],
    },
    {
      key: "greedy",
      label: "避免对流·就近匹配",
      steps: [
        "分析：运费表里 A→甲 = 4、B→乙 = 3 是两条最便宜的线。让它们尽量走满，另两条只用来补差，就能最省。",
        "A 仅 15 吨，全部走 A→甲（甲还缺 5 吨）；乙需 20 吨，由 B→乙 全包；B 剩余的 5 吨补到甲。",
        "得到方案 A→甲 15、B→甲 5、B→乙 20、A→乙 0，与解法一一致，最少运费 145 元。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "A→甲（便宜 4）",
              rhs: "15 吨 × 4 = 60",
            },
            {
              lhs: "B→乙（便宜 3）",
              rhs: "20 吨 × 3 = 60",
            },
            {
              lhs: "B→甲（补差 5）",
              rhs: "5 吨 × 5 = 25",
            },
            {
              lhs: "合计",
              rhs: "145 元",
              status: "keep",
            },
          ],
          caption: "把便宜线走满，只用补差",
        },
      ],
    },
  ],
  variant: {
    question:
      "两仓 A、B 分别存 20、30 吨，两个工地甲、乙各需 25 吨。单位运费 A→甲 6, A→乙 5, B→甲 4, B→乙 7（元/吨）。最少运费是多少元？",
    fields: [
      {
        key: "answer",
        label: "最少运费",
        type: "number",
      },
    ],
    answer: {
      answer: 235,
    },
    hint: "设 A→甲 = x，则 A→乙 = 20−x，B→甲 = 25−x，B→乙 = 5+x，x ∈ [0,20]。费用 = 6x + 5(20−x) + 4(25−x) + 7(5+x) = (6−5−4+7)x + 235 = 4x + 235，x 越小越好，x = 0：A→乙 20，B→甲 25，B→乙 5，费用 = 0 + 100 + 100 + 35 = 235。",
  },
  tags: ["调运选址", "方程法"],
} satisfies ProblemData;
