import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import { useEffect, useState } from "react";
import { fetchGames } from "./utils/rawgAPI";
import Genres from "./pages/Genres/Genres";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGames();
        setGames(data.results);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="wrapper min-h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Детали игры */}
        <Route path="/games/game/:id" element={<Game games={games} />} />
        {/* 404 страница */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
        {/* Страница жанров */}
        <Route path="/genres/genre/:genre" element={<Genres />} />
      </Routes>
    </div>
  );
}

export default App;
