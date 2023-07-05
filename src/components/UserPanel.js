import React from "react";
import Button from "./Button";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { logOut } from "../store";
import { useNavigate, Outlet, useHref } from "react-router-dom";
import RouterLink from "./RouterLink";
import classNames from "classnames";

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function UserPanel() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const href = useHref();

  const panelClasses = classNames("text-base");

  const user = useSelector(selectUser);

  const {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  } = user.user_metadata || {};

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
      <div className="flex justify-center w-full bg-neutral-100 sticky top-0">
        <RouterLink
          to="/menu/panel/your-cars"
          name="Your cars"
          className={panelClasses}
        />
        <RouterLink
          to="/menu/panel/options"
          name="Options"
          className={panelClasses}
        />
        <Button
          onClick={handleSignOut}
          value="Sign Out"
          className="flex items-center gap-1 transition duration-150 md:px-8 text-base hover:text-red-500 bg-transparent hover:bg-transparent"
        />
      </div>
      <Outlet />
      {href === "/menu/panel" ? (
        <div className="text-center text-lg">
          Welcome back! {firstName} {lastName}
        </div>
      ) : null}
    </div>
  );
}

export default UserPanel;
