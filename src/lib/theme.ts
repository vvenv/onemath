export type ColorScheme =
  | "default"
  | "warm"
  | "sepia"
  | "green"
  | "blue-light"
  | "cool"
  | "high-contrast"
  | "reading"
  | "monochrome"
  | "nord"
  | "sunset"
  | "custom";

export type ThemeMode = "light" | "dark";

export interface Theme {
  colorScheme: ColorScheme;
  mode: ThemeMode;
  customColors?: Record<string, string>;
}

export interface BuiltInTheme {
  id: ColorScheme;
  name: string;
}

export const BUILT_IN_THEMES: BuiltInTheme[] = [
  {
    id: "default",
    name: "默认",
  },
  {
    id: "reading",
    name: "沉浸阅读",
  },
  {
    id: "sepia",
    name: "复古纸质",
  },
  {
    id: "green",
    name: "绿色护眼",
  },
  {
    id: "blue-light",
    name: "蓝光过滤",
  },
  {
    id: "warm",
    name: "暖色",
  },
  {
    id: "cool",
    name: "冷色",
  },
  {
    id: "nord",
    name: "极光",
  },
  {
    id: "sunset",
    name: "日落",
  },
  {
    id: "high-contrast",
    name: "高对比度",
  },
  {
    id: "monochrome",
    name: "灰度",
  },
];

const DEFAULT_THEME: Theme = {
  colorScheme: "default",
  mode: "light",
};

const getStoredTheme = (): Theme | null => {
  if (typeof localStorage === "undefined") return null;
  try {
    const stored = localStorage.getItem("theme");
    if (!stored) return null;
    return JSON.parse(stored) as Theme;
  } catch {
    return null;
  }
};

const getInitialTheme = (): Theme => {
  const stored = getStoredTheme();
  if (stored) return stored;

  // Auto-detect system preference for default theme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return {
    colorScheme: "default",
    mode: prefersDark ? "dark" : "light",
  };
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  // Set mode class
  root.classList.toggle("dark", theme.mode === "dark");

  // Set color scheme data attribute
  root.setAttribute("data-color-scheme", theme.colorScheme);

  // Apply custom colors if provided
  if (theme.customColors) {
    Object.entries(theme.customColors).forEach(([key, value]) => {
      root.style.setProperty(`--custom-${key}`, value);
    });
  }

  try {
    localStorage.setItem("theme", JSON.stringify(theme));
  } catch {
    // ignore storage failures
  }
};

export const themeScript = `(function(){try{var s=localStorage.getItem("theme");var t=s?JSON.parse(s):null;if(t){document.documentElement.classList.toggle("dark",t.mode==="dark");document.documentElement.setAttribute("data-color-scheme",t.colorScheme);if(t.customColors)for(var k in t.customColors)document.documentElement.style.setProperty("--custom-"+k,t.customColors[k]);}else{var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}}catch{}})();`;

/**
 * Re-apply the persisted theme to the DOM. Called after React hydration to
 * restore attributes that the hydration reconciliation may have stripped.
 */
export const applyStoredTheme = () => {
  const theme = getInitialTheme();
  const root = document.documentElement;
  root.classList.toggle("dark", theme.mode === "dark");
  root.setAttribute("data-color-scheme", theme.colorScheme);
  if (theme.customColors) {
    Object.entries(theme.customColors).forEach(([key, value]) => {
      root.style.setProperty(`--custom-${key}`, value);
    });
  }
};

export const getTheme = (): Theme => {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const stored = getStoredTheme();
  if (stored) return stored;
  return getInitialTheme();
};

export const setTheme = (theme: Theme) => {
  applyTheme(theme);
};

export const setColorScheme = (colorScheme: ColorScheme) => {
  const current = getTheme();
  // Clear custom colors when switching to a built-in theme (but not for "custom")
  if (colorScheme !== "custom") {
    const { customColors, ...rest } = current;
    const root = document.documentElement;
    Object.keys(customColors || {}).forEach((key) => {
      root.style.removeProperty(`--custom-${key}`);
    });
    setTheme({ ...rest, colorScheme });
  } else {
    setTheme({ ...current, colorScheme });
  }
};

export const setMode = (mode: ThemeMode) => {
  const current = getTheme();
  setTheme({ ...current, mode });
};

export const toggleMode = () => {
  const current = getTheme();
  setMode(current.mode === "dark" ? "light" : "dark");
};

export const setCustomColors = (customColors: Record<string, string>) => {
  const current = getTheme();
  setTheme({ ...current, customColors });
};

export const resetCustomColors = () => {
  const current = getTheme();
  const { customColors, ...rest } = current;
  setTheme(rest);
  // Clear custom CSS variables
  const root = document.documentElement;
  Object.keys(customColors || {}).forEach((key) => {
    root.style.removeProperty(`--custom-${key}`);
  });
};
