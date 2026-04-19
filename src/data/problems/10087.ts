import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10087-1.svg?raw";

export default {
  "id": "10087",
  "title": "补全三阶幻方",
  "grade": "四年级",
  "module": "misc",
  "difficulty": "基础",
  "question": "下面是一个未填完的 3 × 3 幻方，所填数字取自 1–9 且每个数字只用一次，要求每行、每列、两条对角线上三数之和都相等。已知部分格子如下，请把其余格子填完。",
  "figures": [
    {
      "svg": svg1,
      "caption": "已知 4 个格子的三阶幻方",
      "alt": "部分已填三阶幻方"
    }
  ],
  "solutions": [
    {
      "key": "compare",
      "label": "比较法（逐格推出）",
      "steps": [
        "分析：1–9 合计 45，3 行等和，故幻和 S = 15。已知对角线上两格 6、5 和一角 4，加上 5 又在中心，这与标准三阶幻方（中心必为 5）一致。下面沿“每行/列/对角线和 = 15”逐格推出。",
        "主对角线 (左上—中—右上=6 所在对角) ：左上 + 5 + 6 = 15 → 左上 = 4。但 4 已被左下占用。说明 6 所在对角线其实是右上—中—左下：6 + 5 + 4 = 15 ✓。",
        "第二行已知 5、1，所以最左为 15 − 5 − 1 = 9。",
        "第三列已知 6、1，所以最下为 15 − 6 − 1 = 8。",
        "第三行已知 4、8，所以中间为 15 − 4 − 8 = 3。",
        "第二列已知 5、3，所以最上为 15 − 5 − 3 = 7。",
        "第一行已知 7、6，所以最左为 15 − 7 − 6 = 2。",
        "填完整局：2 7 6 / 9 5 1 / 4 3 8。"
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
              "value": 2,
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 1,
              "value": 7,
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 2,
              "value": 6
            },
            {
              "row": 1,
              "col": 0,
              "value": 9,
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 1,
              "value": 5
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
              "value": 3,
              "tone": "primary"
            },
            {
              "row": 2,
              "col": 2,
              "value": 8,
              "tone": "primary"
            }
          ],
          "caption": "标蓝为推出的新数"
        }
      ]
    }
  ],
  "variant": {
    "question": "在三阶幻方 1–9 中，已知右上角是 2，中心是 5。请问：左下角是几？幻和是几？",
    "fields": [
      {
        "key": "bl",
        "label": "左下角",
        "type": "number"
      },
      {
        "key": "sum",
        "label": "幻和",
        "type": "number"
      }
    ],
    "answer": {
      "bl": 8,
      "sum": 15
    },
    "hint": "幻和=15；关于中心对称的两格之和恒等于 2×中心 = 10，所以与右上角 2 对称的左下角 = 10 − 2 = 8。"
  },
  "tags": [
    "比较法",
    "累加法"
  ]
} satisfies ProblemData;
