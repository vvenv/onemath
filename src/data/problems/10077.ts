import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10077-1.svg?raw";

export default {
  id: "10077",
  title: "跟车装卸工·最少人力",
  grade: "六年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "某物流公司用 4 辆相同的卡车，在仓库 A 与工地 B 之间不停往返运货。A、B 之间单程行驶 15 分钟（空车返程也 15 分钟）；在 A 装一辆车需 3 分钟，在 B 卸一辆车需 3 分钟；装卸各需一名工人，同一时刻一名工人只能服务一辆车。\n工人可以留在一个站点固定装卸，也可以跟车往返（跟车途中不计工作时间，到站即可开工）。\n问至少派多少名工人，就能保证 4 辆车始终不因为等人而停下？",
  figures: [
    {
      svg: svg1,
      alt: "A、B 间卡车往返示意",
    },
  ],
  solutions: [
    {
      key: "intervalCheck",
      label: "节拍法（算车到站间隔）",
      steps: [
        {
          text: "用节拍法计算：计算一圈用时和到站节拍，比较装卸时间与节拍，确定最少工人数。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "一圈用时",
                  rhs: "3 + 15 + 3 + 15 = 36 min",
                },
                {
                  lhs: "到站节拍",
                  rhs: "36 ÷ 4 = 9 min/车",
                },
                {
                  lhs: "A 站负载",
                  rhs: "装 3 min < 9 min → 1 人",
                },
                {
                  lhs: "B 站负载",
                  rhs: "卸 3 min < 9 min → 1 人",
                },
                {
                  lhs: "固定方案合计",
                  rhs: "2 人",
                  status: "keep",
                  badge: "最少",
                },
                {
                  lhs: "跟车方案",
                  rhs: "4 人",
                  status: "cancel",
                },
              ],
            },
          ],
        },
        {
          text: "跟车方案需要每人锁住一辆 36 min，共 4 名工人，更差。所以最少派 2 名工人。",
          scenes: [],
        },
      ],
    },
  ],
  variant: {
    question:
      "条件相同，但改为 6 辆卡车、单程 12 分钟、装车 4 分钟、卸车 4 分钟。至少派多少名工人（固定或跟车均可）才能让车始终不等人？",
    fields: [
      {
        key: "answer",
        label: "最少工人数",
        type: "number",
      },
    ],
    answer: {
      answer: 2,
    },
    hint: "一圈 4+12+4+12 = 32 min，6 辆车节拍 = 32 ÷ 6 ≈ 5.33 min/车。装卸均 4 min，小于节拍，A、B 各 1 人即可，共 2 人。",
  },
  tags: ["调运选址"],
} satisfies ProblemData;
