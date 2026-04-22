import type { ProblemData } from "@/types/problem";

export default {
  id: "10142",
  title: "速算·隐藏“乘 1”的分配律",
  grade: "五年级",
  module: "calc",
  difficulty: "进阶",
  question: "用简便方法计算：47 × 36 + 47 × 63 + 47。",
  solutions: [
    {
      key: "hidden-one",
      label: "乘法分配律·补出隐藏的 ×1",
      steps: [
        "分析：把孤立的 47 看作 47 × 1，三项同有公因数 47，且 36 + 63 + 1 = 100，一次提取即可凑整。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "原式", rhs: "47 × 36 + 47 × 63 + 47", status: "keep" },
            { lhs: "补 ×1", rhs: "47 × 36 + 47 × 63 + 47 × 1", status: "keep", badge: "关键" },
            { lhs: "提公因数", rhs: "47 × (36 + 63 + 1)", status: "keep", badge: "分配律反用" },
            { lhs: "凑整", rhs: "47 × 100", status: "keep", badge: "36+63+1=100" },
            { lhs: "得数", rhs: "4700", status: "keep", badge: "答案" },
          ],
          caption: "孤立的“47”其实是“47 × 1”，看穿这一点就能三项同提。",
        },
        {
          kind: "result-badges",
          items: [{ icon: "🔢", count: 4700, label: "47 × 36 + 47 × 63 + 47" }],
          caption: "47 × 100 = 4700",
        },
      ],
    },
    {
      key: "pair-then-add",
      label: "先两两分配再加上（对照）",
      steps: [
        "分析：也可以先对前两项提公因数得到 47 × 99，再补上最后的 47，但要多走一次 ×99 的展开，不如一次性凑 36+63+1=100 干脆。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "前两项", rhs: "47 × (36 + 63) = 47 × 99", status: "keep" },
            { lhs: "展开 99", rhs: "47 × 100 − 47 = 4653", status: "keep" },
            { lhs: "加最后一项", rhs: "4653 + 47 = 4700", status: "keep", badge: "答案" },
          ],
          caption: "分两步也行，但不如一次性凑出 36+63+1=100 干脆。",
        },
      ],
    },
  ],
  variant: {
    question: "用简便方法计算：99 × 99 + 99。",
    fields: [{ key: "result", label: "结果" }],
    answer: { result: 9900 },
    hint: "把第二个 99 看成 99 × 1，提公因数：99 × (99 + 1) = 99 × 100。",
  },
  tags: ["乘法分配律", "凑整法"],
} satisfies ProblemData;
