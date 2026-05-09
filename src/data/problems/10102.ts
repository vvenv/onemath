import svg1 from "./figures/10102-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10102",
  title: "双圆重叠·1 到 9",
  grade: "四年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "两个圆相交。左圆有 5 个位置，右圆有 5 个位置，两圆交集区域共 1 个位置（同时属于两圆）。\n把 1, 2, 3, …, 9 每个数字各填入一个位置，要求左圆 5 数之和与右圆 5 数之和相等。\n请问：交集位置上的数字必须满足什么条件？最大可能的圆和 S 是多少？",
  figures: [
    {
      svg: svg1,
      alt: "两个相交圆，共 9 个位置",
    },
  ],
  solutions: [
    {
      key: "overlap",
      label: "重叠数分析（比较法）",
      steps: [
        {
          text: "分析：设交集位置上的数为 x。把左圆 5 数之和与右圆 5 数之和相加，x 被算了 2 次，其他 8 个数各算 1 次。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "2S", rhs: "45 + x（交集数）" },
                { lhs: "x 必为奇数", rhs: "x ∈ {1, 3, 5, 7, 9}" },
                { lhs: "最大 S", rhs: "27（x = 9）", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "两个相交圆各含 5 格，交集 1 格，共 9 格，填入 1–9 使两圆和相等。问最小的圆和 S 是多少？此时交集填几？",
    fields: [
      {
        key: "min",
        label: "最小 S",
        type: "number",
      },
      {
        key: "overlap",
        label: "交集数",
        type: "number",
      },
    ],
    answer: {
      min: 23,
      overlap: 1,
    },
    hint: "2S = 45 + x，x 越小 S 越小；x 必为奇数，取 x = 1，S = 23。",
  },
  tags: ["累加法", "比较法"],
} satisfies ProblemData;
