import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10082-1.svg?raw";

export default {
  "id": "10082",
  "title": "抢数游戏·必胜首着",
  "grade": "四年级",
  "module": "misc",
  "difficulty": "基础",
  "question": "甲、乙两人轮流报数：甲先报，乙接着报。每人每次可以连着报 1 个、2 个或 3 个连续的自然数（例如上一次报到 7，这次可以只报 8，也可以报 8、9 或 8、9、10）。从 1 开始报起，谁报到 30，谁就获胜。问甲（先手）能否必胜？他第一次应当报到几？",
  "figures": [
    {
      "svg": svg1,
      "caption": "先报到 30 者胜",
      "alt": "抢数游戏说明"
    }
  ],
  "solutions": [
    {
      "key": "backtrack",
      "label": "倒推法找制胜点",
      "steps": [
        "分析：每人每次能推进 1、2 或 3 个数，两人一轮的净推进正好是 1 + 3、2 + 2、3 + 1 这三种都等于 4。从终点 30 每次倒退 4 得到制胜点 30、26、22、18、14、10、6、2——谁报到它，以后都能用「补 4」策略继续占据下一个制胜点。",
        "先手甲第一次能报到 1、2 或 3，取最小制胜点 2（即报 1, 2）即可。之后乙报 k 个，甲就补 4 − k 个，依次占据 2 → 6 → 10 → 14 → 18 → 22 → 26 → 30，甲必胜。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "制胜点（从 30 倒退）",
              "rhs": "30, 26, 22, 18, 14, 10, 6, 2"
            },
            {
              "lhs": "甲首着应报到",
              "rhs": "2（即 “1, 2”）",
              "status": "keep",
              "badge": "首着"
            },
            {
              "lhs": "之后每轮补齐到 4 个",
              "rhs": "乙 k 个 → 甲 (4−k) 个"
            }
          ],
          "caption": "“4 的补数”策略"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🏆",
              "count": "先手甲",
              "label": "必胜方"
            },
            {
              "icon": "🎯",
              "count": 2,
              "label": "首次报到"
            }
          ],
          "caption": "结论"
        }
      ]
    }
  ],
  "variant": {
    "question": "规则相同，改为从 1 开始报数，谁先报到 20 谁胜；每人每次报 1 或 2 个连续数。先手必胜时，第一次应报到几？",
    "fields": [
      {
        "key": "answer",
        "label": "首次报到",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 2
    },
    "hint": "每次最多推进 2，20 倒退每次减 3 → 制胜点 20, 17, 14, 11, 8, 5, 2；先手首报到 2。"
  },
  "tags": [
    "逆向推理"
  ]
} satisfies ProblemData;
