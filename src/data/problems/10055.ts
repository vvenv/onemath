import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10055-1.svg?raw";

export default {
  "id": "10055",
  "title": "比例行程·变速问题",
  "grade": "六年级",
  "module": "travel",
  "difficulty": "进阶",
  "question": "小明从家到学校，如果每分钟走 60 米，会迟到 5 分钟；如果每分钟走 80 米，会提前 3 分钟到达。小明家到学校的距离是多少米？",
  "figures": [
    {
      "svg": svg1,
      "caption": "小明以两种速度行走，时间相差 5 + 3 = 8 分钟",
      "alt": "线段图：家到学校，标注两种速度和对应的时间差"
    }
  ],
  "solutions": [
    {
      "key": "ratio",
      "label": "比例法",
      "steps": [
        "分析题意：按 60 米/分钟走，在规定时间到达时，还差 60 × 5 = 300 米到学校。",
        "按 80 米/分钟走，在规定时间到达时，会多走 80 × 3 = 240 米。",
        "两种速度下，在规定时间内所走路程相差：300 + 240 = 540 米。",
        "两种速度相差：80 - 60 = 20 米/分钟。",
        "规定时间 = 路程差 ÷ 速度差 = 540 ÷ 20 = 27（分钟）。",
        "家到学校的距离：按第一种速度，60 × (27 + 5) = 60 × 32 = 1920 米。",
        "验证：按第二种速度，80 × (27 - 3) = 80 × 24 = 1920 米。"
      ],
      "scenes": [
        {
          "kind": "number-line",
          "min": 0,
          "max": 2500,
          "points": [
            {
              "value": 0,
              "label": "家"
            },
            {
              "value": 1920,
              "label": "学校",
              "tone": "primary"
            },
            {
              "value": 1620,
              "label": "60m/min 27分到达位置",
              "tone": "muted"
            },
            {
              "value": 2160,
              "label": "80m/min 27分到达位置",
              "tone": "accent"
            }
          ],
          "segments": [
            {
              "from": 1620,
              "to": 1920,
              "label": "差300米",
              "tone": "muted"
            },
            {
              "from": 1920,
              "to": 2160,
              "label": "多240米",
              "tone": "accent"
            }
          ],
          "caption": "以规定时间 27 分钟为基准，两种速度下到达的位置与学校的距离差"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "60m/min 落后距离",
              "rhs": "60 × 5 = 300",
              "status": "keep"
            },
            {
              "lhs": "80m/min 超出距离",
              "rhs": "80 × 3 = 240",
              "status": "keep"
            },
            {
              "lhs": "总路程差",
              "rhs": "300 + 240 = 540",
              "status": "keep"
            },
            {
              "lhs": "速度差",
              "rhs": "80 - 60 = 20",
              "status": "keep"
            },
            {
              "lhs": "规定时间",
              "rhs": "540 ÷ 20 = 27",
              "status": "keep"
            }
          ],
          "caption": "通过路程差和速度差求出规定时间"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "第一种用时",
              "value": 32,
              "max": 32,
              "tone": "muted"
            },
            {
              "label": "第二种用时",
              "value": 24,
              "max": 32,
              "tone": "primary"
            }
          ],
          "caption": "时间对比：32 分钟 vs 24 分钟，相差 8 分钟"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "⏰",
              "count": 27,
              "label": "规定时间 (分钟)"
            },
            {
              "icon": "📏",
              "count": 1920,
              "label": "全程距离 (米)"
            }
          ],
          "caption": "小明家到学校 1920 米"
        }
      ]
    }
  ],
  "variant": {
    "question": "某人从甲地到乙地，如果速度提高 20%，可以比原定时间提前 1 小时到达。如果先按原速行驶 120 千米，再将速度提高 25%，可以提前 40 分钟到达。甲、乙两地相距多少千米？",
    "fields": [
      {
        "key": "distance",
        "label": "距离（千米）"
      }
    ],
    "answer": {
      "distance": 270
    },
    "hint": "速度比 1:1.2 = 5:6，时间比 6:5。提前1份对应1小时，原时间6小时。第二部分：120千米后，速度比 1:1.25 = 4:5，时间比 5:4。提前1份对应40分钟(2/3小时)，此段原时间 5×(2/3)=10/3小时。"
  },
  "tags": []
} satisfies ProblemData;
