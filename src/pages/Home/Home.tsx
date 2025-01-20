import { useEffect, useState } from "react";
import GamesList from "../../components/GamesList/GamesList";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { fetchGames, fetchGamesWithUrl } from "../../utils/rawgAPI";
import Loader from "../../shared/Loader/Loader";
import Welcome from "../../components/Welcome/Welcome";
import Banner from "../../components/Banner/Banner";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Массив данных(игр)
  const [games, setGames] = useState([]);
  // Состояние загрузки игр
  const [loading, setLoading] = useState(true);
  // Состояние сайдбара(на маленьких экранах)
  const [show, setShow] = useState(false);
  // Количество игр
  const [count, setCount] = useState(0);
  // След. страница игр(для пагинации)
  const [next, setNext] = useState("");
  // Пред. страница игр(для пагинации)
  const [previous, setPrevious] = useState("");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  // Функция для управления сайдбаром
  const handleToggleSidebar = () => {
    setShow(!show);
  };
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
      setNext(data.next);
      setPrevious(data.previous);
      setSearchParams({ page: String(newPage) }); // Обновляем URL
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // След страница пагинация
  const handleNextPage = async () => {
    if (next) {
      await fetchPageData(next, currentPage + 1);
    }
  };
  // Пред страница пагинация
  const handlePrevPage = async () => {
    if (previous) {
      await fetchPageData(previous, currentPage - 1);
    }
  };
  // Конкретная страница
  const handlePageChange = async (page: number) => {
    const element = document.getElementById("games-list");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const data = await fetchGames(page);
    setSearchParams({ page: String(page) });
    setGames(data.results);
  };
  // Обновление состояния при изменении URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGames(currentPage);
        setCount(data.count);
        setNext(data.next);
        setPrevious(data.previous);
        setGames(data.results);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="main--wrapper w-full relative">
      <Header toggleBurgerMenu={handleToggleSidebar} />
      <Welcome count={count} />
      {games ? <Banner games={games.slice(0, 5)} /> : <Loader />}
      <section className="main--wrapper__content ">
        {loading ? (
          <Loader />
        ) : (
          <div
            id="main-content"
            className="main--wrapper__content--inner overflow-hidden mx-auto pt-5 flex relative w-full"
          >
            <div className="main__side w-[20%] md:w-0 max-[768px]:w-0 xl:w-[20%]">
              <Sidebar open={show} handleClose={handleToggleSidebar} />
            </div>
            <div className="content  md:w-full max-[768px]:w-full">
              <h1
                id="games-list"
                className="text-3xl ml-3 border-b w-[90%] mb-2 red-text pb-3"
              >
                Games List
              </h1>
              {games ? (
                <GamesList className="main__games-content " games={games} />
              ) : (
                <Loader />
              )}
              <Pagination
                totalPages={250}
                next={next}
                prev={previous}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                setCurrentPage={handlePageChange}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
