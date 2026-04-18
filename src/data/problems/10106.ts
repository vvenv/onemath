import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10106-1.svg?raw";

export default {
  id: "10106",
  title: "正方形套阵·1 到 8",
  grade: "五年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "如图，两个正方形一大一小彼此嵌套，共有 8 个顶点（大正方形 4 个、小正方形 4 个）。把 1, 2, 3, 4, 5, 6, 7, 8 这 8 个数字各用一次填入这 8 个顶点，使『大正方形 4 顶点之和』等于『小正方形 4 顶点之和』。\n问：这个相等的和 S 必定等于多少？",
  figures: [
    {
      svg: svg1,
      alt: "嵌套正方形数阵",
    },
  ],
  solutions: [
    {
      key: "sum",
      label: "累加法",
      steps: [
        {
          text: "分析：大、小正方形的 4 + 4 = 8 个顶点互不相同，恰好覆盖了所有 8 个数字。",
          scenes: [],
        },
        {
          text: "计算全部8数之和，再除以2得到相等的和S。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "大 + 小 = 全部 8 数之和",
                  rhs: "36",
                },
                {
                  lhs: "2S",
                  rhs: "36",
                },
                {
                  lhs: "S",
                  rhs: "18",
                  status: "keep",
                },
              ],
            },
          ],
        },
        {
          text: "结论：每个正方形上 4 个顶点数字之和必然等于 18。一种填法：大正方形顶点 {1, 8, 4, 5}（和 18），小正方形顶点 {2, 7, 3, 6}（和 18）。",
          scenes: [],
        },
      ],
    },
  ],
  variant: {
    question:
      "把 1–10 各用一次填在两个嵌套的五边形的 10 个顶点上（大 5 顶点 + 小 5 顶点），要求大五边形顶点和等于小五边形顶点和。该相等和等于多少？",
    fields: [
      {
        key: "sum",
        label: "S",
        type: "number",
      },
    ],
    answer: {
      sum: 27.5,
    },
    hint: "2S = 1+2+…+10 = 55，S = 27.5 —— 不是整数，说明这种填法在『10 数各用一次』下不可能；可证明此分配问题无解（作为答案，可写 55/2 = 27.5 并注明不存在整数分配）。",
  },
  tags: ["累加法", "比较法"],
} satisfies ProblemData;
