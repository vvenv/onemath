import type { ProblemData } from "@/types/problem";

export default {
  id: "10022",
  title: "逻辑推理·真假话",
  grade: "五年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "警察抓获了四个嫌疑人 A, B, C, D。已知只有一人是小偷。他们的供词如下：\nA：不是我。\nB：是 C。\nC：是 D。\nD：C 在胡说。\n已知只有一个人说了真话。请问谁是小偷？",
  solutions: [
    {
      key: "contradiction",
      label: "矛盾分析法",
      steps: [
        {
          text: "C 与 D 互相否定必一真一假，故 A、B 假。\nB「是 C」假 ⇒ 非 C；A「不是我」假 ⇒ 是 A。\n验证：D 为真 ✓。",
          scenes: [
            {
              kind: "statement-table",
              rows: [
                { speaker: "A", claim: "不是我" },
                { speaker: "B", claim: "是 C" },
                {
                  speaker: "C",
                  claim: "是 D",
                  highlight: "contradiction",
                  badge: "⚡ 与 D 矛盾",
                },
                {
                  speaker: "D",
                  claim: "C 在胡说",
                  highlight: "contradiction",
                  badge: "⚡ 与 C 矛盾",
                },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },

            },
            {
              kind: "statement-table",
              rows: [
                { speaker: "A", claim: "不是我" },
                { speaker: "B", claim: "是 C" },
                {
                  speaker: "C",
                  claim: "是 D",
                  highlight: "contradiction",
                  badge: "一真一假",
                },
                {
                  speaker: "D",
                  claim: "C 在胡说",
                  highlight: "contradiction",
                  badge: "一真一假",
                },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },

            },
            {
              kind: "statement-table",
              rows: [
                { speaker: "A", claim: "不是我" },
                { speaker: "B", claim: "是 C" },
                {
                  speaker: "C",
                  claim: "是 D",
                  highlight: "contradiction",
                  badge: "唯一真话在此",
                },
                {
                  speaker: "D",
                  claim: "C 在胡说",
                  highlight: "contradiction",
                  badge: "唯一真话在此",
                },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },
              note: "全场只有一句真话 ⇒ 必定落在 C 或 D 身上",

            },
            {
              kind: "statement-table",
              rows: [
                { speaker: "A", claim: "不是我", verdict: "false" },
                { speaker: "B", claim: "是 C", verdict: "false" },
                { speaker: "C", claim: "是 D", highlight: "contradiction" },
                { speaker: "D", claim: "C 在胡说", highlight: "contradiction" },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },

            },
            {
              kind: "statement-table",
              rows: [
                { speaker: "A", claim: "不是我", verdict: "false" },
                {
                  speaker: "B",
                  claim: "是 C",
                  verdict: "false",
                  badge: "⇒ 小偷 ≠ C",
                },
                { speaker: "C", claim: "是 D", highlight: "muted" },
                { speaker: "D", claim: "C 在胡说", highlight: "muted" },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },

            },
            {
              kind: "statement-table",
              rows: [
                {
                  speaker: "A",
                  claim: "不是我",
                  verdict: "false",
                  highlight: "target",
                  badge: "小偷",
                },
                { speaker: "B", claim: "是 C", verdict: "false" },
                { speaker: "C", claim: "是 D", highlight: "muted" },
                { speaker: "D", claim: "C 在胡说", highlight: "muted" },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },

            },
            {
              kind: "statement-table",
              rows: [
                {
                  speaker: "A",
                  claim: "不是我",
                  verdict: "false",
                  highlight: "target",
                  badge: "小偷",
                },
                { speaker: "B", claim: "是 C", verdict: "false" },
                { speaker: "C", claim: "是 D", verdict: "false" },
                {
                  speaker: "D",
                  claim: "C 在胡说",
                  verdict: "true",
                  badge: "唯一真话",
                },
              ],
              headers: { speaker: "嫌疑人", claim: "供词" },
              note: "3 假 + 1 真，符合“只有一人说真话”",

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙、丙、丁四人参加比赛。对于名次，他们猜测：甲：我不是第一。乙：我不是第二。丙：甲是第一。丁：丙是第四。已知只有一人猜错，请问谁是第一？",
    fields: [
      {
        key: "first",
        label: "第一名",
        type: "text",
        enum: ["甲", "乙", "丙", "丁"],
      },
    ],
    answer: {
      first: "甲",
    },
    hint: "找出哪两个人说的话是互斥的（甲和丙）。",
  },
  tags: ["分类讨论"],
} satisfies ProblemData;
