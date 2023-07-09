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

  const routes = {
    home: ["/"],
    carsForSale: ["/cars-for-sale"],
    sellYourCar: ["/sell-your-car"],
    menu: [
      "/menu",
      "/menu/login",
      "/menu/register",
      "/menu/panel",
      "/menu/panel/options",
      "/menu/panel/options/change-password",
      "/menu/panel/options/change-userdata",
      "/menu/panel/options/change-email",
      "/menu/panel/your-cars",
    ],
  };

  const isActive = (routeName) => {
    return routes[routeName].includes(activeLink);
  };

  useEffect(() => {
    setActiveLink(href);
  }, [href]);

  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0">
      <RouterLink
        to="/"
        icon={AiFillHome}
        name="Home"
        active={isActive("home")}
      />
      <RouterLink
        to="/cars-for-sale"
        icon={AiFillCar}
        name="Cars for sale"
        active={isActive("carsForSale")}
      />
      <RouterLink
        to="/sell-your-car"
        icon={AiOutlineCar}
        name="Sell your car"
        active={isActive("sellYourCar")}
      />
      <RouterLink
        to="/menu"
        icon={AiOutlineMenu}
        name="Menu"
        active={isActive("menu")}
      />
    </div>
  );
}

export default Header;
