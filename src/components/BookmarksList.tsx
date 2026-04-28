"use client";

import { useEffect, useState } from "react";
import { getBookmarks, BookmarkItem } from "@/lib/storage";
import MangaCard from "./MangaCard";

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-3xl border border-border/50 shadow-sm">
        <p className="text-muted-foreground">Anda belum menyimpan komik apa pun.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {bookmarks.map((manga, idx) => (
        <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
          <MangaCard 
            title={manga.mangaTitle}
            thumb={manga.thumb}
            endpoint={manga.mangaSlug}
            type={manga.type}
          />
        </div>
      ))}
    </div>
  );
}
