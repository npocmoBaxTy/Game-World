import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchGameDetails, fetchGameSuggestions } from "../../utils/rawgAPI";
import { IGame } from "../../types/Game";
import Platforms from "../../shared/Card/Platforms";
import Loader from "../../shared/Loader/Loader";
import { CiStar } from "react-icons/ci";
import Similar from "../../components/Similar/Similar";

interface IProps {
  games: IGame[];
}

const Game: React.FC<IProps> = ({ games }) => {
  const { id } = useParams();
  // Находим игру по id
  const game2 = games.find((game) => game.id.toString() === id);
  const [game, setGame] = useState<IGame | null>(null);
  const [suggestions, setSuggestions] = useState<IGame[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGameDetails(id || "0");
      setGame(data);
    };
    fetchData();

    const fetchSuggestionsData = async () => {
      const data = await fetchGameSuggestions(game?.genres);
      setSuggestions(data.results);
    };
    fetchSuggestionsData();
  }, [id]);
  // window.scroll(0, 0);
  return (
    <div className="game__details">
      {game ? (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
          <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
            {/* <!-- Description Div --> */}
            <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
              <div className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                <NavLink to={"/"}>Home</NavLink>
                <span className="text-gray-500"> / </span>
                <NavLink to={"/"}>Games</NavLink>
                <span className="text-gray-500"> / </span>
                <span className="underline">{id}</span>
              </div>
              <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                {game.name}
              </h2>

              <div className=" flex flex-row justify-between  mt-5">
                <div className=" flex flex-row space-x-3">
                  <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                    {game.added_by_status?.toplay || 100}+ toplay
                  </p>
                  <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                    {game.added_by_status?.owned || 55}+ owned
                  </p>
                </div>
                <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                  {game.added_by_status?.yet || 77} reviews
                </p>
              </div>

              <p className=" font-normal text-justify text-base leading-6 text-gray-600 mt-7">
                {game.description_raw}
                <div className="tags">
                  {game.tags.length !== 0 &&
                    game.tags.slice(0, 10).map((tag) => {
                      return (
                        <NavLink
                          to={`/games/tags/tag/${tag.id}`}
                          key={tag.id}
                          className="inline-block underline px-2 py-1 rounded-sm text-xs sm:text-[14px] text-gray-800"
                        >
                          #{tag.name}
                        </NavLink>
                      );
                    })}
                </div>
              </p>
              <div className="font-semibold flex items-center gap-3 lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
                {game.genres.map((genre) => {
                  return (
                    <NavLink
                      to={"/genres/" + genre}
                      key={genre.id}
                      className="inline-block px-2 py-1 rounded-sm red-bg text-xs sm:text-[14px] duration-300 hover:bg-gray-600 text-white"
                    >
                      #{genre.name}
                    </NavLink>
                  );
                })}
              </div>

              <div className="lg:mt-11 mt-10">
                <div className="flex flex-row justify-between">
                  <p className=" font-medium text-base leading-4 text-gray-600">
                    Platforms
                  </p>
                  <div className="flex">
                    <Platforms platforms={game.platforms} />
                  </div>
                </div>
                <hr className=" bg-gray-200 w-full my-2" />
                <div className=" flex flex-row justify-between items-center mt-4">
                  <p className="font-medium text-base leading-4 text-gray-600 mr-10">
                    Stores
                  </p>
                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    {game.stores.length !== 0 ? (
                      game.stores.map((store) => {
                        return (
                          <a
                            key={store.id}
                            href={`https://${store.store.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-2 py-1 rounded-sm bg-[#9e9e9e] text-xs sm:text-[14px] duration-300 hover:bg-gray-600 text-white"
                          >
                            {store.store.name}
                          </a>
                        );
                      })
                    ) : (
                      <span>No Stores :{"("}</span>
                    )}
                  </div>
                </div>
                <hr className=" bg-gray-200 w-full mt-4" />
              </div>

              <button className="focus:outline-none hover:bg-pink-600 font-medium text-base leading-4 text-white red-bg w-full py-5 lg:mt-12 mt-6">
                Add to library
              </button>
            </div>

            {/* <!-- Preview Images Div For larger Screen--> */}

            <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
              <div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
                <img
                  src={game.background_image}
                  alt="game image"
                  className="h-full"
                />
              </div>
              <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                {game2?.short_screenshots.slice(1, 5).map((img) => {
                  return (
                    <div className="bg-gray-100 flex justify-center items-center">
                      <img
                        src={img.image}
                        alt="Game - preview 1"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="game__details--about flex gap-3 sm:gap-36 items-stretch flex-wrap">
              {/* Информация про рекомендации */}
              <div className="users__reccoments pb-2 border-b">
                <h2 className="user__reccomends--title text-xl red-text mb-2">
                  User Reccomendtaions
                </h2>
                {game.ratings.map((rating) => {
                  return (
                    <div className={`${rating.title} w-[300px] mb-3`}>
                      <div className="title text-xs sm:text-[14px] w-full">
                        {rating.title.toLocaleUpperCase()}
                      </div>
                      <div className="exceptional__progressbar mt-1 relative flex items-center">
                        <span className="-mt-0.5 mr-1">
                          <CiStar />
                        </span>
                        <div
                          className={`exceptional__progressbar--inner w-[90%] h-2 bg-gray-100 rounded`}
                        >
                          <div
                            style={{ width: `${rating.percent}%` }}
                            className="exceptional__progressbar--inner__percentage bg-yellow-400 h-full rounded"
                          ></div>
                        </div>
                        <span className="text-sm ml-1">{`${Math.floor(
                          rating.percent
                        )}%`}</span>
                        <span className="text-sm ml-1 text-gray-500">
                          {`(${rating.count})`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Статус игры */}
              <div className="users__status pb-2 border-b">
                <h2 className="user__reccomends--title text-xl red-text mb-2">
                  In users list
                </h2>
                {game.added_by_status &&
                  Object.entries(game.added_by_status).map(([key, value]) => {
                    return (
                      <div className={`${key} w-[300px] mb-3`} key={key}>
                        <div className="title text-xs sm:text-[14px] w-full">
                          {key.toLocaleUpperCase()}
                        </div>
                        <div className="exceptional__progressbar mt-1 relative flex items-center">
                          <span className="-mt-0.5 mr-1">
                            <CiStar />
                          </span>
                          <div
                            className={`exceptional__progressbar--inner w-[90%] h-2 bg-gray-100 rounded`}
                          >
                            <div
                              style={{ width: `${value > 100 ? 100 : value}%` }}
                              className="exceptional__progressbar--inner__percentage bg-yellow-400 h-full rounded"
                            ></div>
                          </div>
                          <span className="text-sm ml-1">{`${Math.floor(
                            value > 100 ? 100 : value
                          )}%`}</span>
                          <span className="text-sm ml-1 text-gray-500">
                            {`(${value})`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* Ссылки и т.д к игре */}
              <div className="more__details border-b">
                <h2 className="user__reccomends--title text-xl red-text mb-2">
                  More About
                </h2>
                <div className="publishers">
                  <h3 className="text-lg text-gray-600 mb-2">Publishers</h3>
                  <div className="publishers__list flex flex-col gap-2">
                    {game.publishers.map((publisher) => {
                      return (
                        <NavLink
                          to={`/publishers/publisher/${publisher.id}`}
                          key={publisher.id}
                          className="publishers__list-item flex items-start border rounded-md p-3"
                        >
                          <img
                            src={publisher.image_background}
                            alt="Publisher logo"
                            className="publisher__logo w-14 h-14 rounded-lg"
                          />
                          <div className="publishers__list--item-title ml-2 flex flex-col items-start -mt-1">
                            <span>{publisher.name}</span>
                            <span className="underline text-gray-500 text-xs">
                              {publisher.slug}
                            </span>
                            <span className="text-xs mt-1">
                              Games Count: {publisher.games_count}
                            </span>
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
                <div className="website mt-3">
                  <h3 className="text-lg text-gray-600 mb-2">Website</h3>
                  <div className="website__link">
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-gray-500"
                    >
                      {game.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Similar games={suggestions} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Game;
