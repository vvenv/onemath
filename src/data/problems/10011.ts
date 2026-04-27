import type { ProblemData } from "@/types/problem";

export default {
  "id": "10011",
  "title": "差倍问题·基本差倍",
  "grade": "三年级",
  "module": "应用题",
  "difficulty": "基础",
  "question": "学校合唱队的人数比舞蹈队多24人，合唱队人数是舞蹈队的3倍。合唱队和舞蹈队各有多少人？",
  "solutions": [
    {
      "key": "diff_multiple",
      "label": "差倍·份数法",
      "steps": [
        "舞蹈队 1 份，合唱队 3 份，差 2 份 = 24 人 ⇒ 1 份 = 12 人。合唱队 36 人，舞蹈队 12 人。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "舞蹈队 1 份",
              "value": 12,
              "max": 36,
              "tone": "muted"
            },
            {
              "label": "合唱队 3 份",
              "value": 36,
              "max": 36,
              "tone": "primary",
              "marker": true
            }
          ],
          "caption": "相差的 2 份 = 24 人 ⇒ 1 份 = 12 人"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "💃",
              "count": 12,
              "label": "舞蹈队"
            },
            {
              "icon": "🎤",
              "count": 36,
              "label": "合唱队"
            }
          ],
          "caption": "差 24 ✓，倍数 3 ✓"
        }
      ]
    },
    {
      "key": "equation",
      "label": "方程法",
      "steps": [
        "设舞蹈队 x 人，则合唱队 3x 人。",
        "两队人数差：3x − x = 24 ⇒ 2x = 24 ⇒ x = 12。",
        "舞蹈队 12 人，合唱队 3 × 12 = 36 人。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "3x − x",
              "rhs": "24",
              "note": "人数差"
            },
            {
              "lhs": "2x",
              "rhs": "24",
              "status": "keep"
            },
            {
              "lhs": "x",
              "rhs": "12",
              "status": "keep"
            }
          ],
          "caption": "解方程求 1 份（舞蹈队）"
        }
      ]
    }
  ],
  "variant": {
    "question": "爸爸的年龄比小明大28岁，且爸爸的年龄是小明的5倍。小明和爸爸各多少岁？",
    "fields": [
      {
        "key": "son",
        "label": "小明年龄"
      },
      {
        "key": "father",
        "label": "爸爸年龄"
      }
    ],
    "answer": {
      "son": 7,
      "father": 35
    },
    "hint": "年龄差对应的就是倍数差。"
  },
  "knowledgePoints": [
    {
      "slug": "shares-method",
      "name": "份数法",
      "summary": "把未知量抽象成整数“份”，把复杂的倍数 / 分数关系简化成整数份的加减。",
    },
    {
      "slug": "equation-method",
      "name": "方程法",
      "summary": "用字母表示未知量，按题意列等式，把推理交给代数运算。",
    },
  ],
  "tags": [
    "份数法",
    "方程法"
  ]
} satisfies ProblemData;
