import Link from "next/link";
import { Clock, Play } from "lucide-react";

interface MangaCardProps {
  title: string;
  thumb: string;
  endpoint: string;
  type?: string;
  updated_on?: string;
  chapter?: string;
}

export default function MangaCard({ title, thumb, endpoint, type, updated_on, chapter }: MangaCardProps) {
  const cleanEndpoint = endpoint.replace(/^\//, '').replace(/\/$/, '');
  
  return (
    <Link href={`/manga/${cleanEndpoint}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <img 
          src={thumb || '/placeholder-manga.jpg'} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary text-primary-foreground p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            <Play fill="currentColor" size={24} className="ml-1" />
          </div>
        </div>

        {type && (
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
            {type}
          </div>
        )}
      </div>

      <div className="flex flex-col px-1">
        <h3 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground font-medium">
          {chapter && (
            <span className="bg-muted px-2 py-0.5 rounded-full text-foreground border border-border/50">
              {chapter}
            </span>
          )}
          {updated_on && (
            <span className="flex items-center gap-1 opacity-80">
              <Clock size={10} />
              {updated_on}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
