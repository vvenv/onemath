import type { ProblemData } from "@/types/problem";

export default {
  id: "10024",
  title: "注水问题·合作与竞争",
  grade: "六年级",
  difficulty: "挑战",
  module: "应用题",
  question:
    "一个水池，单开进水管 3 小时可注满，单开排水管 5 小时可放完。现在池中已有三分之一的脏水，需要先排空再注满清水。\n\n小明先打开排水管，但忘了关进水管，导致一边进水一边排水。由于脏水比清水重、沉在池底，而排水管口设在池底，因此排水管先把脏水排出（脏水按每小时 1/5 池的速度匀速减少，直到排净；清水浮在上层暂不被排出）。\n\n等脏水排空后他才想起关闭排水管，继续注水直到注满。\n\n问从开始排水到最终注满清水，总共用了多少时间？",
  solutions: [
    {
      key: "water-tank",
      label: "线段图 + 量率对应",
      steps: [
        {
          text: "阶段一：排净 1/3 脏水用 (1/3)÷(1/5)=5/3 时，同时进水 5/9 池。\n\n阶段二：注满需 (1-5/9)÷(1/3)=4/3 时。\n\n总时间 5/3+4/3=3 时。",
          scenes: [
            {
              kind: "number-line",
              min: 0,
              max: 1,
              points: [
                { value: 0, label: "空" },
                { value: 1, label: "满" },
                { value: 0.33, label: "1/3 脏水", tone: "muted" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "进水管效率", value: "1/3", max: 1, tone: "primary" },
                { label: "排水管效率", value: "1/5", max: 1, tone: "muted" },
              ],
            },
            {
              kind: "statement-table",
              headers: { speaker: "阶段", claim: "描述", badge: "水位变化" },
              rows: [
                {
                  speaker: "阶段一",
                  claim: "两管齐开，排走 1/3 脏水",
                  badge: "t₁ = (1/3) ÷ (1/5) = 5/3 小时",
                },
                {
                  speaker: "阶段一末",
                  claim: "池中清水 = 进水速率 × t₁",
                  badge: "(1/3) × (5/3) = 5/9 池",
                },
                {
                  speaker: "阶段二",
                  claim: "只开进水管，注满剩余 4/9",
                  badge: "t₂ = (4/9) ÷ (1/3) = 4/3 小时",
                },
              ],
            },
            {
              kind: "number-line",
              min: 0,
              max: 3,
              points: [
                { value: 0, label: "开始" },
                { value: 1.6667, label: "脏水排空" },
                { value: 3, label: "注满" },
              ],
              segments: [
                { from: 0, to: 1.6667, label: "阶段一 5/3h", tone: "muted" },
                { from: 1.6667, to: 3, label: "阶段二 4/3h", tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个水池，进水管 4 小时注满，排水管 6 小时放完。现有 1/4 池水，两管齐开。\n\n多久注满？",
    fields: [
      {
        key: "time",
        label: "所需时间（小时）",
      },
    ],
    answer: {
      time: 9,
    },
    hint: "净注水效率 = 1/4 − 1/6 = 1/12。需要注满的部分是 3/4。",
  },
  tags: ["线段图法"],
} satisfies ProblemData;
