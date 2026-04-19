import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10042-1.svg?raw";

export default {
  "id": "10042",
  "title": "质因数分解·乘积问题",
  "grade": "四年级",
  "module": "numberTheory",
  "difficulty": "基础",
  "question": "三个连续自然数的乘积是 210，求这三个数的和。",
  "solutions": [
    {
      "key": "factorization",
      "label": "质因数分解法",
      "steps": [
        "将 210 分解质因数：210 = 2 × 3 × 5 × 7。",
        "三个连续自然数，尝试组合这些质因数。",
        "观察 5、6、7：5 × 6 × 7 = 5 × (2 × 3) × 7 = 2 × 3 × 5 × 7 = 210。",
        "验证：5、6、7 确实是三个连续自然数。",
        "它们的和为：5 + 6 + 7 = 18。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "步骤1：将 210 分解质因数，得到 2 × 3 × 5 × 7"
        },
        {
          "kind": "number-line",
          "min": 0,
          "max": 12,
          "points": [
            {
              "value": 5,
              "label": "5",
              "tone": "primary"
            },
            {
              "value": 6,
              "label": "6",
              "tone": "primary"
            },
            {
              "value": 7,
              "label": "7",
              "tone": "primary"
            }
          ],
          "caption": "步骤2：组合质因数，发现 5 × 6 × 7 = 210"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "5️⃣",
              "count": 5
            },
            {
              "icon": "6️⃣",
              "count": 6
            },
            {
              "icon": "7️⃣",
              "count": 7
            },
            {
              "icon": "➕",
              "count": 18,
              "label": "总和"
            }
          ],
          "caption": "三个连续自然数为 5、6、7，和为 18"
        }
      ]
    }
  ],
  "variant": {
    "question": "两个质数的和是 30，求这两个质数的乘积。",
    "fields": [
      {
        "key": "product",
        "label": "乘积"
      }
    ],
    "answer": {
      "product": 161
    },
    "hint": "从最小的质数开始尝试，30 以内的质数对有 (7,23)、(11,19)、(13,17)。"
  },
  "tags": [
    "质因数分解"
  ]
} satisfies ProblemData;
