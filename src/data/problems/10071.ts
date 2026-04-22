import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10071-1.svg?raw";

export default {
  "id": "10071",
  "title": "烙饼问题·3 张饼最短时间",
  "grade": "四年级",
  "module": "杂题",
  "difficulty": "基础",
  "question": "用一口平底锅烙饼，锅里一次最多同时烙 2 张饼。每张饼有正反两面，每面都要烙 3 分钟才熟。现在要烙 3 张饼，最少需要多少分钟？",
  "figures": [
    {
      "svg": svg1,
      "caption": "平底锅每次最多 2 张，单面 3 分钟",
      "alt": "平底锅烙饼示意"
    }
  ],
  "solutions": [
    {
      "key": "rotate",
      "label": "交替轮换法",
      "steps": [
        "分析：3 饼 × 2 面 = 6 面，锅每 3 分钟烙 2 面，下限 6 ÷ 2 × 3 = 9 分钟。只要每 3 分钟段锅都满 2 面，就能达到下限。",
        "构造（A、B、C 各两面 1/2）：0–3 min 烙 A1+B1；3–6 min 烙 A2+C1（换下 B）；6–9 min 烙 B2+C2。3 段锅都满，总 9 分钟即最优。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "第 1 段 (0–3 min)",
              "rhs": "锅：A1 + B1"
            },
            {
              "lhs": "第 2 段 (3–6 min)",
              "rhs": "锅：A2 + C1"
            },
            {
              "lhs": "第 3 段 (6–9 min)",
              "rhs": "锅：B2 + C2"
            },
            {
              "lhs": "总时间",
              "rhs": "3 + 3 + 3 = 9 分钟",
              "status": "keep",
              "badge": "最优"
            }
          ],
          "caption": "让锅在每个时间段都装满 2 面"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "⏱️",
              "count": 9,
              "label": "分钟"
            }
          ],
          "caption": "3 张饼最少用时"
        }
      ]
    },
    {
      "key": "bound",
      "label": "下限估计法",
      "steps": [
        "分析：锅每 3 分钟最多烙 2 面，3 张饼共 6 个面要烙熟。理论最少时间 ≥ 6 ÷ 2 × 3 = 9 分钟。",
        "只要能找到一种安排恰好用 9 分钟且每面都烙熟，就证明 9 分钟是最优解。",
        "前一种方法的交替轮换就构造了这种安排，因此下限 9 分钟可以达到，最少用时就是 9 分钟。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "面·次总数",
              "rhs": "3 张 × 2 面 = 6"
            },
            {
              "lhs": "每 3 分钟最多完成",
              "rhs": "2 面"
            },
            {
              "lhs": "时间下限",
              "rhs": "6 ÷ 2 × 3 = 9 分钟"
            }
          ],
          "caption": "下限与构造都能到 9 分钟"
        }
      ]
    }
  ],
  "variant": {
    "question": "还是这样的平底锅，一次最多烙 2 张饼，每面需 3 分钟。如果要烙 5 张饼，最少需要多少分钟？",
    "fields": [
      {
        "key": "answer",
        "label": "最少分钟数",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 15
    },
    "hint": "5 张饼共 10 个面，下限 = 10 ÷ 2 × 3 = 15 分钟，存在可行排法。"
  },
  "tags": ["时间统筹"]
} satisfies ProblemData;
