import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AnimeCard({ anime }) {
  const imageUrl = anime.images?.jpg?.large_image_url || 
                   anime.images?.jpg?.image_url || 
                   anime.image ||
                   '/placeholder.jpg';
  
  const title = anime.title || anime.title_english || 'Unknown Title';
  const score = anime.score || anime.rating || 0;
  const year = anime.year || anime.aired?.prop?.from?.year || 'N/A';
  const episodes = anime.episodes || anime.totalEpisodes || '?';
  const status = anime.status || anime.type || '';

  return (
    <Link to={`/anime/${anime.mal_id || anime.id}`}>
      <Card className="group overflow-hidden transition-all hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
            }}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {score > 0 && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-semibold">{score.toFixed(1)}</span>
                </div>
              )}
              {status && (
                <Badge variant="secondary" className="text-xs">
                  {status}
                </Badge>
              )}
            </div>
          </div>

          {/* Top right badges */}
          <div className="absolute top-2 right-2 space-y-1">
            {episodes !== '?' && (
              <Badge className="bg-primary/90 text-xs">
                EP {episodes}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-3 space-y-1">
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{year}</span>
            </div>
            {score > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{score.toFixed(1)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
