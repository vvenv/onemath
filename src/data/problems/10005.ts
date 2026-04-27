import type { ProblemData } from "@/types/problem";

export default {
  "id": "10005",
  "title": "彩灯之谜·余数周期",
  "grade": "三年级",
  "module": "杂题",
  "difficulty": "基础",
  "question": "为迎接节日，公园里安装了一排彩灯，按照“3盏红灯、2盏黄灯、1盏蓝灯、2盏绿灯”的顺序循环排列。请问第2026盏灯是什么颜色？在这2026盏灯中，红灯一共有多少盏？",
  "solutions": [
    {
      "key": "cycle",
      "label": "周期法",
      "steps": [
        "周期 8 盏，2026 ÷ 8 = 253 余 2，第 2026 盏为红色（前 2 盏仍红灯），红灯总数 = 253 × 3 + 2 = 761 盏。"
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
      "last_person_type": "老师",
      "girl_count": 78
    },
    "hint": "先算出周期长度，再根据余数判断最后一人身份。计算总数时，先算整周期内的数量，再加上余数中对应的数量。"
  },
  "knowledgePoints": [
    {
      "slug": "periodicity",
      "name": "周期问题",
      "summary": "找到循环节长度 T，用 n 除以 T 的余数定位第 n 项；余数为 0 时取一个完整周期的末项。",
    },
  ],
  "tags": ["周期问题"]
} satisfies ProblemData;
