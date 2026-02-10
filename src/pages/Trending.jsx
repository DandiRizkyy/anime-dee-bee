import { useEffect, useState } from "react";
import { useAnimeStore } from "@/store/animeStore";
import AnimeCard from "@/components/AnimeCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrendingAnime } from "../services/api";

const Trending = () => {
  const { trendingAnime, setTrendingAnime, loading, setLoading } =
    useAnimeStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const results = await getTrendingAnime(1);
        setTrendingAnime(results);
        setHasMore(results.length === 20);
      } catch (error) {
        console.error("Error fetching trending anime:", error);
      } finally {
        setLoading(false);
      }
    };

    if (trendingAnime.length === 0) {
      fetchTrending();
    }
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const results = await getTrendingAnime(nextPage);
      setTrendingAnime([...trendingAnime, ...results]);
      setPage(nextPage);
      setHasMore(results.length === 20);
    } catch (error) {
      console.error("Error loading more anime:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && trendingAnime.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Anime</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {trendingAnime.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={loading} className="gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Trending;
