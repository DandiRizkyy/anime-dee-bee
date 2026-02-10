import axios from "axios";

// Jikan API (MyAnimeList unofficial API)
const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// Get top/trending anime
const getTrendingAnime = async (page = 1) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/top/anime`, {
      params: {
        page,
        limit: 20,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    throw error;
  }
};

// Get seasonal anime (currently airing)
const getSeasonalAnime = async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let season = "winter";
    if (month >= 4 && month <= 6) season = "spring";
    else if (month >= 7 && month <= 9) season = "summer";
    else if (month >= 10 && month <= 12) season = "fall";

    const response = await axios.get(
      `${JIKAN_BASE_URL}/seasons/${year}/${season}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching seasonal anime:", error);
    throw error;
  }
};

// Search anime
const searchAnime = async (query, page = 1) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/anime`, {
      params: {
        q: query,
        page,
        limit: 20,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    throw error;
  }
};

// Get anime details by ID
const getAnimeDetails = async (id) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/anime/${id}/full`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error;
  }
};

// Get anime episodes
const getAnimeEpisodes = async (id) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/anime/${id}/episodes`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching anime episodes:", error);
    throw error;
  }
};

export {
  getTrendingAnime,
  getSeasonalAnime,
  searchAnime,
  getAnimeDetails,
  getAnimeEpisodes,
};
