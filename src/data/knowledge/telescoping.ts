import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "telescoping",
  name: "裂项",
  tag: "裂项",
  category: "numberCalc",
  summary: "把一项拆成“相邻两项之差”，前后相消，长和瞬间折叠成头尾两项。",
  intuition:
    "一列看似很长的加法，如果每一项都能写成“下一项 − 这一项”的差，那一连串加法就会像多米诺一样前后抵消，只留下最前和最后的两小块。",
  derivation: [
    "寻找形如 1 / [k(k+1)] = 1/k − 1/(k+1) 的拆分结构。",
    "把每一项都按这种方式拆开。",
    "相邻项相消，只剩首尾。",
  ],
  keyPoints: [
    "1 / [k(k+1)] = 1/k − 1/(k+1)。",
    "1 / [k(k+d)] = (1/d) · (1/k − 1/(k+d))。",
    "k / [(k)(k+1)!] 类也常见，思路一致。",
  ],
  examples: [
    {
      title: "经典分数和",
      problem: "求 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(99·100)。",
      solution: [
        "每项 1/(k(k+1)) = 1/k − 1/(k+1)。",
        "原式 = (1 − 1/2) + (1/2 − 1/3) + … + (1/99 − 1/100)。",
        "相消后 = 1 − 1/100 = 99/100。",
      ],
    },
    {
      title: "带步长",
      problem: "1/(1·3) + 1/(3·5) + … + 1/(99·101)。",
      solution: [
        "1/(k(k+2)) = (1/2)(1/k − 1/(k+2))。",
        "原式 = (1/2) · [(1/1 − 1/3) + (1/3 − 1/5) + … + (1/99 − 1/101)]。",
        "= (1/2)(1 − 1/101) = 50/101。",
      ],
      takeaway: "公差不是 1 时，前面要加“1 / 公差”作为系数。",
    },
  ],
  pitfalls: ["先验证每项真的能拆成相邻差；不要乱拆。"],
  relatedSlugs: ["distributive-law"],
};

export default entry;
