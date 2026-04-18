import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "cross-multiplication",
  name: "十字交叉法",
  tag: "十字交叉法",
  category: "word",
  summary:
    "两种浓度 / 单价混合，求比例时按“差对交叉写”：所求比 = 对方差值 : 本方差值。",
  intuition:
    "把两种浓度（或价格）写在上方，目标浓度写在中间，四角相减再交叉，写出来的两个差就是两种物质的“质量比”。纸上画个十字，速度极快。",
  derivation: [
    "设两种浓度 a > b，目标浓度 c，a > c > b。",
    "把 a, b 分别写在左右两列顶部，c 写中心。",
    "“上 − 中” = a − c，“中 − 下” = c − b。",
    "两种物质的质量比 = (c − b) : (a − c)（注意交叉写）。",
  ],
  keyPoints: [
    "浓度、价格、利率等“加权平均”问题都可用。",
    "口诀：“差对交叉”——记住结果按对角线取值。",
  ],
  examples: [
    {
      title: "浓度混合",
      problem: "20% 盐水和 5% 盐水混合成 12% 盐水，两种盐水的质量比是多少？",
      solution: ["20 − 12 = 8；12 − 5 = 7。", "20% 盐水 : 5% 盐水 = 7 : 8。"],
    },
    {
      title: "买糖",
      problem: "单价 8 元与 5 元的糖混合后平均每千克 7 元，两种糖的质量比？",
      solution: ["8 − 7 = 1；7 − 5 = 2。", "8 元 : 5 元 = 2 : 1。"],
      takeaway: "谁贵谁对应“便宜端的差”——总结成“交叉”最不易错。",
    },
  ],
  pitfalls: [
    "只适用于按质量的加权平均；按体积等别的权重时要先换算。",
    "若目标值在两端之外（c 不夹在 a 和 b 间），无法混合出。",
  ],
  relatedSlugs: ["hypothesis-method"],
};

export default entry;
