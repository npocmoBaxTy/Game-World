import React from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { RxHamburgerMenu } from "react-icons/rx";

interface IProps {
  toggleBurgerMenu: () => void;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}
const Header: React.FC<IProps> = ({ toggleBurgerMenu, handleSearch }) => {
  return (
    <header className="header w-full fixed top-0 bg-white z-50 p-3 sm:p-5 border-b shadow-xl shadow-gray-300">
      <div className="header__inner flex items-center w-full">
        <Logo />
        <Search onSearch={handleSearch} />
        <div
          className="burger__menu--btn sm:flex xl:hidden items-center w-[1024px]:flex ml-2 red-text"
          onClick={toggleBurgerMenu}
        >
          <RxHamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
