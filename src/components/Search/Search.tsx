import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import SimpleDialogDemo from "../../shared/CustomModal/CustomModal";
import SearchResult from "../../shared/SearchResult/SearchResult";
import { IGame } from "../../types/Game";
import { fetchSearchedGames } from "../../utils/rawgAPI";
import Loader from "../../shared/Loader/Loader";
interface IProps {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Функция для передачи строки поиска в родительский компонент
}
const CustomSearch: React.FC<IProps> = ({ onSearch }) => {
  const [open, setOpen] = useState(false); // Для управления модальным окном
  const [query, setQuery] = useState(""); // Ввод пользователем
  const [searchedGames, setSearchedGames] = useState<IGame[]>([]); ///
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Дебаунс-запрос
  const [loading, setLoading] = useState(true);
  // Дебаунсинг: откладывает обновление `query`
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 700); // 500 мс задержки
    return () => clearTimeout(timer); // Очистка таймера при каждом новом вводе
  }, [query]);
  // Отправка запроса к API при изменении debouncedQuery
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const searchedData = async () => {
        try {
          const data = await fetchSearchedGames(debouncedQuery);
          setSearchedGames(data.results); // Вызываем функцию поиска из хука
        } catch (error) {
          console.error("Error fetching searched games:", error);
        } finally {
          setLoading(false);
        }
      };
      searchedData();
    }
  }, [debouncedQuery]);
  // Открытие модального окна при нажатии на кнопку
  const handleOpen = () => {
    setOpen(!open);
    setQuery(""); // Очистка поля ввода
  };
  // Изменение значения поля
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Обновление введенной строки
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch && onSearch(e); // Вызов родительской функции поиска
  };

  return (
    <div className="header__search ml-auto sm:mx-auto" id="header-search">
      <div className="header__search-inner">
        {/* Поле ввода для больших экранов */}
        <input
          type="text"
          className="header__search-input placeholder:text-gray-300 raleway border border-[#df94ad] w-80 ml-auto hidden sm:block rounded p-1 px-2 outline-none"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
        />
        {/* Кнопка для открытия модального окна (маленькие экраны) */}
        <button
          type="button"
          onClick={handleOpen}
          className="header__search-button sm:hidden block ml-auto"
        >
          <CiSearch className="red-text text-lg" />
        </button>
      </div>
      {/* Модальное окно для маленьких экранов */}
      <SimpleDialogDemo handleClose={handleOpen} open={open}>
        <div className="p-5">
          <input
            type="text"
            value={query}
            className="header__search-input placeholder:text-gray-300 raleway w-full text-sm border block sm:hidden rounded p-1 px-2 outline-none"
            placeholder="Search..."
            onChange={handleChange}
          />
          {loading ? <Loader /> : <SearchResult results={searchedGames} />}
        </div>
      </SimpleDialogDemo>
    </div>
  );
};

export default CustomSearch;
