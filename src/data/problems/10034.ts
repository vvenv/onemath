import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10034-1.svg?raw";
import svg2 from "./figures/10034-2.svg?raw";
import svg3 from "./figures/10034-3.svg?raw";

export default {
  "id": "10034",
  "title": "加乘原理·路线选择",
  "grade": "四年级",
  "module": "计数",
  "difficulty": "基础",
  "question": "如图，从A地到B地有3条路可走，从B地到C地有4条路可走，从A地直接到C地有2条路可走。那么从A地到C地一共有多少种不同的走法？",
  "figures": [
    {
      "svg": svg1,
      "caption": "A到B有3条路，B到C有4条路，A直达C有2条路",
      "alt": "路线图：A、B、C三地之间的道路连接情况"
    }
  ],
  "solutions": [
    {
      "key": "addition-multiplication",
      "label": "加乘原理分析法",
      "steps": [
        "经过B：3 × 4 = 12 种；直达：2 种；总计 = 12 + 2 = 14 种。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "第一类：经过B。A→B有3种，B→C有4种，乘法原理：3×4=12种"
        },
        {
          "kind": "svg",
          "svg": svg3,
          "caption": "第二类：直达。A直接到C有2种走法"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🛣️",
              "count": 12,
              "label": "经过B"
            },
            {
              "icon": "🛤️",
              "count": 2,
              "label": "直达"
            },
            {
              "icon": "✅",
              "count": 14,
              "label": "总计"
            }
          ],
          "caption": "加法原理：12 + 2 = 14 种不同的走法"
        }
      ]
    }
  ],
  "variant": {
    "question": "从甲地到乙地有2条路，乙地到丙地有5条路，甲地直接到丙地有3条路。从甲地到丙地有多少种走法？",
    "fields": [
      {
        "key": "total",
        "label": "总走法数"
      }
    ],
    "answer": {
      "total": 13
    },
    "hint": "经过乙地：2×5=10种；直达：3种。合计13种。"
  },
  "knowledgePoints": [
    {
      "slug": "additive-multiplicative",
      "name": "加乘原理",
      "summary": "分类相加，分步相乘。判断“分类”还是“分步”，是计数题的第一关。",
    },
  ],
  "tags": ["加乘原理"]
} satisfies ProblemData;
