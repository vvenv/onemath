import svg1 from "./figures/10129-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10129",
  title: "蝴蝶模型·梯形平方比（已知上下底）",
  grade: "五年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，梯形 ABCD 中 AB ∥ CD，AB = 3，CD = 5，两条对角线交于 O。\n\n已知三角形 AOB 的面积为 9，求梯形 ABCD 的总面积。",
  figures: [
    {
      svg: svg1,
      alt: "梯形及对角线，已知上下底长度与顶部三角形面积",
    },
  ],
  solutions: [
    {
      key: "butterfly",
      label: "梯形蝴蝶·上下底平方比",
      steps: [
        {
          text: "分析：梯形蝴蝶模型：△AOB : △COD = AB² : CD² = 9 : 25；两翼 △AOD = △BOC = √(△AOB · △COD)。",
        },
        {
          text: "由 △AOB = 9 得 △COD = 9 · 25/9 = 25，△AOD = △BOC = √(9 · 25) = 15。",
        },
        {
          text: "梯形面积 = 9 + 15 + 15 + 25 = 64。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△AOB : △COD = (AB/CD)²", rhs: "9 : 25" },
                { lhs: "△COD", rhs: "25" },
                { lhs: "△AOD = △BOC = √(9·25)", rhs: "15" },
                {
                  lhs: "梯形 = 9 + 15 + 15 + 25",
                  rhs: "64",
                  status: "keep",
                },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "△AOB", value: 9, max: 25, tone: "primary" },
                { label: "△BOC", value: 15, max: 25, tone: "muted" },
                { label: "△AOD", value: 15, max: 25, tone: "muted" },
                { label: "△COD", value: 25, max: 25, tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "height",
      label: "直接用梯形高求解（核算）",
      steps: [
        {
          text: "分析：也可以把 △AOB 的面积换算成梯形的高，再用梯形公式核算。",
        },
        {
          text: "△AOB 的底 = AB = 3。O 到 AB 的距离 = h_上。△AOB = (1/2) · 3 · h_上 = 9 ⇒ h_上 = 6。",
        },
        {
          text: "梯形蝴蝶还告诉我们 h_上 : h_下 = AB : CD = 3 : 5 ⇒ h_下 = 10；梯形总高 = h_上 + h_下 = 16。",
        },
        {
          text: "梯形面积 = (AB + CD) · 高 ÷ 2 = (3 + 5) · 16 ÷ 2 = 64。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "h_上 = 2·△AOB / AB", rhs: "6" },
                { lhs: "h_下 = h_上 · CD/AB", rhs: "10" },
                { lhs: "梯形面积 = (3+5) × 16 / 2", rhs: "64" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "梯形 ABCD 中 AB ∥ CD，AB = 4，CD = 6，对角线交于 O。若 △COD 的面积为 18，求梯形总面积。",
    fields: [
      {
        key: "area",
        label: "梯形面积",
        type: "number",
      },
    ],
    answer: {
      area: 50,
    },
    hint: "△AOB : △COD = 16 : 36 ⇒ △AOB = 18 × 16/36 = 8；△AOD = △BOC = √(8 × 18) = 12；总 = 8+12+12+18 = 50。",
  },
  tags: ["蝴蝶模型"],
} satisfies ProblemData;
