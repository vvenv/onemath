import type { ProblemData } from "@/types/problem";

export default {
  id: "10141",
  title: "速算·提取公因数凑整",
  grade: "四年级",
  module: "计算",
  difficulty: "基础",
  question: "用简便方法计算：38 × 17 + 38 × 83。",
  solutions: [
    {
      key: "factor",
      label: "乘法分配律·反用提取",
      steps: [
        "分析：两项都含公因数 38，且 17 + 83 = 100，逆用分配律提取 38 即可一次凑整。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "原式", rhs: "38 × 17 + 38 × 83", status: "keep" },
            {
              lhs: "提公因数 (分配律反用)",
              rhs: "38 × (17 + 83)",
              status: "keep",
            },
            { lhs: "凑整 (17+83=100)", rhs: "38 × 100", status: "keep" },
            { lhs: "得数 (答案)", rhs: "3800", status: "keep" },
          ],
          caption: "看到相同因数就提出来，括号里往往藏着整百。",
        },
      ],
    },
    {
      key: "direct",
      label: "直接逐项计算（对照）",
      steps: [
        "分别算：38 × 17 = 646，38 × 83 = 3154。",
        "646 + 3154 = 3800，两次乘法加一次加法，远比提公因数繁。",
      ],
      scenes: [
        {
          kind: "compare-bars",
          rows: [
            {
              label: "提公因数：1 次乘法",
              value: 1,
              max: 3,
              tone: "primary",
              marker: true,
            },
            {
              label: "直接计算：2 次乘法 + 1 次加法",
              value: 3,
              max: 3,
              tone: "muted",
            },
          ],
          caption: "提公因数把运算压缩成一次乘法。",
        },
      ],
    },
  ],
  variant: {
    question: "用简便方法计算：125 × 64 + 125 × 36。",
    fields: [{ key: "result", label: "结果" }],
    answer: { result: 12500 },
    hint: "公因数 125 提到括号外：125 × (64 + 36) = 125 × 100。",
  },
  tags: ["乘法分配律", "凑整法"],
} satisfies ProblemData;
