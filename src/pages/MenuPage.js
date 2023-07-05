import React from "react";
import { Outlet } from "react-router-dom";

function MenuPage() {
  return (
    <div className="flex w-full justify-center">
      <Outlet />
    </div>
  );
}

export default MenuPage;
