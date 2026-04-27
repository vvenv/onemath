import type { ProblemData } from "@/types/problem";

export default {
  "id": "10057",
  "title": "分数比较大小·作差法",
  "grade": "五年级",
  "module": "计算",
  "difficulty": "基础",
  "question": "比较 2023/2024 和 2024/2025 的大小。",
  "solutions": [
    {
      "key": "difference",
      "label": "作差法（与1比较）",
      "steps": [
        "1 − 2023/2024 = 1/2024，1 − 2024/2025 = 1/2025。1/2024 > 1/2025，故 2023/2024 < 2024/2025。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "2023/2024",
              "value": "0.9995",
              "max": 1,
              "tone": "primary"
            },
            {
              "label": "2024/2025",
              "value": "0.9995",
              "max": 1,
              "tone": "muted"
            }
          ],
          "caption": "两个分数都非常接近 1"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1 − 2023/2024",
              "rhs": "1/2024",
              "status": "keep"
            },
            {
              "lhs": "1 − 2024/2025",
              "rhs": "1/2025",
              "status": "keep"
            }
          ],
          "caption": "步骤1：计算与 1 的差距"
        },
        {
          "kind": "number-line",
          "min": 0.999,
          "max": 1,
          "points": [
            {
              "value": 0.999506,
              "label": "2023/2024",
              "tone": "primary"
            },
            {
              "value": 0.999506,
              "sublabel": "2024/2025",
              "tone": "accent"
            },
            {
              "value": 1,
              "label": "1",
              "tone": "default"
            }
          ],
          "segments": [
            {
              "from": 0.999506,
              "to": 1,
              "label": "1/2024",
              "tone": "primary"
            },
            {
              "from": 0.999506,
              "to": 1,
              "label": "1/2025 (更小)",
              "tone": "accent"
            }
          ],
          "caption": "步骤2：1/2024 > 1/2025，所以 2023/2024 离 1 更远（图为局部放大）"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔹",
              "count": "2023/2024",
              "label": "< 2024/2025"
            }
          ],
          "caption": "结论：2023/2024 < 2024/2025"
        }
      ]
    },
    {
      "key": "reciprocal",
      "label": "倒数法（与 1 比较的另一视角）",
      "steps": [
        "倒数 2024/2023 = 1 + 1/2023，2025/2024 = 1 + 1/2024。1/2023 > 1/2024 ⇒ 原分数 2023/2024 < 2024/2025。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "倒数 2024/2023",
              "rhs": "1 + 1/2023",
              "status": "keep"
            },
            {
              "lhs": "倒数 2025/2024",
              "rhs": "1 + 1/2024",
              "status": "keep"
            },
            {
              "lhs": "1/2023",
              "rhs": "> 1/2024",
              "note": "分子同为 1，分母小者大",
              "badge": "关键"
            },
            {
              "lhs": "⇒ 2024/2023",
              "rhs": "> 2025/2024",
              "status": "keep"
            },
            {
              "lhs": "⇒ 2023/2024",
              "rhs": "< 2024/2025",
              "status": "keep",
              "badge": "结论"
            }
          ],
          "caption": "倒数法：用「倒数越大原数越小」反推"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔸",
              "count": "2023/2024",
              "label": "< 2024/2025"
            }
          ],
          "caption": "与作差法结论一致"
        }
      ]
    }
  ],
  "variant": {
    "question": "比较 999/1000 和 1000/1001 的大小。",
    "fields": [
      {
        "key": "relation",
        "type": "text",
        "label": "大小关系",
        "enum": [
          ">",
          "<",
          "="
        ]
      }
    ],
    "answer": {
      "relation": "<"
    },
    "hint": "两个分数都接近 1，试试用 1 减去每个分数，比较差值"
  },
  "knowledgePoints": [
    {
      "slug": "subtraction-method",
      "name": "作差法",
      "summary": "把两组含有相同未知量的式子相减，让公共部分自动消去，直接得到差值或比例关系。",
    },
    {
      "slug": "reciprocal-method",
      "name": "倒数法",
      "summary": "比较真分数大小或处理“工作效率/速度”问题时，把分数倒过来：a < b ⇔ 1/a > 1/b（同号）。",
    },
    {
      "slug": "fraction-comparison",
      "name": "分数比较",
      "summary": "同分子比分母（小者大）；同分母比分子（大者大）；都不同则交叉相乘 ad ↔ bc，或与 1/2、1 比距离。",
    },
  ],
  "tags": [
    "作差法",
    "倒数法",
    "分数比较"
  ]
} satisfies ProblemData;
