import { searchManga } from "@/lib/scraper";
import MangaCard from "@/components/MangaCard";
import { SearchIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams?.q || "";
  let results: any[] = [];
  
  if (query) {
    const res = await searchManga(query);
    if (res.status) {
      results = res.manga_list;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 bg-card border border-border p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <SearchIcon className="text-primary" />
          Cari Komik
        </h1>
        <form action="/search" method="GET" className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Cari judul manga, manhwa, atau manhua..."
            className="flex-1 bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
            required
          />
          <button
            type="submit"
            className="bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Cari
          </button>
        </form>
      </div>

      {query && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            Hasil pencarian untuk: <span className="text-primary">"{query}"</span>
          </h2>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {results.map((manga: any, idx: number) => (
                <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <MangaCard 
                    title={manga.title}
                    thumb={manga.thumb}
                    endpoint={manga.endpoint}
                    type={manga.type}
                    updated_on={manga.updated_on}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <p className="text-gray-400">Tidak ada komik yang ditemukan untuk pencarian ini.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
