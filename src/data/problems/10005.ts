import type { ProblemData } from "@/types/problem";

export default {
  "id": "10005",
  "title": "彩灯之谜·余数周期",
  "grade": "三年级",
  "module": "misc",
  "difficulty": "基础",
  "question": "为迎接节日，公园里安装了一排彩灯，按照“3盏红灯、2盏黄灯、1盏蓝灯、2盏绿灯”的顺序循环排列。请问第2026盏灯是什么颜色？在这2026盏灯中，红灯一共有多少盏？",
  "solutions": [
    {
      "key": "cycle",
      "label": "周期法",
      "steps": [
        "计算一个完整的彩灯周期包含的灯的数量：3 + 2 + 1 + 2 = 8 盏。",
        "用总数除以周期长度，看余数：2026 ÷ 8 = 253 个完整周期，余数为 2026 − 8 × 253 = 2。",
        "余数 2 意味着第2026盏灯是下一个周期的第2盏。在一个周期内，第1-3盏是红灯，第4-5盏是黄灯。",
        "所以，第2026盏灯是红色。",
        "计算红灯总数：每个完整周期内有 3 盏红灯。253 个完整周期有 253 × 3 = 759 盏。",
        "余下的 2 盏灯也全部是红灯，所以红灯总数为 759 + 2 = 761 盏。"
      ],
      "scenes": [
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔴",
              "count": 3
            },
            {
              "icon": "🟡",
              "count": 2
            },
            {
              "icon": "🔵",
              "count": 1
            },
            {
              "icon": "🟢",
              "count": 2
            }
          ],
          "separator": "→",
          "caption": "一个周期的彩灯序列：3红 + 2黄 + 1蓝 + 2绿 = 8盏"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "总灯数",
              "value": 2026,
              "max": 2026,
              "tone": "primary"
            },
            {
              "label": "整周期部分",
              "value": 2024,
              "max": 2026,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "2026 ÷ 8 = 253 余 2，整周期部分为 253 × 8 = 2024"
        },
        {
          "kind": "heads-split",
          "left": {
            "count": 253,
            "ticks": [
              {
                "count": 3
              }
            ],
            "tone": "accent",
            "caption": "整周期数：253个",
            "captionTone": "primary"
          },
          "right": {
            "count": 2,
            "ticks": [
              {
                "count": 1
              }
            ],
            "caption": "余数：2盏"
          },
          "caption": "2026 盏灯可分解为 253 个完整周期 + 2 盏余灯"
        },
        {
          "kind": "heads",
          "heads": {
            "count": 8,
            "ticks": [
              {
                "count": 3,
                "tone": "accent"
              },
              {
                "count": 5
              }
            ]
          },
          "caption": "在一个周期中，前3盏是红灯。余数2 < 3，说明余下的也是红灯。"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🔴",
              "count": 761,
              "label": "红灯总数"
            }
          ],
          "caption": "253 × 3 + 2 = 761 盏"
        }
      ]
    }
  ],
  "variant": {
    "question": "一列队伍按“2名男生、3名女生、1名老师”的规律重复排列，已知队伍共有156人。请问最后一名是男生、女生还是老师？队伍中一共有多少名女生？",
    "fields": [
      {
        "key": "last_person_type",
        "label": "最后一人身份",
        "type": "text",
        "enum": [
          "男生",
          "女生",
          "老师"
        ]
      },
      {
        "key": "girl_count",
        "label": "女生总数"
      }
    ],
    "answer": {
      "last_person_type": "男生",
      "girl_count": 78
    },
    "hint": "先算出周期长度，再根据余数判断最后一人身份。计算总数时，先算整周期内的数量，再加上余数中对应的数量。"
  },
  "tags": []
} satisfies ProblemData;
