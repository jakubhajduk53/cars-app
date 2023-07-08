import RouterLink from "../components/RouterLink";
import classNames from "classnames";
import { useHref, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdPassword, MdDataObject } from "react-icons/md";

function UserOptionsPage() {
  const panelClasses = classNames("text-base");

  const href = useHref();

  const [activeLink, setActiveLink] = useState(href);

  const routes = {
    password: ["/menu/panel/options/change-password"],
    userdata: ["/menu/panel/options/change-userdata"],
  };

  const isActive = (routeName) => {
    return routes[routeName].includes(activeLink);
  };

  useEffect(() => {
    setActiveLink(href);
  }, [href]);

  return (
    <div>
      <div className="flex justify-center w-full bg-neutral-100 sticky top-0 border-t">
        <RouterLink
          to="/menu/panel/options/change-password"
          name="Change password"
          className={panelClasses}
          active={isActive("password")}
          icon={MdPassword}
        />
        <RouterLink
          to="/menu/panel/options/change-userdata"
          name="Change user data"
          className={panelClasses}
          active={isActive("userdata")}
          icon={MdDataObject}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default UserOptionsPage;
