import { RouterLink } from "../components/";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { logOut } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { useNavigate, Outlet, useHref } from "react-router-dom";
import { AiOutlineLogout, AiOutlineIdcard } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import classNames from "classnames";
import { userPanelRoutes } from "../data/routes";

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function UserPanelPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const href = useHref();

  const [activeLink, setActiveLink] = useState(href);

  const isActive = (routeName) => {
    return userPanelRoutes[routeName].includes(activeLink);
  };

  useEffect(() => {
    setActiveLink(href);
  }, [href]);

  const panelClasses = classNames("text-base");

  const user = useSelector(selectUser);

  const { first_name: firstName, last_name: lastName } =
    user.user_metadata || {};

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    } else {
      dispatch(logOut());
    }

    navigate("/menu/login");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full bg-neutral-100 sticky top-0 border-t">
        <RouterLink
          to="/menu/panel/your-cars"
          name="Your cars"
          className={panelClasses}
          active={isActive("yourCars")}
          icon={AiOutlineIdcard}
        />
        <RouterLink
          to="/menu/panel/options"
          name="Options"
          className={panelClasses}
          active={isActive("options")}
          icon={FiSettings}
        />
        <RouterLink
          handleClick={handleSignOut}
          name="Sign Out"
          className={classNames(panelClasses, "hover:text-red-500")}
          icon={AiOutlineLogout}
        />
      </div>
      <Outlet />
      {href === "/menu/panel" ? (
        <div className="text-center text-lg">
          Welcome! {firstName} {lastName}
        </div>
      ) : null}
    </div>
  );
}

export default UserPanelPage;
