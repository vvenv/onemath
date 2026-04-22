import type { ProblemData } from "@/types/problem";

export default {
  "id": "10044",
  "title": "同余问题·韩信点兵",
  "grade": "五年级",
  "module": "numberTheory",
  "difficulty": "挑战",
  "question": "一篮鸡蛋，每次拿 2 个还剩 1 个，每次拿 3 个还剩 2 个，每次拿 5 个还剩 4 个。这篮鸡蛋最少有多少个？",
  "solutions": [
    {
      "key": "chinese_remainder",
      "label": "逐级满足法",
      "steps": [
        "分析：鸡蛋数 N 满足 N ≡ 1 (mod 2)，N ≡ 2 (mod 3)，N ≡ 4 (mod 5)。注意每种情况余数都恰好比除数少 1，于是 N + 1 可被 2、3、5 同时整除，即是它们的公倍数。",
        "2、3、5 互质，[2, 3, 5] = 30，最小情形 N + 1 = 30，故 N = 29。验证：29 = 2·14 + 1 = 3·9 + 2 = 5·5 + 4 ✓。"
      ],
      "scenes": [
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "每次拿",
            "claim": "剩余",
            "verdict": "加1个后"
          },
          "rows": [
            {
              "speaker": "2 个",
              "claim": "1 个",
              "badge": "整除2",
              "verdict": "true"
            },
            {
              "speaker": "3 个",
              "claim": "2 个",
              "badge": "整除3",
              "verdict": "true"
            },
            {
              "speaker": "5 个",
              "claim": "4 个",
              "badge": "整除5",
              "verdict": "true"
            }
          ],
          "caption": "规律：余数 = 除数 - 1，所以鸡蛋数 + 1 是 2、3、5 的公倍数"
        },
        {
          "kind": "number-line",
          "min": 0,
          "max": 60,
          "points": [
            {
              "value": 29,
              "label": "29",
              "tone": "primary",
              "sublabel": "答案"
            },
            {
              "value": 30,
              "label": "30",
              "tone": "accent",
              "sublabel": "2×3×5"
            }
          ],
          "segments": [
            {
              "from": 0,
              "to": 30,
              "label": "最小公倍数",
              "tone": "accent"
            }
          ],
          "caption": "2、3、5 的最小公倍数为 30，鸡蛋数 = 30 - 1 = 29"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🥚",
              "count": 29,
              "label": "最少鸡蛋数"
            }
          ],
          "caption": "验证：29 满足所有条件"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个数除以 3 余 2，除以 5 余 3，除以 7 余 2。这个数最小是多少？",
    "fields": [
      {
        "key": "number",
        "label": "最小数"
      }
    ],
    "answer": {
      "number": 23
    },
    "hint": "先找满足除以 3 余 2 且除以 7 余 2 的数（即除以 21 余 2），再从中找除以 5 余 3 的。"
  },
  "tags": [
    "同余"
  ]
} satisfies ProblemData;
