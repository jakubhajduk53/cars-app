import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const RouterLink = ({ to, icon: Icon, name, activeLink, onClick }) => {
  const linkStyles = classNames(
    "px-8 py-4 text-lg",
    {
      "text-black-500": name !== activeLink,
      "text-blue-700": name === activeLink,
    },
    "hover:text-blue-700 flex items-center gap-1 transition duration-150"
  );

  return (
    <Link to={to} onClick={() => onClick(name)}>
      <div className={linkStyles}>
        {Icon && <Icon />}
        {name}
      </div>
    </Link>
  );
};

export default RouterLink;