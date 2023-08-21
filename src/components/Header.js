import RouterLink from "./RouterLink";
import React, { useState, useEffect } from "react";
import { useHref } from "react-router-dom";
import { headerRoutes } from "../data/routes";
import { headerInfo } from "../data";

function Header() {
  const href = useHref();

  const [activeLink, setActiveLink] = useState(href);

  const isActive = (routeName) => {
    return headerRoutes[routeName].includes(activeLink);
  };

  useEffect(() => {
    setActiveLink(href);
  }, [href]);

  return (
    <div className="flex justify-center items-center bg-neutral-100 sticky top-0">
      {headerInfo.map((header) => {
        return (
          <RouterLink
            key={header.name}
            to={header.to}
            icon={header.icon}
            name={header.name}
            active={isActive(header.value)}
          />
        );
      })}
    </div>
  );
}

export default Header;
