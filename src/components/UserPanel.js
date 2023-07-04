import React from "react";
import Button from "./Button";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { logOut } from "../store";

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function UserPanel(props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleSignOut = async () => {
    props.handleClick(true);

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    } else {
      dispatch(logOut());
    }
  };

  return (
    <div>
      <Button onClick={handleSignOut} value="Sign Out" />
    </div>
  );
}

export default UserPanel;
