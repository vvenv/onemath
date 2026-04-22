import type { ProblemData } from "@/types/problem";

export default {
  "id": "10033",
  "title": "枚举法·数字计数",
  "grade": "三年级",
  "module": "计数",
  "difficulty": "基础",
  "question": "用数字 1、2、3 可以组成多少个没有重复数字的两位数？请按从小到大的顺序写出来。",
  "solutions": [
    {
      "key": "enumeration",
      "label": "枚举法",
      "steps": [
        "分析：两位数的十位可在 1、2、3 中任选；十位定下后个位只能从剩下的两个数字里选。按十位从小到大枚举即可。",
        "十位 1 → 12, 13；十位 2 → 21, 23；十位 3 → 31, 32；共 2 + 2 + 2 = 6 个两位数。"
      ],
      "scenes": [
        {
          "kind": "number-grid",
          "rows": 3,
          "cols": 2,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": "12",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 1,
              "value": "13",
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 0,
              "value": "21",
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 1,
              "value": "23",
              "tone": "primary"
            },
            {
              "row": 2,
              "col": 0,
              "value": "31",
              "tone": "primary"
            },
            {
              "row": 2,
              "col": 1,
              "value": "32",
              "tone": "primary"
            }
          ],
          "rowLabel": "十位",
          "colLabel": "个位选择",
          "caption": "十位分别为 1、2、3 时的所有两位数"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 6,
              "label": "总共可以组成"
            }
          ],
          "caption": "12, 13, 21, 23, 31, 32 共 6 个两位数"
        }
      ]
    },
    {
      "key": "multiplication",
      "label": "乘法原理",
      "steps": [
        "把组成两位数看作两步完成：先定十位，再定个位。",
        "第一步，十位从 1、2、3 中任选一个，有 3 种选法。",
        "第二步，十位用掉一个数字后，个位只能从剩下的 2 个数字中选，有 2 种选法。",
        "根据乘法原理，总数 = 3 × 2 = 6（个）。"
      ],
      "scenes": [
        {
          "kind": "number-grid",
          "rows": 2,
          "cols": 3,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": "1",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 1,
              "value": "2",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 2,
              "value": "3",
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 0,
              "value": "2",
              "tone": "accent"
            },
            {
              "row": 1,
              "col": 1,
              "value": "2",
              "tone": "accent"
            },
            {
              "row": 1,
              "col": 2,
              "value": "2",
              "tone": "accent"
            }
          ],
          "rowLabel": "数位",
          "colLabel": "选法数",
          "caption": "十位有 3 种选法，每种之下个位都还剩 2 种选法"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "十位选法",
              "rhs": "3 种",
              "note": "从 1、2、3 中任选 1 个"
            },
            {
              "lhs": "个位选法",
              "rhs": "2 种",
              "note": "从剩下的 2 个数字中任选 1 个"
            },
            {
              "lhs": "总数",
              "rhs": "3 × 2 = 6（个）",
              "status": "keep"
            }
          ],
          "caption": "按乘法原理把两步的选法数相乘"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "✖️",
              "count": 6,
              "label": "3 × 2"
            }
          ],
          "caption": "和枚举法得到的结果一致"
        }
      ]
    }
  ],
  "variant": {
    "question": "用数字 0、2、5 可以组成多少个没有重复数字的两位数？",
    "fields": [
      {
        "key": "count",
        "label": "个数"
      }
    ],
    "answer": {
      "count": 4
    },
    "hint": "注意：十位不能是 0。"
  },
  "tags": ["枚举法"]
} satisfies ProblemData;
