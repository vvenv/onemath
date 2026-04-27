import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10108-1.svg?raw";

export default {
  "id": "10108",
  "title": "多重图形重叠·直线与圆周",
  "grade": "五年级",
  "module": "杂题",
  "difficulty": "进阶",
  "question": "如图，一个大圆上均匀分布 6 个位置 A, B, C, D, E, F；此外，3 条直径 AD、BE、CF 都过圆心（圆心是第 7 个位置 O）。共 7 个位置。把 1, 2, 3, 4, 5, 6, 7 各用一次填入这 7 格，要求：(A) 3 条直径上 3 个数字（两端 + 圆心）之和都相等；(B) 圆周上 6 个数字（A + B + … + F）之和等于某个指定值 K。\n如果规定 K = 21（圆周 6 数之和为 21），请求出圆心必须填几？每条直径的公共和 S 是多少？",
  "figures": [
    {
      "svg": svg1,
      "caption": "大圆 6 点 + 圆心 1 点 = 7 格；3 条直径",
      "alt": "圆周 + 直径的复合数阵"
    }
  ],
  "solutions": [
    {
      "key": "both",
      "label": "累加法",
      "steps": [
        "分析：设圆心 O 填 c。圆周 6 数之和 = K = 1+2+…+7 − c = 28 − c。条件 K = 21 给出 c = 28 − 21 = 7。所以圆心必须填 7。",
        "每条直径 3 个数之和 = 两端 + c。3 条直径两端总共 6 个不同位置（恰好是圆周 6 个点），所以三条直径之和累加 = (圆周 6 数之和) + 3c = 21 + 21 = 42。",
        "每条直径和 S 相等，因此 3S = 42，S = 14。",
        "验证存在：圆周 6 数为 {1,2,3,4,5,6}，要求把它们分成 3 对，每对和 = S − c = 14 − 7 = 7：{1,6}, {2,5}, {3,4}，恰好可行。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "K = 28 − c",
              "rhs": "→ c = 7"
            },
            {
              "lhs": "3S",
              "rhs": "K + 3c = 21 + 21 = 42"
            },
            {
              "lhs": "S",
              "rhs": "14",
              "status": "keep"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "同一图形（6 周 + 1 心 = 7 格，填 1–7），如果规定圆心填 1，问 3 条直径的公共和 S 是多少？",
    "fields": [
      {
        "key": "sum",
        "label": "S",
        "type": "number"
      }
    ],
    "answer": {
      "sum": 10
    },
    "hint": "K = 28 − 1 = 27；3S = K + 3c = 27 + 3 = 30；S = 10。"
  },
  "knowledgePoints": [
    {
      "slug": "accumulation-method",
      "name": "累加法",
      "summary": "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
    },
    {
      "slug": "center-number-method",
      "name": "中心数法",
      "summary": "三阶幻方的中心数 = 幻和 ÷ 3 = 所有数字平均值。",
    },
  ],
  "tags": [
    "累加法",
    "中心数法"
  ]
} satisfies ProblemData;
