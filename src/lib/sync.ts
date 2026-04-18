export function exportSyncData() {
  return {
    favorites: localStorage.getItem("favorites"),
    recentProblems: localStorage.getItem("recent-problems"),
    theme: localStorage.getItem("theme"),
  };
}

export function importSyncData(data: Record<string, string | null>) {
  const keyMap: Record<string, string> = {
    favorites: "favorites",
    recentProblems: "recent-problems",
    theme: "theme",
  };
  for (const [key, value] of Object.entries(data)) {
    const storageKey = keyMap[key] || key;
    if (value !== null) {
      localStorage.setItem(storageKey, value);
    } else {
      localStorage.removeItem(storageKey);
    }
  }
}
