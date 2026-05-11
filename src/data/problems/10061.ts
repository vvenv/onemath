import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10061-1.svg?raw";
import svg2 from "./figures/10061-2.svg?raw";

export default {
  id: "10061",
  title: "节目排序·插空法",
  grade: "五年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "学校晚会共有 6 个节目，其中有 2 个是小品。节目单规定：这 2 个小品不能连续出场。\n\n问一共有多少种不同的节目安排顺序？",
  solutions: [
    {
      key: "insert",
      label: "插空法",
      steps: [
        {
          text: "4 个非小品排列 4! = 24，插入 5 个空位选 2 个并排序 5 × 4 = 20，总数 = 24 × 20 = 480 种。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,

              alt: "插空法示意：先排后插",
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "非小品排列", rhs: "4! = 24" },
                {
                  lhs: "小品插入空位 (从 5 个空位里选 2 个并分前后)",
                  rhs: "5 × 4 = 20",
                },
                { lhs: "总排法 (结论)", rhs: "24 × 20 = 480", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "exclude",
      label: "排除法（捆绑反向）",
      steps: [
        {
          text: '分析：也可以反过来数。"小品不连续"的反面是"两个小品连续"。连续问题可以用捆绑处理，再用总数减掉即可。',
          scenes: [
            {
              kind: "svg",
              svg: svg2,
            },
          ],
        },
        {
          text: "6 个节目任意排列共 6! = 720 种。",
        },
        {
          text: "求 2 个小品连续出场的情况：把它们捆成一个大元素，外部 5! = 120 种，内部 2! = 2 种，共 240 种。",
        },
        {
          text: "用总数减去连续情况。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "总排法", rhs: "6! = 720" },
                { lhs: "小品连续", rhs: "5! × 2! = 240" },
                {
                  lhs: "小品不连续 (结论)",
                  rhs: "720 − 240 = 480",
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
      "晚会共 7 个节目，其中 3 个是舞蹈，要求任意两个舞蹈都不相邻，问有多少种节目安排顺序？",
    fields: [
      {
        key: "answer",
        label: "安排数",
        type: "number",
      },
    ],
    answer: {
      answer: 1440,
    },
    hint: "先排 4 个非舞蹈节目 4! = 24，再在产生的 5 个空位中选 3 个插入舞蹈并考虑顺序：5×4×3 = 60；共 24 × 60 = 1440。",
  },
  tags: ["插空法", "排除法", "捆绑法"],
} satisfies ProblemData;
