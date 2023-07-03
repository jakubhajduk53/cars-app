import React, { useState } from "react";
import Login from "../components/Login";

function MenuPage() {
  const [isRegistered, setIsRegistered] = useState(true);

  const handleClick = (value) => {
    setIsRegistered(value);
  };

  return (
    <div className="flex w-full justify-center">
      {isRegistered ? <Login handleClick={handleClick} /> : <p>HA</p>}
    </div>
  );
}

export default MenuPage;
