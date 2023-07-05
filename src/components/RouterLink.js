import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const RouterLink = ({ to, icon: Icon, name, active }) => {
  const linkStyles = classNames(
    "px-2 py-4 text-lg",
    {
      "text-black-500": !active,
      "text-blue-700": active,
    },
    "hover:text-blue-700 flex items-center gap-1 transition duration-150 md:px-8"
  );

  return (
    <Link to={to}>
      <div className={linkStyles}>
        {Icon && <Icon />}
        {name}
      </div>
    </Link>
  );
};

export default RouterLink;
