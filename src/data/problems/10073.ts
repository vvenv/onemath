import type { ProblemData } from "@/types/problem";

export default {
  "id": "10073",
  "title": "双工序加工·最短总工时",
  "grade": "六年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "一批工件共 5 件（A、B、C、D、E），每件都要先在机床甲上加工，再在机床乙上加工（顺序不能颠倒；同一机床一次只能加工一件）。各工件在两台机床上需要的时间（单位：小时）如下：| 工件 | 机床甲 | 机床乙 || --- | --- | --- || A | 3 | 6 || B | 7 | 2 || C | 4 | 7 || D | 5 | 3 || E | 6 | 4 |\n请合理安排 5 件工件在机床甲上的加工顺序，使全部完成的总工时最短。最短总工时是多少？",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 150' font-size='14'><g fill='#d6eaf8' stroke='#2E86C1'><rect x='30' y='40' width='120' height='40' rx='6'/><rect x='210' y='40' width='120' height='40' rx='6'/></g><g fill='#1B4F72' text-anchor='middle'><text x='90' y='65'>机床甲</text><text x='270' y='65'>机床乙</text><text x='180' y='30'>工件先甲后乙</text></g><g stroke='#b9770e' fill='none'><path d='M150 60 L210 60' marker-end='url(#arr)'/></g><defs><marker id='arr' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' fill='#b9770e'/></marker></defs></svg>",
      "caption": "5 件工件必须先在甲上加工，再到乙上加工",
      "alt": "双工序流水线示意"
    }
  ],
  "solutions": [
    {
      "key": "johnson",
      "label": "约翰逊规则（分组排序）",
      "steps": [
        "分析：在双机床流水线里，总工时 = 所有工件在机床甲上的用时之和 + 机床乙在最后一段的空闲与加工时间。想让乙提前开工、最后尽快结束，就应该让“甲上快、乙上慢”的工件先做，“甲上慢、乙上快”的工件后做。",
        "把每个工件比较甲、乙用时，分两组：甲 ≤ 乙 归入第 1 组（先做），甲 > 乙 归入第 2 组（后做）。",
        "A(3,6) 甲<乙 → 第 1 组；C(4,7) 甲<乙 → 第 1 组。",
        "B(7,2)、D(5,3)、E(6,4) 甲>乙 → 第 2 组。",
        "第 1 组按“甲上时间从小到大”排：A(甲=3), C(甲=4)。",
        "第 2 组按“乙上时间从大到小”排：E(乙=4), D(乙=3), B(乙=2)。",
        "总顺序：A → C → E → D → B。",
        "按这个顺序算甲、乙两台机床各工件的起止时间，乙最后一件 B 完工时间即为总工时，计算得 27 小时。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "A：甲 0–3，乙 3–9",
              "rhs": "乙空等 3，做 6"
            },
            {
              "lhs": "C：甲 3–7，乙 9–16",
              "rhs": "乙接着做 7"
            },
            {
              "lhs": "E：甲 7–13，乙 16–20",
              "rhs": "乙接着做 4"
            },
            {
              "lhs": "D：甲 13–18，乙 20–23",
              "rhs": "乙接着做 3"
            },
            {
              "lhs": "B：甲 18–25，乙 25–27",
              "rhs": "乙等到甲做完 B 再做 2",
              "badge": "终点"
            },
            {
              "lhs": "最短总工时",
              "rhs": "27 小时",
              "status": "keep"
            }
          ],
          "caption": "按 A→C→E→D→B 排产的甘特式计算"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "⚙️",
              "count": 27,
              "label": "小时"
            }
          ],
          "caption": "最短总工时"
        }
      ]
    }
  ],
  "variant": {
    "question": "4 件工件在甲、乙两台机床上先后加工，用时如下：A(2,5), B(6,3), C(4,6), D(5,2)。请排出甲上的顺序使总工时最短，最短总工时是多少小时？",
    "fields": [
      {
        "key": "answer",
        "label": "最短总工时",
        "type": "number"
      }
    ],
    "answer": {
      "answer": 19
    },
    "hint": "第 1 组 A、C（甲≤乙），按甲升序 A→C；第 2 组 B、D（甲>乙），按乙降序 B→D。顺序 A→C→B→D：甲 0–2, 2–6, 6–12, 12–17；乙 2–7, 7–13, 13–16, 17–19，终点 19。"
  },
  "tags": []
} satisfies ProblemData;
