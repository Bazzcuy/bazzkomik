"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked, toggleBookmark } from "@/lib/storage";

interface BookmarkButtonProps {
  mangaSlug: string;
  mangaTitle: string;
  thumb: string;
  type: string;
}

export default function BookmarkButton({ mangaSlug, mangaTitle, thumb, type }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(mangaSlug));
    setMounted(true);
  }, [mangaSlug]);

  const handleToggle = () => {
    const newState = toggleBookmark({ mangaSlug, mangaTitle, thumb, type });
    setBookmarked(newState);
  };

  if (!mounted) return null;

  return (
    <button 
      onClick={handleToggle}
      className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-bold transition-all hover:-translate-y-0.5 ${
        bookmarked 
          ? "bg-muted text-foreground" 
          : "bg-background border border-border hover:bg-muted text-foreground"
      }`}
    >
      <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} className={bookmarked ? "text-primary" : ""} />
      {bookmarked ? "Tersimpan" : "Simpan Koleksi"}
    </button>
  );
}
