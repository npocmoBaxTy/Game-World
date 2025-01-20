import { FaSortAlphaDownAlt } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";
import "./Filters.css";

interface IProps {
  sortByNameHandler: () => void;
  sortByDateHandler: () => void;
  gridColumnsHandler: () => void;
  gridRowsHandler: () => void;
}
const Filters: React.FC<IProps> = ({
  sortByDateHandler,
  sortByNameHandler,
  gridColumnsHandler,
  gridRowsHandler,
}) => {
  return (
    <div className="main__content-filters px-3 flex items-center gap-3 text-xs sm:text-sm">
      <div
        className="main__content-filters--item sort_by_name inline-flex sort__by-name items-center"
        onClick={sortByNameHandler}
      >
        <span>Sort By</span>
        <FaSortAlphaDownAlt className="ml-1" />
      </div>
      <div
        className="main__content-filters--item sort_by_name sort__by-date inline-flex items-center"
        onClick={sortByDateHandler}
      >
        <span>Sort By</span>
        <BsCalendar2Date className="ml-1" />
      </div>
      <div className="filters__grid flex items-center ml-auto gap-2">
        <div
          className="filters__grid--rows main__content-filters--item"
          onClick={gridRowsHandler}
        >
          <IoGrid />
        </div>
        <div
          className="filters__grid--columns filters__grid--rows main__content-filters--item"
          onClick={gridColumnsHandler}
        >
          <BsGrid3X3GapFill />
        </div>
      </div>
    </div>
  );
};
export default Filters;
