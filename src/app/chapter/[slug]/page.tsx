import { getChapter } from "@/lib/scraper";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
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
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500">Chapter tidak ditemukan</h1>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">Kembali ke Home</Link>
      </div>
    );
  }

  const chapter = res.data;
  
  const mangaSlug = sParams.manga || "";
  const mangaTitle = sParams.title || "Komik";
  
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-[#0a0a0a] pb-20">
      <HistoryTracker 
        mangaSlug={mangaSlug} 
        mangaTitle={mangaTitle} 
        chapterSlug={slug} 
        chapterTitle={chapter.title} 
      />

      {/* Chapter Reader Navbar */}
      <div className="sticky top-0 w-full bg-card/90 backdrop-blur-md border-b border-border z-50 p-4 shadow-lg">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link href={mangaSlug ? `/manga/${mangaSlug}` : "/"} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline font-medium">Kembali</span>
          </Link>
          
          <h1 className="text-sm md:text-base font-bold text-center truncate max-w-[60%]">
            {chapter.title}
          </h1>
          
          <div className="text-xs font-medium bg-primary text-white px-3 py-1 rounded-full">
            {chapter.chapter_pages} Hal
          </div>
        </div>
      </div>

      {/* Reader Options */}
      <div className="container mx-auto max-w-3xl mt-6 px-4 mb-6">
        <div className="bg-card border border-border p-3 rounded-xl flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>Tips: Gunakan scroll untuk membaca ke bawah.</p>
        </div>
      </div>

      {/* Images Container */}
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto bg-white dark:bg-black min-h-screen">
        {chapter.chapter_image?.map((img: any, idx: number) => (
          <img 
            key={idx}
            src={`https://i0.wp.com/${img.chapter_image_link}`}
            alt={`Page ${img.image_number}`}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-card/90 backdrop-blur-md border-t border-border z-50 p-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-center">
          <Link 
            href={mangaSlug ? `/manga/${mangaSlug}` : "/"}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-lg"
          >
            Selesai Membaca
          </Link>
        </div>
      </div>
    </div>
  );
}
