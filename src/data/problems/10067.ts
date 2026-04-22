import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10067-1.svg?raw";

export default {
  "id": "10067",
  "title": "装信错排·欧拉问题",
  "grade": "六年级",
  "module": "misc",
  "difficulty": "挑战",
  "question": "有 4 封信分别写给 4 位不同的收信人，对应有 4 个编号的信封（第 i 封信的“正确信封”就是编号为 i 的那个）。现在把这 4 封信装进 4 个信封里，每个信封恰好装 1 封。要求每封信都装错——即 4 封信全部都没有装进自己的正确信封。一共有多少种装法？",
  "figures": [
    {
      "svg": svg1,
      "caption": "每个信封里装的信，编号都要与信封编号不同",
      "alt": "4封信全部错位装入4个信封"
    }
  ],
  "solutions": [
    {
      "key": "enumerate",
      "label": "枚举法",
      "steps": [
        "分析：用序列记录各信封装的信号。按信封 1 装 2、3、4 分三类，每类对剩下 3 个位置继续求全错位数。",
        "三类各得 3 种：信封 1=2 → (2,1,4,3)/(2,3,4,1)/(2,4,1,3)；=3 → (3,1,4,2)/(3,4,1,2)/(3,4,2,1)；=4 → (4,1,2,3)/(4,3,1,2)/(4,3,2,1)。合计 9 种。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "信封 1 装信 2",
              "rhs": "3 种"
            },
            {
              "lhs": "信封 1 装信 3",
              "rhs": "3 种"
            },
            {
              "lhs": "信封 1 装信 4",
              "rhs": "3 种"
            },
            {
              "lhs": "合计",
              "rhs": "3 + 3 + 3 = 9",
              "badge": "结论"
            }
          ],
          "caption": "按信封 1 装的信号分类"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "✉️",
              "count": 9,
              "label": "种全错装法"
            }
          ],
          "caption": "4 封信全部装错：9 种"
        }
      ]
    },
    {
      "key": "recurrence",
      "label": "递推公式法（错排数 D_n）",
      "steps": [
        "分析：记 D_n 为 n 封信全部装错的方法数（错排数），递推 D_n = (n − 1)(D_{n−1} + D_{n−2})，初始 D_1 = 0、D_2 = 1。",
        "逐步代入：D_3 = 2·(1 + 0) = 2，D_4 = 3·(2 + 1) = 9，与枚举一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "D_1",
              "rhs": "0"
            },
            {
              "lhs": "D_2",
              "rhs": "1"
            },
            {
              "lhs": "D_3",
              "rhs": "2 × (1 + 0) = 2"
            },
            {
              "lhs": "D_4",
              "rhs": "3 × (2 + 1) = 9",
              "badge": "结论"
            }
          ],
          "caption": "错排递推 D_n = (n−1)(D_{n−1} + D_{n−2})"
        }
      ]
    },
    {
      "key": "inclusionExclusion",
      "label": "容斥原理",
      "steps": [
        "分析：总装法 4! = 24。记 A_i 为「第 i 封装对」，用容斥求 |A_1 ∪ … ∪ A_4|：Σ|A_i| = C(4,1)·3! = 24；Σ|A_i ∩ A_j| = C(4,2)·2! = 12；依次 4、1。",
        "至少一封装对 = 24 − 12 + 4 − 1 = 15；全部装错 = 24 − 15 = 9。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "总装法",
              "rhs": "4! = 24"
            },
            {
              "lhs": "至少一封对",
              "rhs": "24 − 12 + 4 − 1 = 15"
            },
            {
              "lhs": "全部错",
              "rhs": "24 − 15 = 9",
              "badge": "结论"
            }
          ],
          "caption": "容斥原理的另一种推导"
        }
      ]
    }
  ],
  "variant": {
    "question": "5 封信分别对应 5 个信封，要求每封信都装错（没有任何一封放入自己的信封），共有多少种装法？",
    "fields": [
      {
        "key": "answer",
        "label": "装法数",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 44
    },
    "hint": "用错排递推 D_n = (n−1)(D_{n−1} + D_{n−2})：D_5 = 4 × (9 + 2) = 44。"
  },
  "tags": [
    "递推法",
    "容斥原理",
    "枚举法"
  ]
} satisfies ProblemData;
