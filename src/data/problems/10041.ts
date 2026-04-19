import type { ProblemData } from "@/types/problem";

export default {
  "id": "10041",
  "title": "整除特征·数字谜",
  "grade": "五年级",
  "module": "numberTheory",
  "difficulty": "进阶",
  "question": "在四位数 2A7B 中，A、B 各代表一个数字。已知这个四位数能同时被 3 和 5 整除，求 A + B 的最大值。",
  "solutions": [
    {
      "key": "rule",
      "label": "整除特征分析法",
      "steps": [
        "能被 5 整除的特征：个位是 0 或 5。所以 B = 0 或 B = 5。",
        "能被 3 整除的特征：各位数字之和能被 3 整除。",
        "数字和为 2 + A + 7 + B = 9 + A + B。",
        "因为 9 已经是 3 的倍数，所以 A + B 必须是 3 的倍数。",
        "情况1：B = 0，A + 0 是 3 的倍数，A 最大取 9（9 是 3 的倍数）。此时 A + B = 9。",
        "情况2：B = 5，A + 5 是 3 的倍数，A 最大取 7（7+5=12 是 3 的倍数）。此时 A + B = 12。",
        "比较两种情况，最大值为 12。"
      ],
      "scenes": [
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "B",
            "claim": "条件",
            "verdict": "A+B是3的倍数"
          },
          "rows": [
            {
              "speaker": "0",
              "claim": "个位为0",
              "verdict": "true",
              "badge": "A最大=9"
            },
            {
              "speaker": "5",
              "claim": "个位为5",
              "verdict": "true",
              "badge": "A最大=7"
            }
          ],
          "caption": "能被 5 整除：个位 B = 0 或 5"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "数字和",
              "rhs": "2 + A + 7 + B = 9 + A + B",
              "status": "keep"
            },
            {
              "lhs": "B = 0 时",
              "rhs": "A + 0 是 3 的倍数 → A最大 = 9",
              "status": "keep",
              "badge": "A+B=9"
            },
            {
              "lhs": "B = 5 时",
              "rhs": "A + 5 是 3 的倍数 → A最大 = 7",
              "status": "keep",
              "badge": "A+B=12"
            }
          ],
          "caption": "分别讨论两种情况，求 A + B 的最大值"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": "2970",
              "label": "B=0 时的最大数"
            },
            {
              "icon": "🔢",
              "count": "2775",
              "label": "B=5 时的最大数"
            },
            {
              "icon": "✅",
              "count": 12,
              "label": "A+B 最大值"
            }
          ],
          "caption": "两种情况比较：A+B 最大值为 12"
        }
      ]
    }
  ],
  "variant": {
    "question": "四位数 5A2B 能同时被 2 和 3 整除。求 A × B 的最大值。",
    "fields": [
      {
        "key": "max_product",
        "label": "A×B 最大值"
      }
    ],
    "answer": {
      "max_product": 72
    },
    "hint": "被 2 整除：B 为偶数。被 3 整除：数字和是 3 的倍数。"
  },
  "tags": [
    "整除特征"
  ]
} satisfies ProblemData;
