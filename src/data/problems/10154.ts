import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10154-1.svg?raw";

export default {
  id: "10154",
  title: "正方形对角线序列·几何数列",
  grade: "五年级",
  module: "几何",
  difficulty: "进阶",
  question:
    "如图，一串正方形的排列规律是：每个正方形的边长都等于前一个正方形的对角线长。已知第一个正方形的边长是1厘米，求第十一个正方形的边长是多少厘米？",
  figures: [
    {
      svg: svg1,
      caption: "正方形序列：每个正方形的边长等于前一个正方形的对角线长",
      alt: "三个正方形：第一个边长1cm，第二个旋转45度边长为第一个的对角线，第三个边长为第二个的对角线",
    },
  ],
  solutions: [
    {
      key: "geometric_sequence",
      label: "几何数列法",
      steps: [
        {
          text: "分析：边长为a的正方形，其对角线长为a√2。因此每个正方形的边长都是前一个的√2倍。",
          scenes: [],
        },
        {
          text: "这是一个等比数列，首项a₁ = 1，公比r = √2。",
          scenes: [],
        },
        {
          text: "第n项公式：aₙ = a₁ × r^(n-1) = 1 × (√2)^(n-1)。",
          scenes: [],
        },
        {
          text: "第11项：a₁₁ = (√2)^10 = (2^(1/2))^10 = 2^5 = 32（厘米）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "对角线 = a√2 (勾股定理)",
                  rhs: "对角线 = a√2",
                },
                {
                  lhs: "公比r (规律)",
                  rhs: "√2",
                },
                {
                  lhs: "首项a₁",
                  rhs: "1（厘米）",
                },
                {
                  lhs: "第n项aₙ",
                  rhs: "a₁ × r^(n-1) = (√2)^(n-1)",
                  status: "keep",
                },
                {
                  lhs: "第11项a₁₁ (结论)",
                  rhs: "(√2)^10 = 2^5 = 32",
                  status: "keep",
                },
              ],
              caption: "利用等比数列公式",
            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "📐",
                  count: 32,
                  label: "第11个正方形边长",
                  note: "厘米",
                },
              ],
              caption: "32厘米",
            },
          ],
        },
      ],
    },
    {
      key: "pattern_recognition",
      label: "规律发现法",
      steps: [
        {
          text: "分析：写出前几项的边长，观察规律：1, √2, 2, 2√2, 4, 4√2, 8, 8√2, 16, 16√2, 32。",
          scenes: [],
        },
        {
          text: "奇数项（第1,3,5,7,9,11个）都是整数：1, 2, 4, 8, 16, 32，每次乘2。",
          scenes: [],
        },
        {
          text: "第11个是奇数项，所以边长 = 1 × 2^5 = 32厘米。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "第1个",
                  rhs: "1",
                },
                {
                  lhs: "第2个",
                  rhs: "1 × √2 = √2",
                },
                {
                  lhs: "第3个",
                  rhs: "√2 × √2 = 2",
                },
                {
                  lhs: "第4个",
                  rhs: "2 × √2 = 2√2",
                },
                {
                  lhs: "第5个",
                  rhs: "2√2 × √2 = 4",
                },
                {
                  lhs: "…",
                  rhs: "…",
                },
                {
                  lhs: "第11个 (结论)",
                  rhs: "32",
                  status: "keep",
                },
              ],
              caption: "逐项计算，发现奇数项每次乘2",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一串正方形的排列规律是：每个正方形的边长都等于前一个正方形的对角线长。已知第一个正方形的边长是2厘米，求第八个正方形的边长是多少厘米？",
    fields: [
      {
        key: "side_length",
        label: "边长（厘米）",
      },
    ],
    answer: {
      side_length: 16,
    },
    hint: "公比仍是√2，第8项 = 2 × (√2)^7 = 2 × 2^(7/2) = 2^(9/2) = 16√2，但注意题目问的是整数项还是带√2的项？第8个是偶数项，所以是16√2。",
  },
  tags: ["勾股定理"],
} satisfies ProblemData;
