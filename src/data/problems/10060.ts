import svg1 from "./figures/10060-1.svg?raw";
import type { ProblemData } from "@/types/problem";
import svg2 from "./figures/10060-2.svg?raw";

export default {
  id: "10060",
  title: "排队相邻·捆绑法",
  grade: "五年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "3 个男生和 2 个女生站成一排合影，要求 2 个女生必须相邻。\n\n一共有多少种不同的站法？",
  figures: [
    {
      svg: svg1,
      alt: "3男2女共5人排队示意",
    },
  ],
  solutions: [
    {
      key: "bundle",
      label: "捆绑法",
      steps: [
        {
          text: "外部排列 4! = 24，内部 2! = 2，总数 = 24 × 2 = 48 种。",
          scenes: [
            {
              kind: "svg",
              svg: svg2,

              alt: "捆绑法示意：2女视为1个大元素",
            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "外部排列 (男男男 + (女女) 共 4 个大元素)",
                  rhs: "4! = 24",
                  status: "keep",
                },
                {
                  lhs: "内部排列 (两个女生互换)",
                  rhs: "2! = 2",
                  status: "keep",
                },
                { lhs: "总站法 (结论)", rhs: "4! × 2! = 48", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "exclude",
      label: "排除法（逆向思维）",
      steps: [
        {
          text: "总排法 5! = 120，不相邻 3! × 4 × 3 = 72，相邻 = 120 − 72 = 48。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "总排法", rhs: "5! = 120" },
                { lhs: "插空 (先排男，再插空)", rhs: "A(3, 2) = 3 × 2 = 6" },
                {
                  lhs: "总站法 (结论)",
                  rhs: "3! × A(3, 2) = 6 × 6 = 36",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "4 个男生和 3 个女生站成一排，要求 3 个女生必须相邻，一共有多少种站法？",
    fields: [
      {
        key: "answer",
        label: "站法数",
        type: "number",
      },
    ],
    answer: {
      answer: 720,
    },
    hint: "捆绑法：把 3 个女生看成一个大元素，外部 5! × 内部 3! = 120 × 6 = 720。",
  },
  tags: ["捆绑法", "排除法"],
} satisfies ProblemData;
