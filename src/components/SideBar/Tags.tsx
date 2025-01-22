import { NavLink } from "react-router-dom";
import IPlatform from "../../types/Platform";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";

const Tags: React.FC<{ tags: IPlatform[] }> = ({ tags }) => {
  return (
    <div className="main__sidebar--tags mt-5 pl-3">
      <h2 className="text-xl sm:text-2xl pb-3 border-b mb-1 duration-300 w-[90%] red-text">
        Tags
      </h2>
      <ul className="sidebar--content__genres-list flex flex-col">
        {tags.slice(0, 8).map((tag) => (
          <NavLink
            className={
              "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
            }
            key={tag.id}
            to={`/tags/tag/${tag.id}`}
          >
            {tag.name}{" "}
            <span className="genre__games--count text-teal-400">{`(${tag.games_count})`}</span>
          </NavLink>
        ))}
        <Disclosure as="div" defaultOpen={false}>
          <DisclosurePanel className=" text-black flex flex-col" transition>
            {tags.slice(8).map((tag) => (
              <NavLink
                className={
                  "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
                }
                key={tag.id}
                to={`/genres/genre/${tag.name}`}
              >
                {tag.name}{" "}
                <span className="genre__games--count text-teal-400">{`(${tag.games_count})`}</span>
              </NavLink>
            ))}
          </DisclosurePanel>
          <DisclosureButton
            onClick={(e) => e.stopPropagation()}
            className="group flex w-full items-center mt-1 red-text"
          >
            <span className=" font-medium">More tags</span>
            <FaAngleDown className="ml-1" />
          </DisclosureButton>
        </Disclosure>
      </ul>
    </div>
  );
};

export default Tags;
