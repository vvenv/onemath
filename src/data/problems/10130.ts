import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10130-1.svg?raw";

export default {
  id: "10130",
  title: "相似模型·沙漏（平行四边形内外延伸）",
  grade: "五年级",
  module: "几何",
  difficulty: "基础",
  question:
    "如图，平行四边形 ABCD 中，AB = 16，AD = 10。E 在 AD 上且 AE = 4。连接 BE 并延长，与 CD 所在直线的延长线相交于点 F（F 在 D 的外侧）。求 DF 的长度。",
  figures: [
    {
      svg: svg1,
      caption:
        "平行四边形 ABCD；E 在 AD 上（AE = 4）；BE 延长与 CD 延长线交于 F",
      alt: "平行四边形及其外部的一条交线与延长",
    },
  ],
  solutions: [
    {
      key: "hourglass",
      label: "沙漏（X 型）相似",
      steps: [
        "分析：AB ∥ CD（平行四边形的一对对边），而直线 BF 同时过 AB 上的 B 和 CD 延长线上的 F，另一方向上 E 在 AD 上。这正是典型的「沙漏模型」——两对平行线交出的两个三角形相似。",
        "第一步：找相似的两个三角形。考察 △ABE 与 △DFE：· ∠AEB 与 ∠DEF 是对顶角，相等；· AB ∥ DF（DF 落在 CD 所在直线上），所以 ∠BAE = ∠FDE（内错角）。两组角相等 ⇒ △ABE ∼ △DFE。",
        "第二步：对应边比。△ABE 中对应 ∠AEB 的边是 AB；△DFE 中对应 ∠DEF 的边是 DF。因此 AB : DF = AE : DE。",
        "第三步：代入数值。AE = 4，DE = AD − AE = 10 − 4 = 6。所以 AB : DF = 4 : 6 = 2 : 3。",
        "第四步：AB = 16 ⇒ DF = 16 × 3/2 = 24。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "AE / DE",
              rhs: "4 / 6 = 2/3",
            },
            {
              lhs: "AB / DF = AE / DE (沙漏相似)",
              rhs: "2/3",
            },
            {
              lhs: "DF = 16 × 3/2 (答案)",
              rhs: "24",
            },
          ],
          caption: "沙漏模型：两个对顶三角形相似，对应边成比例",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "📏",
              count: 24,
              label: "DF 长度",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "平行四边形 ABCD 中 AB = 20，AD = 12。E 在 AD 上使 AE = 3。连接 BE 延长与 CD 延长线交于 F。求 DF。",
    fields: [
      {
        key: "df",
        label: "DF 长度",
        type: "number",
      },
    ],
    answer: {
      df: 60,
    },
    hint: "AE : DE = 3 : 9 = 1 : 3；由沙漏相似 DF = AB × 3/1 = 60。",
  },
  tags: ["相似模型", "面积法"],
} satisfies ProblemData;
