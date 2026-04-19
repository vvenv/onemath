import type { ProblemData } from "@/types/problem";

export default {
  "id": "10085",
  "title": "三阶幻方·1 到 9 填九宫",
  "grade": "三年级",
  "module": "misc",
  "difficulty": "基础",
  "question": "把 1, 2, 3, 4, 5, 6, 7, 8, 9 这 9 个数字各用一次，填入 3 × 3 方格中，使每一行、每一列以及两条对角线上的三个数之和都相等。问：每行（列、对角线）的三数之和是多少？并给出一种具体的填法。",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180' font-size='14'><g fill='#fdfefe' stroke='#2E86C1'><rect x='30' y='30' width='120' height='120'/><line x1='70' y1='30' x2='70' y2='150'/><line x1='110' y1='30' x2='110' y2='150'/><line x1='30' y1='70' x2='150' y2='70'/><line x1='30' y1='110' x2='150' y2='110'/></g></svg>",
      "caption": "待填的 3×3 九宫格",
      "alt": "空的 3×3 方格"
    }
  ],
  "solutions": [
    {
      "key": "sum",
      "label": "累加法求幻和",
      "steps": [
        "分析：1 到 9 一共 9 个数字恰好占满 9 个方格；3 行（或 3 列）把这 9 个数字不重不漏地全部覆盖一次。",
        "1+2+3+4+5+6+7+8+9 = 45，这就是 9 个数的总和。",
        "把 3 行的和加起来 = 总和 = 45，而 3 行和相等（都等于幻和 S），所以 3S = 45，S = 15。",
        "结论：每一行、每一列、两条对角线上的三数之和都是 15。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1+2+…+9",
              "rhs": "45"
            },
            {
              "lhs": "3 行之和 = 3S",
              "rhs": "45"
            },
            {
              "lhs": "S",
              "rhs": "15",
              "status": "keep",
              "badge": "幻和"
            }
          ]
        }
      ]
    },
    {
      "key": "center",
      "label": "中心数法",
      "steps": [
        "分析：经过中心格的直线有 4 条——一行（中间行）、一列（中间列）、两条对角线。这 4 条线恰好覆盖了：中心格 4 次、其余 8 格各 1 次。",
        "这 4 条线的数字总和 = 4S = 4×15 = 60。",
        "另一方面，这个总和 = 4·（中心）+（其他 8 格之和）= 4·中 +（45−中）= 45 + 3·中。",
        "所以 45 + 3·中 = 60，解得 中 = 5。",
        "接下来，4 个角上的数字两两（关于中心对称）相加必定为 10；类似地 4 条边中点两两相加也为 10。按此给出一种填法：",
        "2 7 6 / 9 5 1 / 4 3 8（斜读四条线均为 15）。"
      ],
      "scenes": [
        {
          "kind": "number-grid",
          "rows": 3,
          "cols": 3,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": 2
            },
            {
              "row": 0,
              "col": 1,
              "value": 7
            },
            {
              "row": 0,
              "col": 2,
              "value": 6
            },
            {
              "row": 1,
              "col": 0,
              "value": 9
            },
            {
              "row": 1,
              "col": 1,
              "value": 5,
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 2,
              "value": 1
            },
            {
              "row": 2,
              "col": 0,
              "value": 4
            },
            {
              "row": 2,
              "col": 1,
              "value": 3
            },
            {
              "row": 2,
              "col": 2,
              "value": 8
            }
          ],
          "caption": "一种满足条件的填法（中心为 5）"
        }
      ]
    }
  ],
  "variant": {
    "question": "在 3×3 的九宫格中填入 1 到 9，每个数字恰用一次，使每行、每列、两条对角线上三个数之和都相等。这个公共和是多少？中心格必须填的数是多少？",
    "fields": [
      {
        "key": "sum",
        "label": "幻和",
        "type": "number"
      },
      {
        "key": "center",
        "label": "中心数",
        "type": "number"
      }
    ],
    "answer": {
      "sum": 15,
      "center": 5
    },
    "hint": "用 1+2+…+9 = 45 除以 3 行即得幻和；再用过中心 4 条直线总和 = 4S = 45+3·中心，反推中心。"
  },
  "tags": [
    "累加法",
    "中心数法"
  ]
} satisfies ProblemData;
