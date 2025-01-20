import { NavLink } from "react-router-dom";
import { IGame } from "../../types/Game";

interface IProps {
  results: IGame[];
}
const SearchResult: React.FC<IProps> = ({ results }) => {
  return (
    <div className="search__result">
      <h1 className="search__result-title red-text text-xl mb-1 mt-3">
        Search Result
      </h1>
      <div className="search__result-list">
        {results.map((game) => (
          <NavLink
            to={`/games/game/${game.id}`}
            key={game.id}
            className={
              "game-card p-3 w-full sm:w-[24%] text-sm sm:text-lg duration-300 hover:scale-105"
            }
          >
            <img
              src={game.background_image}
              alt={game.name}
              className="block h-48 w-full"
            />
            <h3 className="game-card__title text-sm mt-1">{game.name}</h3>
            <p>Added: {game.released}</p>
          </NavLink>
        ))}

        {results.length === 0 && (
          <div className="search__result-item">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
