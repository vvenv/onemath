import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10036-1.svg?raw";

export default {
  "id": "10036",
  "title": "容斥原理·重叠计数",
  "grade": "四年级",
  "module": "counting",
  "difficulty": "进阶",
  "question": "某班有45人，其中参加数学兴趣小组的有28人，参加语文兴趣小组的有25人，两个小组都参加的有12人。请问：两个小组都没有参加的有多少人？",
  "solutions": [
    {
      "key": "inclusion-exclusion",
      "label": "容斥原理",
      "steps": [
        "根据容斥原理，至少参加一个小组的人数 = 参加数学的人数 + 参加语文的人数 - 两个都参加的人数。",
        "至少参加一个小组的人数 = 28 + 25 - 12 = 41 人。",
        "两个小组都没有参加的人数 = 全班总人数 - 至少参加一个小组的人数。",
        "45 - 41 = 4 人。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "用韦恩图表示：数学28人，语文25人，交集12人"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "至少参加一个",
              "rhs": "28 + 25 − 12",
              "status": "keep"
            },
            {
              "lhs": "=",
              "rhs": "41 人",
              "badge": "容斥结果"
            }
          ],
          "caption": "步骤1：容斥原理求至少参加一个小组的人数"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "全班",
              "value": 45,
              "max": 45,
              "tone": "primary"
            },
            {
              "label": "至少参加一个",
              "value": 41,
              "max": 45,
              "tone": "muted"
            }
          ],
          "caption": "全班45人，至少参加一个的有41人"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "📊",
              "count": 4,
              "label": "都没有参加"
            }
          ],
          "caption": "45 - 41 = 4 人两个小组都没有参加"
        }
      ]
    }
  ],
  "variant": {
    "question": "在1~100的自然数中，能被2整除或能被3整除的数有多少个？",
    "fields": [
      {
        "key": "count",
        "label": "个数"
      }
    ],
    "answer": {
      "count": 67
    },
    "hint": "能被2整除：50个；能被3整除：33个；能被6整除（重叠）：16个。50+33-16=67。"
  },
  "tags": []
} satisfies ProblemData;
