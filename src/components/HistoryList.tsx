"use client";

import { useEffect, useState } from "react";
import { getHistory, HistoryItem } from "@/lib/storage";
import Link from "next/link";
import { Compass, Clock } from "lucide-react";

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
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Clock size={22} className="text-primary" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Lanjutkan Membaca</h2>
        </div>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x">
        {history.slice(0, 5).map((item, idx) => (
          <Link 
            key={idx} 
            href={`/chapter/${item.chapterSlug}?manga=${item.mangaSlug}&title=${encodeURIComponent(item.mangaTitle)}`}
            className="flex-none w-72 bg-muted hover:bg-card border border-transparent hover:border-border p-5 rounded-2xl transition-all duration-300 snap-start group shadow-sm hover:shadow-md"
          >
            <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {item.mangaTitle}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground font-medium">
              <Compass size={14} className="text-primary" />
              <span>{item.chapterTitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
