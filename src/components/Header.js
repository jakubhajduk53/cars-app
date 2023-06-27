import React, { useState } from "react";
import {
  AiFillCar,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineCar,
} from "react-icons/ai";
import RouterLink from "./RouterLink";
import { useEffect } from "react";
import { useHref } from "react-router-dom";

function Header() {
  const href = useHref();

  const [activeLink, setActiveLink] = useState(href);

  useEffect(() => {
    setActiveLink(href);
  }, [href]);

  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0">
      <RouterLink
        to="/"
        icon={AiFillHome}
        name="Home"
        activeLink={activeLink}
      />
      <RouterLink
        to="/cars-for-sale"
        icon={AiFillCar}
        name="Cars for sale"
        activeLink={activeLink}
      />
      <RouterLink
        to="/sell-your-car"
        icon={AiOutlineCar}
        name="Sell your car"
        activeLink={activeLink}
      />
      <RouterLink
        to="/menu"
        icon={AiOutlineMenu}
        name="Menu"
        activeLink={activeLink}
      />
    </div>
  );
}

export default Header;
