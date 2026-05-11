import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10040-1.svg?raw";

export default {
  id: "10040",
  title: "奇偶性·翻杯子",
  grade: "三年级",
  module: "数论",
  difficulty: "基础",
  question:
    "桌上有 5 个杯子，全部杯口朝上。每次同时翻转 3 个杯子，经过若干次操作后，\n\n能否使所有杯子杯口朝下？",
  solutions: [
    {
      key: "parity",
      label: "奇偶性分析法",
      steps: [
        {
          text: "每次翻转 3 个杯子，杯口朝上（记为 1）的个数奇偶性必然改变。",
          scenes: [
            {
              kind: "heads",
              heads: {
                count: 5,
              },
            },
            {
              kind: "statement-table",
              headers: {
                speaker: "操作次数",
                claim: "1的个数",
                verdict: "奇偶性",
              },
              rows: [
                {
                  speaker: "0 (初始)",
                  claim: "5",
                  verdict: "false",
                },
                {
                  speaker: "1",
                  claim: "2 或 4 或 6",
                  verdict: "true",
                },
                {
                  speaker: "2",
                  claim: "1 或 3 或 5",
                  verdict: "false",
                },
                {
                  speaker: "3",
                  claim: "0 或 2 或 4",
                  verdict: "true",
                },
              ],
            },
            {
              kind: "svg",
              svg: svg1,
            },
          ],
        },
        {
          text: "初始 5 个朝上（奇数），目标 0 个朝上（偶数），故操作次数必为奇数。",
        },
        {
          text: "构造 3 次操作：①④⑤ / ②④⑤ / ③④⑤。",
          scenes: [
            {
              kind: "statement-table",
              headers: {
                speaker: "操作",
                claim: "翻哪 3 只",
                verdict: "共 3 次",
                badge: "此次贡献",
              },
              rows: [
                {
                  speaker: "第 1 次",
                  claim: "① ④ ⑤",
                  badge: "① +1，④ +1，⑤ +1",
                },
                {
                  speaker: "第 2 次",
                  claim: "② ④ ⑤",
                  badge: "② +1，④ +1，⑤ +1",
                },
                {
                  speaker: "第 3 次",
                  claim: "③ ④ ⑤",
                  badge: "③ +1，④ +1，⑤ +1",
                },
              ],
              note: "各杯累计翻转：① ② ③ 各 1 次；④ ⑤ 各 3 次；全部奇数 ⇒ 全部由朝上变朝下",
            },
          ],
        },
        {
          text: "各杯累计翻转次数：①②③ 各 1 次，④⑤ 各 3 次，均为奇数。",
        },
        {
          text: "每个杯子翻转奇数次后，杯口方向必然改变，故可实现。",
        },
      ],
    },
  ],
  variant: {
    question:
      "桌上有 4 个杯子，全部杯口朝上。每次同时翻转 3 个杯子，能否使所有杯子杯口朝下？",
    fields: [
      {
        key: "possible",
        type: "text",
        label: "能否实现",
        enum: ["能", "不能"],
      },
    ],
    answer: {
      possible: "不能",
    },
    hint: "考虑翻转总次数的奇偶性。",
  },
  tags: ["奇偶性"],
} satisfies ProblemData;
