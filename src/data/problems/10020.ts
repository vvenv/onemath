import type { ProblemData } from "@/types/problem";

export default {
  "id": "10020",
  "title": "整除特征·数字谜",
  "grade": "五年级",
  "module": "数论",
  "difficulty": "进阶",
  "question": "在四位数 56⬜2 的方框中填上一个数字，使得这个数能同时被 3 和 4 整除。那么方框中可以填的数字之和是多少？",
  "solutions": [
    {
      "key": "rule",
      "label": "整除特征分析法",
      "steps": [
        "分析：被 4 整除看末两位 ⬜2，候选 12、32、52、72、92 ⇒ ⬜ ∈ {1, 3, 5, 7, 9}；被 3 整除看数字和 13 + ⬜，需被 3 整除。",
        "在候选中只有 ⬜ = 5（13 + 5 = 18，3 的倍数）同时满足两条件。答：⬜ = 5，方框数字之和为 5。"
      ],
      "scenes": [
        null,
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "⬜",
            "claim": "末两位",
            "verdict": "÷4"
          },
          "rows": [
            {
              "speaker": "0",
              "claim": "02",
              "verdict": "false"
            },
            {
              "speaker": "1",
              "claim": "12",
              "verdict": "true",
              "highlight": "target"
            },
            {
              "speaker": "2",
              "claim": "22",
              "verdict": "false"
            },
            {
              "speaker": "3",
              "claim": "32",
              "verdict": "true",
              "highlight": "target"
            },
            {
              "speaker": "4",
              "claim": "42",
              "verdict": "false"
            },
            {
              "speaker": "5",
              "claim": "52",
              "verdict": "true",
              "highlight": "target"
            },
            {
              "speaker": "6",
              "claim": "62",
              "verdict": "false"
            },
            {
              "speaker": "7",
              "claim": "72",
              "verdict": "true",
              "highlight": "target"
            },
            {
              "speaker": "8",
              "claim": "82",
              "verdict": "false"
            },
            {
              "speaker": "9",
              "claim": "92",
              "verdict": "true",
              "highlight": "target"
            }
          ],
          "caption": "末两位 ⬜2 对 4 的整除性检验：⬜ ∈ {1, 3, 5, 7, 9}"
        },
        null,
        null,
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "⬜",
            "claim": "数字和 13+⬜",
            "verdict": "÷3"
          },
          "rows": [
            {
              "speaker": "1",
              "claim": "14",
              "verdict": "false"
            },
            {
              "speaker": "3",
              "claim": "16",
              "verdict": "false"
            },
            {
              "speaker": "5",
              "claim": "18",
              "verdict": "true",
              "highlight": "target"
            },
            {
              "speaker": "7",
              "claim": "20",
              "verdict": "false"
            },
            {
              "speaker": "9",
              "claim": "22",
              "verdict": "false"
            }
          ]
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 5652,
              "label": "满足条件的四位数"
            },
            {
              "icon": "✅",
              "count": 5,
              "label": "方框数字之和"
            }
          ],
          "separator": "→",
          "caption": "唯一解：56⬜2 = 5652，⬜ = 5，数字之和为 5"
        }
      ]
    }
  ],
  "variant": {
    "question": "四位数 7A2B 能同时被 2, 5, 3 整除。求 A + B 的最大值。",
    "fields": [
      {
        "key": "sum",
        "label": "A+B 最大值"
      }
    ],
    "answer": {
      "sum": 9
    },
    "hint": "被 2 和 5 整除意味着 B 只能是 0。"
  },
  "knowledgePoints": [
    {
      "slug": "divisibility",
      "name": "整除特征",
      "summary": "常见小因数的整除规律：看尾数、看数字和、看奇偶位差——秒判能否整除。",
    },
  ],
  "tags": [
    "整除特征"
  ]
} satisfies ProblemData;
