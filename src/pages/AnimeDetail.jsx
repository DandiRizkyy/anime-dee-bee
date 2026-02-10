import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAnimeStore } from "@/store/animeStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Star, Calendar, Clock, Heart, Play } from "lucide-react";
import { getAnimeDetails, getAnimeEpisodes } from "../services/api";

const AnimeDetail = () => {
  const { id } = useParams();
  const {
    currentAnime,
    setCurrentAnime,
    favorites,
    addToFavorites,
    removeFromFavorites,
    loading,
    setLoading,
  } = useAnimeStore();
  const [episodes, setEpisodes] = useState([]);

  const isFav = favorites.some((a) => a.mal_id === parseInt(id));

  useEffect(() => {
    const fetchAnimeData = async () => {
      setLoading(true);
      try {
        // Fetch anime details from Jikan
        const details = await getAnimeDetails(id);
        setCurrentAnime(details);

        // Try to fetch episodes
        try {
          const eps = await getAnimeEpisodes(id);
          setEpisodes(eps);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [id]);

  const handleFavorite = () => {
    if (isFav) {
      removeFromFavorites(currentAnime.mal_id);
    } else {
      addToFavorites(currentAnime);
    }
  };

  if (loading || !currentAnime) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const imageUrl =
    currentAnime.images?.jpg?.large_image_url ||
    currentAnime.images?.jpg?.image_url;

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-8">
        {/* Poster */}
        <div className="space-y-4">
          <img
            src={imageUrl}
            alt={currentAnime.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Image";
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handleFavorite}
              variant={isFav ? "secondary" : "default"}
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
              {isFav ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {currentAnime.title}
            </h1>
            {currentAnime.title_english &&
              currentAnime.title_english !== currentAnime.title && (
                <p className="text-xl text-muted-foreground">
                  {currentAnime.title_english}
                </p>
              )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            {currentAnime.score && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">
                  {currentAnime.score.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({currentAnime.scored_by?.toLocaleString()} users)
                </span>
              </div>
            )}
            {currentAnime.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{currentAnime.year}</span>
              </div>
            )}
            {currentAnime.episodes && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{currentAnime.episodes} Episodes</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {currentAnime.genres && currentAnime.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentAnime.genres.map((genre) => (
                <Badge key={genre.mal_id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Status and Type */}
          <div className="flex gap-4">
            {currentAnime.status && <Badge>{currentAnime.status}</Badge>}
            {currentAnime.type && (
              <Badge variant="outline">{currentAnime.type}</Badge>
            )}
          </div>

          {/* Synopsis */}
          {currentAnime.synopsis && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">
                {currentAnime.synopsis}
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {currentAnime.studios && currentAnime.studios.length > 0 && (
              <div>
                <span className="font-semibold">Studio:</span>
                <span className="ml-2 text-muted-foreground">
                  {currentAnime.studios.map((s) => s.name).join(", ")}
                </span>
              </div>
            )}
            {currentAnime.season && (
              <div>
                <span className="font-semibold">Season:</span>
                <span className="ml-2 text-muted-foreground capitalize">
                  {currentAnime.season} {currentAnime.year}
                </span>
              </div>
            )}
            {currentAnime.duration && (
              <div>
                <span className="font-semibold">Duration:</span>
                <span className="ml-2 text-muted-foreground">
                  {currentAnime.duration}
                </span>
              </div>
            )}
            {currentAnime.rating && (
              <div>
                <span className="font-semibold">Rating:</span>
                <span className="ml-2 text-muted-foreground">
                  {currentAnime.rating}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
