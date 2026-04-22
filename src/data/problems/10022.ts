import type { ProblemData } from "@/types/problem";

export default {
  "id": "10022",
  "title": "逻辑推理·真假话",
  "grade": "五年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "警察抓获了四个嫌疑人 A, B, C, D。已知只有一人是小偷。他们的供词如下：\nA：不是我。\nB：是 C。\nC：是 D。\nD：C 在胡说。\n已知只有一个人说了真话。请问谁是小偷？",
  "solutions": [
    {
      "key": "contradiction",
      "label": "矛盾分析法",
      "steps": [
        "分析：C 说「是 D」与 D 说「C 胡说」互相否定，必然一真一假。题目只有一句真话，那句真话必落在 C、D 身上，所以 A、B 都是假话。",
        "由 B「是 C」为假 ⇒ 小偷不是 C；由 A「不是我」为假 ⇒ 小偷就是 A。",
        "验证：若 A 是小偷，则 A、B、C 皆假，D「C 胡说」为真，恰好一句真话 ✓。"
      ],
      "scenes": [
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我"
            },
            {
              "speaker": "B",
              "claim": "是 C"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "highlight": "contradiction",
              "badge": "⚡ 与 D 矛盾"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "highlight": "contradiction",
              "badge": "⚡ 与 C 矛盾"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "caption": "C 和 D 的供词互相矛盾"
        },
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我"
            },
            {
              "speaker": "B",
              "claim": "是 C"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "highlight": "contradiction",
              "badge": "一真一假"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "highlight": "contradiction",
              "badge": "一真一假"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "caption": "互相矛盾 ⇒ C、D 中必有一真一假"
        },
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我"
            },
            {
              "speaker": "B",
              "claim": "是 C"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "highlight": "contradiction",
              "badge": "唯一真话在此"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "highlight": "contradiction",
              "badge": "唯一真话在此"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "note": "全场只有一句真话 ⇒ 必定落在 C 或 D 身上",
          "caption": "真话必在 C、D 之中"
        },
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我",
              "verdict": "false"
            },
            {
              "speaker": "B",
              "claim": "是 C",
              "verdict": "false"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "highlight": "contradiction"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "highlight": "contradiction"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "caption": "由此 A、B 都说的是假话"
        },
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我",
              "verdict": "false"
            },
            {
              "speaker": "B",
              "claim": "是 C",
              "verdict": "false",
              "badge": "⇒ 小偷 ≠ C"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "highlight": "muted"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "highlight": "muted"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "caption": "B 假 ⇒ 小偷不是 C"
        },
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我",
              "verdict": "false",
              "highlight": "target",
              "badge": "小偷"
            },
            {
              "speaker": "B",
              "claim": "是 C",
              "verdict": "false"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "highlight": "muted"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "highlight": "muted"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "caption": "A 假 ⇒ 小偷就是 A"
        },
        {
          "kind": "statement-table",
          "rows": [
            {
              "speaker": "A",
              "claim": "不是我",
              "verdict": "false",
              "highlight": "target",
              "badge": "小偷"
            },
            {
              "speaker": "B",
              "claim": "是 C",
              "verdict": "false"
            },
            {
              "speaker": "C",
              "claim": "是 D",
              "verdict": "false"
            },
            {
              "speaker": "D",
              "claim": "C 在胡说",
              "verdict": "true",
              "badge": "唯一真话"
            }
          ],
          "headers": {
            "speaker": "嫌疑人",
            "claim": "供词"
          },
          "note": "3 假 + 1 真，符合“只有一人说真话”",
          "caption": "验证通过"
        }
      ]
    }
  ],
  "variant": {
    "question": "甲、乙、丙、丁四人参加比赛。对于名次，他们猜测：甲：我不是第一。乙：我不是第二。丙：甲是第一。丁：丙是第四。已知只有一人猜错，请问谁是第一？",
    "fields": [
      {
        "key": "first",
        "type": "text",
        "label": "第一名",
        "enum": [
          "甲",
          "乙",
          "丙",
          "丁"
        ]
      }
    ],
    "answer": {
      "first": "甲"
    },
    "hint": "找出哪两个人说的话是互斥的（甲和丙）。"
  },
  "tags": []
} satisfies ProblemData;
