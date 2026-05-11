import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10006-1.svg?raw";

export default {
  id: "10006",
  title: "棋盘上的线段·计数最值",
  grade: "六年级",
  difficulty: "挑战",
  module: "计数",
  question:
    "在一个由 4 × 4 个边长为1厘米的小正方形组成的方格棋盘上，连接两个不同的格点，可以画出多少条长度为整厘米数的线段？（格点是指方格的顶点）",
  figures: [{ svg: svg1, alt: "4×4 棋盘，5×5 格点" }],
  solutions: [
    {
      key: "classification",
      label: "分类计数法",
      steps: [
        {
          text: "先找出所有可能的整数长度：水平/垂直方向有 1,2,3,4 四种；斜向只有 3-4-5 直角三角形一种。",
        },
        {
          text: "水平/垂直方向每种长度可以横着放和竖着放，所以乘以 2。",
        },
        {
          text: "水平方向每行有 (5−L) 种起始位置，5 行共 5(5−L) 种。",
        },
        {
          text: "加上竖直方向，总数为 2·5(5−L)。",
        },
        {
          text: "代入公式计算：L=1 得 40 条，L=2 得 30 条，L=3 得 20 条，L=4 得 10 条。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "L=1", rhs: "2·(5−1)·5 = 40" },
                { lhs: "L=2", rhs: "2·(5−2)·5 = 30" },
                { lhs: "L=3", rhs: "2·(5−3)·5 = 20" },
                { lhs: "L=4", rhs: "2·(5−4)·5 = 10" },
              ],
              note: "系数 2 来自横竖两个方向",
            },
          ],
        },
        {
          text: "斜向 3-4-5 只有两个方向（↘和↙），起始位置有 (5−3)(5−4)=2 种，共 2·2=4 条。",
          scenes: [
            {
              kind: "equation-list",
              rows: [{ lhs: "L=5 (斜向)", rhs: "2·(5−3)(5−4) = 4" }],
              note: "3-4-5 直角三角形，两个斜向",
            },
          ],
        },
        {
          text: "合计：40 + 30 + 20 + 10 + 4 = 104 条。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "L=1", value: 40, max: 104, tone: "primary" },
                { label: "L=2", value: 30, max: 104, tone: "muted" },
                { label: "L=3", value: 20, max: 104, tone: "muted" },
                { label: "L=4", value: 10, max: 104, tone: "muted" },
                { label: "L=5", value: 4, max: 104, tone: "muted" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "enumeration",
      label: "方向枚举法",
      steps: [
        {
          text: "用方向向量 (dx, dy) 表示线段方向，长度 L = √(dx²+dy²)。",
        },
        {
          text: "枚举所有 dx, dy ∈ {0,1,2,3,4} 且不全为 0 的组合，检查哪些 L 是整数。",
        },
        {
          text: "整数长只有：轴向 (1,0)/(0,1) 给 L=1~4；斜向只有 (3,4)/(4,3) 给 L=5；其余如 (1,1)=√2、(1,2)=√5、(2,2)=√8 都是非整数。",
        },
        {
          text: "方向 (dx, dy) 的线段有 (5−dx)(5−dy) 个起始位置，对称方向乘以 2。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "L=1 (水平/垂直)", rhs: "2·(5−1)·5 = 40" },
                { lhs: "L=2", rhs: "2·(5−2)·5 = 30" },
                { lhs: "L=3", rhs: "2·(5−3)·5 = 20" },
                { lhs: "L=4", rhs: "2·(5−4)·5 = 10" },
                { lhs: "L=5 (3-4-5 斜向)", rhs: "2·(5−3)(5−4) = 4" },
              ],
              note: "起始位置数 = (5−dx)(5−dy)，对称方向乘 2",
            },
          ],
        },
        {
          text: "汇总：40 + 30 + 20 + 10 + 4 = 104 条。",
        },
      ],
    },
  ],
  variant: {
    question:
      "在一个 3 × 3 的点阵（共 4 × 4 = 16 个点）中，连接两个点，可以画出多少条长度大于2的线段？",
    fields: [
      {
        key: "total_segments",
        label: "线段总数",
      },
    ],
    answer: {
      total_segments: 30,
    },
    hint: "先找出所有可能的整数长度（L=3, L=4, L=5...），然后按方向向量 (dx, dy) 分类计算。",
  },
  tags: ["分类讨论", "枚举法", "勾股定理"],
} satisfies ProblemData;
