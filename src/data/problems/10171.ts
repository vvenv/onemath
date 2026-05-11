import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10171-1.svg?raw";

export default {
  id: "10171",
  title: "行程问题·火车过桥",
  grade: "五年级",
  difficulty: "进阶",
  module: "行程",
  question:
    "一列火车通过一座长 600 米的桥需要 50 秒，用同样的速度通过一条长 400 米的隧道需要 40 秒。\n\n这列火车的速度和车长各是多少？",
  solutions: [
    {
      key: "difference",
      label: "路程差法",
      steps: [
        {
          text: "分析：路程差 = 桥长 − 隧道长 = 600 − 400 = 200 米，时间差 = 50 − 40 = 10 秒。",
        },
        {
          text: "速度 = 200 ÷ 10 = 20 米/秒，车长 = 20 × 50 − 600 = 400 米。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "路程差", rhs: "600 − 400 = 200", status: "keep" },
                { lhs: "时间差", rhs: "50 − 40 = 10", status: "keep" },
                { lhs: "速度", rhs: "200 ÷ 10 = 20", status: "keep" },
                { lhs: "车长", rhs: "20 × 50 − 600 = 400", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "equation",
      label: "方程法",
      steps: [
        {
          text: "设速度为 v 米/秒，车长为 L 米，则 (600 + L) ÷ v = 50，(400 + L) ÷ v = 40。\n\n两式相减得 200 ÷ v = 10，解得 v = 20，代入得 L = 400。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "(600 + L) ÷ v (①)", rhs: "50" },
                { lhs: "(400 + L) ÷ v (②)", rhs: "40" },
                { lhs: "① − ②", rhs: "200 ÷ v = 10", status: "keep" },
                { lhs: "v", rhs: "20", status: "keep" },
                { lhs: "L", rhs: "400", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一列火车通过一座长 800 米的桥需要 60 秒，用同样的速度通过一条长 500 米的隧道需要 45 秒。这列火车的速度和车长各是多少？",
    fields: [
      {
        key: "speed",
        label: "火车速度（米/秒）",
      },
      {
        key: "length",
        label: "火车长度（米）",
      },
    ],
    answer: {
      speed: 20,
      length: 400,
    },
    hint: "路程差 = 800 − 500 = 300 米，时间差 = 60 − 45 = 15 秒。",
  },
  tags: ["火车过桥"],
} satisfies ProblemData;
