import type { ProblemData } from "@/types/problem";

export default {
  "id": "10015",
  "title": "方阵问题·实心方阵",
  "grade": "四年级",
  "module": "几何",
  "difficulty": "基础",
  "question": "四年级同学排成一个实心方阵进行广播操表演，最外层每边站了12人。请问这个方阵一共有多少人？最外层一共有多少人？",
  "solutions": [
    {
      "key": "layer",
      "label": "面积法 + 外层分段",
      "steps": [
        "总人数 = 每边 × 每边 = 12 × 12 = 144 人。",
        "外层看作 4 条边，每条边从角点后面数起（去掉一端角点），即 12 − 1 = 11 人。",
        "外层 = (12 − 1) × 4 = 44 人（每个角只计数 1 次）。"
      ],
      "scenes": [
        {
          "kind": "lattice",
          "lattice": {
            "rows": 12,
            "cols": 12,
            "tone": "accent"
          },
          "caption": "12×12 实心方阵，总数 = 12 × 12 = 144"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "总人数",
              "rhs": "12 × 12 = 144",
              "status": "keep"
            },
            {
              "lhs": "外层",
              "rhs": "(12 − 1) × 4 = 44",
              "note": "4 条边，每条 11 人",
              "status": "keep"
            }
          ],
          "caption": "两个结果合并"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "👥",
              "count": 144,
              "label": "总人数"
            },
            {
              "icon": "🟥",
              "count": 44,
              "label": "最外层"
            }
          ],
          "caption": "总 144，外层 44"
        }
      ]
    },
    {
      "key": "subtract",
      "label": "嵌套相减法",
      "steps": [
        "最外层人数 = 总人数 − 内层（10 × 10 = 100）人数 = 144 − 100 = 44 人。",
        "这种方法把「外层」当作两个同心方阵的差，最直观。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "外层 12×12",
              "value": 144,
              "max": 144,
              "tone": "primary"
            },
            {
              "label": "内层 10×10",
              "value": 100,
              "max": 144,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "两方阵面积差 = 外层人数"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "12² − 10²",
              "rhs": "144 − 100 = 44",
              "status": "keep"
            }
          ],
          "caption": "平方差即为外层"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个实心方阵花坛，最外层每边摆了15盆花。这个花坛一共用了多少盆花？最外层有多少盆？",
    "fields": [
      {
        "key": "total",
        "label": "总盆数"
      },
      {
        "key": "outer",
        "label": "最外层盆数"
      }
    ],
    "answer": {
      "total": 225,
      "outer": 56
    },
    "hint": "最外层人数 = (每边人数 - 1) × 4"
  },
  "tags": [
    "平方差"
  ]
} satisfies ProblemData;
