import { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  fetchGenres,
  fetchPlatforms,
  fetchTags,
  fetchPublishers,
  fetchStores,
} from "../../utils/rawgAPI";
import { IGenre } from "../../types/Genre";
import SideBarGenres from "./Genres";
import Platforms from "./Platforms";
import IPlatform from "../../types/Platform";
import Tags from "./Tags";
import PublisherSidebar from "./Publishers";
import Stores from "./Stores";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const Sidebar: React.FC<IProps> = ({ open, handleClose }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [tags, setTags] = useState<IPlatform[]>([]);
  const [publishers, setPublishers] = useState<IPlatform[]>([]);
  const [stores, setStores] = useState<IPlatform[]>([]);
  useEffect(() => {
    // Fetch genres on initial render
    const fetchGenresData = async () => {
      const data = await fetchGenres();
      setGenres(data.results);
    };
    fetchGenresData();
    // Загрузка платформ
    const fetchPlatformsData = async () => {
      const data = await fetchPlatforms();
      setPlatforms(data.results);
    };
    fetchPlatformsData();

    const fetchTagsData = async () => {
      const data = await fetchTags();
      setTags(data.results);
    };
    fetchTagsData();

    const fetchPublishersData = async () => {
      // Fetch publishers data
      const data = await fetchPublishers();
      setPublishers(data.results);
    };
    fetchPublishersData();

    const fetchStoresData = async () => {
      // Fetch stores data
      const data = await fetchStores();
      setStores(data.results);
    };
    fetchStoresData();
  }, []);

  return (
    <aside
      className={`main--wrapper__sidebar relative w-full xl:flex overflow-y-auto sm:flex flex-col h-[100vh] sm:h-auto ${
        open ? "show" : "hide"
      }`}
      onClick={handleClose}
    >
      <div className="main--wrapper__sidebar-content max-[650px]:w-[40%]">
        <SideBarGenres genres={genres} />
        <Platforms platforms={platforms} />
        <Tags tags={tags} />
        <PublisherSidebar publishers={publishers} />
        <Stores stores={stores} />
      </div>
    </aside>
  );
};

export default Sidebar;
