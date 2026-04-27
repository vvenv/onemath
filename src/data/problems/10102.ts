import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10102-1.svg?raw";

export default {
  "id": "10102",
  "title": "双圆重叠·1 到 9",
  "grade": "四年级",
  "module": "杂题",
  "difficulty": "进阶",
  "question": "如图，两个圆相交。左圆有 5 个位置，右圆有 5 个位置，两圆交集区域共 1 个位置（同时属于两圆），所以总共 5 + 5 − 1 = 9 个位置。把 1, 2, 3, …, 9 每个数字各填入一个位置，要求左圆 5 数之和与右圆 5 数之和相等。请问：交集位置上的数字必须满足什么条件？最大可能的圆和 S 是多少？",
  "figures": [
    {
      "svg": svg1,
      "caption": "两个相交圆，共 9 个位置",
      "alt": "双圆相交示意"
    }
  ],
  "solutions": [
    {
      "key": "overlap",
      "label": "重叠数分析（比较法）",
      "steps": [
        "分析：设交集位置上的数为 x。把左圆 5 数之和与右圆 5 数之和相加，x 被算了 2 次，其他 8 个数各算 1 次。",
        "2S = 2x + (所有 9 数之和 − x) = x + 45。",
        "所以 2S = 45 + x，即 x 必须是奇数（才能让 45 + x 为偶数）。x ∈ {1, 3, 5, 7, 9}，对应 S = 23, 24, 25, 26, 27。",
        "最大 S 出现在 x = 9，此时 S = 27；左圆其余 4 数和 = 27 − 9 = 18，右圆其余 4 数和 = 18；从剩下的 {1,…,8} 中可选如 {1,3,6,8}（和 18）、{2,4,5,7}（和 18）分别给左、右 4 个非交集位置。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "2S",
              "rhs": "45 + x（交集数）"
            },
            {
              "lhs": "x 必为奇数",
              "rhs": "x ∈ {1,3,5,7,9}"
            },
            {
              "lhs": "最大 S",
              "rhs": "27（x = 9）",
              "status": "keep"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "两个相交圆各含 5 格，交集 1 格，共 9 格，填入 1–9 使两圆和相等。问最小的圆和 S 是多少？此时交集填几？",
    "fields": [
      {
        "key": "min",
        "label": "最小 S",
        "type": "number"
      },
      {
        "key": "overlap",
        "label": "交集数",
        "type": "number"
      }
    ],
    "answer": {
      "min": 23,
      "overlap": 1
    },
    "hint": "2S = 45 + x，x 越小 S 越小；x 必为奇数，取 x = 1，S = 23。"
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
  ],
  "tags": [
    "累加法",
    "比较法"
  ]
} satisfies ProblemData;
