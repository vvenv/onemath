import type { ProblemData } from "@/types/problem";

export default {
  "id": "10025",
  "title": "韩信点兵·余同问题",
  "grade": "六年级",
  "module": "数论",
  "difficulty": "进阶",
  "question": "一筐鸡蛋，1个1个拿正好拿完；2个2个拿剩1个；3个3个拿剩1个；4个4个拿剩1个；5个5个拿剩1个；6个6个拿剩1个；7个7个拿正好拿完。问这筐鸡蛋最少有多少个？",
  "solutions": [
    {
      "key": "lcm-remainder",
      "label": "公倍数与同余分析",
      "steps": [
        "N-1 是 [2,3,4,5,6]=60 的倍数，故 N=60k+1。验 k=5：N=301=7×43 ✓。最少 301 个。"
      ],
      "scenes": [
        {
          "kind": "number-line",
          "min": 0,
          "max": 60,
          "points": [
            {
              "value": 1,
              "label": "余数=1",
              "tone": "accent"
            },
            {
              "value": 60,
              "label": "公倍数=60",
              "tone": "primary"
            }
          ],
          "segments": [
            {
              "from": 1,
              "to": 60,
              "label": "N−1 的取值 (60的倍数)",
              "tone": "primary"
            }
          ],
          "caption": "N = 60k + 1 (k为自然数)"
        },
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "k",
            "claim": "N = 60k+1",
            "verdict": "是7的倍数？"
          },
          "rows": [
            {
              "speaker": "1",
              "claim": "61",
              "verdict": "false"
            },
            {
              "speaker": "2",
              "claim": "121",
              "verdict": "false"
            },
            {
              "speaker": "3",
              "claim": "181",
              "verdict": "false"
            },
            {
              "speaker": "4",
              "claim": "241",
              "verdict": "false"
            },
            {
              "speaker": "5",
              "claim": "301",
              "verdict": "true",
              "highlight": "target"
            }
          ],
          "caption": "枚举检验：当 k=5 时，N=301 能被 7 整除"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🥚",
              "count": 301,
              "label": "最少鸡蛋数"
            }
          ],
          "caption": "验证：301 ÷ 2 = 150...1；...；301 ÷ 7 = 43"
        }
      ]
    }
  ],
  "variant": {
    "question": "一叠卡片，3张3张数余2张，5张5张数余2张，7张7张数余2张，最少有多少张？",
    "fields": [
      {
        "key": "cards",
        "label": "最少卡片数",
        "type": "number"
      }
    ],
    "answer": {
      "cards": 107
    },
    "hint": "卡片数 N 满足 N−2 是 3, 5, 7 的公倍数。[3,5,7]=105，所以 N=105+2=107。"
  },
  "knowledgePoints": [
    {
      "slug": "congruence",
      "name": "同余",
      "summary": "两个数除以 m 余数相同，记作 a ≡ b (mod m)。余数守加、守减、守乘——整除问题的万能语言。",
    },
    {
      "slug": "enumeration",
      "name": "枚举法",
      "summary": "按某个顺序把所有可能性“走一遍”，保证不重不漏。",
    },
  ],
  "tags": [
    "同余",
    "枚举法"
  ]
} satisfies ProblemData;
