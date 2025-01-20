import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import SimpleDialogDemo from "../../shared/CustomModal/CustomModal";
import SearchResult from "../../shared/SearchResult/SearchResult";
import { IGame } from "../../types/Game";
import { fetchSearchedGames } from "../../utils/rawgAPI";

interface IProps {
  searchHandler?: () => void;
}

const CustomSearch: React.FC<IProps> = ({ searchHandler }) => {
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState<IGame[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Дебаунсинг: откладывает обновление query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 2000);
    return () => clearTimeout(timer); // Очищаем таймер
  }, [query]);
  // Запрос к API при изменении debouncedQuery
  useEffect(() => {
    const fetchGames = async () => {
      if (!debouncedQuery) {
        setGames([]);
        return;
      }
      try {
        const data = await fetchSearchedGames(debouncedQuery);
        setGames(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, [debouncedQuery]);
  const handleOpen = () => {
    setOpen(!open);
    setQuery("");
    setGames([]);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const getData = async () => {
      try {
        const data = await fetchSearchedGames(query);
        setGames(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  };
  return (
    <div className="header__search ml-auto sm:mx-auto" id="header-search">
      <div className="header__search-inner">
        <input
          type="text"
          className="header__search-input placeholder:text-gray-300 raleway border border-[#df94ad] w-80 ml-auto hidden sm:block rounded p-1 px-2 outline-none"
          placeholder="Search..."
          onChange={searchHandler}
        />
        <button
          type="button"
          onClick={handleOpen}
          className="header__search-button sm:hidden block ml-auto"
        >
          <CiSearch className="red-text text-lg " />
        </button>
      </div>
      {/* Диалоговое окно для результатов поиска */}
      <SimpleDialogDemo handleClose={handleOpen} open={open}>
        <div className="p-5">
          <input
            type="text"
            value={query}
            className="header__search-input placeholder:text-gray-300 raleway w-full text-sm border block sm:hidden rounded p-1 px-2 outline-none"
            placeholder="Search..."
            onChange={(e) => handleSearch(e)}
          />
          <SearchResult results={games} />
        </div>
      </SimpleDialogDemo>
    </div>
  );
};

export default CustomSearch;
