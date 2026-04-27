import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10085-1.svg?raw";

export default {
  "id": "10085",
  "title": "三阶幻方·1 到 9 填九宫",
  "grade": "三年级",
  "module": "杂题",
  "difficulty": "基础",
  "question": "把 1, 2, 3, 4, 5, 6, 7, 8, 9 这 9 个数字各用一次，填入 3 × 3 方格中，使每一行、每一列以及两条对角线上的三个数之和都相等。问：每行（列、对角线）的三数之和是多少？并给出一种具体的填法。",
  "figures": [
    {
      "svg": svg1,
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
        "分析：过中心的 4 条线（中行、中列、两对角）共 4S = 60。每条都含中心格，其余 8 格各算 1 次，所以 4S = 4·中 + (45 − 中) = 45 + 3·中；45 + 3·中 = 60 ⇒ 中 = 5。",
        "以 5 为中心，关于其对称的一对角或一对边中之和必为 10。按此可得一种填法 2 7 6 / 9 5 1 / 4 3 8（每行、列、对角和均为 15）。"
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
  "knowledgePoints": [
    {
      "slug": "accumulation-method",
      "name": "累加法",
      "summary": "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
    },
    {
      "slug": "center-number-method",
      "name": "中心数法",
      "summary": "三阶幻方的中心数 = 幻和 ÷ 3 = 所有数字平均值。",
    },
  ],
  "tags": [
    "累加法",
    "中心数法"
  ]
} satisfies ProblemData;
