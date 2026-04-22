import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10066-1.svg?raw";

export default {
  "id": "10066",
  "title": "多重限制排列·甲不排头乙不排尾",
  "grade": "六年级",
  "module": "计数",
  "difficulty": "挑战",
  "question": "甲、乙、丙、丁、戊 5 人站成一排拍照，要求甲不站在排头（最左端），乙不站在排尾（最右端）。一共有多少种不同的站法？",
  "figures": [
    {
      "svg": svg1,
      "caption": "排头不能是甲，排尾不能是乙",
      "alt": "5个位置，1号位禁甲，5号位禁乙"
    }
  ],
  "solutions": [
    {
      "key": "exclude",
      "label": "排除法（容斥）",
      "steps": [
        "分析：记 A = 甲排头、B = 乙排尾。由容斥合要求数 = 5! − |A ∪ B| = 5! − (|A| + |B| − |A ∩ B|)。",
        "|A| = |B| = 4! = 24，|A ∩ B| = 3! = 6；|A ∪ B| = 24 + 24 − 6 = 42。合要求 = 120 − 42 = 78 种。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "总排法",
              "rhs": "5! = 120"
            },
            {
              "lhs": "|A| 甲排头",
              "rhs": "4! = 24"
            },
            {
              "lhs": "|B| 乙排尾",
              "rhs": "4! = 24"
            },
            {
              "lhs": "|A ∩ B|",
              "rhs": "3! = 6"
            },
            {
              "lhs": "|A ∪ B|",
              "rhs": "24 + 24 − 6 = 42"
            },
            {
              "lhs": "答案",
              "rhs": "120 − 42 = 78",
              "badge": "结论"
            }
          ],
          "caption": "容斥原理：总数 − (A ∪ B)"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "📸",
              "count": 78,
              "label": "种站法"
            }
          ],
          "caption": "答案：78"
        }
      ]
    },
    {
      "key": "classify",
      "label": "分类讨论法（按甲的位置）",
      "steps": [
        "分析：甲可在位 2~5，按「甲是否排尾」分类能顺带解除乙的禁尾约束。",
        "情形一（甲占尾）：乙自由选余下 4 个位之一，其他 3 人任排 → 1 · 4 · 3! = 24；情形二（甲占位 2/3/4）：乙避开排尾与甲位共 3 种选择，其他 3 人任排 → 3 · 3 · 3! = 54。合计 24 + 54 = 78。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "甲在排尾",
              "rhs": "1 × 4 × 3! = 24"
            },
            {
              "lhs": "甲在位 2/3/4",
              "rhs": "3 × 3 × 3! = 54"
            },
            {
              "lhs": "合计",
              "rhs": "24 + 54 = 78",
              "badge": "结论"
            }
          ],
          "caption": "按特殊元素甲的位置分类"
        }
      ]
    }
  ],
  "variant": {
    "question": "甲、乙、丙、丁 4 人站成一排，要求甲不站排头、乙不站排尾，一共有多少种站法？",
    "fields": [
      {
        "key": "answer",
        "label": "站法数",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 14
    },
    "hint": "容斥：总数 4! = 24；甲排头 3! = 6；乙排尾 3! = 6；甲排头且乙排尾 2! = 2；不合要求 = 6+6−2 = 10；答案 = 24 − 10 = 14。"
  },
  "tags": [
    "排除法",
    "容斥原理",
    "分类讨论"
  ]
} satisfies ProblemData;
