import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10058-1.svg?raw";

export default {
  "id": "10058",
  "title": "乘法巧算·提取公因数",
  "grade": "四年级",
  "module": "calc",
  "difficulty": "基础",
  "question": "计算：36 × 47 + 64 × 47",
  "solutions": [
    {
      "key": "factor",
      "label": "提取公因数法",
      "steps": [
        "观察算式：两个乘法项都含有相同的因数 47。",
        "根据乘法分配律 a × c + b × c = (a + b) × c，把公因数 47 提到括号外。",
        "原式 = (36 + 64) × 47。",
        "注意 36 + 64 = 100，正好凑成整百，是本题的巧算关键。",
        "最后 100 × 47 = 4700。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "面积模型：同宽的两块长方形拼成一块，长相加、宽不变"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "原式",
              "rhs": "36 × 47 + 64 × 47",
              "status": "keep"
            },
            {
              "lhs": "提公因数",
              "rhs": "(36 + 64) × 47",
              "status": "keep",
              "badge": "分配律逆用"
            },
            {
              "lhs": "凑整",
              "rhs": "100 × 47",
              "status": "keep",
              "badge": "36+64=100"
            },
            {
              "lhs": "得数",
              "rhs": "4700",
              "status": "keep",
              "badge": "答案"
            }
          ],
          "caption": "四步写清：原式 → 提因数 → 凑整 → 得数"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "✖️",
              "count": 4700,
              "label": "计算结果"
            }
          ],
          "caption": "100 × 47 = 4700"
        }
      ]
    },
    {
      "key": "bruteforce",
      "label": "直接计算（对照）",
      "steps": [
        "不使用巧算，按顺序把两个乘积分别算出来。",
        "36 × 47 = 36 × (50 − 3) = 1800 − 108 = 1692。",
        "64 × 47 = 64 × (50 − 3) = 3200 − 192 = 3008。",
        "两积相加：1692 + 3008 = 4700。",
        "结果一致，但计算量明显比提公因数法大，体现了巧算的价值。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "第一项",
              "rhs": "36 × 47 = 1692",
              "status": "keep"
            },
            {
              "lhs": "第二项",
              "rhs": "64 × 47 = 3008",
              "status": "keep"
            },
            {
              "lhs": "求和",
              "rhs": "1692 + 3008 = 4700",
              "status": "keep",
              "badge": "答案"
            }
          ],
          "note": "步骤更多、更易算错，提公因数只需一次乘法。",
          "caption": "对照：笨算法同样得 4700，但要做两次三位数乘法再相加"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "提公因数法：1 次乘法",
              "value": 1,
              "max": 3,
              "tone": "primary",
              "marker": true
            },
            {
              "label": "直接计算：2 次乘法 + 1 次加法",
              "value": 3,
              "max": 3,
              "tone": "muted"
            }
          ],
          "caption": "运算步数对比：巧算明显更省力"
        }
      ]
    }
  ],
  "variant": {
    "question": "计算：125 × 28 − 25 × 28",
    "fields": [
      {
        "key": "result",
        "label": "结果"
      }
    ],
    "answer": {
      "result": 2800
    },
    "hint": "提取公因数 28：(125 − 25) × 28 = 100 × 28"
  },
  "tags": []
} satisfies ProblemData;
