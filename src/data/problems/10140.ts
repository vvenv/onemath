import type { ProblemData } from "@/types/problem";

export default {
  id: "10140",
  title: "速算·拆成整百再分配",
  grade: "四年级",
  module: "计算",
  difficulty: "基础",
  question: "用简便方法计算：99 × 73。",
  solutions: [
    {
      key: "split",
      label: "乘法分配律·正用拆开",
      steps: [
        "分析：99 距整百只差 1，写成 100 − 1 后用乘法分配律展开即可借助整百化简。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "原式", rhs: "99 × 73", status: "keep" },
            {
              lhs: "拆成 整 − 尾 (分配律正用)",
              rhs: "(100 − 1) × 73",
              status: "keep",
            },
            { lhs: "展开", rhs: "100 × 73 − 1 × 73", status: "keep" },
            { lhs: "分别算", rhs: "7300 − 73", status: "keep" },
            { lhs: "得数 (答案)", rhs: "7227", status: "keep" },
          ],
          caption: "把接近整百的因数拆成 (整 − 尾)，展开后两步就完成。",
        },
        {
          kind: "result-badges",
          items: [{ icon: "✖️", count: 7227, label: "99 × 73" }],
          caption: "99 × 73 = 7227",
        },
      ],
    },
    {
      key: "direct",
      label: "直接竖式（对照）",
      steps: [
        "分析：按位拆分 73 = 70 + 3，分别与 99 相乘后求和也能得到 7227，但进位多、易出错，不如拆项法。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "99 × 3", rhs: "297", status: "keep" },
            { lhs: "99 × 70", rhs: "6930", status: "keep" },
            {
              lhs: "求和 (答案)",
              rhs: "297 + 6930 = 7227",
              status: "keep",
            },
          ],
          caption: "直接竖式也得 7227，但明显更繁。",
        },
      ],
    },
  ],
  variant: {
    question: "用简便方法计算：98 × 46。",
    fields: [{ key: "result", label: "结果" }],
    answer: { result: 4508 },
    hint: "把 98 写成 (100 − 2)，用乘法分配律：(100 − 2) × 46 = 4600 − 92。",
  },
  tags: ["乘法分配律", "凑整法"],
} satisfies ProblemData;
