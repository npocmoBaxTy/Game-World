import { NavLink } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <NavLink to={"/"} className={"site__logo text-4xl red-text"}>
      <span className="hidden sm:block">Game World</span>
      <span className="sm:hidden block">GW</span>
    </NavLink>
  );
};

export default Logo;
