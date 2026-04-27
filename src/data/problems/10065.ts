import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10065-1.svg?raw";

export default {
  "id": "10065",
  "title": "均匀分组·消序去重",
  "grade": "六年级",
  "module": "计数",
  "difficulty": "挑战",
  "question": "把 6 本各不相同的书，平均分成 3 堆（3 堆之间没有顺序之分，只看“哪几本书放在一起”）。一共有多少种不同的分法？",
  "figures": [
    {
      "svg": svg1,
      "caption": "三堆之间没有顺序，只看书的组合",
      "alt": "6本书分3堆"
    }
  ],
  "solutions": [
    {
      "key": "orderThenDivide",
      "label": "先分配再去重（消序法）",
      "steps": [
        "先假装 3 堆有区别，比如分别给 A、B、C 三个学生，每人 2 本。",
        "依次选书：给 A 选 2 本 C(6, 2) = 15 种；给 B 再从剩下 4 本选 2 本 C(4, 2) = 6 种；最后 2 本给 C，C(2, 2) = 1 种。",
        "按这种方式的分配数 = 15 × 6 × 1 = 90 种。",
        "由于题目要求 3 堆没有顺序，而上述方式把同一组三堆的 3! = 6 种“编号”都算成了不同结果，所以要除以 3!。",
        "最终分法 = 90 ÷ 6 = 15 种。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "先有序分配",
              "rhs": "C(6,2) × C(4,2) × C(2,2) = 15 × 6 × 1 = 90"
            },
            {
              "lhs": "3 堆相同大小",
              "rhs": "重复倍数 3! = 6"
            },
            {
              "lhs": "分堆数",
              "rhs": "90 ÷ 6 = 15",
              "badge": "结论"
            }
          ],
          "caption": "均匀分组要除以“相同大小堆数”的阶乘"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "📚",
              "count": 15,
              "label": "种分法"
            }
          ],
          "caption": "共 15 种分堆方法"
        }
      ]
    },
    {
      "key": "fixOne",
      "label": "固定参照物法",
      "steps": [
        "固定1本书选同堆 C(5,1)=5，剩4本平均分2堆 C(4,2)÷2!=3，总分法=5×3=15（与消序法一致）。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "选同堆的书",
              "rhs": "C(5, 1) = 5"
            },
            {
              "lhs": "剩 4 本平均分 2 堆",
              "rhs": "C(4, 2) ÷ 2! = 3"
            },
            {
              "lhs": "总分法",
              "rhs": "5 × 3 = 15",
              "badge": "结论"
            }
          ],
          "caption": "固定一本书所在堆，转化成更小问题"
        }
      ]
    }
  ],
  "variant": {
    "question": "把 6 本各不相同的书分给 3 个学生，每人 2 本（学生有区别），共有多少种分法？",
    "fields": [
      {
        "key": "answer",
        "label": "分法数",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 90
    },
    "hint": "学生有区别即“有序分配”：C(6,2) × C(4,2) × C(2,2) = 15 × 6 × 1 = 90。"
  },
  "knowledgePoints": [
    {
      "slug": "order-elimination",
      "name": "消序法",
      "summary": "把“有顺序”的排列数除以“内部顺序数”，得到“无顺序”的组合数。",
    },
  ],
  "tags": [
    "消序法"
  ]
} satisfies ProblemData;
