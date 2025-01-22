import { useState, useCallback } from "react";
import { debounce } from "lodash"; // Если вы хотите использовать дебаунс
import { IGame } from "../types/Game";
import { fetchSearchedGames } from "../utils/rawgAPI";

interface SearchResults {
  results: IGame[];
  count: number;
  next: string | null;
  previous: string | null;
}

const useSearchGames = () => {
  const [searchedGames, setSearchedGames] = useState<IGame[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [nextPage, setNext] = useState<string | null>(null);
  const [previousPage, setPrevious] = useState<string | null>(null);

  const fetchSearchedGamesData = async (
    searchValue: string
  ): Promise<SearchResults> => {
    // Вставьте сюда вашу функцию fetchSearchedGames или модифицируйте как нужно
    const response = await fetchSearchedGames(searchValue);
    return response;
  };

  // Основная логика поиска с дебаунсом
  const handleSearchGame = useCallback(
    debounce(async (searchValue: string) => {
      try {
        const { results, count, next, previous } = await fetchSearchedGamesData(
          searchValue
        );
        setSearchedGames(results);
        setTotal(count);
        setNext(next);
        setPrevious(previous);
      } catch (error) {
        console.error("Failed to fetch searched games:", error);
      }
    }, 300), // 300 мс дебаунс
    []
  );
  console.log(nextPage);
  return {
    searchedGames,
    total,
    nextPage,
    previousPage,
    handleSearchGame,
  };
};

export default useSearchGames;
