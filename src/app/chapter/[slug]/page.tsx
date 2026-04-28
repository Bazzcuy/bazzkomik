import { getChapter } from "@/lib/scraper";
import Link from "next/link";
import { MoveLeft, LayoutGrid } from "lucide-react";
import HistoryTracker from "@/components/HistoryTracker";

export default async function ChapterPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ manga?: string, title?: string }>;
}) {
  const { slug } = await params;
  const sParams = await searchParams;
  
  const res = await getChapter(slug);
  
  if (!res.status || !res.data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Chapter tidak ditemukan</h1>
          <Link href="/" className="px-6 py-2 bg-muted rounded-full hover:bg-card transition-colors">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const chapter = res.data;
  
  const mangaSlug = sParams.manga || "";
  const mangaTitle = sParams.title || "Komik";
  
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative">
      <HistoryTracker 
        mangaSlug={mangaSlug} 
        mangaTitle={mangaTitle} 
        chapterSlug={slug} 
        chapterTitle={chapter.title} 
      />

      {/* Floating Reader Header (Always visible but subtle) */}
      <div className="fixed top-4 w-full z-50 px-4 transition-opacity duration-300">
        <div className="container mx-auto max-w-4xl flex items-center justify-between bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl transition-all">
          <Link href={mangaSlug ? `/manga/${mangaSlug}` : "/"} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <MoveLeft size={18} />
          </Link>
          
          <div className="text-center overflow-hidden px-2 opacity-80">
            <h1 className="text-xs md:text-sm font-bold truncate">
              {chapter.title}
            </h1>
            <p className="text-[10px] text-white/50">{chapter.chapter_pages} Halaman</p>
          </div>
          
          <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <LayoutGrid size={18} />
          </Link>
        </div>
      </div>

      {/* Images Container */}
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto min-h-screen pt-20 pb-28">
        {chapter.chapter_image?.map((img: any, idx: number) => (
          <img 
            key={idx}
            src={img.chapter_image_link}
            alt={`Page ${img.image_number}`}
            className="w-full h-auto object-contain min-h-[300px] bg-[#050505] mb-1"
            loading="lazy"
          />
        ))}
      </div>

      {/* Floating Reader Footer */}
      <div className="fixed bottom-6 w-full z-50 px-4 flex justify-center">
        <Link 
          href={mangaSlug ? `/manga/${mangaSlug}` : "/"}
          className="flex items-center gap-2 bg-primary text-black px-8 py-3.5 rounded-full font-extrabold hover:bg-primary-hover transition-all shadow-[0_10px_40px_rgba(250,204,21,0.2)] hover:shadow-[0_10px_50px_rgba(250,204,21,0.4)] hover:-translate-y-1"
        >
          Selesai Membaca
        </Link>
      </div>
    </div>
  );
}
