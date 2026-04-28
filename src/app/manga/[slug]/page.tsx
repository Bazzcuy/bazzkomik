import { getMangaDetail } from "@/lib/scraper";
import Link from "next/link";
import { Play, List, Info, User, Tag, Activity, Compass } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";

export default async function MangaDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const res = await getMangaDetail(slug);
  
  if (!res.status || !res.data) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Manga tidak ditemukan</h1>
        <Link href="/" className="px-6 py-2 bg-muted rounded-full hover:bg-card transition-colors">Kembali ke Beranda</Link>
      </div>
    );
  }

  const manga = res.data;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Thumbnail */}
        <div className="w-full md:w-[280px] shrink-0">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative">
            <img 
              src={manga.thumb || '/placeholder-manga.jpg'} 
              alt={manga.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
              {manga.type}
            </div>
          </div>
        </div>
        
        {/* Meta Info */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">{manga.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {manga.genre_list?.map((genre: any, idx: number) => (
              <span key={idx} className="bg-muted px-4 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
                {genre.genre_name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm py-6 border-y border-border">
            <div className="space-y-1">
              <span className="text-muted-foreground flex items-center gap-1.5"><User size={14}/> Author</span>
              <p className="font-semibold">{manga.author || 'Tidak diketahui'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground flex items-center gap-1.5"><Activity size={14}/> Status</span>
              <p className="font-semibold">{manga.status || 'Berjalan'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground flex items-center gap-1.5"><Tag size={14}/> Tipe</span>
              <p className="font-semibold">{manga.type}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {manga.chapter && manga.chapter.length > 0 && (
              <Link 
                href={`/chapter/${manga.chapter[manga.chapter.length - 1].chapter_endpoint}?manga=${slug}&title=${encodeURIComponent(manga.title)}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full hover:bg-primary-hover transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
              >
                <Play size={18} fill="currentColor" />
                Mulai Membaca
              </Link>
            )}
            
            <BookmarkButton 
              mangaSlug={slug}
              mangaTitle={manga.title}
              thumb={manga.thumb}
              type={manga.type}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Synopsis */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Info className="text-primary" size={24} />
            <h2 className="text-2xl font-bold tracking-tight">Sinopsis</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed md:text-lg whitespace-pre-line">
            {manga.synopsis || 'Tidak ada sinopsis untuk komik ini.'}
          </p>
        </div>

        {/* Chapter List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <List className="text-primary" size={24} />
            <h2 className="text-2xl font-bold tracking-tight">Daftar Chapter</h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto pr-2 space-y-3 no-scrollbar">
            {manga.chapter?.map((ch: any, idx: number) => (
              <Link 
                key={idx}
                href={`/chapter/${ch.chapter_endpoint}?manga=${slug}&title=${encodeURIComponent(manga.title)}`}
                className="flex justify-between items-center bg-muted/50 hover:bg-muted p-4 rounded-2xl transition-colors group"
              >
                <span className="font-semibold text-sm group-hover:text-primary transition-colors">{ch.chapter_title}</span>
                <div className="bg-background rounded-full p-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                  <Compass size={14} />
                </div>
              </Link>
            ))}
            
            {(!manga.chapter || manga.chapter.length === 0) && (
              <p className="text-muted-foreground text-sm py-4">Belum ada chapter.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
