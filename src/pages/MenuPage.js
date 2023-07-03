import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function MenuPage() {
  const [isRegistered, setIsRegistered] = useState(true);

  const handleClick = (value) => {
    setIsRegistered(value);
  };

  return (
    <div className="flex w-full justify-center">
      {isRegistered ? (
        <Login handleClick={handleClick} />
      ) : (
        <Register handleClick={handleClick} />
      )}
    </div>
  );
}

export default MenuPage;
