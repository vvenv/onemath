import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "binary-method",
  name: "二进制法",
  tag: "二进制法",
  category: "numberCalc",
  summary:
    "对于循环淘汰问题（如丢一张、移一张），找出不超过 n 的最大 2 的幂 2^m，答案 = 2 × (n - 2^m)。",
  intuition:
    "当卡片数是 2 的幂时，最后剩下的就是最后一张；多出来的部分经过一轮操作后会变成 2 倍，所以答案就是 2 × (n - 2^m)。",
  derivation: [
    "找出不超过 n 的最大 2 的幂 2^m。",
    "计算 k = n - 2^m。",
    "答案 = 2 × k。",
  ],
  keyPoints: [
    "当 n 是 2 的幂时，答案就是 n 本身。",
    "这个方法适用于“丢一张、移一张”这种循环淘汰模式。",
  ],
  examples: [
    {
      title: "卡片淘汰",
      problem:
        "100 张卡片编号 1~100，每次丢掉最上面一张，把下一张移到最下面，直到剩一张。最后是几号？",
      solution: [
        "不超过 100 的最大 2 的幂是 64。",
        "k = 100 - 64 = 36。",
        "答案 = 2 × 36 = 72。",
      ],
      takeaway: "记住公式：答案 = 2 × (n - 2^m)，其中 2^m 是不超过 n 的最大 2 的幂。",
    },
  ],
  pitfalls: ["不要混淆不同的淘汰模式，这个公式只适用于“丢一张、移一张”的情况。"],
};

export default entry;
