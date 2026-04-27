import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10074-1.svg?raw";

export default {
  "id": "10074",
  "title": "车站选址·总距离最短",
  "grade": "五年级",
  "module": "杂题",
  "difficulty": "基础",
  "question": "一条笔直的公路上自西向东有 5 个村子 A、B、C、D、E，它们到公路起点的距离（单位：千米）依次是 0、2、5、8、12。各村的住户数分别是 30、20、40、25、15 户。现在要在 A、B、C、D、E 中选一个村修建车站，使所有村的住户到车站的路程总和（住户数 × 该村到车站的距离，再求和）最小。应当选哪个村？最小总路程是多少（单位：户·千米）？",
  "figures": [
    {
      "svg": svg1,
      "caption": "5 个村子的位置（km）与住户数（户）",
      "alt": "公路沿线 5 个村子分布"
    }
  ],
  "solutions": [
    {
      "key": "enumerate",
      "label": "逐村枚举法",
      "steps": [
        "五种选址总路程：A=620, B=480, C=390, D=540, E=940，最小值 390 在 C。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "A",
              "value": 620,
              "max": 940
            },
            {
              "label": "B",
              "value": 480,
              "max": 940
            },
            {
              "label": "C",
              "value": 390,
              "max": 940,
              "tone": "primary",
              "marker": true
            },
            {
              "label": "D",
              "value": 540,
              "max": 940
            },
            {
              "label": "E",
              "value": 940,
              "max": 940
            }
          ],
          "caption": "5 种选址的总路程（户·千米）"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🚉",
              "count": "C 村",
              "label": "选址"
            },
            {
              "icon": "📏",
              "count": 390,
              "label": "户·千米"
            }
          ],
          "caption": "最小总路程"
        }
      ]
    },
    {
      "key": "weightedMedian",
      "label": "加权中位数法",
      "steps": [
        "总户数130，累计住户A=30, A+B=50, A+B+C=90(首次≥65)，故加权中位数为C（与枚举法一致）。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "住户累计 (A→E)",
              "rhs": "30, 50, 90, 115, 130"
            },
            {
              "lhs": "总数一半",
              "rhs": "130 ÷ 2 = 65"
            },
            {
              "lhs": "首次累计 ≥ 65 的村",
              "rhs": "C（累计 90）",
              "badge": "加权中位"
            }
          ],
          "caption": "加权中位数快速定位最优点"
        }
      ]
    }
  ],
  "variant": {
    "question": "一条笔直公路上 4 个村子距起点的距离为 0、3、7、10（km），住户数分别为 10、30、20、15 户。在某个村建车站，总路程最小时车站建在哪个村？最小总路程是多少（户·千米）？",
    "fields": [
      {
        "key": "village",
        "label": "选址村",
        "type": "text",
        "enum": [
          "A",
          "B",
          "C",
          "D"
        ]
      },
      {
        "key": "sum",
        "label": "最小总路程",
        "type": "number"
      }
    ],
    "answer": {
      "village": "B",
      "sum": 215
    },
    "hint": "总户数 75，累计 10, 40, 60, 75；首次过半在 B 村。在 B 处总路程 = 10·3 + 30·0 + 20·4 + 15·7 = 30+0+80+105 = 215。再核算 C：10·7+30·4+20·0+15·3 = 70+120+0+45 = 235。对比：建 A 得 10·0+30·3+20·7+15·10 = 0+90+140+150 = 380；建 B 得 215；建 C 得 235；建 D 得 10·10+30·7+20·3+15·0 = 100+210+60+0 = 370。最小为 B 的 215。"
  },
  "tags": ["调运选址"]
} satisfies ProblemData;
