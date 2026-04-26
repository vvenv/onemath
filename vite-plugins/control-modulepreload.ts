import type { Plugin } from "vite";

/**
 * 控制 <link rel="modulepreload"> 标签的插入位置
 * 将所有 modulepreload 标签移动到 </head> 之前
 */
export function controlModulePreloadPosition(): Plugin {
  return {
    name: "control-modulepreload-position",
    transformIndexHtml(html) {
      // 使用正则表达式匹配所有 modulepreload 标签
      const preloadRegex = /<link[^>]*rel="modulepreload"[^>]*>/g;
      const preloadMatches: string[] = [];
      let match;

      while ((match = preloadRegex.exec(html)) !== null) {
        preloadMatches.push(match[0]);
      }

      if (preloadMatches.length === 0) {
        return html;
      }

      // 移除原有的 modulepreload 标签
      const htmlWithoutPreloads = html.replace(preloadRegex, '');

      // 在 </head> 之前插入所有 modulepreload 标签
      const headEndIndex = htmlWithoutPreloads.indexOf('</head>');
      if (headEndIndex !== -1) {
        return (
          htmlWithoutPreloads.slice(0, headEndIndex) +
          preloadMatches.join('\n') +
          '\n' +
          htmlWithoutPreloads.slice(headEndIndex)
        );
      }

      return html;
    },
  };
}
