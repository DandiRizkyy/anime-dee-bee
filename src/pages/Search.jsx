import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAnimeStore } from "@/store/animeStore";
import AnimeCard from "@/components/AnimeCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchAnime } from "../services/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { searchResults, setSearchResults, loading, setLoading } =
    useAnimeStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const results = await searchAnime(query, page);
        if (page === 1) {
          setSearchResults(results);
        } else {
          setSearchResults([...searchResults, ...results]);
        }
        setHasMore(results.length === 20);
      } catch (error) {
        console.error("Error searching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    setPage(1);
    fetchResults();
  }, [query]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const results = await searchAnime(query, nextPage);
      setSearchResults([...searchResults, ...results]);
      setPage(nextPage);
      setHasMore(results.length === 20);
    } catch (error) {
      console.error("Error loading more results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <div className="container py-8">
        <p className="text-center text-muted-foreground">
          Enter a search query to find anime
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      {loading && searchResults.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No results found for "{query}"
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((anime) => (
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
        </>
      )}
    </div>
  );
};

export default Search;
