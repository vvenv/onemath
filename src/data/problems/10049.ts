import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10049-1.svg?raw";
import svg2 from "./figures/10049-2.svg?raw";

export default {
  "id": "10049",
  "title": "三种溶液·等量混合",
  "grade": "六年级",
  "module": "应用题",
  "difficulty": "挑战",
  "question": "有浓度为 10%、20%、40% 的三种酒精溶液。要用它们配制出浓度为 22% 的酒精溶液 600 克，且使用 10% 和 40% 的溶液质量相等。三种溶液各需要多少克？",
  "solutions": [
    {
      "key": "equal_mass_merge",
      "label": "等量合并·两溶液法",
      "steps": [
        "10%与40%等量混合得25%，十字交叉25%与20%配22%：25%:20%=2:3，故25%共240g、20%共360g。拆回10%与40%各120g。答：10% 120g、20% 360g、40% 120g。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "关键一步：把等量的 10% 与 40% 合并成一瓶 25% 的溶液"
        },
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "两溶液混合用十字交叉法：25% 与 20% 的质量比为 2 : 3"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "25% 溶液质量",
              "rhs": "600 × 2/5 = 240 克",
              "status": "keep"
            },
            {
              "lhs": "20% 溶液质量",
              "rhs": "600 × 3/5 = 360 克",
              "status": "keep"
            },
            {
              "lhs": "10% 溶液质量",
              "rhs": "240 ÷ 2 = 120 克",
              "status": "keep"
            },
            {
              "lhs": "40% 溶液质量",
              "rhs": "240 ÷ 2 = 120 克",
              "status": "keep"
            },
            {
              "lhs": "验证酒精量",
              "rhs": "120×10% + 360×20% + 120×40% = 12 + 72 + 48 = 132",
              "status": "neutral"
            },
            {
              "lhs": "目标酒精量",
              "rhs": "600 × 22% = 132 ✓",
              "status": "neutral"
            }
          ],
          "caption": "回代求三种溶液的质量并验证"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧪",
              "count": 120,
              "label": "10% 溶液（克）"
            },
            {
              "icon": "🧪",
              "count": 360,
              "label": "20% 溶液（克）"
            },
            {
              "icon": "🧪",
              "count": 120,
              "label": "40% 溶液（克）"
            }
          ],
          "caption": "最终答案"
        }
      ]
    },
    {
      "key": "two_equations",
      "label": "方程组法",
      "steps": [
        "分析：设 10% 取 x 克、40% 同样 x 克、20% 取 y 克。按总质量与总酒精量列方程组：2x + y = 600 与 0.1x + 0.2y + 0.4x = 132，即 0.5x + 0.2y = 132。",
        "代 y = 600 − 2x 消元得 0.1x = 12，解得 x = 120、y = 360。答：10% 120 克、20% 360 克、40% 120 克。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "设 10% 取 x 克，40% 取 x 克，20% 取 y 克",
              "rhs": "",
              "status": "keep"
            },
            {
              "lhs": "总质量方程",
              "rhs": "2x + y = 600",
              "status": "keep"
            },
            {
              "lhs": "总酒精方程",
              "rhs": "0.1x + 0.2y + 0.4x = 132",
              "status": "keep"
            },
            {
              "lhs": "合并同类项",
              "rhs": "0.5x + 0.2y = 132",
              "status": "keep"
            },
            {
              "lhs": "代入 y = 600 − 2x",
              "rhs": "0.5x + 0.2(600 − 2x) = 132",
              "status": "neutral"
            },
            {
              "lhs": "化简",
              "rhs": "0.1x = 12",
              "status": "neutral"
            },
            {
              "lhs": "解得",
              "rhs": "x = 120, y = 360",
              "status": "keep"
            }
          ],
          "caption": "直接用方程组求解"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧪",
              "count": 120,
              "label": "10% 溶液（克）"
            },
            {
              "icon": "🧪",
              "count": 360,
              "label": "20% 溶液（克）"
            },
            {
              "icon": "🧪",
              "count": 120,
              "label": "40% 溶液（克）"
            }
          ],
          "caption": "最终答案"
        }
      ]
    }
  ],
  "variant": {
    "question": "用 5%、20%、45% 三种盐水配制 22% 的盐水 500 克，5% 和 45% 的用量相等。三种各多少克？",
    "fields": [
      {
        "key": "low",
        "label": "5% 盐水（克）"
      },
      {
        "key": "mid",
        "label": "20% 盐水（克）"
      },
      {
        "key": "high",
        "label": "45% 盐水（克）"
      }
    ],
    "answer": {
      "low": 100,
      "mid": 300,
      "high": 100
    },
    "hint": "5% 和 45% 等质量混合相当于 25%，再与 20% 按 2 : 3 混合可得 22%。"
  },
  "tags": [
    "十字交叉法"
  ]
} satisfies ProblemData;
