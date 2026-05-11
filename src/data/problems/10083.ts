import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10083-1.svg?raw";

export default {
  id: "10083",
  title: "圆桌放币·对称策略",
  grade: "五年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "甲、乙两人在一张圆形的桌面上轮流放置同一种大小的圆形硬币。每枚硬币都必须平放在桌面上，不能重叠、也不能放到桌外；甲先放，乙后放，如此交替。\n\n最后一个能再放下一枚硬币的人获胜（对方轮到时再也放不下，就算输）。请问甲是否有必胜策略？",
  solutions: [
    {
      key: "symmetry",
      label: "中心对称复制策略",
      steps: [
        {
          text: "分析：圆形桌面关于圆心中心对称，硬币也是圆的。甲先放圆心，使桌面保持对称。",
        },
        {
          text: "乙每放 P，甲就在对称点 P' 放一枚。",
        },
        {
          text: "轮到乙时桌面必对称，若乙能放 P，则 P' 必空，甲总有对应空位。",
        },
        {
          text: "先无处可放的必是乙，故甲必胜。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      '把上题桌子换成"长方形"桌面，其他规则不变（两人轮流放同样大小圆形硬币，最后放下一枚者胜）。\n\n请问先手甲是否有必胜策略？',
    fields: [
      {
        key: "winner",
        label: "必胜方",
        type: "text",
        enum: ["先手甲", "后手乙", "均无"],
      },
    ],
    answer: {
      winner: "先手甲",
    },
    hint: "长方形也有对称中心。甲先把硬币放在长方形中心，此后对乙的每一步都做中心对称的镜像，策略与圆桌情形完全相同。",
  },
  tags: ["不变量"],
} satisfies ProblemData;
