import type { ProblemData } from "@/types/problem";

export default {
  "id": "10097",
  "title": "多线辐射阵·1 到 13",
  "grade": "五年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "把 1, 2, 3, …, 13 这 13 个数字各用一次，填入如图 4 条过中心的直线上（1 个中心圆 + 4 × 3 = 12 个外围圆，共 13 个位置），使每条直线上 4 个数字之和都相等。问：这个相等的和 S 有哪些可能的取值？",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 260' font-size='11'><g stroke='#2E86C1' fill='none'><line x1='40' y1='130' x2='220' y2='130'/><line x1='130' y1='40' x2='130' y2='220'/><line x1='66' y1='66' x2='194' y2='194'/><line x1='194' y1='66' x2='66' y2='194'/></g><g fill='#fdfefe' stroke='#2E86C1'><circle cx='40' cy='130' r='11'/><circle cx='175' cy='130' r='11'/><circle cx='220' cy='130' r='11'/><circle cx='130' cy='40' r='11'/><circle cx='130' cy='175' r='11'/><circle cx='130' cy='220' r='11'/><circle cx='66' cy='66' r='11'/><circle cx='162' cy='162' r='11'/><circle cx='194' cy='194' r='11'/><circle cx='194' cy='66' r='11'/><circle cx='162' cy='98' r='11'/><circle cx='66' cy='194' r='11'/><circle cx='130' cy='130' r='11'/></g></svg>",
      "caption": "4 条过中心的直线，每线 4 格（中心 + 3 外围），共 13 个圆",
      "alt": "13 圆辐射阵：中心 1 个圆，4 条过中心的直线上各有 3 个外围圆，共 12 个外围圆"
    }
  ],
  "solutions": [
    {
      "key": "center",
      "label": "中心数法",
      "steps": [
        "分析：设中心圆填 c。4 条直线上数字总和 = 中心 × 4 + 其余 12 数 × 1。",
        "总和 1+2+…+13 = (1+13)·13/2 = 91，所以 4S = 4c + (91 − c) = 91 + 3c。",
        "要求 S 为整数：91 + 3c 能被 4 整除。91 ≡ 3 (mod 4)，所以 3c ≡ 1 (mod 4)，即 c ≡ 3 (mod 4)。",
        "c ∈ {3, 7, 11}，对应 S = (91+9)/4 = 25、S = (91+21)/4 = 28、S = (91+33)/4 = 31。",
        "每种 c 都需把剩下 12 个数分成 4 组（每组 3 数），每组和 = S − c。三种情形都能做到：",
        "• c = 3, S = 25，每组和 22：{1,9,12}、{2,7,13}、{4,8,10}、{5,6,11}。",
        "• c = 7, S = 28，每组和 21：{1,9,11}、{2,6,13}、{3,8,10}、{4,5,12}。",
        "• c = 11, S = 31，每组和 20：{1,6,13}、{2,8,10}、{3,5,12}、{4,7,9}。",
        "故 S 的所有可能取值为 25, 28, 31。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "4S",
              "rhs": "91 + 3c"
            },
            {
              "lhs": "c mod 4",
              "rhs": "3 → c ∈ {3,7,11}"
            },
            {
              "lhs": "S",
              "rhs": "25, 28, 31",
              "status": "keep"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "在上述阵形中填 1–13，各条直线 4 数和 S 相同。问 S 的最小值是多少？此时中心填几？",
    "fields": [
      {
        "key": "min",
        "label": "最小 S",
        "type": "number"
      },
      {
        "key": "center",
        "label": "中心",
        "type": "number"
      }
    ],
    "answer": {
      "min": 25,
      "center": 3
    },
    "hint": "由 4S = 91 + 3c 得 c 越小 S 越小；c ∈ {3,7,11}，取 c = 3，S = 25。"
  },
  "tags": [
    "中心数法",
    "累加法"
  ]
} satisfies ProblemData;
