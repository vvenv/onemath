import type { ProblemData } from "@/types/problem";

export default {
  "id": "10075",
  "title": "物资调运·最省运费",
  "grade": "六年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "有两个仓库 A、B，分别存货 15 吨和 25 吨；两个工地甲、乙，分别需要 20 吨和 20 吨。每吨货物的运费（单位：元/吨）如下：| | 甲 | 乙 || --- | --- | --- || A | 4 | 7 || B | 5 | 3 |\n要把仓库里 40 吨货物全部运到两个工地并满足各自需求。请设计调运方案，使总运费最少。最少运费是多少元？",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 170' font-size='13'><g fill='#d6eaf8' stroke='#2E86C1'><rect x='20' y='20' width='80' height='40' rx='6'/><rect x='20' y='110' width='80' height='40' rx='6'/><rect x='260' y='20' width='80' height='40' rx='6'/><rect x='260' y='110' width='80' height='40' rx='6'/></g><g fill='#1B4F72' text-anchor='middle'><text x='60' y='45'>A 存 15</text><text x='60' y='135'>B 存 25</text><text x='300' y='45'>甲 需 20</text><text x='300' y='135'>乙 需 20</text></g><g stroke='#2E86C1' fill='none'><line x1='100' y1='40' x2='260' y2='40'/><line x1='100' y1='40' x2='260' y2='130'/><line x1='100' y1='130' x2='260' y2='40'/><line x1='100' y1='130' x2='260' y2='130'/></g><g fill='#b9770e' text-anchor='middle'><text x='180' y='35'>4</text><text x='150' y='90'>7</text><text x='210' y='90'>5</text><text x='180' y='145'>3</text></g></svg>",
      "caption": "仓库→工地的单位运费（元/吨）",
      "alt": "两仓两工地运输示意"
    }
  ],
  "solutions": [
    {
      "key": "paramSearch",
      "label": "设变量分析法",
      "steps": [
        "分析：设 A 运往甲的货量为 x 吨，则 A 运往乙的货量 = 15 − x（A 库清空），B 运往甲的货量 = 20 − x（甲需求补齐），B 运往乙的货量 = 25 − (20 − x) = 5 + x。x 的可行范围满足所有量非负：0 ≤ x ≤ 15。",
        "总运费 = 4x + 7(15 − x) + 5(20 − x) + 3(5 + x)。",
        "展开 = 4x + 105 − 7x + 100 − 5x + 15 + 3x = (4 − 7 − 5 + 3)x + 220 = −5x + 220。",
        "表达式是 x 的减函数，x 越大运费越低。x 的上界是 15，所以取 x = 15。",
        "此时方案：A→甲 15，A→乙 0，B→甲 5，B→乙 20。",
        "总运费 = 4·15 + 7·0 + 5·5 + 3·20 = 60 + 0 + 25 + 60 = 145 元。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "总运费 f(x)",
              "rhs": "4x + 7(15−x) + 5(20−x) + 3(5+x)"
            },
            {
              "lhs": "化简",
              "rhs": "−5x + 220"
            },
            {
              "lhs": "x 可行范围",
              "rhs": "0 ≤ x ≤ 15"
            },
            {
              "lhs": "最优 x = 15",
              "rhs": "f(15) = 145",
              "status": "keep",
              "badge": "最少"
            }
          ],
          "caption": "用一个变量把 4 个运量串起来"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🚚",
              "count": 145,
              "label": "元"
            }
          ],
          "caption": "最少运费"
        }
      ]
    },
    {
      "key": "greedy",
      "label": "避免对流·就近匹配",
      "steps": [
        "分析：观察运费表，A→甲 最便宜（4），B→乙 最便宜（3）。如果能让这两条“便宜路线”尽量走满，就能省钱；另两条只用来补差。",
        "让 A 尽量走向甲：A 只有 15 吨，甲需 20 吨，A→甲 填满 15 吨；甲还差 5 吨。",
        "让 B 尽量走向乙：乙需 20 吨，B→乙 填 20 吨；B 还剩 5 吨运到甲。",
        "最终方案：A→甲 15（4 元），B→甲 5（5 元），B→乙 20（3 元），A→乙 0（7 元）。",
        "运费 = 15·4 + 5·5 + 20·3 = 60 + 25 + 60 = 145 元，与上一种方法一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "A→甲（便宜 4）",
              "rhs": "15 吨 × 4 = 60"
            },
            {
              "lhs": "B→乙（便宜 3）",
              "rhs": "20 吨 × 3 = 60"
            },
            {
              "lhs": "B→甲（补差 5）",
              "rhs": "5 吨 × 5 = 25"
            },
            {
              "lhs": "合计",
              "rhs": "145 元",
              "status": "keep"
            }
          ],
          "caption": "把便宜线走满，只用补差"
        }
      ]
    }
  ],
  "variant": {
    "question": "两仓 A、B 分别存 20、30 吨，两个工地甲、乙各需 25 吨。单位运费 A→甲 6, A→乙 5, B→甲 4, B→乙 7（元/吨）。最少运费是多少元？",
    "fields": [
      {
        "key": "answer",
        "label": "最少运费",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 235
    },
    "hint": "设 A→甲 = x，则 A→乙 = 20−x，B→甲 = 25−x，B→乙 = 5+x，x ∈ [0,20]。费用 = 6x + 5(20−x) + 4(25−x) + 7(5+x) = (6−5−4+7)x + 235 = 4x + 235，x 越小越好，x = 0：A→乙 20，B→甲 25，B→乙 5，费用 = 0 + 100 + 100 + 35 = 235。"
  },
  "tags": []
} satisfies ProblemData;
