import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "rounding",
  name: "凑整法",
  tag: "凑整法",
  category: "numberCalc",
  summary: "把数配成 10、100、1000 的整数倍，借助分配律/结合律让算式秒算。",
  intuition:
    "心算爱 10、100——因为它们“干净”。凑整就是主动把相邻数字搭配成整 10/整 100，再借分配律 / 结合律完成速算。",
  derivation: [
    "利用加法交换与结合：把“凑整对子”搬到一起先加（如 25 + 75 = 100）。",
    "利用乘法结合：把 25 × 4 = 100、125 × 8 = 1000 提前算出。",
    "必要时拆一个数成 (整 ± 小)，再分配。",
  ],
  keyPoints: [
    "黄金搭档：25 × 4 = 100，125 × 8 = 1000。",
    "两位数速算：a × 11 = a × 10 + a。",
  ],
  examples: [
    {
      title: "加法凑整",
      problem: "37 + 48 + 63 + 52 = ?",
      solution: ["(37 + 63) + (48 + 52) = 100 + 100 = 200。"],
    },
    {
      title: "乘法凑整",
      problem: "25 × 36 × 4 = ?",
      solution: ["25 × 4 = 100；100 × 36 = 3600。"],
    },
  ],
  pitfalls: ["凑整要用律，不是胡拼凑——先确认加/乘的交换或结合成立。"],
  relatedSlugs: ["distributive-law", "head-tail-pairing"],
};

export default entry;
