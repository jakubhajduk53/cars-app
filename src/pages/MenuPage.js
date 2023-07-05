import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const getUserStatus = (state) => state.user.isLoggedIn;

const selectUserStatus = createSelector(
  [getUserStatus],
  (isLoggedIn) => isLoggedIn
);

function MenuPage() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectUserStatus);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/menu/panel");
    } else {
      navigate("/menu/login");
    }
  }, []);

  return (
    <div className="flex w-full justify-center">
      <Outlet />
    </div>
  );
}

export default MenuPage;
