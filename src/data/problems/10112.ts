import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10112-1.svg?raw";

export default {
  "id": "10112",
  "title": "四组 2×2 子方和相等·最小值",
  "grade": "六年级",
  "module": "杂题",
  "difficulty": "挑战",
  "question": "在一个 3 × 3 方格中填入 1 到 9 各一次。方格中含有 4 个 2 × 2 的子方格（左上、右上、左下、右下），每个子方格都包含 4 个格子。要求这 4 个 2 × 2 子方格内 4 数之和都相等，记为 S。问：S 的最小可能值是多少？请给出一种使 S 达到最小的具体填法。",
  "figures": [
    {
      "svg": svg1,
      "caption": "3×3 方格（含 4 个 2×2 子方）",
      "alt": "3×3 方格"
    }
  ],
  "solutions": [
    {
      "key": "formula",
      "label": "累加法推出下界",
      "steps": [
        "分析：按位置把 4 个 2×2 子方相加得 4S，每格被算的次数恰好是：中心 4 次、4 条边中各 2 次、4 个角各 1 次。设中心为 c、边中 4 数之和为 E，则 角和 = 45 − c − E，故 4S = 4c + (45 − c − E) + 2E = 45 + 3c + E。",
        "要 4S 为 4 倍数：45 + 3c + E ≡ 0 (mod 4)，即 3c + E ≡ 3 (mod 4)。为使 S 最小就让 3c + E 最小：取 c = 1 时需 E ≡ 0 (mod 4)，从 {2..9} 中取 4 个数且和为 4 的倍数的最小值是 2 + 3 + 4 + 7 = 16，得 4S = 45 + 3 + 16 = 64，S = 16。",
        "具体存在性：取 c = 1、边中 {2, 3, 4, 7}、角 {5, 6, 8, 9}，按相邻 2×2 差为 0 的配对方程枚举出一组填法：5 3 8 / 7 1 4 / 6 2 9，四个子方皆为 16 ✓。",
        "结论：S 的最小可能值为 16。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "4S",
              "rhs": "45 + 3c + E"
            },
            {
              "lhs": "c = 1 ⇒ E ≡ 0 (mod 4)",
              "rhs": "最小 E = 2+3+4+7 = 16"
            },
            {
              "lhs": "4S",
              "rhs": "64 ⇒ S = 16",
              "status": "keep",
              "badge": "最小"
            }
          ]
        },
        {
          "kind": "number-grid",
          "rows": 3,
          "cols": 3,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": 5
            },
            {
              "row": 0,
              "col": 1,
              "value": 3
            },
            {
              "row": 0,
              "col": 2,
              "value": 8
            },
            {
              "row": 1,
              "col": 0,
              "value": 7
            },
            {
              "row": 1,
              "col": 1,
              "value": 1,
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 2,
              "value": 4
            },
            {
              "row": 2,
              "col": 0,
              "value": 6
            },
            {
              "row": 2,
              "col": 1,
              "value": 2
            },
            {
              "row": 2,
              "col": 2,
              "value": 9
            }
          ],
          "caption": "一种达到 S = 16 的填法（中心 = 1）"
        }
      ]
    }
  ],
  "variant": {
    "question": "在 3×3 方格中填入 1–9 各一次，使 4 个 2×2 子方的和都相等。S 的最大可能值是多少？请给出中心格填的数。",
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
      "max": 24,
      "center": 9
    },
    "hint": "由 4S = 45 + 3c + E，c 最大取 9；此时 E ≡ 0 (mod 4)，从 {1..8} 中取 4 个数，和最大且是 4 倍数的为 3+6+7+8 = 24，4S = 45+27+24 = 96，S = 24。可验证填法 5 3 4 / 7 9 8 / 2 6 1 满足（各子方均 = 24）。"
  },
  "tags": [
    "累加法",
    "比较法",
    "分类讨论"
  ]
} satisfies ProblemData;
