import { useEffect } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const STORAGE_KEY = "favorites";

export type FavoriteType = "problem" | "knowledge";

export interface Favorite {
  id: string;
  type: FavoriteType;
  timestamp: number;
}

function getFavorites(): Favorite[] {
  return getStorageItem<Favorite[]>(STORAGE_KEY, []);
}

function setFavorites(favorites: Favorite[]) {
  setStorageItem(STORAGE_KEY, favorites);
}

/**
 * Toggle a favorite (add if not exists, remove if exists).
 */
export function toggleFavorite(id: string, type: FavoriteType) {
  const favorites = getFavorites();
  const existing = favorites.find((f) => f.id === id && f.type === type);

  if (existing) {
    // Remove if exists
    const filtered = favorites.filter((f) => !(f.id === id && f.type === type));
    setFavorites(filtered);
    return false; // Removed
  } else {
    // Add if not exists
    const updated: Favorite[] = [
      { id, type, timestamp: Date.now() },
      ...favorites,
    ];
    setFavorites(updated);
    return true; // Added
  }
}

/**
 * Remove a specific favorite.
 */
export function removeFavorite(id: string, type: FavoriteType) {
  const favorites = getFavorites();
  const filtered = favorites.filter((f) => !(f.id === id && f.type === type));
  setFavorites(filtered);
}

/**
 * Clear all favorites.
 */
export function clearFavorites() {
  setFavorites([]);
}

/**
 * Get the list of all favorites, ordered by most recent.
 */
export function getFavoritesList(): Favorite[] {
  return getFavorites();
}

/**
 * Check if an item is favorited.
 */
export function isFavorited(id: string, type: FavoriteType): boolean {
  return getFavorites().some((f) => f.id === id && f.type === type);
}

/**
 * Get favorites by type.
 */
export function getFavoritesByType(type: FavoriteType): Favorite[] {
  return getFavorites().filter((f) => f.type === type);
}

/**
 * React hook to sync favorite state when location changes.
 */
export function useFavoritesSync(onChange?: () => void) {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        onChange?.();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [onChange]);
}
