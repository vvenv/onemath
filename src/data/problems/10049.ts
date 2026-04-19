import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10049-1.svg?raw";
import svg2 from "./figures/10049-2.svg?raw";

export default {
  "id": "10049",
  "title": "三种溶液·等量混合",
  "grade": "六年级",
  "module": "word",
  "difficulty": "挑战",
  "question": "有浓度为 10%、20%、40% 的三种酒精溶液。要用它们配制出浓度为 22% 的酒精溶液 600 克，且使用 10% 和 40% 的溶液质量相等。三种溶液各需要多少克？",
  "solutions": [
    {
      "key": "equal_mass_merge",
      "label": "等量合并·两溶液法",
      "steps": [
        "关键观察：10% 和 40% 取等质量混合，得到的浓度是 (10%+40%)÷2 = 25%。",
        "于是把这两瓶合并成一瓶 25% 的溶液，问题简化为：用 25% 和 20% 两种溶液配出 600 克 22% 的溶液。",
        "用十字交叉法：25% 与 22% 相差 2，20% 与 22% 相差 2，比值 2 : 3，即 25% : 20% = 2 : 3。",
        "所以 25% 的溶液占 600 × 2/5 = 240 克，20% 的溶液占 600 × 3/5 = 360 克。",
        "240 克的 25% 溶液由等量的 10% 和 40% 合成，各 120 克。",
        "答：10% 用 120 克，20% 用 360 克，40% 用 120 克。"
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
        "设 10% 的溶液取 x 克，则 40% 的溶液也取 x 克；20% 的溶液取 y 克。",
        "总质量：2x + y = 600。",
        "总酒精：10%·x + 20%·y + 40%·x = 22%·600，即 0.5x + 0.2y = 132。",
        "由第一式得 y = 600 − 2x，代入第二式：0.5x + 0.2(600 − 2x) = 132。",
        "化简：0.5x + 120 − 0.4x = 132，0.1x = 12，x = 120。",
        "于是 y = 600 − 2×120 = 360。",
        "答：10% 用 120 克，20% 用 360 克，40% 用 120 克。"
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
