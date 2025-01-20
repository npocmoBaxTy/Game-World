import { FaArrowLeftLong } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
interface IProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  next: string;
  prev: string;
}

const Pagination: React.FC<IProps> = ({
  handleNextPage,
  handlePrevPage,
  setCurrentPage,
  next,
  prev,
  totalPages,
  currentPage,
}) => {
  const handlePageChange = (page: number) => {
    // Call the `setCurrentPage` function passed as a prop
    setCurrentPage(page);
  };
  return (
    <div className="main__page--pagination w-full flex justify-center py-5 pb-10">
      <div className="main__page--pagination-inner flex items-center gap-10">
        <ReactPaginate
          previousLabel={
            <FaArrowLeftLong
              className={`${
                prev ? "cursor-pointer text-black" : "disabled disabled__btn"
              }`}
              onClick={handlePrevPage}
            />
          }
          nextLabel={
            <FaArrowLeftLong
              className={`rotate-180 ${
                next
                  ? "cursor-pointer text-black"
                  : "cursor-not-allowed text-gray-400"
              } ${currentPage == 250 && "disabled__btn"}`}
              onClick={handleNextPage}
            />
          }
          breakLabel="..."
          pageCount={totalPages} // Общее количество страниц
          marginPagesDisplayed={2} // Сколько страниц показывать слева и справа от текущей
          pageRangeDisplayed={5} // Сколько страниц отображать вокруг текущей
          onPageChange={(e) => handlePageChange(e.selected + 1)} // Обработчик изменения страницы
          forcePage={currentPage - 1}
          containerClassName="pagination-container flex items-center gap-3"
          activeClassName="active-page red-text underline"
          previousClassName="previous-page"
          nextClassName="next-page"
          breakClassName="break-page"
        />
      </div>
    </div>
  );
};

export default Pagination;
