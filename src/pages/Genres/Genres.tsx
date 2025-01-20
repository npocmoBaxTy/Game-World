import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { fetchGamesByGenre, fetchGenres } from "../../utils/rawgAPI";
import { IGame } from "../../types/Game";
import GamesList from "../../components/GamesList/GamesList";
import { IGenre } from "../../types/Genre";
import "./Genres.css";
import Sidebar from "../../components/SideBar/SideBar";

const Genres = () => {
  const { genre } = useParams();
  const [open, setOpen] = useState<boolean>(false);
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
  const [games, setGames] = useState<IGame[]>([]);
  useEffect(() => {
    // Список жанров
    const fetchGenresDetailsData = async () => {
      const res = await fetchGenres();
      setGenreId(res.results.find((g: { name: string }) => g.name === genre));
    };
    fetchGenresDetailsData();
    // Запрос на игры по жанру
    const fetchGamesByGenreData = async () => {
      const res = await fetchGamesByGenre(genre?.toLowerCase() || "");
      setGames(res.results);
    };
    fetchGamesByGenreData();
  }, [genre, games]);
  return (
    <div className="genres__page--wrapper">
      <Header toggleBurgerMenu={() => {}} />
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
      <div className="genres__page-inner flex items-stretch flex-wrap">
        <aside className="genres__page-aside w-[10%] md:w-0 max-[768px]:w-0 xl:w-[15%]">
          <Sidebar open={open} handleClose={handleClose} />
        </aside>
        <section className="genres__page-content sm:w-[85%] w-full">
          <GamesList games={games} />
        </section>
        <section className="genres__page--pagination"></section>
      </div>
    </div>
  );
};

export default Genres;
