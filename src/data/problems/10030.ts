import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10030-1.svg?raw";
import svg2 from "./figures/10030-2.svg?raw";

export default {
  "id": "10030",
  "title": "巧求周长·平移法",
  "grade": "三年级",
  "module": "几何",
  "difficulty": "基础",
  "question": "如图，一个机器零件的横截面由一个长方形和两个凸起的正方形组成。已知长方形的长是 12 厘米，宽是 6 厘米。两个正方形的边长都是 3 厘米。这个横截面的周长是多少厘米？",
  "figures": [
    {
      "alt": "机器零件横截面示意图",
      "caption": "横截面：长方形带上方和左侧两个凸起的正方形。",
      "svg": svg1
    }
  ],
  "solutions": [
    {
      "key": "translation",
      "label": "线段平移法",
      "steps": [
        "平移凸起线段后，周长等于长 12+3=15 厘米、宽 6+3=9 厘米的长方形周长：(15 + 9) × 2 = 48 厘米。"
      ],
      "scenes": [
        {
          "kind": "pit-diagram",
          "removed": [
            "top",
            "right"
          ],
          "added": [
            "bottom",
            "left"
          ],
          "caption": "步骤1：观察凸起的部分（左侧和上方）。目标是将缺口补上，转化为长方形。"
        },
        {
          "kind": "pit-diagram",
          "removed": [],
          "added": [
            "top",
            "bottom",
            "left",
            "right"
          ],
          "caption": "步骤2：想象把上方凸起的小线段（红色）平移到下方，把左侧凸起的小线段（蓝色）平移到右侧。平移后，图形的周长没有改变，但形状变成了一个规则的大长方形。"
        },
        {
          "kind": "svg",
          "alt": "平移法补齐后的大长方形示意图",
          "caption": "平移后，原图形的周长等价于外接大长方形（绿色）的周长：15 × 9 厘米。",
          "svg": svg2
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "大长方形长",
              "value": 15,
              "max": 15,
              "tone": "primary"
            },
            {
              "label": "大长方形宽",
              "value": 9,
              "max": 15,
              "tone": "muted"
            }
          ],
          "caption": "平移后得到一个长 12 + 3 = 15 厘米，宽 6 + 3 = 9 厘米的长方形。"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "📏",
              "count": 48,
              "label": "最终周长 (厘米)"
            }
          ],
          "caption": "周长 = (15 + 9) × 2 = 48 厘米"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个长方形操场，长 80 米，宽 50 米。在操场中间挖去一个长 30 米，宽 20 米的长方形花坛。剩余部分的周长是多少米？",
    "fields": [
      {
        "key": "perimeter",
        "label": "周长"
      }
    ],
    "answer": {
      "perimeter": 260
    },
    "hint": "挖去内部图形，周长反而会增加，等于大长方形周长加上小长方形周长。"
  },
  "knowledgePoints": [
    {
      "slug": "translation-method",
      "name": "平移法",
      "summary": "把图形的一部分沿某方向平移，拼出规则图形或抵消阴影。",
    },
  ],
  "tags": [
    "平移法"
  ]
} satisfies ProblemData;
