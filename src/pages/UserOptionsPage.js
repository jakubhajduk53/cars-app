import { RouterLink } from "../components/";
import { useState, useEffect } from "react";
import { useHref, Outlet } from "react-router-dom";
import { MdPassword, MdDataObject } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import classNames from "classnames";
import { userOptionsRoutes } from "../data/routes";

function UserOptionsPage() {
  const panelClasses = classNames("text-base");

  const href = useHref();

  const [activeLink, setActiveLink] = useState(href);

  const isActive = (routeName) => {
    return userOptionsRoutes[routeName].includes(activeLink);
  };

  useEffect(() => {
    setActiveLink(href);
  }, [href]);

  return (
    <div>
      <div className="flex justify-center w-full bg-neutral-100 sticky top-0 border-t">
        <RouterLink
          to="/menu/panel/options/change-userdata"
          name="Change user data"
          className={panelClasses}
          active={isActive("userdata")}
          icon={MdDataObject}
        />
        <RouterLink
          to="/menu/panel/options/change-email"
          name="Change email"
          className={panelClasses}
          active={isActive("email")}
          icon={AiOutlineMail}
        />
        <RouterLink
          to="/menu/panel/options/change-password"
          name="Change password"
          className={panelClasses}
          active={isActive("password")}
          icon={MdPassword}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default UserOptionsPage;
