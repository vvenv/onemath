import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10109-1.svg?raw";

export default {
  "id": "10109",
  "title": "不等号数阵·3×3 排列",
  "grade": "五年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "把 1, 2, 3 这 3 个数字填入 3×3 方格，使每行、每列都恰好出现 1, 2, 3 各一次（即 3 阶拉丁方）。此外还要满足以下 5 条不等号约束：(1) (1,1) < (1,2)(2) (2,1) > (2,2)(3) (3,2) < (3,3)(4) (1,3) > (2,3)(5) (2,2) > (3,2)\n请给出满足上述所有条件的填法（可以证明此填法唯一）。",
  "figures": [
    {
      "svg": svg1,
      "caption": "3×3 方格及 5 条不等号约束位置（&lt;, &gt; 为行方向；∨ 为列方向，尖端指向较小者）",
      "alt": "含不等号的数阵"
    }
  ],
  "solutions": [
    {
      "key": "chain",
      "label": "串联不等号，逐格推出",
      "steps": [
        "分析：把方格记作 a b c / d e f / g h i。约束 (2) d > e 与 (5) e > h 可串成 d > e > h；d、e、h 三数都取自 {1, 2, 3}，所以只能 d = 3, e = 2, h = 1——这是突破口。",
        "按拉丁方规则逐格推：第 2 列 {e, h, ?} ⇒ b = 3；第 2 行 ⇒ f = 1；第 3 行剩 {g, i} = {2, 3}，但第 1 列已有 d = 3，故 g = 2, i = 3；第 1 行 a ≠ 2, 3，得 a = 1, c = 2。",
        "验证剩余 (1)(3)(4) 成立，唯一解 1 3 2 / 3 2 1 / 2 1 3。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "d > e > h",
              "rhs": "d=3, e=2, h=1",
              "badge": "①",
              "note": "三数取自 {1,2,3}"
            },
            {
              "lhs": "第 2 列：{e=2, h=1, b}",
              "rhs": "b=3",
              "badge": "②"
            },
            {
              "lhs": "第 2 行：{d=3, e=2, f}",
              "rhs": "f=1",
              "badge": "③"
            },
            {
              "lhs": "第 3 行：{g, h=1, i}，第 1 列禁 3",
              "rhs": "g=2, i=3",
              "badge": "④"
            },
            {
              "lhs": "第 1 行：{a, b=3, c}，第 1 列禁 3,2",
              "rhs": "a=1, c=2",
              "badge": "⑤"
            }
          ],
          "caption": "沿着 d>e>h 串联推理，逐步确定每一格"
        },
        {
          "kind": "number-grid",
          "rows": 3,
          "cols": 3,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": 1
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
              "row": 1,
              "col": 0,
              "value": 3,
              "tone": "primary"
            },
            {
              "row": 1,
              "col": 1,
              "value": 2,
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
              "value": 2
            },
            {
              "row": 2,
              "col": 1,
              "value": 1,
              "tone": "primary"
            },
            {
              "row": 2,
              "col": 2,
              "value": 3
            }
          ],
          "caption": "唯一解（高亮格为突破口 d=3, e=2, h=1）"
        }
      ]
    },
    {
      "key": "enum",
      "label": "按第 1 行分类枚举",
      "steps": [
        "分析：3 阶拉丁方共 12 种，由第 1 行（6 种）× 第 2 行（2 种错位延拓）组合。用约束 (1) a < b 把候选的第 1 行砍到 (1,2,3)、(1,3,2)、(2,3,1) 三种，共 6 个拉丁方待检。",
        "对 6 个候选逐一验（详见 scenes 的 statement-table），仅 ④ 1 3 2 / 3 2 1 / 2 1 3 全部满足约束；与串联法结论一致。"
      ],
      "scenes": [
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "编号",
            "claim": "方格（行 / 行 / 行）",
            "badge": "判定"
          },
          "rows": [
            {
              "speaker": "①",
              "claim": "123 / 231 / 312",
              "badge": "(2): 2>3 ✗",
              "verdict": "false"
            },
            {
              "speaker": "②",
              "claim": "123 / 312 / 231",
              "badge": "(3): 3<1 ✗",
              "verdict": "false"
            },
            {
              "speaker": "③",
              "claim": "132 / 213 / 321",
              "badge": "(3): 2<1 ✗",
              "verdict": "false"
            },
            {
              "speaker": "④",
              "claim": "132 / 321 / 213",
              "badge": "全部满足 ✓",
              "verdict": "true",
              "highlight": "target"
            },
            {
              "speaker": "⑤",
              "claim": "231 / 123 / 312",
              "badge": "(2): 1>2 ✗",
              "verdict": "false"
            },
            {
              "speaker": "⑥",
              "claim": "231 / 312 / 123",
              "badge": "(4): 1>2 ✗",
              "verdict": "false"
            }
          ],
          "caption": "6 种候选拉丁方的逐一排查"
        }
      ]
    }
  ],
  "variant": {
    "question": "把 1, 2, 3 填入 2×3 方格，使每行恰好出现 1, 2, 3 各一次；要求 (1,1) < (1,2) < (1,3) 且 (2,1) > (2,2) > (2,3)。请写出第 2 行从左到右的数字（用空格分隔）。",
    "fields": [
      {
        "key": "row2",
        "label": "第 2 行",
        "type": "text",
        "placeholder": "如 3 2 1"
      }
    ],
    "answer": {
      "row2": "3 2 1"
    },
    "hint": "第 1 行唯一升序 1 2 3；第 2 行唯一降序 3 2 1。"
  },
  "tags": [
    "枚举法",
    "分类讨论",
    "排除法"
  ]
} satisfies ProblemData;
