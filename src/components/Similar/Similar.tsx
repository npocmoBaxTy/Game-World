import Card from "../../shared/Card/Card";
import SimpleSlider from "../../shared/Slider/Slider";
import { IGame } from "../../types/Game";

interface IProps {
  games: IGame[];
}

const Similar: React.FC<IProps> = ({ games }) => {
  return (
    <div className="game__page--similar-wrapper w-full mt-10">
      <h1 className="similiar--title text-3xl red-text py-3 mb-3">
        Suggestions
      </h1>
      <div className="gape__page--similar--inner">
        <SimpleSlider slides={4}>
          {games.map((game) => (
            <Card
              key={game.id}
              classname="w-full similar"
              isGridColumns={false}
              game={game}
            />
          ))}
        </SimpleSlider>
      </div>
    </div>
  );
};

export default Similar;
