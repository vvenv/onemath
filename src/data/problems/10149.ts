import svg1 from "./figures/10149-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10149",
  title: "转盘指针·几何概型",
  grade: "六年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "一个圆形转盘被平均分成 8 个相等的扇形区域，其中 3 个区域是红色，5 个区域是蓝色。\n\n转动转盘，求指针停在红色区域的概率。",
  figures: [
    {
      svg: svg1,
      alt: "转盘示意图",
    },
  ],
  solutions: [
    {
      key: "geometric",
      label: "几何概型",
      steps: [
        {
          text: "分析：指针停在某个区域的概率 = 该区域面积 ÷ 总面积。由于各扇形大小相等，概率 = 红色区域数 ÷ 总区域数。",
        },
        {
          text: "红色区域有 3 个，总区域有 8 个，所以概率 = 3/8。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "红色区域数 (有利)", rhs: "3" },
                { lhs: "总区域数 (总数)", rhs: "8" },
                { lhs: "停在红色概率", rhs: "3/8", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个圆形转盘被平均分成 10 个相等的扇形区域，其中 4 个区域是黄色，6 个区域是绿色。转动转盘，求指针停在黄色区域的概率。",
    fields: [
      {
        key: "probability",
        label: "停在黄色区域的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "2/5",
    },
    hint: "用黄色区域数除以总区域数计算概率，记得约分。",
  },
  tags: ["几何概型"],
} satisfies ProblemData;
