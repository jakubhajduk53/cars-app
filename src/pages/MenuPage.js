import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const checkIsLoggedIn = (state) => state.user.isLoggedIn;

const selectIsLoggedIn = createSelector(
  [checkIsLoggedIn],
  (isLoggedIn) => isLoggedIn
);

function MenuPage() {
  const [isRegistered, setIsRegistered] = useState(true);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClick = (value) => {
    setIsRegistered(value);
  };

  return (
    <div className="flex w-full justify-center">
      {isLoggedIn ? (
        <p>hi</p>
      ) : isRegistered ? (
        <Login handleClick={handleClick} />
      ) : (
        <Register handleClick={handleClick} />
      )}
    </div>
  );
}

export default MenuPage;
