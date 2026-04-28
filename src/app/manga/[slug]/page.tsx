import { getMangaDetail } from "@/lib/scraper";
import Link from "next/link";
import { BookOpen, List, Info, User, Tag, Activity } from "lucide-react";
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
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500">Manga tidak ditemukan</h1>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">Kembali ke Home</Link>
      </div>
    );
  }

  const manga = res.data;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Header Info */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="md:flex">
          {/* Thumbnail */}
          <div className="md:w-1/3 lg:w-1/4 p-6 flex justify-center">
            <div className="w-full max-w-[240px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative">
              <img 
                src={manga.thumb || '/placeholder-manga.jpg'} 
                alt={manga.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-md uppercase">
                {manga.type}
              </div>
            </div>
          </div>
          
          {/* Meta Info */}
          <div className="md:w-2/3 lg:w-3/4 p-6 md:pl-0 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{manga.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {manga.genre_list?.map((genre: any, idx: number) => (
                <span key={idx} className="bg-background border border-border px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-300 font-medium">
                  {genre.genre_name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                <span className="text-gray-500 dark:text-gray-400">Author:</span>
                <span className="font-semibold">{manga.author || 'Tidak diketahui'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className="font-semibold">{manga.status || 'Berjalan'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-primary" />
                <span className="text-gray-500 dark:text-gray-400">Tipe:</span>
                <span className="font-semibold">{manga.type}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              {/* Read Button */}
              {manga.chapter && manga.chapter.length > 0 && (
                <Link 
                  href={`/chapter/${manga.chapter[manga.chapter.length - 1].chapter_endpoint}?manga=${slug}&title=${encodeURIComponent(manga.title)}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-hover transition-transform hover:scale-105 shadow-lg shadow-primary/20"
                >
                  <BookOpen size={20} />
                  Baca Chapter Awal
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
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Synopsis */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="text-primary" />
              Sinopsis
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {manga.synopsis || 'Tidak ada sinopsis untuk komik ini.'}
            </p>
          </div>
        </div>

        {/* Chapter List */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <List className="text-primary" />
              Daftar Chapter
            </h2>
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-2">
              {manga.chapter?.map((ch: any, idx: number) => (
                <Link 
                  key={idx}
                  href={`/chapter/${ch.chapter_endpoint}?manga=${slug}&title=${encodeURIComponent(manga.title)}`}
                  className="block bg-background border border-border p-3 rounded-lg hover:border-primary hover:text-primary transition-colors flex justify-between items-center group"
                >
                  <span className="font-medium text-sm">{ch.chapter_title}</span>
                  <BookOpen size={16} className="text-gray-400 group-hover:text-primary" />
                </Link>
              ))}
              
              {(!manga.chapter || manga.chapter.length === 0) && (
                <p className="text-gray-500 text-sm text-center py-4">Belum ada chapter.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
