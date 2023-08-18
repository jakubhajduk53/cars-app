export const headerRoutes = {
  home: ["/"],
  carsForSale: ["/cars-for-sale"],
  sellYourCar: ["/sell-your-car"],
  menu: [
    "/menu",
    "/menu/login",
    "/menu/register",
    "/menu/panel",
    "/menu/panel/options",
    "/menu/panel/options/change-password",
    "/menu/panel/options/change-userdata",
    "/menu/panel/options/change-email",
    "/menu/panel/your-cars",
  ],
};

export const userPanelRoutes = {
  options: [
    "/menu/panel/options",
    "/menu/panel/options/change-password",
    "/menu/panel/options/change-userdata",
    "/menu/panel/options/change-email",
  ],
  yourCars: ["/menu/panel/your-cars"],
};

export const userOptionsRoutes = {
  password: ["/menu/panel/options/change-password"],
  userdata: ["/menu/panel/options/change-userdata"],
  email: ["/menu/panel/options/change-email"],
};
