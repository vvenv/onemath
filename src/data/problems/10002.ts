import type { ProblemData } from "@/types/problem";

export default {
  "id": "10002",
  "title": "奇异动物聚会·多元消元",
  "grade": "五年级",
  "module": "word",
  "difficulty": "挑战",
  "question": "一些奇异的动物在草坪上聚会。有独脚兽（1个头、1只脚）、双头龙（2个头、4只脚）、三脚猫（1个头、3只脚）和四脚蛇（1个头、4只脚）。如果草坪上的动物共有 58 个头、160 只脚，且四脚蛇的数量恰好是双头龙的 2 倍，那么其中独脚兽有几只？",
  "solutions": [
    {
      "key": "substitution",
      "label": "代换消元",
      "steps": [
        "记独脚兽 a 只、双头龙 b 只、三脚猫 c 只、四脚蛇 d 只，由题意 d = 2b。",
        "头数：a + 2b + c + d = 58，代入 d = 2b 得 a + 4b + c = 58。",
        "脚数：a + 4b + 3c + 4d = 160，代入 d = 2b 得 a + 12b + 3c = 160。",
        "脚数式减头数式：(a + 12b + 3c) − (a + 4b + c) = 8b + 2c = 102，化简得 4b + c = 51。",
        "再看头数式：a + (4b + c) = 58，代入 4b + c = 51 得 a = 58 − 51 = 7。",
        "所以独脚兽有 7 只。"
      ],
      "scenes": [
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🐉",
              "count": 1,
              "label": "（2头4脚）"
            },
            {
              "icon": "🐍",
              "count": 2,
              "label": "（1头4脚 × 2）"
            }
          ],
          "separator": "↔",
          "caption": "四脚蛇数量 = 双头龙 × 2，把它们绑成一组"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "a + 2b + c + d",
              "rhs": "58",
              "note": "头数"
            },
            {
              "lhs": "a + 4b + 3c + 4d",
              "rhs": "160",
              "note": "脚数"
            },
            {
              "lhs": "d",
              "rhs": "2b",
              "note": "条件",
              "status": "keep"
            }
          ],
          "caption": "列出三条关系式"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "a + 4b + c",
              "rhs": "58",
              "note": "代入 d=2b 到头数",
              "badge": "①"
            },
            {
              "lhs": "a + 12b + 3c",
              "rhs": "160",
              "note": "代入 d=2b 到脚数",
              "badge": "②"
            }
          ],
          "caption": "消去 d 后只剩 a、b、c"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "脚",
              "value": 160,
              "max": 160,
              "tone": "primary"
            },
            {
              "label": "头",
              "value": 58,
              "max": 160,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "脚 − 头 = 160 − 58 = 102 → 8b + 2c = 102"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "总头",
              "value": 58,
              "max": 58,
              "tone": "primary"
            },
            {
              "label": "4b+c",
              "value": 51,
              "max": 58,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "a = 58 − 51 = 7"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🦄",
              "count": 7,
              "label": "独脚兽"
            }
          ],
          "caption": "答：独脚兽共 7 只"
        }
      ]
    },
    {
      "key": "insight",
      "label": "巧解·整体代换",
      "steps": [
        "关键观察：d = 2b，所以把「1 条双头龙 + 2 条四脚蛇」捆成一个套餐，共 4 头、12 脚。",
        "a（1 头 1 脚）、c（1 头 3 脚）都是单头动物。",
        "以「脚 − 头」一次消掉 a 和 c 中的 1 头 1 脚部分：脚 − 头 = 0·a + 8b + 2c = 160 − 58 = 102。",
        "化简得 4b + c = 51。",
        "再用头数 a + (4b + c) = 58 ⇒ a = 58 − 51 = 7。",
        "答案只与 a 有关，b、c 的具体取值不影响结论。"
      ],
      "scenes": [
        {
          "kind": "heads-split",
          "left": {
            "count": 4,
            "ticks": [
              {
                "count": 3,
                "tone": "accent"
              }
            ],
            "tone": "accent",
            "caption": "套餐：1🐉 + 2🐍 = 4 头 12 脚",
            "captionTone": "primary"
          },
          "right": {
            "count": 2,
            "ticks": [
              {
                "count": 1
              },
              {
                "count": 2
              }
            ],
            "caption": "🦄 (1头1脚) + 🐱 (1头3脚)"
          },
          "caption": "把双头龙+四脚蛇打包，剩下都是单头动物"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "脚 − 头",
              "rhs": "160 − 58 = 102",
              "note": "整体相减消 a、c 的 1 头 1 脚"
            },
            {
              "lhs": "8b + 2c",
              "rhs": "102",
              "status": "keep"
            },
            {
              "lhs": "4b + c",
              "rhs": "51",
              "note": "两边 ÷ 2",
              "status": "keep"
            }
          ],
          "caption": "用「脚 − 头」一次扣掉同系数项"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🦄",
              "count": 7,
              "label": "独脚兽"
            }
          ],
          "caption": "a = 58 − 51 = 7，与 b、c 无关"
        }
      ]
    }
  ],
  "variant": {
    "question": "同样是独脚兽、双头龙、三脚猫、四脚蛇的聚会：共 40 个头、100 只脚，四脚蛇数量仍是双头龙的 2 倍。独脚兽有几只？",
    "fields": [
      {
        "key": "unicorn",
        "label": "独脚兽数量"
      }
    ],
    "answer": {
      "unicorn": 25
    },
    "hint": "提示：先用 d = 2b 化简头、脚两式，再用脚式减头式消去 a。"
  },
  "tags": [
    "整体代换"
  ]
} satisfies ProblemData;
