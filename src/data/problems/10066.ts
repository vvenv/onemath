import svg1 from "./figures/10066-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10066",
  title: "多重限制排列·甲不排头乙不排尾",
  grade: "六年级",
  difficulty: "挑战",
  module: "计数",
  question:
    "甲、乙、丙、丁、戊 5 人站成一排拍照，要求甲不站在排头（最左端），乙不站在排尾（最右端）。\n一共有多少种不同的站法？",
  figures: [
    {
      svg: svg1,
      alt: "5个位置，1号位禁甲，5号位禁乙",
    },
  ],
  solutions: [
    {
      key: "exclude",
      label: "排除法（容斥）",
      steps: [
        {
          text: "容斥：5! − (|A|+|B|−|A∩B|) = 120 − (24+24−6) = 120 − 42 = 78 种。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "总排法", rhs: "5! = 120" },
                { lhs: "|A| 甲排头", rhs: "4! = 24" },
                { lhs: "|B| 乙排尾", rhs: "4! = 24" },
                { lhs: "|A ∩ B|", rhs: "3! = 6" },
                { lhs: "|A ∪ B|", rhs: "24 + 24 − 6 = 42" },
                { lhs: "答案 (结论)", rhs: "120 − 42 = 78" },
              ],
            },
            {
              kind: "result-badges",
              items: [{ icon: "📸", count: 78, label: "种站法" }],
            },
          ],
        },
      ],
    },
    {
      key: "classify",
      label: "分类讨论法（按甲的位置）",
      steps: [
        {
          text: "甲在尾：1×4×3!=24；甲在位2/3/4：3×3×3!=54；合计 24+54=78（与容斥一致）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "甲在排尾", rhs: "1 × 4 × 3! = 24" },
                { lhs: "甲在位 2/3/4", rhs: "3 × 3 × 3! = 54" },
                { lhs: "合计 (结论)", rhs: "24 + 54 = 78" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙、丙、丁 4 人站成一排，要求甲不站排头、乙不站排尾，一共有多少种站法？",
    fields: [
      {
        key: "answer",
        label: "站法数",
        type: "number",
      },
    ],
    answer: {
      answer: 14,
    },
    hint: "容斥：总数 4! = 24；甲排头 3! = 6；乙排尾 3! = 6；甲排头且乙排尾 2! = 2；不合要求 = 6+6−2 = 10；答案 = 24 − 10 = 14。",
  },
  tags: ["排除法", "容斥原理", "分类讨论"],
} satisfies ProblemData;
