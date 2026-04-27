import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10062-1.svg?raw";
import svg2 from "./figures/10062-2.svg?raw";

export default {
  "id": "10062",
  "title": "分苹果·隔板法",
  "grade": "五年级",
  "module": "计数",
  "difficulty": "进阶",
  "question": "把 10 个完全相同的苹果分给 3 个小朋友，要求每个小朋友至少分到 1 个苹果。一共有多少种不同的分法？",
  "figures": [
    {
      "svg": svg1,
      "caption": "把 10 个相同的苹果分给 3 个小朋友",
      "alt": "10个苹果和3个小朋友"
    }
  ],
  "solutions": [
    {
      "key": "divider",
      "label": "隔板法",
      "steps": [
        "10 个苹果形成 9 个空隙，选 2 个放隔板：C(9,2) = 36 种分法。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "在 10 个苹果形成的 9 个空隙里放 2 块隔板，把苹果切成 3 段",
          "alt": "隔板法示意：10个苹果+2块隔板"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "苹果排成一排",
              "rhs": "10 个 → 9 个空隙"
            },
            {
              "lhs": "放 2 块隔板",
              "rhs": "C(9, 2)"
            },
            {
              "lhs": "分法总数",
              "rhs": "C(9, 2) = 9×8÷2 = 36",
              "badge": "结论"
            }
          ],
          "caption": "隔板法：n 个物品、k 人至少 1 个 → C(n−1, k−1)"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🍎",
              "count": 36,
              "label": "种分法"
            }
          ],
          "caption": "每人至少 1 个，共 36 种"
        }
      ]
    },
    {
      "key": "equation",
      "label": "正整数解法",
      "steps": [
        "设 a+b+c=10(a,b,c≥1)，代换得 a'+b'+c'=7(≥0)，解数=C(9,2)=36 种（与隔板法一致）。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "原方程",
              "rhs": "a + b + c = 10 (a,b,c ≥ 1)"
            },
            {
              "lhs": "代换后",
              "rhs": "a' + b' + c' = 7 (≥ 0)",
              "note": "每人先分到 1 个"
            },
            {
              "lhs": "解的个数",
              "rhs": "C(9, 2) = 36",
              "badge": "结论"
            }
          ],
          "caption": "把“至少 1 个”转成非负整数解"
        }
      ]
    }
  ],
  "variant": {
    "question": "把 12 个完全相同的练习本分给 4 个同学，每人至少 1 本，一共有多少种不同的分法？",
    "fields": [
      {
        "key": "answer",
        "label": "分法数",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 165
    },
    "hint": "隔板法：12 本之间有 11 个空隙，放 3 块隔板：C(11, 3) = 165。"
  },
  "knowledgePoints": [
    {
      "slug": "stars-and-bars",
      "name": "隔板法",
      "summary": "把 n 个相同的物品分给 k 个人，每人至少 1 个 → C(n−1, k−1)；可以为 0 → C(n+k−1, k−1)。",
    },
  ],
  "tags": [
    "隔板法"
  ]
} satisfies ProblemData;
