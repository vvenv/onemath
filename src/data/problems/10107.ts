import svg1 from "./figures/10107-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10107",
  title: "1–6 三角幻形·边和的所有取值",
  grade: "四年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "如图，把 1, 2, 3, 4, 5, 6 这 6 个数字各用一次，填入三角形的 3 个顶点和 3 条边的中点，使三角形每条边上 3 个数字（两端顶点 + 中点）之和都相等。\n\n问：\n\n- 这个公共边和 S 的最大值是多少？\n- 此时 3 个顶点上的数字之和等于多少？\n- 请给出一种使 S 达到最大的具体填法。",
  figures: [
    {
      svg: svg1,
      alt: "三角形六位置数阵示意",
    },
  ],
  solutions: [
    {
      key: "sum-identity",
      label: "累加法 + 分类讨论",
      steps: [
        {
          text: "分析：记 3 个顶点之和为 V，3 个中点之和为 M，则 V + M = 1 + 2 + ⋯ + 6 = 21。\n\n把 3 条边的和加起来，每个顶点被算 2 次、每个中点被算 1 次，所以 3S = 2V + M = V + 21。",
        },
        {
          text: "于是 S = (V + 21) / 3，要求 V 是 3 的倍数；而 V 是从 1–6 中任取 3 个不同数之和，故 V ∈ {6, 9, 12, 15}，对应 S ∈ {9, 10, 11, 12}。下表给出每种 V 的一组合法填法，4 个取值均可达成。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "顶点 {1, 2, 3}", rhs: "中点 {4, 5, 6}，S = 9" },
                { lhs: "顶点 {1, 3, 5}", rhs: "中点 {2, 4, 6}，S = 10" },
                { lhs: "顶点 {2, 4, 6}", rhs: "中点 {1, 3, 5}，S = 11" },
                { lhs: "顶点 {4, 5, 6}", rhs: "中点 {1, 2, 3}，S = 12" },
                {
                  lhs: "S 可能取值",
                  rhs: "9, 10, 11, 12（共 4 个）",
                  status: "keep",
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
      "在同一张图中把 1–6 各填一次，使三边和都相等。问公共和 S 的最小值和最大值分别是多少？",
    fields: [
      {
        key: "min",
        label: "S 最小值",
        type: "number",
      },
      {
        key: "max",
        label: "S 最大值",
        type: "number",
      },
    ],
    answer: {
      min: 9,
      max: 12,
    },
    hint: "由 3S = V + 21，V 取最小 1 + 2 + 3 = 6 时 S = 9，取最大 4 + 5 + 6 = 15 时 S = 12，两端均能给出合法填法。",
  },
  tags: ["累加法", "分类讨论"],
} satisfies ProblemData;
