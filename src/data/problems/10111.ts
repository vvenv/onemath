import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10111-1.svg?raw";

export default {
  "id": "10111",
  "title": "数阵最值·三角顶点和最大",
  "grade": "五年级",
  "module": "杂题",
  "difficulty": "挑战",
  "question": "把 1, 2, 3, 4, 5, 6 这 6 个数字各用一次，填入三角形的 3 个顶点和 3 条边的中点，使三角形每条边上 3 个数字（两端顶点 + 中点）之和都相等。问：这个公共边和 S 的最大值是多少？此时 3 个顶点上的数字之和等于多少？请给出一种使 S 达到最大的具体填法。",
  "figures": [
    {
      "svg": svg1,
      "caption": "三角形 3 顶点 + 3 边中点 = 6 个位置",
      "alt": "三角形数阵"
    }
  ],
  "solutions": [
    {
      "key": "max",
      "label": "累加法 + 比较法",
      "steps": [
        "分析：顶点各属 2 条边、中点各属 1 条边，三边和相加得 3S = 2V + (21 − V) = V + 21。要 S 最大只需 V 最大且 V + 21 被 3 整除；V 最大 = 4 + 5 + 6 = 15，S = 36/3 = 12。",
        "此时中点来自 {1, 2, 3}，按「12 − 两端顶点」配：4–5 边缺 3、4–6 边缺 2、5–6 边缺 1，正好填完。最大 S = 12，顶点和 V = 15。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "3S",
              "rhs": "V + 21"
            },
            {
              "lhs": "V 最大 = 4+5+6",
              "rhs": "15"
            },
            {
              "lhs": "S 最大",
              "rhs": "12",
              "status": "keep",
              "badge": "最大"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "在相同的三角形 6 格数阵（填 1–6）中，S 的最小可能值是多少？此时 3 个顶点上的数之和 V 是多少？",
    "fields": [
      {
        "key": "min",
        "label": "最小 S",
        "type": "number"
      },
      {
        "key": "vsum",
        "label": "V",
        "type": "number"
      }
    ],
    "answer": {
      "min": 9,
      "vsum": 6
    },
    "hint": "3S = V + 21；V 最小 = 1+2+3 = 6，S = 9。对应边中点 {4,5,6}，每边和 9。"
  },
  "knowledgePoints": [
    {
      "slug": "accumulation-method",
      "name": "累加法",
      "summary": "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
    },
    {
      "slug": "comparison-method",
      "name": "比较法",
      "summary": "拿两条“和相等”的线作差，公共格子消掉，剩下的格子之间立刻出现一个等式。",
    },
    {
      "slug": "case-analysis",
      "name": "分类讨论",
      "summary": "按关键特征把所有情况拆成互不重叠且覆盖全体的几类，逐类计算后相加。",
    },
  ],
  "tags": [
    "累加法",
    "比较法",
    "分类讨论"
  ]
} satisfies ProblemData;
