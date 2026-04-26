import type { ProblemData } from "@/types/problem";

export default {
  "id": "10026",
  "title": "计算·分组巧算",
  "grade": "三年级",
  "module": "计算",
  "difficulty": "基础",
  "question": "计算：1 − 2 + 3 − 4 + 5 − 6 + ... + 99 − 100",
  "solutions": [
    {
      "key": "grouping",
      "label": "分组法",
      "steps": [
        "算式共 100 项，两两分组：(1−2) + (3−4) + ... + (99−100) = 50 × (−1) = −50。"
      ],
      "scenes": [
        {
          "kind": "number-line",
          "min": -2,
          "max": 4,
          "points": [
            {
              "value": 1,
              "label": "+1",
              "tone": "primary"
            },
            {
              "value": -1,
              "label": "−1",
              "tone": "muted"
            }
          ],
          "segments": [
            {
              "from": 0,
              "to": 1,
              "tone": "primary"
            },
            {
              "from": 1,
              "to": -1,
              "tone": "muted"
            }
          ],
          "caption": "第一组 (1−2)：从 0 出发 → +1 → −1，净走 1 步向左"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "(1 − 2)",
              "rhs": "−1"
            },
            {
              "lhs": "(3 − 4)",
              "rhs": "−1"
            },
            {
              "lhs": "(5 − 6)",
              "rhs": "−1"
            },
            {
              "lhs": "…",
              "rhs": "…"
            },
            {
              "lhs": "(99 − 100)",
              "rhs": "−1",
              "status": "keep"
            }
          ],
          "caption": "两两分组：每组恰好 = −1"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "总项数",
              "value": 100,
              "max": 100,
              "tone": "primary"
            },
            {
              "label": "组数 = 100÷2",
              "value": 50,
              "max": 100,
              "tone": "primary",
              "marker": true
            }
          ],
          "caption": "100 项刚好两两分成 50 组"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧮",
              "count": 100,
              "label": "数字总数"
            },
            {
              "icon": "📦",
              "count": 50,
              "label": "分组数量"
            },
            {
              "icon": "➖",
              "count": -1,
              "label": "每组结果"
            }
          ],
          "separator": "→",
          "caption": "50 组 × (−1) = −50"
        }
      ]
    }
  ],
  "variant": {
    "question": "计算：100 − 99 + 98 − 97 + ... + 2 − 1",
    "fields": [
      {
        "key": "result",
        "label": "计算结果"
      }
    ],
    "answer": {
      "result": 50
    },
    "hint": "也是两两分组，但这次是 (100−99), (98−97) ... 每组的结果是 +1。"
  },
  "tags": [
    "分类讨论"
  ]
} satisfies ProblemData;
