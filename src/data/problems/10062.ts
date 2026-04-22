import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10062-1.svg?raw";
import svg2 from "./figures/10062-2.svg?raw";

export default {
  "id": "10062",
  "title": "分苹果·隔板法",
  "grade": "五年级",
  "module": "counting",
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
        "分析：苹果相同、小朋友不同、每人至少 1 个，是隔板法的标准情形——把 10 个苹果排成一排，在它们之间的 9 个空隙中选 2 个放隔板，就把苹果切成 3 段分给 3 人。",
        "共 C(9, 2) = 9 × 8 ÷ 2 = 36 种分法。"
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
        "分析：也可以把“每人分多少个”直接写成方程，然后数解的个数。因为每人至少 1 个，所以变量范围是正整数。",
        "设 3 个小朋友分到的苹果数分别为 a、b、c，都是正整数且 a + b + c = 10。",
        "做代换：令 a' = a − 1, b' = b − 1, c' = c − 1，那么 a'、b'、c' 都是非负整数，满足 a' + b' + c' = 7。",
        "非负整数解的个数 = C(7 + 3 − 1, 3 − 1) = C(9, 2) = 36。",
        "因此分法共有 36 种。"
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
  "tags": [
    "隔板法"
  ]
} satisfies ProblemData;
