"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoveLeft, LayoutGrid, Maximize2, Minimize2, Layers, Palette } from "lucide-react";

interface ImageItem {
  chapter_image_link: string;
  image_number: number;
}

interface InteractiveReaderProps {
  images: ImageItem[];
  chapterTitle: string;
  mangaSlug: string;
  mangaTitle: string;
  chapterPages: number;
}

export default function InteractiveReader({
  images,
  chapterTitle,
  mangaSlug,
  mangaTitle,
  chapterPages
}: InteractiveReaderProps) {
  const [width, setWidth] = useState<"compact" | "standard" | "full">("standard");
  const [hasGap, setHasGap] = useState(false);
  const [readerBg, setReaderBg] = useState<"black" | "slate" | "light">("black");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getWidthClass = () => {
    switch (width) {
      case "compact": return "max-w-xl";
      case "full": return "max-w-full";
      default: return "max-w-3xl";
    }
  };

  const getBgClass = () => {
    switch (readerBg) {
      case "slate": return "bg-slate-900 text-white";
      case "light": return "bg-zinc-100 text-zinc-900";
      default: return "bg-black text-white";
    }
  };

  return (
    <div className={`min-h-screen ${getBgClass()} selection:bg-primary/30 transition-colors duration-300 relative`}>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Reader Header */}
      <div className="fixed top-4 w-full z-50 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between bg-card/40 hover:bg-card/90 backdrop-blur-md border border-border/50 rounded-2xl p-3 shadow-2xl transition-all">
          <Link href={mangaSlug ? `/manga/${mangaSlug}` : "/"} className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all">
            <MoveLeft size={18} />
          </Link>
          
          <div className="text-center overflow-hidden px-2 opacity-90">
            <h1 className="text-xs md:text-sm font-bold truncate">
              {chapterTitle}
            </h1>
            <p className="text-[10px] text-muted-foreground">{chapterPages} Halaman</p>
          </div>
          
          <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all">
            <LayoutGrid size={18} />
          </Link>
        </div>
      </div>

      {/* Images Container */}
      <div className={`flex flex-col items-center w-full mx-auto pt-20 pb-32 ${getWidthClass()}`}>
        {images?.map((img, idx) => (
          <img 
            key={idx}
            src={img.chapter_image_link}
            alt={`Page ${img.image_number}`}
            className={`w-full h-auto object-contain ${hasGap ? "mb-3 rounded-lg" : "mb-0"}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      {/* Floating Control Panel */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center">
        <div className="glass-pill rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
          {/* Width Toggle */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setWidth("compact")}
              className={`p-1.5 rounded-full transition-colors ${width === "compact" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              title="Mode Ringkas"
            >
              <Minimize2 size={16} />
            </button>
            <button 
              onClick={() => setWidth("standard")}
              className={`p-1.5 rounded-full transition-colors ${width === "standard" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              title="Mode Standar"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Gap Toggle */}
          <button 
            onClick={() => setHasGap(!hasGap)}
            className={`p-2 rounded-full transition-colors flex items-center gap-1 text-xs font-bold ${hasGap ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
            title="Jarak Halaman"
          >
            <Layers size={16} />
            <span className="hidden sm:inline">{hasGap ? "Gap On" : "No Gap"}</span>
          </button>

          <div className="w-px h-4 bg-border" />

          {/* BG Palette Toggle */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setReaderBg("black")}
              className={`w-5 h-5 rounded-full bg-black border transition-transform ${readerBg === "black" ? "border-primary scale-110 shadow-md" : "border-zinc-700"}`}
              title="Latar Hitam"
            />
            <button 
              onClick={() => setReaderBg("slate")}
              className={`w-5 h-5 rounded-full bg-slate-800 border transition-transform ${readerBg === "slate" ? "border-primary scale-110 shadow-md" : "border-zinc-700"}`}
              title="Latar Slate"
            />
            <button 
              onClick={() => setReaderBg("light")}
              className={`w-5 h-5 rounded-full bg-zinc-200 border transition-transform ${readerBg === "light" ? "border-primary scale-110 shadow-md" : "border-zinc-400"}`}
              title="Latar Terang"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
