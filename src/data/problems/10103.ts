import type { ProblemData } from "@/types/problem";

export default {
  "id": "10103",
  "title": "三圆重叠·1 到 12",
  "grade": "五年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "如图 3 个圆两两相交、互不三圆同交：每两个圆恰好共用 1 格（共 3 个这样的『两两交』格），每圆另有 3 个独占格，共 3 + 3×3 = 12 格。把 1, 2, 3, …, 12 各用一次填入这 12 格，使每个圆内的 5 个数字（3 个独占 + 2 个两两交）之和都相等。请问：3 个『两两交』格上数字的和 O 必须满足什么条件？请给出一种可行的 S 与对应的填法思路。",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 240' font-size='12'><g fill='none' stroke='#2E86C1'><circle cx='100' cy='100' r='70'/><circle cx='160' cy='100' r='70'/><circle cx='130' cy='160' r='70'/></g></svg>",
      "caption": "3 个两两相交的圆，共 12 格",
      "alt": "三圆相交示意"
    }
  ],
  "solutions": [
    {
      "key": "overlap",
      "label": "累加法",
      "steps": [
        "分析：设 3 个『两两交』格上的数分别是 a, b, c（它们各属于两个圆），其他 9 格每格只属于 1 圆。把 3 个圆的和相加：a, b, c 各算 2 次，其他 9 个数各算 1 次。",
        "3S = 2(a+b+c) + (12 数总和 − (a+b+c)) = (a+b+c) + 78。",
        "记 O = a + b + c，则 3S = O + 78，即 O 必须是 3 的倍数。",
        "O 的取值范围：最小 1+2+3 = 6，最大 10+11+12 = 33。其中 3 的倍数有 {6, 9, 12, …, 33}。",
        "每个合法 O 对应 S = (O + 78) / 3。例如 O = 12（取 a,b,c = {1,4,7}），S = 30；剩余 9 数 {2,3,5,6,8,9,10,11,12} 分为 3 组每组 3 数，每组之和 = S − (a+b 或 b+c 等两两交之和)——具体分配可枚举获得。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "3S",
              "rhs": "O + 78"
            },
            {
              "lhs": "O 为 3 的倍数",
              "rhs": "O ∈ {6, 9, 12, …, 33}"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "3 圆两两相交共 12 格填 1–12，每圆 5 数和相等。问每圆最小的和 S 是多少？此时 3 个两两交格的和 O 是多少？",
    "fields": [
      {
        "key": "min",
        "label": "最小 S",
        "type": "number"
      },
      {
        "key": "o",
        "label": "O",
        "type": "number"
      }
    ],
    "answer": {
      "min": 28,
      "o": 6
    },
    "hint": "3S = O + 78，O 最小为 1+2+3 = 6，此时 S = 84/3 = 28（可验证有具体分配方案）。"
  },
  "tags": [
    "累加法",
    "比较法"
  ]
} satisfies ProblemData;
