import type { Plugin } from "vite";

/**
 * 控制 <link rel="modulepreload"> 标签的插入位置
 * 将所有 modulepreload 标签移动到 </head> 之前
 */
export function controlModulePreloadPosition(): Plugin {
  return {
    name: "control-modulepreload-position",
    transformIndexHtml(html) {
      const lines = html.split('\n');
      const preloadLines: string[] = [];
      const otherLines: string[] = [];

      lines.forEach((line) => {
        if (line.includes('rel="modulepreload"')) {
          preloadLines.push(line);
        } else {
          otherLines.push(line);
        }
      });

      // 找到 </head> 的位置
      const headEndIndex = otherLines.findIndex((line) =>
        line.includes('</head>')
      );

      if (headEndIndex !== -1 && preloadLines.length > 0) {
        // 在 </head> 之前插入所有 modulepreload 标签
        otherLines.splice(headEndIndex, 0, ...preloadLines);
        return otherLines.join('\n');
      }

      return html;
    },
  };
}
