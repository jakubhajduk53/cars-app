import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const RouterLink = ({ to, icon: Icon, name }) => {
  const linkStyles = classNames(
    "px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1 transition duration-150"
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
