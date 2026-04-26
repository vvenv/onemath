import type { ProblemData } from "@/types/problem";

export default {
  "id": "10168",
  "title": "分数与小数混合运算·裂项法",
  "grade": "五年级",
  "module": "计算",
  "difficulty": "进阶",
  "question": "计算：1/2 + 1/6 + 1/12 + 1/20 + 1/30",
  "solutions": [
    {
      "key": "splitting",
      "label": "裂项法",
      "steps": [
        "分析：分母都是连续两个自然数的乘积，用裂项公式 1/(n×(n+1)) = 1/n − 1/(n+1)。",
        "原式 = (1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) + (1/4 − 1/5) + (1/5 − 1/6) = 1 − 1/6 = 5/6。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1/2",
              "rhs": "1 − 1/2"
            },
            {
              "lhs": "1/6",
              "rhs": "1/2 − 1/3"
            },
            {
              "lhs": "1/12",
              "rhs": "1/3 − 1/4"
            },
            {
              "lhs": "1/20",
              "rhs": "1/4 − 1/5"
            },
            {
              "lhs": "1/30",
              "rhs": "1/5 − 1/6"
            }
          ],
          "caption": "裂项变形"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "原式",
              "rhs": "1 − 1/2 + 1/2 − 1/3 + 1/3 − 1/4 + 1/4 − 1/5 + 1/5 − 1/6"
            },
            {
              "lhs": "",
              "rhs": "= 1 − 1/6",
              "status": "keep"
            },
            {
              "lhs": "",
              "rhs": "= 5/6",
              "status": "keep"
            }
          ],
          "caption": "中间项抵消"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": "5/6"
            }
          ],
          "caption": "计算结果为 5/6"
        }
      ]
    },
    {
      "key": "common",
      "label": "通分法",
      "steps": [
        "公分母为 60，将各分数转换后相加。",
        "原式 = 30/60 + 10/60 + 5/60 + 3/60 + 2/60 = 50/60 = 5/6。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1/2",
              "rhs": "30/60"
            },
            {
              "lhs": "1/6",
              "rhs": "10/60"
            },
            {
              "lhs": "1/12",
              "rhs": "5/60"
            },
            {
              "lhs": "1/20",
              "rhs": "3/60"
            },
            {
              "lhs": "1/30",
              "rhs": "2/60"
            },
            {
              "lhs": "总和",
              "rhs": "50/60 = 5/6",
              "status": "keep"
            }
          ],
          "caption": "通分计算"
        }
      ]
    }
  ],
  "variant": {
    "question": "计算：1/1×2 + 1/2×3 + 1/3×4 + ... + 1/9×10",
    "fields": [
      {
        "key": "result",
        "label": "计算结果（分数）"
      }
    ],
    "answer": {
      "result": "9/10"
    },
    "hint": "利用裂项公式 1/(n×(n+1)) = 1/n − 1/(n+1)，中间项会相互抵消。"
  },
  "tags": [
    "裂项法",
    "分数运算"
  ]
} satisfies ProblemData;
