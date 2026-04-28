import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10081-1.svg?raw";

export default {
  id: "10081",
  title: "逐站加油·3 车远征",
  grade: "六年级",
  module: "杂题",
  difficulty: "挑战",
  question:
    "探险队有 3 辆完全相同的汽车，每辆油箱加满后恰好能行驶 300 千米。出发时 3 辆车同时从大本营出发，都已加满油；沿途没有任何加油站，但允许一辆车在路上把自己的一部分汽油瞬间倒给另一辆车（不浪费）。要求至少有一辆车尽可能向前走得远，其余车必须安全返回大本营。问那辆最前方的车最远能到达距大本营多少千米的地方？",
  figures: [
    {
      svg: svg1,
      caption: "3 辆车同时出发，每辆油箱 300 km",
      alt: "三车远征示意",
    },
  ],
  solutions: [
    {
      key: "relay",
      label: "接力转油法",
      steps: [
        {
          text: "分析：全队共 3 × 300 = 900 km 汽油。设两个转油点 a < b，车 1 在 a 处给车 2、车 3 各补满后折返，车 2 在 b 处把余油给车 3 后折返，车 3 独自前进。每个转油点都让接油车恢复满箱，才能最远地推进。",
          scenes: [],
        },
        {
          text: "车 1 的账本：300 = a（前进）+ a（给车 2）+ a（给车 3）+ a（返营），即 4a = 300，a = 75 km。",
          scenes: [],
        },
        {
          text: "车 2 的账本（从 a 出发时是满油 300）：300 = (b − a)（前进）+ (b − a)（给车 3）+ b（返营），即 3b − 2a = 300；代入 a = 75 得 b = 150 km。",
          scenes: [],
        },
        {
          text: "车 3 在 b = 150 km 处再次满油，独自最远再跑 300 km。最远距本营 150 + 300 = 450 km。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "车 1 回本营需补油点",
                  rhs: "4a = 300 → a = 75 km",
                },
                {
                  lhs: "车 2 回本营需补油点",
                  rhs: "3b − 2a = 300 → b = 150 km",
                },
                {
                  lhs: "车 3 在 b 处满油再跑",
                  rhs: "150 + 300 = 450 km",
                  status: "keep",
                  badge: "最远",
                },
              ],
              caption: "两次转油点的位置与最远距离",
            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "🚙",
                  count: 450,
                  label: "km",
                },
              ],
              caption: "车 3 最远可达距本营 450 km",
            },
          ],
        },
      ],
    },
    {
      key: "totalFuel",
      label: "总油量账（验证上界）",
      steps: [
        {
          text: "分析：从总油量看，3 辆车共有 900 km 汽油；车 1 跑到 a 并回来用 2a = 150 km；车 2 跑到 b 并回来用 2b = 300 km；剩下 900 − 150 − 300 = 450 km 的油全部由车 3 使用。车 3 一路向前，最远就是 450 km。",
          scenes: [],
        },
        {
          text: "这与「接力转油法」得到的 450 km 完全一致，说明 450 km 是能达到的最远距离。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "总油量",
                  rhs: "3 × 300 = 900 km",
                },
                {
                  lhs: "车 1 往返消耗",
                  rhs: "2 × 75 = 150",
                },
                {
                  lhs: "车 2 往返消耗",
                  rhs: "2 × 150 = 300",
                },
                {
                  lhs: "车 3 可用",
                  rhs: "900 − 150 − 300 = 450",
                  status: "keep",
                },
              ],
              caption: "总油量守恒验证",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "同样的规则，改为 2 辆车同时出发，每辆油箱 300 km。在另一辆车必须返回大本营的条件下，前方那辆车最远能到达距本营多少千米？",
    fields: [
      {
        key: "answer",
        label: "最远距离",
        type: "number",
      },
    ],
    answer: {
      answer: 400,
    },
    hint: "只有 2 辆车时，车 1 的账本是：a（前进）+ a（给车 2 补满）+ a（返营）= 300，解得 a = 100。车 2 在 a = 100 处满油再跑 300，最远 100 + 300 = 400 km。",
  },
  tags: ["逆向推理"],
} satisfies ProblemData;
