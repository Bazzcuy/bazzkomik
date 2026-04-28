import { getChapter } from "@/lib/scraper";
import Link from "next/link";
import InteractiveReader from "@/components/InteractiveReader";

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
    <InteractiveReader 
      images={chapter.chapter_image}
      chapterTitle={chapter.title}
      mangaSlug={mangaSlug}
      mangaTitle={mangaTitle}
      chapterPages={chapter.chapter_pages}
    />
  );
}
