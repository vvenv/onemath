import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10160-1.svg?raw";

export default {
  id: "10160",
  title: "方格计数·分类讨论",
  grade: "五年级",
  module: "计数",
  difficulty: "进阶",
  question: "如图，在一个 8×8 的方格表中，左上角和右下角的 4×4 区域被填色，其余区域为空白。分别统计：恰好有一半方格被填色的 2×2、4×4、6×6 子方格各有多少个？",
  figures: [
    {
      svg: svg1,
      caption: "8×8 方格表，左上和右下 4×4 区域填色",
      alt: "8×8 方格按对角象限染色"
    }
  ],
  solutions: [
    {
      key: "classify",
      label: "分类讨论法",
      steps: [
        "分析：方格表被两条中线分成四个 4×4 象限，左上和右下全着色，右上和左下全空白。子方格的位置决定了它包含的着色格数量，需按子方格与中线的相对位置分类讨论。",
        "2×2 子方格：只有跨越中线（列3-4或行3-4）的子方格才有2着色2空白。跨越竖中线有7个（行0-6），跨越横中线有7个（列0-6），共14个。",
        "4×4 子方格：只有同时跨越两条中线（即以中心为顶点的四个位置）时才恰好8着色8空白。这四个位置是(0,2)、(0,3)、(2,0)、(3,0)，共4个。",
        "6×6 子方格：只有以(1,1)、(1,2)、(2,1)、(2,2)为顶点时才恰好18着色18空白。共4个。"
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "2×2 子方格",
              rhs: "跨越竖中线7个 + 跨越横中线7个 = 14个",
              status: "keep"
            },
            {
              lhs: "4×4 子方格",
              rhs: "同时跨越两条中线，共4个",
              status: "keep"
            },
            {
              lhs: "6×6 子方格",
              rhs: "以中心区域为顶点，共4个",
              status: "keep"
            }
          ],
          caption: "按子方格与中线的相对位置分类计数"
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔲",
              count: 14,
              label: "2×2 子方格"
            },
            {
              icon: "🔳",
              count: 4,
              label: "4×4 子方格"
            },
            {
              icon: "⬛",
              count: 4,
              label: "6×6 子方格"
            }
          ],
          caption: "答案：2×2 有 14 个，4×4 有 4 个，6×6 有 4 个"
        }
      ]
    }
  ],
  variant: {
    question: "在一个 6×6 的方格表中，左上角和右下角的 3×3 区域被填色，其余区域为空白。恰好有一半方格被填色的 2×2 子方格有多少个？",
    fields: [
      {
        key: "count",
        label: "2×2 子方格数量"
      }
    ],
    answer: {
      count: 8
    },
    hint: "6×6 方格被中线分成四个 3×3 象限，只有跨越中线的 2×2 子方格才满足条件。"
  },
  knowledgePoints: [
    {
      slug: "case-analysis",
      name: "分类讨论",
      summary: "按关键特征把所有情况拆成互不重叠且覆盖全体的几类，逐类计算后相加。",
    },
    {
      slug: "enumeration",
      name: "枚举法",
      summary: "按某个顺序把所有可能性“走一遍”，保证不重不漏。",
    },
  ],
  tags: ["分类讨论", "枚举法"]
} satisfies ProblemData;
