import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "periodicity",
  name: "周期问题",
  tag: "周期问题",
  category: "numberCalc",
  summary:
    "找到循环节长度 T，用 n 除以 T 的余数定位第 n 项；余数为 0 时取一个完整周期的末项。",
  intuition:
    "钟表 12 小时一圈、星期 7 天一循环、月相约 30 天一轮——只要某个序列每过 T 步就回到原样，就能用余数把第 n 项的问题缩回到第 r 项。",
  derivation: [
    "写出前若干项，观察从哪一项开始重复，得到循环节长度 T。",
    "计算 n ÷ T = q ⋯ r。",
    "若 r ≠ 0，第 n 项 = 第 r 项；若 r = 0，第 n 项 = 第 T 项（恰好走完整数个周期）。",
  ],
  keyPoints: [
    "余数 0 对应循环节的最后一项，不是第 0 项。",
    "若开头有“前导段”不参与循环，先减去前导长度，再对剩下的部分取模。",
  ],
  examples: [
    {
      title: "字母循环",
      problem: "字母 A、B、C、D、E 反复排列：ABCDEABCDE…，第 2024 个字母是？",
      solution: [
        "循环节长度 T = 5。",
        "2024 ÷ 5 = 404 ⋯ 4，余数为 4。",
        "第 4 个字母是 D，所以第 2024 个字母是 D。",
      ],
    },
    {
      title: "末位数字",
      problem: "求 7^100 的个位数字。",
      solution: [
        "7 的幂个位依次为 7, 9, 3, 1, 7, 9, 3, 1, …，循环节长度 4。",
        "100 ÷ 4 = 25 ⋯ 0，余数为 0，取循环节末项。",
        "末项是 1，所以 7^100 的个位是 1。",
      ],
      takeaway: "求幂的末位、末两位都常用周期 + 取模。",
    },
  ],
  pitfalls: [
    "先判断循环是否“立即开始”：日历、跑道这类一上来就循环；有些数列前几项是过渡段，要剥离。",
    "题干说的“第几个”有时是从 0 开始，有时是从 1 开始，对齐编号再取余。",
  ],
};

export default entry;
