import SimpleSlider from "../../shared/Slider/Slider";
import { IGame } from "../../types/Game";
import { NavLink } from "react-router-dom";
import "./Banner.css";

interface IProps {
  games: IGame[];
}
const Banner: React.FC<IProps> = ({ games }) => {
  return (
    <div className="main__page--slider flex justify-center relative w-full overflow-hidden sm:px-10">
      <SimpleSlider arrows={true} slides={1}>
        {games.map((game) => (
          <div
            className="mx-auto main__page--slider-item py-12 px-6 xl:px-12 flex justify-center items-center flex-col"
            key={game.id}
          >
            <div className="flex justify-between bg-gray-50 dark:bg-gray-900 shrink items-stretch flex-row">
              <div className="flex items-center border bg-gray-800 dark:bg-white justify-center">
                <p className="transform flex flex-shrink-0 -rotate-90 text-2xl font-semibold tracking-wide leading-normal text-white dark:text-gray-800">
                  <span className="red-text">
                    {Math.floor(Math.random() * (100 - 10 + 1)) + 10}%
                  </span>{" "}
                  OFF
                </p>
              </div>
              <div className="flex justify-between sm:justify-center items-start flex-col xl:w-2/5 md:w-5/12 xl:px-7 px-6 md:px-0 md:py-0 py-5 ">
                <div>
                  <p className="text-xl red-text sm:text-3xl xl:text-4xl line-clamp-1 font-semibold leading-9 text-gray-800 ">
                    {game.name}
                  </p>
                </div>
                <div className="xl:mt-4 mt-2">
                  <p className="text-base xl:text-xl leading-7 text-gray-600 dark:text-white pr-4">
                    Immerse yourself in a game that redefines excitement.
                    Unleash your inner hero today!
                  </p>
                  <NavLink
                    to={`/games/game/${game.id}`}
                    className={
                      "hidden sm:inline-block red-bg px-3 py-2 mt-2 rounded text-white duration-300 hover:bg-pink-700"
                    }
                  >
                    Explore
                  </NavLink>
                </div>
              </div>
              <div className="hidden md:block sm:w-[30%] h-44 md:h-60 xl:h-72">
                <img
                  className="hidden h-full xl:block w-full"
                  src={game.background_image}
                  alt="slider image"
                />
              </div>
            </div>
            <div className="md:hidden mt-6 w-full">
              <img
                src={game.background_image}
                alt="slider image"
                className="w-full h-[200px]"
              />
            </div>
          </div>
        ))}

        {/* Add more games as needed */}
      </SimpleSlider>
    </div>
  );
};

export default Banner;
