import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchAnime } from "../services/api";

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await searchAnime(searchQuery, 1);
        setResults(data.slice(0, 8)); // Show max 8 results
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500), // 500ms debounce delay
  ).current;

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      setLoading(true);
      debouncedSearch(value);
    } else {
      setResults([]);
      setShowDropdown(false);
      setLoading(false);
    }
  };

  // Handle result click
  const handleResultClick = (anime) => {
    navigate(`/anime/${anime.mal_id}`);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  // Handle "View All Results"
  const handleViewAll = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setResults([]);
      setShowDropdown(false);
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search anime..."
          className="pl-9 pr-9"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (results.length > 0) {
              setShowDropdown(true);
            }
          }}
        />
        {/* Loading or Clear button */}
        <div className="absolute right-2.5 top-2.5">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            query && (
              <button
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-[500px] overflow-y-auto shadow-lg">
          <div className="p-2 space-y-1">
            {results.map((anime) => (
              <button
                key={anime.mal_id}
                onClick={() => handleResultClick(anime)}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors text-left"
              >
                {/* Thumbnail */}
                <img
                  src={anime.images?.jpg?.image_url || "/placeholder.jpg"}
                  alt={anime.title}
                  className="w-12 h-16 object-cover rounded flex-shrink-0"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/48x64?text=No+Image";
                  }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {anime.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {anime.year && <span>{anime.year}</span>}
                    {anime.type && (
                      <>
                        <span>•</span>
                        <span>{anime.type}</span>
                      </>
                    )}
                    {anime.score && (
                      <>
                        <span>•</span>
                        <span className="text-yellow-500">★ {anime.score}</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {/* View All Results Button */}
            <button
              onClick={handleViewAll}
              className="w-full p-3 text-sm font-medium text-primary hover:bg-accent rounded-md transition-colors border-t mt-2 pt-3"
            >
              View all results for "{query}"
            </button>
          </div>
        </Card>
      )}

      {/* No Results */}
      {showDropdown && !loading && query && results.length === 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <div className="p-4 text-center text-sm text-muted-foreground">
            No results found for "{query}"
          </div>
        </Card>
      )}
    </div>
  );
}
