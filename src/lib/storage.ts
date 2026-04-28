"use client";

// Define the types
export interface HistoryItem {
  mangaSlug: string;
  mangaTitle: string;
  chapterSlug: string;
  chapterTitle: string;
  timestamp: number;
}

export interface BookmarkItem {
  mangaSlug: string;
  mangaTitle: string;
  thumb: string;
  type: string;
  timestamp: number;
}

const HISTORY_KEY = "bazzkomik_history";
const BOOKMARK_KEY = "bazzkomik_bookmarks";

// --- HISTORY ---
export const saveHistory = (item: Omit<HistoryItem, "timestamp">) => {
  if (typeof window === "undefined") return;
  const historyStr = localStorage.getItem(HISTORY_KEY);
  let history: HistoryItem[] = historyStr ? JSON.parse(historyStr) : [];
  
  // Remove existing entry for the same manga to update it to the top
  history = history.filter(h => h.mangaSlug !== item.mangaSlug);
  
  // Add to top
  history.unshift({ ...item, timestamp: Date.now() });
  
  // Keep only last 20
  if (history.length > 20) history = history.slice(0, 20);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryItem[] => {
  if (typeof window === "undefined") return [];
  const historyStr = localStorage.getItem(HISTORY_KEY);
  return historyStr ? JSON.parse(historyStr) : [];
};

// --- BOOKMARKS ---
export const toggleBookmark = (item: Omit<BookmarkItem, "timestamp">): boolean => {
  if (typeof window === "undefined") return false;
  const bookmarksStr = localStorage.getItem(BOOKMARK_KEY);
  let bookmarks: BookmarkItem[] = bookmarksStr ? JSON.parse(bookmarksStr) : [];
  
  const existingIndex = bookmarks.findIndex(b => b.mangaSlug === item.mangaSlug);
  
  if (existingIndex >= 0) {
    // Remove if exists
    bookmarks.splice(existingIndex, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    return false; // Not bookmarked anymore
  } else {
    // Add if not exists
    bookmarks.unshift({ ...item, timestamp: Date.now() });
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    return true; // Bookmarked
  }
};

export const getBookmarks = (): BookmarkItem[] => {
  if (typeof window === "undefined") return [];
  const bookmarksStr = localStorage.getItem(BOOKMARK_KEY);
  return bookmarksStr ? JSON.parse(bookmarksStr) : [];
};

export const isBookmarked = (mangaSlug: string): boolean => {
  if (typeof window === "undefined") return false;
  const bookmarksStr = localStorage.getItem(BOOKMARK_KEY);
  if (!bookmarksStr) return false;
  const bookmarks: BookmarkItem[] = JSON.parse(bookmarksStr);
  return bookmarks.some(b => b.mangaSlug === mangaSlug);
};
