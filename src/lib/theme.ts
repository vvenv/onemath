type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const setSelectedTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore storage failures
  }
};

export const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch{}})();`;

export const toggleTheme = () => {
  setSelectedTheme(getInitialTheme() === "dark" ? "light" : "dark");
};
