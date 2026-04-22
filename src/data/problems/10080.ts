import type { ProblemData } from "@/types/problem";

export default {
  "id": "10080",
  "title": "拆数乘积最大·20 的拆分",
  "grade": "六年级",
  "module": "misc",
  "difficulty": "挑战",
  "question": "把正整数 20 拆成若干个正整数之和（拆成几个都可以，顺序不计），使得这些正整数的乘积尽可能大。最大的乘积是多少？",
  "solutions": [
    {
      "key": "exchange",
      "label": "交换论证·用 3 最优",
      "steps": [
        "分析（交换论证）：若某加数 a ≥ 4，把它换成 2 + (a−2) 乘积变为 2(a−2) ≥ a，且 a > 4 时严格变大；加数 1 则可与相邻 x 合并成 x + 1（乘积由 x 增至 x + 1），故最优拆分每个加数只能是 2 或 3。同和情况下 3 × 3 = 9 > 2 × 2 × 2 = 8，所以尽量多用 3。",
        "20 ÷ 3 = 6 余 2，正好剩 2，直接写 20 = 3 × 6 + 2。最大乘积 = 3⁶ × 2 = 729 × 2 = 1458。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "拆法 20 = 3+3+3+3+3+3+2",
              "rhs": "3⁶ · 2 = 1458",
              "status": "keep",
              "badge": "最大"
            },
            {
              "lhs": "对比 4+4+4+4+4",
              "rhs": "4⁵ = 1024"
            },
            {
              "lhs": "对比 5+5+5+5",
              "rhs": "5⁴ = 625"
            },
            {
              "lhs": "对比全是 2（10 个 2）",
              "rhs": "2¹⁰ = 1024"
            }
          ],
          "caption": "“多用 3，余 2 时留 1 个 2”"
        }
      ]
    },
    {
      "key": "enumerate",
      "label": "小范围枚举验证",
      "steps": [
        "分析：为佐证上解，对几种典型拆法做对比（详见 scenes 的 compare-bars）：全 2（10 个）1024、全 4（5 个）1024、全 5（4 个）625、5 个 3 + 1 个 5 得 1215，均不超过 6 个 3 + 1 个 2 = 1458。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "5 个 4",
              "value": 1024,
              "max": 1500
            },
            {
              "label": "10 个 2",
              "value": 1024,
              "max": 1500
            },
            {
              "label": "5 个 3 + 1 个 5",
              "value": 1215,
              "max": 1500
            },
            {
              "label": "6 个 3 + 1 个 2",
              "value": 1458,
              "max": 1500,
              "tone": "primary",
              "marker": true
            }
          ],
          "caption": "不同拆法的乘积对比"
        }
      ]
    }
  ],
  "variant": {
    "question": "把正整数 19 拆成若干个正整数之和，使乘积最大。最大乘积是多少？",
    "fields": [
      {
        "key": "answer",
        "label": "最大乘积",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 972
    },
    "hint": "19 = 3 × 5 + 4，即 5 个 3 加 1 个 4；乘积 = 3⁵ × 4 = 243 × 4 = 972。（若余 1，应把一个 3 与 1 合并成 4。）"
  },
  "tags": [
    "枚举法"
  ]
} satisfies ProblemData;
