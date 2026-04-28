import { Bookmark } from "lucide-react";
import BookmarksList from "@/components/BookmarksList";

export const metadata = {
  title: 'Koleksi Tersimpan - Bazzkomik',
};

export default function BookmarksPage() {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="mb-10 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2">
          <Bookmark size={32} className="text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Koleksi Anda</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Semua komik favorit yang Anda simpan akan muncul di sini. Lanjutkan membaca kapan saja.
        </p>
      </div>

      <BookmarksList />
    </div>
  );
}
