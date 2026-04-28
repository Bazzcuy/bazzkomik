"use client";

import { useEffect } from "react";
import { saveHistory } from "@/lib/storage";

interface HistoryTrackerProps {
  mangaSlug: string;
  mangaTitle: string;
  chapterSlug: string;
  chapterTitle: string;
}

export default function HistoryTracker({ mangaSlug, mangaTitle, chapterSlug, chapterTitle }: HistoryTrackerProps) {
  useEffect(() => {
    if (mangaSlug && mangaTitle && chapterSlug) {
      saveHistory({
        mangaSlug,
        mangaTitle,
        chapterSlug,
        chapterTitle
      });
    }
  }, [mangaSlug, mangaTitle, chapterSlug, chapterTitle]);

  return null;
}
