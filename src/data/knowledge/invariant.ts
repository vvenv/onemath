import type { KnowledgeEntry } from "@/types/knowledge";
import svg1 from "./figures/general-1.svg?raw";

const entry: KnowledgeEntry = {
  slug: "invariant",
  name: "不变量",
  tag: "不变量",
  category: "general",
  summary:
    "找一个“无论怎么操作都不变”的量，当目标状态里这个量变了，就说明不可能达成。",
  intuition:
    "河流怎么拐弯流速会变，但“水的总量”不变。题目里无论怎么折腾，总有一个量像“水量”一样纹丝不动；盯住它，往往能一眼看出结论。",
  derivation: [
    "识别一个量 Q，证明每一步操作之后 Q 不变。",
    "计算初始 Q₀ 与目标 Q_target。",
    "若 Q₀ ≠ Q_target，则目标状态不可达；反之需其它手段判定。",
  ],
  keyPoints: [
    "常见不变量：总和、奇偶性、余数、颜色分布、某种“权和”。",
    "不变量只能证“不行”，不能直接证“一定行”。",
  ],
  examples: [
    {
      title: "黑白棋盘",
      problem:
        "8×8 棋盘去掉两个对角的格子。能否用 1×2 的多米诺骨牌完全覆盖剩下的 62 格？",
      solution: [
        "黑白相间染色，每张 1×2 骨牌必覆盖 1 黑 1 白。",
        "两个对角是同色，去掉后黑白各剩 30、32（不等）。",
        "不变量：黑白数目之差。骨牌保持差为 0，而目标差为 2——不可能。",
      ],
      takeaway: "找到合适的“染色”是构造不变量最常见的手段。",
    },
  ],
  pitfalls: ["要证明不变性对“每一种”允许操作都成立。"],
  relatedSlugs: ["parity"],
  figures: [
    {
      svg: svg1,
      alt: "去掉同色两角的棋盘",

    },
  ],
};

export default entry;
