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
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors border ${
        bookmarked 
          ? "bg-primary text-background border-primary" 
          : "bg-transparent text-primary border-primary hover:bg-primary hover:text-background"
      }`}
    >
      <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
      {bookmarked ? "Tersimpan" : "Simpan Favorit"}
    </button>
  );
}
