import type { ProblemData } from "@/types/problem";

export default {
  "id": "10088",
  "title": "四阶幻方·1 到 16 填 4×4",
  "grade": "四年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "把 1, 2, 3, …, 16 这 16 个数字各用一次，填入 4 × 4 方格中，使每一行、每一列、两条对角线上四个数之和都相等。求这个公共和（幻和）。",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' font-size='14'><g fill='#fdfefe' stroke='#2E86C1'><rect x='20' y='20' width='160' height='160'/><line x1='60' y1='20' x2='60' y2='180'/><line x1='100' y1='20' x2='100' y2='180'/><line x1='140' y1='20' x2='140' y2='180'/><line x1='20' y1='60' x2='180' y2='60'/><line x1='20' y1='100' x2='180' y2='100'/><line x1='20' y1='140' x2='180' y2='140'/></g></svg>",
      "caption": "空的 4×4 方格，用 1–16 填入",
      "alt": "空的 4×4 方格"
    }
  ],
  "solutions": [
    {
      "key": "sum",
      "label": "累加法",
      "steps": [
        "分析：4 行合在一起恰好覆盖 1 到 16 每个数字一次，所以 4 行之和就是 1 + 2 + … + 16。",
        "1 + 2 + … + 16 = (1+16) × 16 / 2 = 136（首尾配对）。",
        "设幻和为 S，则 4S = 136，得 S = 34。",
        "结论：四阶幻方的幻和为 34。一个经典填法（丢勒幻方）：\n16  3  2 13 /  5 10 11  8 /  9  6  7 12 /  4 15 14  1。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1+2+…+16",
              "rhs": "(1+16)·16/2 = 136"
            },
            {
              "lhs": "4S",
              "rhs": "136"
            },
            {
              "lhs": "S",
              "rhs": "34",
              "status": "keep",
              "badge": "幻和"
            }
          ]
        },
        {
          "kind": "number-grid",
          "rows": 4,
          "cols": 4,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": 16
            },
            {
              "row": 0,
              "col": 1,
              "value": 3
            },
            {
              "row": 0,
              "col": 2,
              "value": 2
            },
            {
              "row": 0,
              "col": 3,
              "value": 13
            },
            {
              "row": 1,
              "col": 0,
              "value": 5
            },
            {
              "row": 1,
              "col": 1,
              "value": 10
            },
            {
              "row": 1,
              "col": 2,
              "value": 11
            },
            {
              "row": 1,
              "col": 3,
              "value": 8
            },
            {
              "row": 2,
              "col": 0,
              "value": 9
            },
            {
              "row": 2,
              "col": 1,
              "value": 6
            },
            {
              "row": 2,
              "col": 2,
              "value": 7
            },
            {
              "row": 2,
              "col": 3,
              "value": 12
            },
            {
              "row": 3,
              "col": 0,
              "value": 4
            },
            {
              "row": 3,
              "col": 1,
              "value": 15
            },
            {
              "row": 3,
              "col": 2,
              "value": 14
            },
            {
              "row": 3,
              "col": 3,
              "value": 1
            }
          ],
          "caption": "经典丢勒幻方（每行/列/对角线和 = 34）"
        }
      ]
    }
  ],
  "variant": {
    "question": "把 1 到 16 每个数字用一次填入 4×4 幻方。每一行（4 个数）的和是多少？每一列呢？",
    "fields": [
      {
        "key": "row",
        "label": "每行和",
        "type": "number"
      },
      {
        "key": "col",
        "label": "每列和",
        "type": "number"
      }
    ],
    "answer": {
      "row": 34,
      "col": 34
    },
    "hint": "1+2+…+16 = 136，4 行等和，各为 34；列也同理。"
  },
  "tags": [
    "累加法",
    "首尾配对"
  ]
} satisfies ProblemData;
