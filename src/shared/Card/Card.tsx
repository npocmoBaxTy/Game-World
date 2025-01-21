import { NavLink } from "react-router-dom";
import { IGame } from "../../types/Game";
import Platforms from "./Platforms";
import "./Card.css";
import { useEffect } from "react";

interface IProps {
  game: IGame;
  isGridColumns: boolean;
  classname?: string;
}
const Card: React.FC<IProps> = ({ game, isGridColumns, classname }) => {
  useEffect(() => {}, [game]);
  return (
    <div
      key={game.id}
      className={`game-card p-2 overflow-hidden mb-3 ${
        isGridColumns ? "w-[50%] max-[768px]:w-[49%]" : "w-full"
      }  text-sm sm:text-lg duration-300 hover:scale-105 ${classname}`}
    >
      <div className="game-card__header">
        <Platforms platforms={game.platforms} />
      </div>
      <img
        src={game.background_image}
        alt={game.name}
        className="block h-56 w-full rounded"
      />
      <div className="game-card__title text-sm sm:text-[15px] mt-1 border-b pb-1">
        <p className="text-ellipsis text-nowrap overflow-hidden">{game.name}</p>
        <span>{`(${game.released})`}</span>
      </div>
      <div className="game-card__genres flex items-center gap-1 mt-1">
        {game.genres.slice(0, 2).map((genre) => (
          <NavLink
            to={`genres/genre/${genre.name}`}
            key={genre.id}
            className="inline-block cursor-pointer px-1 py-0.5 rounded-sm bg-[#9e9e9e] text-xs sm:text-[14px] duration-300 hover:bg-gray-600 text-white"
          >
            #{genre.name}
          </NavLink>
        ))}
      </div>
      <div className="game-card__footer mt-2">
        <div className="game-card__footer-link">
          <NavLink
            to={`/games/game/${game.id}`}
            className="text-sm text-white red-bg py-1 px-2 rounded sm:text-[14px] mt-2 duration-300 hover:bg-red-500"
          >
            More
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
