import { getMangaList, getPopularManga } from "@/lib/scraper";
import MangaCard from "@/components/MangaCard";
import HistoryList from "@/components/HistoryList";
import { Flame, Sparkles } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [popularRes, latestRes] = await Promise.all([
    getPopularManga(1),
    getMangaList(1)
  ]);

  const popularManga = popularRes.status ? popularRes.manga_list.slice(0, 10) : [];
  const latestManga = latestRes.status ? latestRes.manga_list : [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Banner Area */}
      <section className="relative rounded-2xl bg-gradient-to-r from-card to-background border border-border p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
        <h1 className="relative text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Selamat Datang di <span className="text-primary">Bazzkomik</span>
        </h1>
        <p className="relative text-gray-600 dark:text-gray-400 max-w-2xl text-sm md:text-base">
          Tempat baca manga, manhwa, dan manhua gratis dengan update tercepat dan UI yang memanjakan mata. Jelajahi ribuan koleksi komik secara gratis.
        </p>
      </section>

      {/* History Section (Client Component) */}
      <HistoryList />

      {/* Popular Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-2">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <Flame size={24} />
          </div>
          <h2 className="text-2xl font-bold">Komik Terpopuler</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {popularManga.map((manga: any, idx: number) => (
            <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
              <MangaCard 
                title={manga.title}
                thumb={manga.thumb}
                endpoint={manga.endpoint}
                type={manga.type}
                updated_on={manga.upload_on}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Latest Update Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-2">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <Sparkles size={24} />
          </div>
          <h2 className="text-2xl font-bold">Update Terbaru</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {latestManga.map((manga: any, idx: number) => (
            <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
              <MangaCard 
                title={manga.title}
                thumb={manga.thumb}
                endpoint={manga.endpoint}
                type={manga.type}
                chapter={manga.chapter}
                updated_on={manga.updated_on}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
