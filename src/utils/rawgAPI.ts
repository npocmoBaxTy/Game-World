import axios from "axios";
import { IGenre } from "../types/Genre";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_RAWG_KEY;
// Запрос на получение данных
export const fetchGames = async (currentPage?: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/games?dates=2022-01-01,2025-12-31&ordering=-released`,
      {
        params: {
          key: API_KEY,
          page_size: 100,
          page: currentPage || null,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
};

// Запрос на получение игр определенного жанра
export const fetchGamesByGenre = async (genre: string, page?: string) => {
  try {
    const data = await axios.get(
      `${API_BASE_URL}/games?genres=${genre}&page_size=40&ordering=-released`,
      {
        params: {
          key: API_KEY,
          page: page || null,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch games by genre: ${genre}`);
  }
};

export const fetchGamesWithUrl = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch games", err);
  }
};
// Запрос на поиск игры
export const fetchSearchedGames = async (query: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/games?&page_size=100${
      query
        ? `&search=${query}`
        : "&dates=2022-01-01,2025-12-31&ordering=-released"
    }`,
    {
      params: {
        key: API_KEY,
      },
    }
  );
  return response.data;
};
// Запрос на конкретно одну игру
export const fetchGameDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/games/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game details");
  }
};

// Запрос на получение жанров
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genres`, {
      params: {
        key: API_KEY,
        page_size: 100,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
};
// Запрос на определенный жанр
export const fetchGenresDetails = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genres/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
};

// Запрос на получения всех платформ
export const fetchPlatforms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/platforms`, {
      params: {
        key: API_KEY,
        page_size: 100,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch platforms");
  }
};

// Запрос на получение списка магазинов
export const fetchStores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stores`, {
      params: {
        key: API_KEY,
        page_size: 100,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stores");
  }
};

// Запрос на получение списка тэгов
export const fetchTags = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`, {
      params: {
        key: API_KEY,
        page_size: 100,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tags");
  }
};

export const fetchPublishers = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/publishers`, {
      params: {
        key: API_KEY,
        page_size: 100,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch publishers", err);
  }
};

export const fetchGameSuggestions = async (
  genres?: IGenre[],
  tags?: IGenre[]
) => {
  const tagsId = genres?.map((item) => {
    return item.id.toString();
  });
  const genresId = tags?.map((item) => item.id.toString());
  try {
    const res = await axios.get(`${API_BASE_URL}/games`, {
      params: {
        key: API_KEY,
        tags: tagsId?.join(","),
        genres: genresId?.join(","),
        page_size: 100,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch game suggestions", err);
  }
};

export const fetchGameDLC = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/games/${id}/game-series`, {
    params: {
      key: API_KEY,
    },
  });
  return res.data;
};

export const fetchParentGames = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/games/${id}/parent-games`, {
    params: {
      key: API_KEY,
      page_size: 100,
    },
  });
  return res.data;
};
