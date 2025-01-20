const Welcome: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="main__page-banner text-black mt-[90px] sm:mt-[100px] flex flex-col items-center gap-1">
      <h1 className="main__page-banner-title text-3xl text-center">
        Discover the Latest Games
      </h1>
      <p className="main__page-banner-subtitle text-lg text-center">
        Discover new titles, find your favorite, and stay up-to-date with the
        latest games on the market. There are{" "}
        <span className="red-text">{count}</span> games
      </p>
      <a
        href="#main-content"
        className="main__page-banner-button btn-primary red-bg py-1 px-2 rounded text-white"
      >
        Discover Now
      </a>
    </div>
  );
};

export default Welcome;
