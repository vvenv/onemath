import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10171-1.svg?raw";
import svg2 from "./figures/10171-2.svg?raw";

export default {
  id: "10171",
  title: "行程问题·火车过桥",
  grade: "五年级",
  module: "行程",
  difficulty: "进阶",
  question:
    "一列火车通过一座长 600 米的桥需要 50 秒，用同样的速度通过一条长 400 米的隧道需要 40 秒。这列火车的速度和车长各是多少？",
  figures: [
    {
      svg: svg1,
      caption: "火车过桥和过隧道示意图",
      alt: "示意图：火车通过桥梁和隧道",
    },
  ],
  solutions: [
    {
      key: "difference",
      label: "路程差法",
      steps: [
        "分析：路程差 = 桥长 − 隧道长 = 600 − 400 = 200 米，时间差 = 50 − 40 = 10 秒。",
        "速度 = 200 ÷ 10 = 20 米/秒，车长 = 20 × 50 − 600 = 400 米。",
      ],
      scenes: [
        {
          kind: "svg",
          svg: svg2,
          caption: "路程差分析",
        },
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "路程差",
              rhs: "600 − 400 = 200",
              status: "keep",
            },
            {
              lhs: "时间差",
              rhs: "50 − 40 = 10",
              status: "keep",
            },
            {
              lhs: "速度",
              rhs: "200 ÷ 10 = 20",
              status: "keep",
            },
            {
              lhs: "车长",
              rhs: "20 × 50 − 600 = 400",
              status: "keep",
            },
          ],
          caption: "利用路程差求速度和车长",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🚂",
              count: 20,
              label: "速度",
              note: "米/秒",
            },
            {
              icon: "📏",
              count: 400,
              label: "车长",
              note: "米",
            },
          ],
          caption: "火车速度 20 米/秒，车长 400 米",
        },
      ],
    },
    {
      key: "equation",
      label: "方程法",
      steps: [
        "设速度为 v 米/秒，车长为 L 米，则 (600 + L) ÷ v = 50，(400 + L) ÷ v = 40。",
        "两式相减得 200 ÷ v = 10，解得 v = 20，代入得 L = 400。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "(600 + L) ÷ v",
              rhs: "50",
              badge: "①",
            },
            {
              lhs: "(400 + L) ÷ v",
              rhs: "40",
              badge: "②",
            },
            {
              lhs: "① − ②",
              rhs: "200 ÷ v = 10",
              status: "keep",
            },
            {
              lhs: "v",
              rhs: "20",
              status: "keep",
            },
            {
              lhs: "L",
              rhs: "400",
              status: "keep",
            },
          ],
          caption: "列方程求解",
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
