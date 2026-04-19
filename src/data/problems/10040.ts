import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10040-1.svg?raw";

export default {
  "id": "10040",
  "title": "奇偶性·翻杯子",
  "grade": "三年级",
  "module": "numberTheory",
  "difficulty": "基础",
  "question": "桌上有 5 个杯子，全部杯口朝上。每次同时翻转 3 个杯子，经过若干次操作后，能否使所有杯子杯口朝下？",
  "solutions": [
    {
      "key": "parity",
      "label": "奇偶性分析法",
      "steps": [
        "把朝上记为 1、朝下记为 0。目标：让 5 个 1 全部变成 0。",
        "每次翻转 3 只：其中每只都在 0/1 之间跳一次。",
        "第一步·判奇偶：翻转 3 只让「朝上的个数」变化 ±1 或 ±3，奇偶性每次都改变。",
        "初始有 5 个 1（奇），目标 0 个 1（偶）。奇 → 偶，必须经过 **奇数** 次操作。",
        "第二步·判翻转总次数：每只要从 1 变 0 都得翻奇数次；5 只的翻转次数总和 = 5 个奇数相加 = 奇数。",
        "同时每次操作贡献 3 次翻转，总翻转次数 = 3 × 操作次数，是 3 的倍数。",
        "所以需要：3 × 操作次数 = 奇数，即操作次数是奇数（与第一步一致）。",
        "第三步·构造 3 次方案（存在性）：标记杯子为 ①②③④⑤。",
        "操作 1：翻 ①④⑤；操作 2：翻 ②④⑤；操作 3：翻 ③④⑤。",
        "计数：① 翻 1 次、② 翻 1 次、③ 翻 1 次、④ 翻 3 次、⑤ 翻 3 次——全部奇数 ✓。",
        "结论：可以实现，最少 3 次操作。"
      ],
      "scenes": [
        {
          "kind": "heads",
          "heads": {
            "count": 5
          },
          "caption": "初始状态：5 个杯子全部杯口朝上（1 的个数为 5，奇数）"
        },
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "操作次数",
            "claim": "1的个数",
            "verdict": "奇偶性"
          },
          "rows": [
            {
              "speaker": "0 (初始)",
              "claim": "5",
              "verdict": "false"
            },
            {
              "speaker": "1",
              "claim": "2 或 4 或 6",
              "verdict": "true"
            },
            {
              "speaker": "2",
              "claim": "1 或 3 或 5",
              "verdict": "false"
            },
            {
              "speaker": "3",
              "claim": "0 或 2 或 4",
              "verdict": "true"
            }
          ],
          "caption": "每次翻转 3 个杯子，1 的个数的奇偶性必然改变。目标 0 是偶数，需要奇数次操作。"
        },
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "翻转过程示意：每次翻转 3 个杯子，奇偶性必然改变"
        },
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "操作",
            "claim": "翻哪 3 只",
            "verdict": "共 3 次",
            "badge": "此次贡献"
          },
          "rows": [
            {
              "speaker": "第 1 次",
              "claim": "① ④ ⑤",
              "badge": "① +1，④ +1，⑤ +1"
            },
            {
              "speaker": "第 2 次",
              "claim": "② ④ ⑤",
              "badge": "② +1，④ +1，⑤ +1"
            },
            {
              "speaker": "第 3 次",
              "claim": "③ ④ ⑤",
              "badge": "③ +1，④ +1，⑤ +1"
            }
          ],
          "note": "各杯累计翻转：① ② ③ 各 1 次；④ ⑤ 各 3 次；全部奇数 ⇒ 全部由朝上变朝下",
          "caption": "3 次操作的具体构造"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "✅",
              "count": "可以",
              "label": "能否实现"
            },
            {
              "icon": "🔄",
              "count": 3,
              "label": "最少操作次数"
            }
          ],
          "caption": "答：可以；最少 3 次"
        }
      ]
    }
  ],
  "variant": {
    "question": "桌上有 4 个杯子，全部杯口朝上。每次同时翻转 3 个杯子，能否使所有杯子杯口朝下？",
    "fields": [
      {
        "key": "possible",
        "type": "text",
        "label": "能否实现",
        "enum": [
          "能",
          "不能"
        ]
      }
    ],
    "answer": {
      "possible": "不能"
    },
    "hint": "考虑翻转总次数的奇偶性。"
  },
  "tags": []
} satisfies ProblemData;
