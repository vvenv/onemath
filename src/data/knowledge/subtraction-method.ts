import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "subtraction-method",
  name: "作差法",
  tag: "作差法",
  category: "numberCalc",
  summary:
    "把两组含有相同未知量的式子相减，让公共部分自动消去，直接得到差值或比例关系。",
  intuition:
    "两根杆同插在水里，分别量出露出水面的长度；相减一下，水深自动消失，露出的就是杆子本身的长度差。凡是“两式有共同的影子”，相减就能让影子消失。",
  derivation: [
    "若 A + x = m，B + x = n，则 A − B = m − n，未知量 x 被消掉。",
    "若 A · x = m，B · x = n，则 A : B = m : n（两式相除消公因子，本质是同一思想的乘法版本）。",
    "更一般地，两式只要有公共项，就让该项作为“被减数 − 减数”里的相同部分被消去。",
  ],
  keyPoints: [
    "“共同部分”可以是常数、未知量，也可以是“相同的总数”“相同的速度”等量。",
    "作差法和方程法本质相通：把两个方程相减，等价于消元。",
  ],
  examples: [
    {
      title: "盈亏问题",
      problem:
        "把一些苹果分给小朋友，每人 4 个剩 8 个；每人 6 个少 4 个。求小朋友人数与苹果数。",
      solution: [
        "记小朋友人数为 n，苹果数为 m。则 4n + 8 = m，6n − 4 = m。",
        "两式相减：(6n − 4) − (4n + 8) = 0，得 2n − 12 = 0，n = 6。",
        "代回得 m = 4 × 6 + 8 = 32。",
      ],
    },
    {
      title: "比身高",
      problem:
        "甲乙两人站在台阶上，甲比乙高 4 厘米；甲走下一级台阶后比乙矮 16 厘米。一级台阶高多少厘米？",
      solution: [
        "记甲身高 a，乙身高 b，台阶高 h。原状：a = b + 4。",
        "甲下一级后：a − h = b − 16。",
        "两式相减：h = (a) − (a − h) = (b + 4) − (b − 16) = 20。台阶高 20 厘米。",
      ],
      takeaway: "“做了一个动作前后”的两式相减，能直接量出动作的“量”。",
    },
  ],
  pitfalls: [
    "相减时要对齐“公共部分”：哪一项是减数、哪一项是被减数，要根据公共结构选。",
    "如果两式不止一个公共未知量，相减只能消掉一个；剩下的还是要再补一个关系才能解出。",
  ],
  relatedSlugs: ["hypothesis-method", "equation-method"],
};

export default entry;
