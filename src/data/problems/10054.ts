import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10054-1.svg?raw";
import svg2 from "./figures/10054-2.svg?raw";

export default {
  "id": "10054",
  "title": "流水行船·基础",
  "grade": "五年级",
  "module": "行程",
  "difficulty": "基础",
  "question": "一艘轮船从甲港开往乙港，顺水航行需要 4 小时，逆水返回需要 6 小时。已知甲、乙两港相距 120 千米。求这艘轮船在静水中的速度和水流的速度。",
  "figures": [
    {
      "svg": svg1,
      "caption": "轮船从甲港到乙港顺水4小时，返回逆水6小时",
      "alt": "甲港到乙港相距120千米，标注顺水4小时，逆水6小时"
    }
  ],
  "solutions": [
    {
      "key": "water",
      "label": "公式法",
      "steps": [
        "顺水速度 = 120 ÷ 4 = 30 km/h，逆水速度 = 120 ÷ 6 = 20 km/h。静水 = (30 + 20) ÷ 2 = 25 km/h，水流 = (30 − 20) ÷ 2 = 5 km/h。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "顺水速度",
              "rhs": "120 ÷ 4 = 30",
              "status": "keep"
            },
            {
              "lhs": "逆水速度",
              "rhs": "120 ÷ 6 = 20",
              "status": "keep"
            }
          ],
          "caption": "速度计算"
        },
        {
          "kind": "number-line",
          "min": 0,
          "max": 35,
          "points": [
            {
              "value": 20,
              "label": "逆水 20",
              "tone": "muted"
            },
            {
              "value": 25,
              "label": "静水 25",
              "tone": "primary"
            },
            {
              "value": 30,
              "label": "顺水 30",
              "tone": "accent"
            }
          ],
          "segments": [
            {
              "from": 20,
              "to": 25,
              "label": "水流 5",
              "tone": "primary"
            },
            {
              "from": 25,
              "to": 30,
              "label": "水流 5",
              "tone": "primary"
            }
          ],
          "caption": "静水速度 = (30 + 20) ÷ 2 = 25；水流速度 = (30 - 20) ÷ 2 = 5"
        },
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "顺水：船速 + 水速；逆水：船速 - 水速"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🚢",
              "count": 25,
              "label": "静水速度 (km/h)"
            },
            {
              "icon": "💧",
              "count": 5,
              "label": "水流速度 (km/h)"
            }
          ],
          "caption": "轮船静水速度 25 千米/小时，水流速度 5 千米/小时"
        }
      ]
    }
  ],
  "variant": {
    "question": "一艘船在静水中的速度是 15 千米/小时，水流速度是 3 千米/小时。该船从A地顺流而下到B地，再逆流返回A地，共用了 8 小时。A、B两地相距多少千米？",
    "fields": [
      {
        "key": "distance",
        "label": "A、B距离（千米）"
      }
    ],
    "answer": {
      "distance": 57.6
    },
    "hint": "顺水速度 = 15 + 3 = 18 km/h，逆水速度 = 15 - 3 = 12 km/h。设距离为 x，则 x/18 + x/12 = 8，解得 x = 57.6 千米。"
  },
  "tags": ["流水行船"]
} satisfies ProblemData;
