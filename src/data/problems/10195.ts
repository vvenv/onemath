import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10195-1.svg?raw";
import svg2 from "./figures/10195-2.svg?raw";
import svg3 from "./figures/10195-3.svg?raw";

export default {
  id: "10195",
  title: "归纳与递推·贴瓷砖",
  grade: "四年级",
  difficulty: "基础",
  module: "计数",
  question:
    "用 1×2 的瓷砖铺 2×3 的地面（瓷砖可以横放也可以竖放），一共有多少种不同的铺法？",
  figures: [
    {
      svg: svg1,
      alt: "2×3 的网格地面",
    },
  ],
  solutions: [
    {
      key: "recurrence",
      label: "递推法",
      steps: [
        {
          text: "分析：考虑最左列瓷砖的放置方式，横放需两块填满，竖放只需一块。",
          scenes: [
            {
              kind: "svg",
              svg: svg2,
            },
            {
              kind: "svg",
              svg: svg3,
            },
          ],
        },
        {
          text: "递推公式：f(n) = f(n-1) + f(n-2)，其中 f(n) 表示 2×n 地面的铺法数。",
        },
        {
          text: "计算基础情况：f(1) = 1（只能竖放），f(2) = 2（都竖放或都横放）。\n\n按递推计算 f(3) = f(2) + f(1) = 2 + 1 = 3。",
        },
      ],
    },
  ],
  variant: {
    question:
      "用 1×2 的瓷砖铺 2×4 的地面（瓷砖可以横放也可以竖放），一共有多少种不同的铺法？",
    fields: [
      {
        key: "ways",
        label: "铺法数",
        type: "number",
      },
    ],
    answer: {
      ways: 5,
    },
    hint: "用递推法：f(n) = f(n−1) + f(n−2)，先算基础情况 f(1) 和 f(2)",
  },
  tags: ["递推法"],
} satisfies ProblemData;
