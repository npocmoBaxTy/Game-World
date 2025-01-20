import { IGame } from "../../types/Game";
import Filters from "../Filters/Filters";
import { useEffect, useState } from "react";
import Card from "../../shared/Card/Card";

interface IProps {
  games: IGame[];
  className?: string;
}

const GamesList: React.FC<IProps> = ({ games }) => {
  // Список данных(игр)
  const [list, setList] = useState<IGame[]>([...games]);
  // Состояние сортировки по имени
  const [isAscending, setIsAscending] = useState(true);
  // Состояние сортировки по дате релиза
  const [isDateAscending, setIsDateAscending] = useState(true);
  // Состояние сетки(колонки по 2 элемента)
  const [isGridColumns, setIsGridColumns] = useState(true);
  // Состояние сетки контента(Ряды, по 1 элементу)
  const [isGridRows, setIsGridRows] = useState(false);

  // Синхронизация локального состояния с пропом games
  useEffect(() => {
    setList([...games]);
  }, [games]);
  // Сортировка данных по имени
  const sortByNameHandler = () => {
    const sortedGames = [...games].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setList(sortedGames);
    setIsAscending(!isAscending); // Переключаем порядок
  };
  // Сортировка данных по дате релиза
  const sortByDateHandler = () => {
    const sortedGames = [...games].sort((a, b) =>
      isDateAscending
        ? new Date(a.released).getTime() - new Date(b.released).getTime()
        : new Date(b.released).getTime() - new Date(a.released).getTime()
    );
    setList(sortedGames);
    setIsDateAscending(!isDateAscending); // Переключаем порядок
  };
  // Смена сетки контента(Колонки, по 2 эелемента)
  const gridColumnsHandler = () => {
    setIsGridColumns(!isGridColumns); // Переключаем сетку
    setIsGridRows(false); // Сбрасываем сетку рядов
  };
  // Смена сетки контента(Ряды, по 1 элементу)
  const gridRowsHandler = () => {
    setIsGridRows(!isGridRows); // Переключаем сетку
    setIsGridColumns(false); // Сбрасываем сетку колонок
  };
  return (
    <section className="main__games-list__wrapper w-full sm:ml-auto flex flex-col pb-5">
      {/* Компонент фильтров */}
      <Filters
        sortByDateHandler={sortByDateHandler}
        sortByNameHandler={sortByNameHandler}
        gridColumnsHandler={gridColumnsHandler}
        gridRowsHandler={gridRowsHandler}
      />
      <div
        className={`games__list w-full flex items-stretch justify-between mt-2 flex-wrap`}
      >
        {/* Карточки игры */}
        {list.map((game) => (
          <Card key={game.name} game={game} isGridColumns={isGridColumns} />
        ))}
      </div>
    </section>
  );
};

export default GamesList;
