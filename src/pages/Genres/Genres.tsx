import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchGamesByGenre,
  fetchGamesWithUrl,
  fetchGenres,
} from "../../utils/rawgAPI";
import { IGame } from "../../types/Game";
import GamesList from "../../components/GamesList/GamesList";
import { IGenre } from "../../types/Genre";
import "./Genres.css";
import Sidebar from "../../components/SideBar/SideBar";
import Loader from "../../shared/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";

const Genres = () => {
  const { genre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  // Список игр
  const [games, setGames] = useState<IGame[]>([]);
  // Лоадер
  const [loading, setLoading] = useState(true);
  // След страница (url)
  const [nextPage, setNextPage] = useState<string>("");
  // Пред страница (url)
  const [prevPage, setPrevPage] = useState<string>("");
  // Текущая страница
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  // Общее кол-во игр
  // Для бургер кнопки в шапке(для сайдбара)
  const handleClose = () => {
    setOpen(!open);
  };
  const [genreId, setGenreId] = useState<IGenre>({
    name: "",
    games_count: 0,
    id: 1,
    image_background: "",
    slug: "",
  });
  // Загрузка игровых данных
  const fetchPageData = async (url: string, newPage: number) => {
    const element = document.getElementById("games-list");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    try {
      const data = await fetchGamesWithUrl(url);
      setLoading(true);
      setGames(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setSearchParams({ page: String(newPage) }); // Обновляем URL
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // След страница(пагинация)
  const handleNextPage = async () => {
    if (nextPage) {
      try {
        setLoading(true);
        await fetchPageData(nextPage, currentPage - 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };
  // Пред страница пагинация
  const handlePrevPage = async () => {
    if (prevPage) {
      try {
        setLoading(true);
        await fetchPageData(prevPage, currentPage - 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };
  // Конкретная страница
  const handlePageChange = async (page: number) => {
    const element = document.getElementById("games-list");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    try {
      setLoading(true);
      const data = await fetchGamesByGenre(
        genre ? genre.toLocaleLowerCase() : "",
        page.toString()
      );
      setSearchParams({ page: String(page) });
      setGames(data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Список жанров
    const fetchGenresDetailsData = async () => {
      try {
        const res = await fetchGenres();
        setGenreId(res.results.find((g: { name: string }) => g.name === genre));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };
    fetchGenresDetailsData();
    // Запрос на игры по жанру
    const fetchGamesByGenreData = async () => {
      try {
        const res = await fetchGamesByGenre(genre?.toLowerCase() || "");
        setGames(res.results);
        setLoading(false);
        setNextPage(res.next);
        setPrevPage(res.previous);
      } catch (error) {
        console.error("Failed to fetch games by genre", error);
      }
    };
    fetchGamesByGenreData();
  }, [genre]);
  return (
    <div className="genres__page--wrapper overflow-hidden">
      <Header toggleBurgerMenu={() => handleClose()} />
      <header className="genres__page--header mt-[80px]">
        <div className="genres__page--header-banner py-10 flex justify-center container relative overflow-hidden">
          <img
            src={genreId.image_background}
            className="w-[90%] h-56 object-cover rounded"
            alt="banner image"
          />
          <span className="genres__page--header-banner-title font-extrabold uppercase text-white absolute left-1/2 top-1/2 text-5xl -translate-x-1/2 -translate-y-1/2">
            {genreId.name}
          </span>
        </div>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <div className="genres__page-inner flex items-stretch flex-wrap">
          <aside className="genres__page-aside w-[10%] md:w-0 max-[768px]:w-0 xl:w-[15%]">
            <Sidebar open={open} handleClose={handleClose} />
          </aside>
          <section className="genres__page-content sm:w-[85%] w-full">
            <h1
              id="games-list"
              className="text-3xl ml-3 border-b w-[90%] mb-2 red-text pb-3"
            >
              Games List
            </h1>
            <GamesList games={games} />
            <div className="genres__page--pagination w-full flex justify-center">
              <Pagination
                totalPages={250}
                setCurrentPage={handlePageChange}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                next={nextPage}
                prev={prevPage}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Genres;
