import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10078-1.svg?raw";

export default {
  "id": "10078",
  "title": "生产利润最大化·资源分配",
  "grade": "六年级",
  "module": "杂题",
  "difficulty": "挑战",
  "question": "某车间生产甲、乙两种产品。生产 1 件甲需要 4 小时机器工时和 2 千克原料，可获利 7 元；生产 1 件乙需要 2 小时机器工时和 3 千克原料，可获利 5 元。本月共有 40 小时机器工时和 30 千克原料可供使用；产量必须是非负整数。问最多能获得多少元利润？对应的甲、乙分别生产多少件？",
  "figures": [
    {
      "svg": svg1,
      "caption": "两种产品的资源消耗、利润和可用资源",
      "alt": "生产条件与约束"
    }
  ],
  "solutions": [
    {
      "key": "enumerate",
      "label": "枚举法（整数点查验）",
      "steps": [
        "分析：设甲 x 件、乙 y 件（非负整数）。约束 4x + 2y ≤ 40 和 2x + 3y ≤ 30 给出 y ≤ min(20 − 2x, (30 − 2x)/3)，x 的上限由工时决定为 x ≤ 10。目标是让利润 P = 7x + 5y 最大。",
        "对每个 x 取最大可行 y 算 P（详见 scenes）：x = 6 → 72，x = 7 → 74，x = 8 → 76，x = 9 → 73，x = 10 → 70；x ≤ 5 时 y 可以较大但 7 元的甲件数少，利润仍偏低。",
        "最优为 x = 8、y = 4，利润 76 元。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "x = 6, y = 6",
              "rhs": "P = 72"
            },
            {
              "lhs": "x = 7, y = 5",
              "rhs": "P = 74"
            },
            {
              "lhs": "x = 8, y = 4",
              "rhs": "P = 76",
              "status": "keep",
              "badge": "最大"
            },
            {
              "lhs": "x = 9, y = 2",
              "rhs": "P = 73"
            },
            {
              "lhs": "x = 10, y = 0",
              "rhs": "P = 70"
            }
          ],
          "caption": "约束下所有 x 对应的最大 y 与利润"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🏭",
              "count": "8 / 4",
              "label": "甲 / 乙 件数"
            },
            {
              "icon": "💰",
              "count": 76,
              "label": "元"
            }
          ],
          "caption": "最优方案"
        }
      ]
    }
  ],
  "variant": {
    "question": "某车间用 24 小时工时和 18 千克原料生产甲、乙两种产品。生产 1 件甲用 3 小时、2 千克、利润 5 元；1 件乙用 2 小时、3 千克、利润 4 元。产量必须是非负整数，最多可得多少元利润？",
    "fields": [
      {
        "key": "answer",
        "label": "最大利润",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 40
    },
    "hint": "枚举整数 (x,y)：x=8,y=0 时 3·8=24, 2·8=16 均不超，P=40；x=7,y=1：P=39；x=6,y=2：P=38；x=8,y=0 最大，利润 40 元。"
  },
  "tags": [
    "枚举法"
  ]
} satisfies ProblemData;
