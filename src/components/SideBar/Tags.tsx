import { NavLink } from "react-router-dom";
import IPlatform from "../../types/Platform";

const Tags: React.FC<{ tags: IPlatform[] }> = ({ tags }) => {
  return (
    <div className="main__sidebar--tags mt-5 pl-3 text-sm">
      <h2 className="text-xl sm:text-2xl pb-3 border-b mb-1 duration-300 w-[90%] red-text">
        Tags
      </h2>
      <ul className="sidebar--content__genres-list flex flex-col">
        {tags.map((tag) => (
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
      </ul>
    </div>
  );
};

export default Tags;
