import type { ProblemData } from "@/types/problem";

export default {
  "id": "10045",
  "title": "位值原理·数字谜",
  "grade": "五年级",
  "module": "数论",
  "difficulty": "进阶",
  "question": "一个两位数，十位数字与个位数字之和为 10。如果把这个两位数的十位数字与个位数字对调，得到的新数比原数大 36。求原来的两位数。",
  "solutions": [
    {
      "key": "place_value",
      "label": "位值原理法",
      "steps": [
        "分析：设原数十位为 a、个位为 b。按位值原理，原数 = 10a + b，对调后 = 10b + a。",
        "由条件 a + b = 10 与 (10b + a) − (10a + b) = 36，后式化简得 b − a = 4。联立两式解出 a = 3, b = 7。",
        "原数为 37，验证：3 + 7 = 10 ✓，73 − 37 = 36 ✓。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "a + b",
              "rhs": "10",
              "status": "keep",
              "badge": "条件1"
            },
            {
              "lhs": "新数 - 原数",
              "rhs": "(10b + a) - (10a + b) = 36",
              "status": "keep"
            },
            {
              "lhs": "⇒",
              "rhs": "9b − 9a = 36",
              "status": "keep"
            },
            {
              "lhs": "⇒",
              "rhs": "b − a = 4",
              "status": "keep",
              "badge": "条件2"
            }
          ],
          "caption": "用位值原理表示两位数，列出方程"
        },
        {
          "kind": "number-grid",
          "rows": 2,
          "cols": 10,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": "十位 a"
            },
            {
              "row": 0,
              "col": 1,
              "value": "个位 b"
            },
            {
              "row": 1,
              "col": 0,
              "value": "3"
            },
            {
              "row": 1,
              "col": 1,
              "value": "7"
            }
          ],
          "rowLabel": "原数",
          "caption": "原数 = 37"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 37,
              "label": "原数"
            },
            {
              "icon": "🔄",
              "count": 73,
              "label": "新数"
            },
            {
              "icon": "✅",
              "count": 36,
              "label": "差值"
            }
          ],
          "caption": "验证：3 + 7 = 10，73 - 37 = 36 ✓"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个两位数，十位数字是个位数字的 2 倍。对调后得到的新数比原数小 36。求原数。",
    "fields": [
      {
        "key": "original",
        "label": "原数"
      }
    ],
    "answer": {
      "original": 84
    },
    "hint": "设个位为 x，则十位为 2x。原数 = 20x + x = 21x，新数 = 12x。"
  },
  "tags": [
    "方程法"
  ]
} satisfies ProblemData;
