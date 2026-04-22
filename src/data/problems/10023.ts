import type { ProblemData } from "@/types/problem";
import svgV from "./figures/10023-v.svg?raw";

export default {
  "id": "10023",
  "title": "立体图形计数·堆积方块",
  "grade": "六年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "由若干相同的小正方体搭成一个几何体。从上面看是一个 3×3 的正方形（即俯视图 9 格都有方块）；从正面看，左、中、右三列的高度依次为 3、1、2。这个几何体最少由多少个小正方体组成？",
  "solutions": [
    {
      "key": "view-analysis",
      "label": "俯视图标数法",
      "steps": [
        "分析：俯视图 3×3 说明地面 9 格都至少放 1 个，构成地基；正视图给出每一列的最高堆数（左 3、中 1、右 2）。要总数最少，每一列只让其中一格顶到最大高度，其余两格保持高度 1。",
        "逐列求和：左列 3 + 1 + 1 = 5，中列 1 + 1 + 1 = 3，右列 2 + 1 + 1 = 4；总数 5 + 3 + 4 = 12 个。"
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
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 0,
              "col": 1,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 0,
              "col": 2,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 1,
              "col": 0,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 1,
              "col": 1,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 1,
              "col": 2,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 2,
              "col": 0,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 2,
              "col": 1,
              "value": "■",
              "tone": "muted"
            },
            {
              "row": 2,
              "col": 2,
              "value": "■",
              "tone": "muted"
            }
          ],
          "rowLabel": "后 ← → 前",
          "colLabel": "左 ← → 右",
          "caption": "俯视图：3×3 共 9 个位置都有方块（地基）"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "左列最高",
              "value": 3,
              "max": 3,
              "tone": "primary"
            },
            {
              "label": "中列最高",
              "value": 1,
              "max": 3,
              "tone": "muted"
            },
            {
              "label": "右列最高",
              "value": 2,
              "max": 3,
              "tone": "primary"
            }
          ],
          "caption": "正视图：左列=3、中列=1、右列=2（每列的最高堆数）"
        },
        {
          "kind": "number-grid",
          "rows": 3,
          "cols": 3,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": 3,
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 1,
              "value": 1,
              "tone": "default"
            },
            {
              "row": 0,
              "col": 2,
              "value": 2,
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 0,
              "value": 1,
              "tone": "default"
            },
            {
              "row": 1,
              "col": 1,
              "value": 1,
              "tone": "default"
            },
            {
              "row": 1,
              "col": 2,
              "value": 1,
              "tone": "default"
            },
            {
              "row": 2,
              "col": 0,
              "value": 1,
              "tone": "default"
            },
            {
              "row": 2,
              "col": 1,
              "value": 1,
              "tone": "default"
            },
            {
              "row": 2,
              "col": 2,
              "value": 1,
              "tone": "default"
            }
          ],
          "rowLabel": "后 ← → 前",
          "colLabel": "左 ← → 右",
          "caption": "标数：每列只需一个格子达到最大高度（高亮），其余填 1"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧊",
              "count": 5,
              "label": "左列 3+1+1"
            },
            {
              "icon": "🧊",
              "count": 3,
              "label": "中列 1+1+1"
            },
            {
              "icon": "🧊",
              "count": 4,
              "label": "右列 2+1+1"
            }
          ],
          "separator": "+",
          "caption": "按列求和：5 + 3 + 4 = 12"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🔢",
              "count": 12,
              "label": "最少方块数"
            }
          ],
          "caption": "最少需要 12 个小正方体"
        }
      ]
    }
  ],
  "variant": {
    "question": "如果用一些小正方体搭成一个几何体，从正面看是‘田’字形缺左下角，从上面看是‘田’字形，最少需要多少个小正方体？",
    "figures": [
      {
        "svg": svgV,
        "caption": "左：正视图为 2×2 田字缺左下角；右：俯视图为完整 2×2 田字",
        "alt": "正视与俯视图"
      }
    ],
    "fields": [
      {
        "key": "min_blocks",
        "label": "最少数量",
        "type": "number"
      }
    ],
    "answer": {
      "min_blocks": 6
    },
    "hint": "主视图最高处决定了对应列的层数，俯视图决定了底面积。"
  },
  "tags": [
    "标数法"
  ]
} satisfies ProblemData;
