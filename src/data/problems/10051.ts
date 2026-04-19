import type { ProblemData } from "@/types/problem";

export default {
  "id": "10051",
  "title": "多次操作·浓度递推",
  "grade": "六年级",
  "module": "word",
  "difficulty": "挑战",
  "question": "容器中有浓度为 a% 的酒精溶液 100 克。每次操作：倒出 25 克溶液，再加入 25 克水。经过 3 次操作后，浓度变为 27%。求原来浓度 a%。",
  "solutions": [
    {
      "key": "decay_formula",
      "label": "浓度衰减公式",
      "steps": [
        "每次操作倒出 25 克溶液，再加 25 克水，溶液总量始终保持 100 克。",
        "倒出的 25 克里，酒精和水按当前浓度同比例减少，所以每次操作后酒精质量 = 原来的 (100−25)/100 = 3/4。",
        "溶液总量不变，因此每次操作后浓度也变为原来的 3/4。",
        "3 次操作后，浓度 = a% × (3/4)³ = a% × 27/64。",
        "由 a% × 27/64 = 27%，得 a% = 27% × 64/27 = 64%。",
        "答：原来浓度为 64%。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "每次保留比例",
              "rhs": "(100 − 25) ÷ 100 = 3/4",
              "status": "keep"
            },
            {
              "lhs": "3 次后保留比例",
              "rhs": "(3/4)³ = 27/64",
              "status": "keep"
            },
            {
              "lhs": "列方程",
              "rhs": "a% × 27/64 = 27%",
              "status": "keep"
            },
            {
              "lhs": "求解",
              "rhs": "a% = 27% × 64/27 = 64%",
              "status": "keep"
            }
          ],
          "caption": "用衰减公式一步到位求出原浓度"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "初始浓度 a%",
              "value": 64,
              "max": 64,
              "tone": "primary"
            },
            {
              "label": "第 1 次后",
              "value": 48,
              "max": 64,
              "tone": "primary"
            },
            {
              "label": "第 2 次后",
              "value": 36,
              "max": 64,
              "tone": "primary"
            },
            {
              "label": "第 3 次后",
              "value": 27,
              "max": 64,
              "tone": "muted"
            }
          ],
          "caption": "每次浓度变为原来的 3/4，3 次后 64% → 48% → 36% → 27%"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧪",
              "count": "64%",
              "label": "原来浓度 a%"
            }
          ],
          "caption": "a% = 27% ÷ (3/4)³ = 64%"
        }
      ]
    }
  ],
  "variant": {
    "question": "100 克酒精溶液，每次倒出 20 克加水，2 次后浓度变为原来的 64%。求每次保留比例。",
    "fields": [
      {
        "key": "ratio",
        "label": "保留比例（%）"
      }
    ],
    "answer": {
      "ratio": 80
    },
    "hint": "设保留比例 r，r² = 64%，r = 80%。每次倒出 20 克。"
  },
  "tags": [
    "递推法"
  ]
} satisfies ProblemData;
