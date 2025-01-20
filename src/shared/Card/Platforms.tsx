import { FaApple, FaXbox, FaPlaystation, FaWindows } from "react-icons/fa";
import { MdOutlineWifiTethering } from "react-icons/md";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiMacos } from "react-icons/si";
import { IoLogoAndroid } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaLinux } from "react-icons/fa";
import { SiWiiu } from "react-icons/si";

interface IProps {
  platforms: {
    platform: {
      name: string;
      id: number;
    };
  }[];
}

// Объект для сопоставления платформ с иконками
const platformIcons: { [key: string]: JSX.Element } = {
  PC: <FaWindows />,
  PlayStation: <FaPlaystation />,
  Xbox: <FaXbox />,
  iOS: <FaApple />,
  Android: <IoLogoAndroid />,
  Linux: <FaLinux />,
  Web: <MdOutlineWifiTethering />,
  macOS: <SiMacos />,
  Nintendo: <BsNintendoSwitch />,
  "Wii U": <SiWiiu />,
};

// Объект для объединения платформ
const platformMapping: { [key: string]: string } = {
  "PlayStation 5": "PlayStation",
  "PlayStation 4": "PlayStation",
  "PlayStation 3": "PlayStation",
  "PlayStation 2": "PlayStation",
  "Nintendo 3DS": "Nintendo",
  "Nintendo Switch": "Nintendo",
  "PS Vita": "PlayStation",
  "Xbox Series X": "Xbox",
  "Xbox Series S/X": "Xbox",
  "Xbox 360": "Xbox",
  "Xbox One": "Xbox",
  // Можно добавить другие платформы по необходимости
};

const Platforms: React.FC<IProps> = ({ platforms }) => {
  // Уникальные платформы с учетом объединения
  const uniquePlatforms = Array.from(
    new Set(
      platforms?.map(
        (platform) =>
          platformMapping[platform.platform.name] || platform.platform.name
      )
    )
  );

  return (
    <div className="game-card__platforms flex gap-2 flex-wrap mb-2">
      {uniquePlatforms.slice(0, 4).map((platform) => (
        <NavLink
          to={`/platforms/platofrm/${platform}`}
          key={platform}
          className="inline-flex items-center justify-center cursor-pointer px-2 py-1 rounded-sm bg-gray-600 text-xs sm:text-[15px] duration-300 hover:scale-105 text-white"
        >
          {/* Отображение иконки, если она найдена, иначе название платформы */}
          {platformIcons[platform] || platform}
        </NavLink>
      ))}
    </div>
  );
};

export default Platforms;
