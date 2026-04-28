import Link from "next/link";
import { Star, Clock } from "lucide-react";

interface MangaCardProps {
  title: string;
  thumb: string;
  endpoint: string;
  type?: string;
  updated_on?: string;
  chapter?: string;
}

export default function MangaCard({ title, thumb, endpoint, type, updated_on, chapter }: MangaCardProps) {
  // Fix endpoint to avoid double slashes and ensure clean slug
  const cleanEndpoint = endpoint.replace(/^\//, '').replace(/\/$/, '');
  
  return (
    <Link href={`/manga/${cleanEndpoint}`} className="group flex flex-col gap-2">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-card border border-border group-hover:border-primary transition-colors shadow-lg">
        {/* Thumbnail */}
        <img 
          src={thumb || '/placeholder-manga.jpg'} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Type Badge */}
        {type && (
          <div className="absolute top-2 left-2 bg-primary text-background text-xs font-bold px-2 py-1 rounded shadow-md uppercase">
            {type}
          </div>
        )}

        {/* Bottom Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {chapter && (
            <span className="flex items-center gap-1 bg-card px-2 py-0.5 rounded text-primary font-medium border border-border">
              {chapter}
            </span>
          )}
          {updated_on && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {updated_on}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
