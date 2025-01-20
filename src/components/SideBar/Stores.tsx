import IPlatform from "../../types/Platform";
import { NavLink } from "react-router-dom";
interface IProps {
  stores: IPlatform[];
}
const Stores: React.FC<IProps> = ({ stores }) => {
  return (
    <div className="sidebar--content__stores  p-2 pl-3 text-sm sm:text-[16px]">
      <h2 className="text-xl sm:text-2xl pb-3 border-b mb-1 duration-300 w-[90%] red-text">
        Stores
      </h2>
      <ul className="sidebar--content__genres-list flex flex-col">
        {stores.map((store) => (
          <NavLink
            className={
              "sidebar--content__genres-list--link py-1 hover:text-[#e91e63]"
            }
            key={store.id}
            to={`/stores/store/${store.id}`}
          >
            {store.name}{" "}
            <span className="genre__games--count text-teal-400">{`(${store.games_count})`}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Stores;
