import { NavLink } from "react-router-dom";
import { IGenre } from "../../types/Genre";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";

interface IProps {
  genres: IGenre[];
}
const SideBarGenres: React.FC<IProps> = ({ genres }) => {
  return (
    <div className="sidebar--content__genres p-2 pt-1 pl-3 text-sm sm:text-[16px]">
      <h2 className="text-xl sm:text-2xl pb-3 border-b mb-1 duration-300 w-[90%] red-text">
        Genres
      </h2>
      <ul className="sidebar--content__genres-list flex flex-col">
        {genres.slice(0, 8).map((genre) => (
          <NavLink
            className={
              "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
            }
            key={genre.id}
            to={`/genres/genre/${genre.name}`}
          >
            {genre.name}{" "}
            <span className="genre__games--count text-teal-400">{`(${genre.games_count})`}</span>
          </NavLink>
        ))}
        <Disclosure as="div" defaultOpen={false}>
          <DisclosurePanel className=" text-black flex flex-col" transition>
            {genres.slice(8).map((genre) => (
              <NavLink
                className={
                  "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
                }
                key={genre.id}
                to={`/genres/genre/${genre.name}`}
              >
                {genre.name}{" "}
                <span className="genre__games--count text-teal-400">{`(${genre.games_count})`}</span>
              </NavLink>
            ))}
          </DisclosurePanel>
          <DisclosureButton
            onClick={(e) => e.stopPropagation()}
            className="group flex w-full items-center mt-1 red-text"
          >
            <span className=" font-medium">More genres</span>
            <FaAngleDown className="ml-1" />
          </DisclosureButton>
        </Disclosure>
      </ul>
    </div>
  );
};
export default SideBarGenres;
