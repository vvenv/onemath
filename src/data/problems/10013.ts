import type { ProblemData } from "@/types/problem";

export default {
  "id": "10013",
  "title": "追及问题·基本追及",
  "grade": "四年级",
  "module": "行程",
  "difficulty": "基础",
  "question": "哥哥和弟弟去上学，弟弟先出发，每分钟走40米。5分钟后，哥哥从同一地点出发去追弟弟，哥哥每分钟走60米。请问哥哥几分钟后能追上弟弟？",
  "solutions": [
    {
      "key": "speed_diff",
      "label": "速度差法",
      "steps": [
        "弟弟先走的路程（追及路程）：40 × 5 = 200（米）。",
        "哥哥和弟弟的速度差：60 − 40 = 20（米/分）。",
        "追及时间 = 追及路程 ÷ 速度差：200 ÷ 20 = 10（分钟）。"
      ],
      "scenes": [
        {
          "kind": "number-line",
          "min": 0,
          "max": 800,
          "points": [
            {
              "value": 0,
              "label": "哥哥起点",
              "tone": "primary"
            },
            {
              "value": 200,
              "label": "弟弟 5 分钟后",
              "sublabel": "40×5",
              "tone": "muted"
            },
            {
              "value": 600,
              "label": "相遇",
              "sublabel": "追上",
              "tone": "accent"
            }
          ],
          "segments": [
            {
              "from": 0,
              "to": 200,
              "label": "弟弟先走 200 米",
              "tone": "muted"
            },
            {
              "from": 200,
              "to": 600,
              "label": "追及路程 = 200 米",
              "tone": "primary"
            }
          ],
          "caption": "哥哥从 0 出发；弟弟已在 200 米处"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "哥哥速度",
              "value": 60,
              "max": 60,
              "tone": "primary"
            },
            {
              "label": "弟弟速度",
              "value": 40,
              "max": 60,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "速度差 = 60 − 40 = 20 米/分"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "追及路程",
              "rhs": "40 × 5 = 200 米"
            },
            {
              "lhs": "速度差",
              "rhs": "60 − 40 = 20 米/分"
            },
            {
              "lhs": "追及时间",
              "rhs": "200 ÷ 20 = 10 分钟",
              "status": "keep"
            }
          ],
          "caption": "追及时间 = 追及路程 ÷ 速度差"
        }
      ]
    }
  ],
  "variant": {
    "question": "一辆货车以每小时45千米的速度从A地出发，2小时后，一辆轿车也从A地出发去追货车，轿车速度是每小时65千米。轿车几小时能追上货车？",
    "fields": [
      {
        "key": "hours",
        "label": "追及时间（小时）"
      }
    ],
    "answer": {
      "hours": 4.5
    },
    "hint": "先算出货车在轿车出发前已经走了多远。"
  },
  "tags": ["相遇追及"]
} satisfies ProblemData;
