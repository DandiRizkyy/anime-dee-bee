import { useAnimeStore } from "@/store/animeStore";
import AnimeCard from "@/components/AnimeCard";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites } = useAnimeStore();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">No favorites yet</p>
          <p className="text-sm text-muted-foreground">
            Start adding anime to your favorites to see them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
