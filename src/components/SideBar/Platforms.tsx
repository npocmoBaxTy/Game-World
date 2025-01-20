import IPlatform from "../../types/Platform";
import { NavLink } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";
interface IProps {
  platforms: IPlatform[];
}
const Platforms: React.FC<IProps> = ({ platforms }) => {
  return (
    <div className="sidebar--content__platforms  p-2 pl-3 text-sm sm:text-[16px]">
      <h2 className="text-xl sm:text-2xl pb-3 border-b mb-1 duration-300 w-[90%] red-text">
        Platforms
      </h2>
      <ul className="sidebar--content__genres-list flex flex-col">
        {platforms.slice(0, 10).map((platform) => (
          <NavLink
            className={
              "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
            }
            key={platform.id}
            to={`/platforms/platform/${platform.id}`}
          >
            {platform.name}{" "}
            <span className="genre__games--count text-teal-400">{`(${platform.games_count})`}</span>
          </NavLink>
        ))}
        <Disclosure as="div" defaultOpen={false}>
          <DisclosurePanel className=" text-black flex flex-col" transition>
            {platforms.slice(10).map((platform) => (
              <NavLink
                className={
                  "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
                }
                key={platform.id}
                to={`/platforms/platform/${platform.id}`}
              >
                {platform.name}{" "}
                <span className="genre__games--count text-teal-400">{`(${platform.games_count})`}</span>
              </NavLink>
            ))}
          </DisclosurePanel>
          <DisclosureButton
            onClick={(e) => e.stopPropagation()}
            className="group flex w-full items-center mt-1 red-text"
          >
            <span className=" font-medium">More platforms</span>
            <FaAngleDown className="ml-1" />
          </DisclosureButton>
        </Disclosure>
      </ul>
    </div>
  );
};

export default Platforms;
