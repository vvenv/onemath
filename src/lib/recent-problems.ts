import { useEffect } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const STORAGE_KEY = "recent-problems";
const MAX_RECENT = 15;

export interface RecentProblem {
  id: string;
  timestamp: number;
}

function getRecentProblems(): RecentProblem[] {
  return getStorageItem<RecentProblem[]>(STORAGE_KEY, []);
}

function setRecentProblems(problems: RecentProblem[]) {
  setStorageItem(STORAGE_KEY, problems);
}

/**
 * Add a problem to the recently viewed list.
 * Moves it to the front if already viewed, and limits to MAX_RECENT items.
 */
export function addRecentProblem(id: string) {
  const recent = getRecentProblems();
  const filtered = recent.filter((p) => p.id !== id);
  const updated: RecentProblem[] = [{ id, timestamp: Date.now() }, ...filtered];
  setRecentProblems(updated.slice(0, MAX_RECENT));
}

/**
 * Remove a specific problem from the recently viewed list.
 */
export function removeRecentProblem(id: string) {
  const recent = getRecentProblems();
  const filtered = recent.filter((p) => p.id !== id);
  setRecentProblems(filtered);
}

/**
 * Clear all recently viewed problems.
 */
export function clearRecentProblems() {
  setRecentProblems([]);
}

/**
 * Get the list of recently viewed problem IDs, ordered by most recent.
 */
export function getRecentProblemIds(): string[] {
  return getRecentProblems().map((p) => p.id);
}

/**
 * React hook to track a problem view when mounted.
 */
export function useTrackRecentProblem(id: string | undefined) {
  useEffect(() => {
    if (id) {
      addRecentProblem(id);
    }
  }, [id]);
}
