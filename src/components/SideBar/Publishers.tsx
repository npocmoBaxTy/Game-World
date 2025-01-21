import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";
import IPlatform from "../../types/Platform";
import { NavLink } from "react-router-dom";
interface IProps {
  publishers: IPlatform[];
}
const PublisherSidebar: React.FC<IProps> = ({ publishers }) => {
  return (
    <div className="sidebar--content__publishers  p-2 pl-3 text-sm sm:text-[16px]">
      <h2 className="text-xl sm:text-2xl pb-3 border-b mb-1 duration-300 w-[90%] red-text">
        Publishers
      </h2>
      <ul className="sidebar--content__genres-list flex flex-col">
        {publishers.slice(0, 8).map((publisher) => (
          <NavLink
            className={
              "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
            }
            key={publisher.id}
            to={`/publishers/publisher/${publisher.id}`}
          >
            {publisher.name}{" "}
            <span className="genre__games--count text-teal-400">{`(${publisher.games_count})`}</span>
          </NavLink>
        ))}
        <Disclosure as="div" defaultOpen={false}>
          <DisclosurePanel className=" text-black flex flex-col" transition>
            {publishers.slice(8).map((publisher) => (
              <NavLink
                className={
                  "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
                }
                key={publisher.id}
                to={`/genres/genre/${publisher.name}`}
              >
                {publisher.name}{" "}
                <span className="genre__games--count text-teal-400">{`(${publisher.games_count})`}</span>
              </NavLink>
            ))}
          </DisclosurePanel>
          <DisclosureButton
            onClick={(e) => e.stopPropagation()}
            className="group flex w-full items-center mt-1 red-text"
          >
            <span className=" font-medium">More publishers</span>
            <FaAngleDown className="ml-1" />
          </DisclosureButton>
        </Disclosure>
      </ul>
    </div>
  );
};

export default PublisherSidebar;
