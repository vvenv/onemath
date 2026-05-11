import svg1 from "./figures/10123-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10123",
  title: "蝴蝶模型·长方形被十字切成四块",
  grade: "四年级",
  difficulty: "基础",
  module: "几何",
  question:
    "如图，一块长方形田地被两条互相垂直的直线（一条水平、一条竖直）切成四个小长方形。\n\n已知左上、右上、右下三块的面积分别是 20 亩、25 亩、30 亩。\n\n求左下那一块的面积。",
  figures: [
    {
      svg: svg1,
      alt: "长方形被十字线分成四块，左下未标数",
    },
  ],
  solutions: [
    {
      key: "butterfly",
      label: "蝴蝶模型·对角乘积相等",
      steps: [
        {
          text: "分析：设水平切线把整块田分成上下两行，高分别为 h₁（上）、h₂（下）；竖直切线把它分成左右两列，宽分别为 w₁（左）、w₂（右）。\n\n四个小长方形的面积分别是 h₁w₁, h₁w₂, h₂w₁, h₂w₂。两条对角线上的面积之积都等于 h₁h₂w₁w₂，所以“同一条对角上两块的面积之积相等”——这就是蝴蝶模型最简单的版本。",
        },
        {
          text: "按位置读数。左上 = 20，右上 = 25，右下 = 30，左下 = ?。",
        },
        {
          text: "左上与右下在同一条对角线上；右上与左下在另一条对角线上。由对角乘积相等：左上 × 右下 = 右上 × 左下。",
        },
        {
          text: "20 × 30 = 25 × ? ⇒ ? = 600 ÷ 25 = 24。",
        },
        {
          text: "结论：左下那一块的面积是 24 亩。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "左上 × 右下", rhs: "右上 × 左下" },
                { lhs: "20 × 30", rhs: "25 × ?" },
                { lhs: "?", rhs: "600 ÷ 25" },
                { lhs: "", rhs: "24" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "ratio",
      label: "利用同行/同列的比例",
      steps: [
        {
          text: "分析：同一行里两块的面积比 = 两列的宽度比；同一列里两块的面积比 = 两行的高度比。用这两个比例也能直接求出答案。",
        },
        {
          text: "上行两块比：20 : 25 = 4 : 5，所以 左上 : 右上 = 4 : 5。",
        },
        {
          text: "下行两块的比应当也是 4 : 5（都等于 左上 : w₂）。已知下行右边是 30，所以左下 = 30 × 4/5 = 24。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "左上 : 右上", rhs: "20 : 25" },
                { lhs: "", rhs: "4 : 5" },
                { lhs: "左下 : 右下", rhs: "4 : 5" },
                { lhs: "左下 : 30", rhs: "4 : 5" },
                { lhs: "左下", rhs: "4 / 5 × 30" },
                { lhs: "", rhs: "24" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "如图，矩形 ABCD 中，AB = 8，BC = 6。\n\nE、F 分别是 AD、CD 的中点。连接 BE、CF，它们相交于点 G。\n\n求四边形 DEGF 的面积。",
    fields: [
      {
        key: "area",
        label: "四边形 DEGF 的面积（平方米）",
        type: "number",
      },
    ],
    answer: {
      area: 16,
    },
    hint: "对角乘积相等：12 × 24 = 18 × ? ⇒ ? = 16。",
  },
  tags: ["蝴蝶模型"],
} satisfies ProblemData;
