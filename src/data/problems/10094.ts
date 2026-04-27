import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10094-1.svg?raw";

export default {
  "id": "10094",
  "title": "十字辐射阵·1 到 5",
  "grade": "三年级",
  "module": "杂题",
  "difficulty": "基础",
  "question": "把 1, 2, 3, 4, 5 这 5 个数字各用一次填入如图的十字形 5 个空格中（横行 3 格、竖行 3 格、中间格共用），使得横行 3 个数之和等于竖行 3 个数之和。问：共有多少种可能的相等和 S？请给出其中一种填法，使得该和达到最小值。",
  "figures": [
    {
      "svg": svg1,
      "caption": "十字形 5 个空格",
      "alt": "由 5 个相同方格拼成的十字形，横排 3 格、竖排 3 格、中心格共用"
    }
  ],
  "solutions": [
    {
      "key": "center",
      "label": "中心数法",
      "steps": [
        "分析：设十字中心为 c，横、竖两行外的 4 个格子之和总计 1 + 2 + … + 5 − c = 15 − c。两行之和相加 2S = (15 − c) + 2c = 15 + c，故 c 必为奇数，c ∈ {1, 3, 5}，对应 S = 8、9、10。",
        "每种 c 都能把剩下 4 个数按和相等分成两对：c = 1 → {2, 5} 与 {3, 4}（S = 8）；c = 3 → {1, 5} 与 {2, 4}（S = 9）；c = 5 → {1, 4} 与 {2, 3}（S = 10）。共 3 种 S 值；最小 S = 8 的一种填法是中心 1，横 2, 1, 5、竖 3, 1, 4。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "2S",
              "rhs": "15 + c"
            },
            {
              "lhs": "c 必为奇数",
              "rhs": "c ∈ {1,3,5}"
            },
            {
              "lhs": "对应的 S",
              "rhs": "8, 9, 10",
              "status": "keep"
            }
          ]
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 3,
              "label": "种 S 值"
            },
            {
              "icon": "⬇️",
              "count": 8,
              "label": "最小 S"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "在十字形 5 格中填 1–5，使横行三数和等于竖行三数和。问这个相等和最大是多少？此时中心填几？",
    "fields": [
      {
        "key": "max",
        "label": "最大 S",
        "type": "number"
      },
      {
        "key": "center",
        "label": "中心",
        "type": "number"
      }
    ],
    "answer": {
      "max": 10,
      "center": 5
    },
    "hint": "2S = 15 + c，中心越大和越大；c = 5 时 S = 10，是最大值。"
  },
  "knowledgePoints": [
    {
      "slug": "center-number-method",
      "name": "中心数法",
      "summary": "三阶幻方的中心数 = 幻和 ÷ 3 = 所有数字平均值。",
    },
    {
      "slug": "accumulation-method",
      "name": "累加法",
      "summary": "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
    },
  ],
  "tags": [
    "中心数法",
    "累加法"
  ]
} satisfies ProblemData;
