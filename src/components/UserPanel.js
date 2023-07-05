import React from "react";
import Button from "./Button";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { logOut } from "../store";
import { useNavigate, Link, Outlet } from "react-router-dom";

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function UserPanel() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    <div className="flex flex-col">
      <div>
        <h3>Welcome back!</h3>
        <h4>
          {firstName} {lastName}
        </h4>
      </div>
      <Link to={"/menu/panel/your-cars"} className="mt-1">
        <Button value="Your cars" />
      </Link>
      <Button value="Options" className="mt-1" />
      <Button onClick={handleSignOut} value="Sign Out" className="mt-1" />
      <Outlet />
    </div>
  );
}

export default UserPanel;
