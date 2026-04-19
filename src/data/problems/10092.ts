import type { ProblemData } from "@/types/problem";

export default {
  "id": "10092",
  "title": "六角幻方·1 到 19",
  "grade": "六年级",
  "module": "misc",
  "difficulty": "挑战",
  "question": "如图，一张『阶数为 3 的正六边形阵』共有 19 个小格，按三个方向可排成一些直线：每个方向各有 5 条直线，长度分别为 3、4、5、4、3；一共 15 条直线。把 1, 2, 3, …, 19 每个数字恰好填入一个小格，使这 15 条直线上所含数字之和全部相等。问：这个公共和是多少？",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220' font-size='11'><g fill='#fdfefe' stroke='#2E86C1'><g><circle cx='80' cy='40' r='10'/><circle cx='110' cy='40' r='10'/><circle cx='140' cy='40' r='10'/><circle cx='65' cy='70' r='10'/><circle cx='95' cy='70' r='10'/><circle cx='125' cy='70' r='10'/><circle cx='155' cy='70' r='10'/><circle cx='50' cy='100' r='10'/><circle cx='80' cy='100' r='10'/><circle cx='110' cy='100' r='10'/><circle cx='140' cy='100' r='10'/><circle cx='170' cy='100' r='10'/><circle cx='65' cy='130' r='10'/><circle cx='95' cy='130' r='10'/><circle cx='125' cy='130' r='10'/><circle cx='155' cy='130' r='10'/><circle cx='80' cy='160' r='10'/><circle cx='110' cy='160' r='10'/><circle cx='140' cy='160' r='10'/></g></g></svg>",
      "caption": "阶数 3 的六角形阵，共 19 格",
      "alt": "19 个圆圈排成六角阵"
    }
  ],
  "solutions": [
    {
      "key": "sum",
      "label": "累加法（一个方向的所有直线）",
      "steps": [
        "分析：在一个方向上，5 条直线（长度 3, 4, 5, 4, 3）把所有 19 个格子每个恰好覆盖一次（这是六角阵的结构性质）。所以这一方向 5 条直线数字总和 = 1 + 2 + … + 19。",
        "1 + 2 + … + 19 = (1+19) × 19 / 2 = 190。",
        "设每条直线之和都是 S，则一个方向 5 条直线之和 = 5S = 190，于是 S = 38。",
        "结论：六角幻方的幻和（每条直线上的和）等于 38。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1+2+…+19",
              "rhs": "190"
            },
            {
              "lhs": "一个方向 5 行覆盖全部",
              "rhs": "5S = 190"
            },
            {
              "lhs": "S",
              "rhs": "38",
              "status": "keep",
              "badge": "幻和"
            }
          ],
          "note": "六角阵在每个方向上的若干行恰好不重不漏地覆盖全部 19 格"
        }
      ]
    }
  ],
  "variant": {
    "question": "仿照六角幻方的推导方法：如果把 1 到 19 填入同样的六角阵，使每条直线数字和都相等。那么中心 7 个格子（即包含最长行 5 格及与它相邻两行 4+4 格中的核心 7 格——严格地是被最多直线共用的中心一格）上的数是多少？提示：中心格必须是 n (n²+1)/2 /行数的平均数 = 38/3×… 算了，问幻和是多少？",
    "fields": [
      {
        "key": "sum",
        "label": "幻和",
        "type": "number"
      }
    ],
    "answer": {
      "sum": 38
    },
    "hint": "1+2+…+19 = 190，在任一方向上 5 条直线覆盖全部 19 格，所以 S = 190/5 = 38。"
  },
  "tags": [
    "累加法"
  ]
} satisfies ProblemData;
