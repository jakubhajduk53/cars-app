import React, { useState } from "react";
import {
  AiFillCar,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineCar,
} from "react-icons/ai";
import RouterLink from "./RouterLink";

function Header() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (name) => {
    setActiveLink(name);
  };

  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0">
      <RouterLink
        to="/"
        icon={AiFillHome}
        name="Home"
        activeLink={activeLink}
        onClick={handleLinkClick}
      />
      <RouterLink
        to="/cars-for-sale"
        icon={AiFillCar}
        name="Cars for sale"
        activeLink={activeLink}
        onClick={handleLinkClick}
      />
      <RouterLink
        to="/sell-your-car"
        icon={AiOutlineCar}
        name="Sell your car"
        activeLink={activeLink}
        onClick={handleLinkClick}
      />
      <RouterLink
        to="/menu"
        icon={AiOutlineMenu}
        name="Menu"
        activeLink={activeLink}
        onClick={handleLinkClick}
      />
    </div>
  );
}

export default Header;
