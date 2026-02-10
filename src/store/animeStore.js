import { create } from "zustand";

export const useAnimeStore = create((set) => ({
  // Trending anime
  trendingAnime: [],
  setTrendingAnime: (anime) => set({ trendingAnime: anime }),

  // Search results
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  // Current anime details
  currentAnime: null,
  setCurrentAnime: (anime) => set({ currentAnime: anime }),

  // Favorites (stored in localStorage)
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  addToFavorites: (anime) =>
    set((state) => {
      const newFavorites = [...state.favorites, anime];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),
  removeFromFavorites: (animeId) =>
    set((state) => {
      const newFavorites = state.favorites.filter((a) => a.mal_id !== animeId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),
  isFavorite: (animeId) => {
    const state = useAnimeStore.getState();
    return state.favorites.some((a) => a.mal_id === animeId);
  },

  // Loading states
  loading: false,
  setLoading: (loading) => set({ loading }),

  // Error handling
  error: null,
  setError: (error) => set({ error }),
}));
