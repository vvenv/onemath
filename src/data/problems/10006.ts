import type { ProblemData } from "@/types/problem";

export default {
  "id": "10006",
  "title": "棋盘上的线段·计数最值",
  "grade": "六年级",
  "module": "计数",
  "difficulty": "挑战",
  "question": "在一个由 4 × 4 个边长为1厘米的小正方形组成的方格棋盘上，连接两个不同的格点，可以画出多少条长度为整厘米数的线段？（格点是指方格的顶点）",
  "solutions": [
    {
      "key": "classification",
      "label": "分类计数法",
      "steps": [
        "L=1~4 为轴向，L=5 为(3,4)/(4,3)。位置数：L=1→2·4·5=40，L=2→2·3·5=30，L=3→2·2·5=20，L=4→2·1·5=10，L=5→2·2·1=4，合计 104 条。"
      ],
      "scenes": [
        {
          "kind": "lattice",
          "lattice": {
            "rows": 5,
            "cols": 5
          },
          "caption": "4×4 的棋盘，格点总数为 5 × 5 = 25 个"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "L=1",
              "value": 40,
              "max": 104,
              "tone": "primary"
            },
            {
              "label": "L=2",
              "value": 30,
              "max": 104,
              "tone": "muted"
            },
            {
              "label": "L=3",
              "value": 20,
              "max": 104,
              "tone": "muted"
            },
            {
              "label": "L=4",
              "value": 10,
              "max": 104,
              "tone": "muted"
            },
            {
              "label": "L=5",
              "value": 4,
              "max": 104,
              "tone": "muted"
            }
          ],
          "caption": "各类整数长度线段的数量分布"
        },
        null,
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "📏",
              "count": 104,
              "label": "线段总数"
            }
          ],
          "caption": "40 + 30 + 20 + 10 + 4 = 104 条"
        }
      ]
    },
    {
      "key": "enumeration",
      "label": "方向枚举·先排除非整长",
      "steps": [
        "分析：设 dx, dy ∈ [0, 4] 且不全为 0，L = √(dx²+dy²)。逐个方向检测 dx²+dy² 是否为完全平方数，可以直接把非整长剔掉，剩下的再用 (5−dx)(5−dy) 计位置。",
        "保留下来的方向：轴向 8 个给 L=1~4；斜向只有 (3,4) 与 (4,3) 给 L=5；其余如 (1,1)=√2、(1,2)=√5、(2,2)=√8 … 全为非整，剔除。",
        "各行代入位置公式并叠加（详见 scenes），汇总 40 + 30 + 20 + 10 + 4 = 104 条。"
      ],
      "scenes": [
        {
          "kind": "lattice",
          "lattice": {
            "rows": 5,
            "cols": 5,
            "tone": "accent"
          },
          "caption": "5×5 格点：枚举所有 (dx, dy) 方向"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "✅",
              "count": 5,
              "label": "整数长 L=1..5"
            },
            {
              "icon": "❌",
              "count": "√2,√5,√8,…",
              "label": "非整舍去"
            }
          ],
          "caption": "只有 L = 1, 2, 3, 4, 5 五种"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "L=1",
              "rhs": "2·(5−1)·5 = 40",
              "badge": "水平/垂直"
            },
            {
              "lhs": "L=2",
              "rhs": "2·(5−2)·5 = 30"
            },
            {
              "lhs": "L=3",
              "rhs": "2·(5−3)·5 = 20"
            },
            {
              "lhs": "L=4",
              "rhs": "2·(5−4)·5 = 10"
            },
            {
              "lhs": "L=5",
              "rhs": "2·(5−3)(5−4) = 4",
              "badge": "3-4-5 斜向"
            }
          ],
          "note": "每行用 (5−dx)(5−dy) 公式，系数 2 来自方向对称",
          "caption": "逐行相加 = 104"
        }
      ]
    }
  ],
  "variant": {
    "question": "在一个 3 × 3 的点阵（共 4 × 4 = 16 个点）中，连接两个点，可以画出多少条长度大于2的线段？",
    "fields": [
      {
        "key": "total_segments",
        "label": "线段总数"
      }
    ],
    "answer": {
      "total_segments": 30
    },
    "hint": "先找出所有可能的整数长度（L=3, L=4, L=5...），然后按方向向量 (dx, dy) 分类计算。"
  },
  "knowledgePoints": [
    {
      "slug": "case-analysis",
      "name": "分类讨论",
      "summary": "按关键特征把所有情况拆成互不重叠且覆盖全体的几类，逐类计算后相加。",
    },
    {
      "slug": "enumeration",
      "name": "枚举法",
      "summary": "按某个顺序把所有可能性“走一遍”，保证不重不漏。",
    },
    {
      "slug": "pythagorean-theorem",
      "name": "勾股定理",
      "summary": "直角三角形两直角边平方之和 = 斜边平方：a² + b² = c²。",
    },
  ],
  "tags": [
    "分类讨论",
    "枚举法",
    "勾股定理"
  ]
} satisfies ProblemData;
