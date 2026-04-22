import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10060-1.svg?raw";
import svg2 from "./figures/10060-2.svg?raw";

export default {
  "id": "10060",
  "title": "排队相邻·捆绑法",
  "grade": "五年级",
  "module": "计数",
  "difficulty": "进阶",
  "question": "3 个男生和 2 个女生站成一排合影，要求 2 个女生必须相邻。一共有多少种不同的站法？",
  "figures": [
    {
      "svg": svg1,
      "caption": "3 个男生和 2 个女生合影（位置待定）",
      "alt": "3男2女共5人排队示意"
    }
  ],
  "solutions": [
    {
      "key": "bundle",
      "label": "捆绑法",
      "steps": [
        "分析：处理「必须相邻」的经典做法——把 2 个女生捆成一个大元素，与 3 个男生合成 4 个元素做全排，再单独考虑大元素内部。",
        "外部排列 4! = 24；内部 2 女互换 2! = 2；总数 24 × 2 = 48 种。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "把 2 个女生捆成一个“大元素”，与 3 个男生一起共 4 个大元素",
          "alt": "捆绑法示意：2女视为1个大元素"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "外部排列",
              "rhs": "4! = 24",
              "note": "男男男 + (女女) 共 4 个大元素",
              "status": "keep"
            },
            {
              "lhs": "内部排列",
              "rhs": "2! = 2",
              "note": "两个女生互换",
              "status": "keep"
            },
            {
              "lhs": "总站法",
              "rhs": "4! × 2! = 48",
              "badge": "结论"
            }
          ],
          "caption": "捆绑法：先外后内"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧍",
              "count": 48,
              "label": "种站法"
            }
          ],
          "caption": "2 女相邻共 48 种"
        }
      ]
    },
    {
      "key": "exclude",
      "label": "排除法（逆向思维）",
      "steps": [
        "分析：换个角度，用总排法减去「女生不相邻」。5 人全排 5! = 120；不相邻用插空法：3 男排成一排 3! = 6，形成 4 个空位，2 女选其中 2 个并考虑顺序 4 × 3 = 12。",
        "不相邻共 6 × 12 = 72，相邻 = 120 − 72 = 48，与捆绑法一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "总排法",
              "rhs": "5! = 120"
            },
            {
              "lhs": "女不相邻",
              "rhs": "3! × 4 × 3 = 72",
              "note": "先排男，再插空"
            },
            {
              "lhs": "女相邻",
              "rhs": "120 − 72 = 48",
              "badge": "结论"
            }
          ],
          "caption": "用总数减去不相邻的情况"
        }
      ]
    }
  ],
  "variant": {
    "question": "4 个男生和 3 个女生站成一排，要求 3 个女生必须相邻，一共有多少种站法？",
    "fields": [
      {
        "key": "answer",
        "label": "站法数",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 720
    },
    "hint": "捆绑法：把 3 个女生看成一个大元素，外部 5! × 内部 3! = 120 × 6 = 720。"
  },
  "tags": [
    "捆绑法",
    "排除法"
  ]
} satisfies ProblemData;
