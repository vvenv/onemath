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
        "分析：把朝上/朝下记为 1/0，目标是把 5 个 1 全变成 0。每翻 3 只，「朝上的个数」变化 ±1 或 ±3，奇偶性必然改变。初始 5（奇）→ 目标 0（偶），所以操作次数必为奇数。",
        "另一条线索（每只角度）：每只要由 1 变 0 都要翻奇数次，5 只奇数之和仍是奇数；而每次操作贡献 3 次翻转，总翻转 = 3·操作次数；两者一致仍指向「操作次数是奇数」，最少候选是 3。",
        "构造 3 次方案：标号杯子 ①②③④⑤，分别翻 ①④⑤ / ②④⑤ / ③④⑤。各杯翻转次数：①②③ 各 1，④⑤ 各 3，全部奇数 ✓。",
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
