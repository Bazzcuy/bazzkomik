"use client";

import { useEffect, useState } from "react";
import { getHistory, HistoryItem } from "@/lib/storage";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

export default function HistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
    setMounted(true);
  }, []);

  if (!mounted || history.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 border-b border-border pb-2">
        <div className="bg-primary/10 text-primary p-2 rounded-lg">
          <Clock size={24} />
        </div>
        <h2 className="text-2xl font-bold">Terakhir Dibaca</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
        {history.slice(0, 5).map((item, idx) => (
          <Link 
            key={idx} 
            href={`/chapter/${item.chapterSlug}?manga=${item.mangaSlug}&title=${encodeURIComponent(item.mangaTitle)}`}
            className="flex-none w-64 bg-card border border-border p-4 rounded-xl hover:border-primary transition-colors snap-start group shadow-md"
          >
            <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {item.mangaTitle}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <BookOpen size={12} />
              {item.chapterTitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
