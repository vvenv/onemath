import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10125-1.svg?raw";

export default {
  id: "10125",
  title: "蝴蝶模型·梯形平方比",
  grade: "五年级",
  module: "几何",
  difficulty: "基础",
  question:
    "如图，梯形 ABCD 中 AB ∥ CD，两条对角线交于 O，把梯形分成四个三角形 S₁（△AOB，顶）、S₂（△BOC，右）、S₃（△COD，底）、S₄（△AOD，左）。已知 S₂ = 2，S₃ = 4，求梯形 ABCD 的总面积。",
  figures: [
    {
      svg: svg1,
      caption: "梯形 ABCD 的四块：S₁/S₂/S₃/S₄ 对应上/右/下/左",
      alt: "梯形蝴蝶四块中两块已知，求总面积",
    },
  ],
  solutions: [
    {
      key: "butterfly",
      label: "蝴蝶模型·S₂² = S₁·S₃ 与 S₂ = S₄",
      steps: [
        "分析：对于梯形 (AB ∥ CD)，蝴蝶模型给出两条直接可用的结论：(1) 两侧三角形面积相等 S₂ = S₄；(2) 上下两三角形面积之积等于左右两三角形面积之积 S₁·S₃ = S₂·S₄，即 S₁·S₃ = S₂²。",
        "第一步：由 (1) S₄ = S₂ = 2。",
        "第二步：由 (2) S₁ = S₂² ÷ S₃ = 2² ÷ 4 = 4 ÷ 4 = 1。",
        "第三步：梯形总面积 = S₁ + S₂ + S₃ + S₄ = 1 + 2 + 4 + 2 = 9。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "S₄ (= S₂)",
              rhs: "2",
            },
            {
              lhs: "S₁ = S₂² / S₃",
              rhs: "4 / 4 = 1",
            },
            {
              lhs: "梯形 = 1 + 2 + 4 + 2 (答案)",
              rhs: "9",
            },
          ],
          caption: "两条蝴蝶结论一起用即可",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "S₁",
              value: 1,
              max: 4,
              tone: "primary",
            },
            {
              label: "S₂",
              value: 2,
              max: 4,
              tone: "muted",
            },
            {
              label: "S₃",
              value: 4,
              max: 4,
              tone: "primary",
            },
            {
              label: "S₄",
              value: 2,
              max: 4,
              tone: "muted",
            },
          ],
          caption: "梯形四块面积",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔷",
              count: 9,
              label: "梯形总面积",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "梯形 ABCD 中 AB ∥ CD，对角线交于 O。已知 S₂ = 6、S₃ = 9，求梯形总面积。",
    fields: [
      {
        key: "area",
        label: "梯形面积",
        type: "number",
      },
    ],
    answer: {
      area: 25,
    },
    hint: "S₄ = S₂ = 6；S₁ = S₂²/S₃ = 36/9 = 4；总和 = 4+6+9+6 = 25。",
  },
  tags: ["蝴蝶模型"],
} satisfies ProblemData;
