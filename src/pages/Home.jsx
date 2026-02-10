import { useEffect, useState } from "react";
import { useAnimeStore } from "@/store/animeStore";
import AnimeCard from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getTrendingAnime, getSeasonalAnime } from "../services/api";

const Home = () => {
  const { trendingAnime, setTrendingAnime, loading, setLoading } =
    useAnimeStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch trending anime
        const trending = await getTrendingAnime(1);
        setTrendingAnime(trending.slice(0, 12));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (trendingAnime.length === 0) {
      fetchData();
    }
  }, []);

  if (loading && trendingAnime.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to AnimeDeeBee
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            The largest Anime Database.
          </p>
          <Link to="/trending">
            <Button size="lg" className="gap-2">
              Browse Trending <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trending Anime */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
          <Link to="/trending">
            <Button variant="ghost" className="gap-2">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
