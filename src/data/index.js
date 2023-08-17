import {
  AiFillCar,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineCar,
} from "react-icons/ai";

export const headerInfo = [
  {
    to: "/",
    icon: AiFillHome,
    name: "Home",
    value: "home",
  },
  {
    to: "/cars-for-sale",
    icon: AiFillCar,
    name: "Cars for sale",
    value: "carsForSale",
  },
  {
    to: "/sell-your-car",
    icon: AiOutlineCar,
    name: "Sell your car",
    value: "sellYourCar",
  },
  {
    to: "/menu",
    icon: AiOutlineMenu,
    name: "Menu",
    value: "menu",
  },
];
