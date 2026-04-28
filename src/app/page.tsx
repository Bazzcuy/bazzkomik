import { getMangaList, getPopularManga } from "@/lib/scraper";
import MangaCard from "@/components/MangaCard";
import HistoryList from "@/components/HistoryList";
import { Sparkles, Trophy } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [popularRes, latestRes] = await Promise.all([
    getPopularManga(1),
    getMangaList(1)
  ]);

  const popularManga = popularRes.status ? popularRes.manga_list.slice(0, 10) : [];
  const latestManga = latestRes.status ? latestRes.manga_list : [];

  return (
    <div className="container mx-auto px-4 py-6 space-y-16 max-w-7xl">
      {/* Hero Header Area */}
      <section className="text-center space-y-4 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full text-xs font-semibold text-muted-foreground mb-4">
          <Sparkles size={14} className="text-primary" />
          <span>Platform Komik Generasi Baru</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Baca Komik Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Nyaman & Cepat</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Jelajahi ribuan manga, manhwa, dan manhua gratis. Antarmuka bersih tanpa gangguan, khusus untuk kenyamanan membaca Anda.
        </p>
      </section>

      {/* History Section */}
      <HistoryList />

      {/* Popular Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-2">
          <Trophy size={22} className="text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Terpopuler</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
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
        <div className="flex items-center gap-3 pb-2">
          <Sparkles size={22} className="text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Update Terbaru</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
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
