import type { KnowledgeEntry } from "@/types/knowledge";
import svg1 from "./figures/counting-1.svg?raw";

const entry: KnowledgeEntry = {
  slug: "inclusion-exclusion",
  name: "容斥原理",
  tag: "容斥原理",
  category: "counting",
  summary: "两圈相交要减重合；三圈相交要“加单、减双、加三”。",
  intuition:
    "把两个兴趣小组的花名册贴在墙上，一个人同时在两边就被数了两次——要让他只数一次，就得减去重合部分。Venn 图让这个重合看得见。",
  derivation: [
    "两集合：|A ∪ B| = |A| + |B| − |A ∩ B|。",
    "三集合：|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|。",
    "一般地：单项相加、双交相减、三交相加……奇加偶减。",
  ],
  keyPoints: [
    "“至少参加一项” = 单项和 − 两两交集 + 三交集。",
    "“都不参加” = 总人数 − 至少参加一项。",
  ],
  examples: [
    {
      title: "两圈容斥",
      problem:
        "全班 42 人，参加数学组 28 人，参加英语组 22 人，两组都参加的 15 人。两组都不参加的几人？",
      solution: [
        "至少参加一项 = 28 + 22 − 15 = 35。",
        "都不参加 = 42 − 35 = 7。",
      ],
    },
    {
      title: "三圈容斥",
      problem:
        "100 名学生，喜欢语文 50，数学 45，英语 40；语数都喜欢 20，数英都喜欢 15，语英都喜欢 10，三科都喜欢 5。一科都不喜欢的几人？",
      solution: [
        "至少喜欢一科 = 50 + 45 + 40 − 20 − 15 − 10 + 5 = 95。",
        "都不喜欢 = 100 − 95 = 5。",
      ],
      takeaway: "三圈时，每个交集出现的符号就是 Venn 图里被盖了几层的修正。",
    },
  ],
  pitfalls: [
    "注意“既 A 又 B”和“只 A 不 B”的区别，后者等于 |A| − |A ∩ B|。",
    "三交集在题目里常被漏掉，要主动检查是否有“三者同时”这种条件。",
  ],
  relatedSlugs: ["parity"],
  figures: [
    {
      svg: svg1,
      alt: "两圆相交的韦恩图",

    },
  ],
};

export default entry;
