import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10093-1.svg?raw";

export default {
  "id": "10093",
  "title": "4×4 拉丁方·补全",
  "grade": "四年级",
  "module": "杂题",
  "difficulty": "进阶",
  "question": "在 4 × 4 方格中填入 1, 2, 3, 4 这 4 个数字，要求每行都出现 1, 2, 3, 4 各一次，每列也都出现 1, 2, 3, 4 各一次（这样的表格叫做 4 阶拉丁方）。已知部分方格如下，其余请补全：\n1 2 · 4· · 4 3\n3 4 · ·· · 2 1",
  "figures": [
    {
      "svg": svg1,
      "caption": "已知部分格子的 4×4 拉丁方",
      "alt": "已知 9 个格子的 4×4 拉丁方"
    }
  ],
  "solutions": [
    {
      "key": "logic",
      "label": "唯一确定法",
      "steps": [
        "分析：每行、每列都恰好出现 {1, 2, 3, 4} 各一次，所以每个空格都是「该行缺的数」与「该列缺的数」的交集；若交集只有一个元素即可立即填入。",
        "依次填：(1,3)=3（行唯一）、(4,1)=4（交集唯一）、(4,2)=3（行唯一）、(2,1)=2、(2,2)=1（由第 1 列、第 2 列推），(3,3)=1、(3,4)=2。",
        "最终拉丁方：1 2 3 4 / 2 1 4 3 / 3 4 1 2 / 4 3 2 1。"
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
  "knowledgePoints": [
    {
      "slug": "comparison-method",
      "name": "比较法",
      "summary": "拿两条“和相等”的线作差，公共格子消掉，剩下的格子之间立刻出现一个等式。",
    },
    {
      "slug": "trial-fill",
      "name": "试填法",
      "summary": "在候选集合很小、约束很紧时，按顺序试一个数、推一步，冲突就回退——幻方的兜底通法。",
    },
  ],
  "tags": [
    "比较法",
    "试填法"
  ]
} satisfies ProblemData;
