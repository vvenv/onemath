import type { ProblemData } from "@/types/problem";

export default {
  "id": "10093",
  "title": "4×4 拉丁方·补全",
  "grade": "四年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "在 4 × 4 方格中填入 1, 2, 3, 4 这 4 个数字，要求每行都出现 1, 2, 3, 4 各一次，每列也都出现 1, 2, 3, 4 各一次（这样的表格叫做 4 阶拉丁方）。已知部分方格如下，其余请补全：\n1 2 · 4· · 4 3\n3 4 · ·· · 2 1",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220' font-size='16'><g fill='#fdfefe' stroke='#2E86C1'><rect x='20' y='20' width='180' height='180'/><line x1='65' y1='20' x2='65' y2='200'/><line x1='110' y1='20' x2='110' y2='200'/><line x1='155' y1='20' x2='155' y2='200'/><line x1='20' y1='65' x2='200' y2='65'/><line x1='20' y1='110' x2='200' y2='110'/><line x1='20' y1='155' x2='200' y2='155'/></g><g fill='#1B4F72' text-anchor='middle'><text x='42' y='50'>1</text><text x='87' y='50'>2</text><text x='177' y='50'>4</text><text x='132' y='95'>4</text><text x='177' y='95'>3</text><text x='42' y='140'>3</text><text x='87' y='140'>4</text><text x='132' y='185'>2</text><text x='177' y='185'>1</text></g></svg>",
      "caption": "已知部分格子的 4×4 拉丁方",
      "alt": "已知 9 个格子的 4×4 拉丁方"
    }
  ],
  "solutions": [
    {
      "key": "logic",
      "label": "唯一确定法",
      "steps": [
        "分析：每行含 {1,2,3,4} 各一次，每列同样如此；根据『行缺哪个数』与『列缺哪个数』的交集可逐格唯一确定。",
        "第 1 行已知 1, 2, 4，缺 3，其空格在第 3 列，故 (1,3)=3。",
        "第 4 行已知 2, 1，缺 3, 4；第 1 列已知 1, 3，缺 2, 4；所以 (4,1) 必为 4（取两者交集）。",
        "第 4 行余下空在第 2 列，必为 3；即 (4,2)=3。",
        "第 2 行已知 4, 3，缺 1, 2；第 1 列已确定 1, 3, 4，缺 2；故 (2,1)=2；(2,2)=1。",
        "第 3 行已知 3, 4，缺 1, 2；第 3 列已确定 3, 4, 2，缺 1，故 (3,3)=1；(3,4)=2。",
        "最终填完：\n1 2 3 4 / 2 1 4 3 / 3 4 1 2 / 4 3 2 1。"
      ],
      "scenes": [
        {
          "kind": "number-grid",
          "rows": 4,
          "cols": 4,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": 1
            },
            {
              "row": 0,
              "col": 1,
              "value": 2
            },
            {
              "row": 0,
              "col": 2,
              "value": 3,
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 3,
              "value": 4
            },
            {
              "row": 1,
              "col": 0,
              "value": 2,
              "tone": "primary"
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
              "row": 1,
              "col": 3,
              "value": 3
            },
            {
              "row": 2,
              "col": 0,
              "value": 3
            },
            {
              "row": 2,
              "col": 1,
              "value": 4
            },
            {
              "row": 2,
              "col": 2,
              "value": 1,
              "tone": "primary"
            },
            {
              "row": 2,
              "col": 3,
              "value": 2,
              "tone": "primary"
            },
            {
              "row": 3,
              "col": 0,
              "value": 4,
              "tone": "primary"
            },
            {
              "row": 3,
              "col": 1,
              "value": 3,
              "tone": "primary"
            },
            {
              "row": 3,
              "col": 2,
              "value": 2
            },
            {
              "row": 3,
              "col": 3,
              "value": 1
            }
          ],
          "caption": "标蓝为推出的格子"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个 3 × 3 拉丁方（每行每列都恰好是 1, 2, 3 各一次）中，(1,1)=2, (2,2)=3。请把 (3,3) 填出来。",
    "fields": [
      {
        "key": "cell",
        "label": "(3,3)",
        "type": "number"
      }
    ],
    "answer": {
      "cell": 1
    },
    "hint": "对角线位置确定后，利用行列每个数字各出现一次，逐格推出即可。最终三阶拉丁方为 2 1 3 / 1 3 2 / 3 2 1（或镜像）。"
  },
  "tags": [
    "比较法",
    "试填法"
  ]
} satisfies ProblemData;
