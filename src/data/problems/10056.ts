import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10056-1.svg?raw";

export default {
  "id": "10056",
  "title": "速算与巧算·凑整法",
  "grade": "三年级",
  "module": "calc",
  "difficulty": "基础",
  "question": "计算：999 + 99 + 9",
  "figures": [
    {
      "svg": svg1,
      "caption": "凑整法：把接近整十、整百、整千的数先凑整，再调整",
      "alt": "算式 999 + 99 + 9"
    }
  ],
  "solutions": [
    {
      "key": "rounding",
      "label": "凑整法",
      "steps": [
        "观察发现 999、99、9 分别接近 1000、100、10。",
        "把每个数凑成整数：999 = 1000 − 1，99 = 100 − 1，9 = 10 − 1。",
        "先加整数部分：1000 + 100 + 10 = 1110。",
        "再减去多算的：1110 − 1 − 1 − 1 = 1110 − 3 = 1107。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "999",
              "rhs": "1000 − 1",
              "status": "keep"
            },
            {
              "lhs": "99",
              "rhs": "100 − 1",
              "status": "keep"
            },
            {
              "lhs": "9",
              "rhs": "10 − 1",
              "status": "keep"
            }
          ],
          "caption": "步骤1：把每个数写成整数减1的形式"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "整数和",
              "value": 1110,
              "max": 1110,
              "tone": "primary"
            },
            {
              "label": "多算的",
              "value": 3,
              "max": 1110,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "步骤2：整数部分 1000 + 100 + 10 = 1110，多算了 3 个 1"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "✅",
              "count": 1107,
              "label": "最终结果"
            }
          ],
          "caption": "1110 − 3 = 1107"
        }
      ]
    }
  ],
  "variant": {
    "question": "计算：2998 + 498 + 98",
    "fields": [
      {
        "key": "result",
        "label": "结果"
      }
    ],
    "answer": {
      "result": 3594
    },
    "hint": "2998 = 3000 − 2，498 = 500 − 2，98 = 100 − 2"
  },
  "tags": [
    "凑整法"
  ]
} satisfies ProblemData;
