import { Link } from "react-router-dom";
import {
  AiFillCar,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineCar,
} from "react-icons/ai";

function Header() {
  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0 ">
      <Link to={"/"}>
        <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1 transition duration-150">
          <AiFillHome />
          Home
        </div>
      </Link>

      <Link to={"cars-for-sale"}>
        <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1 transition duration-150">
          <AiFillCar />
          Cars for sale
        </div>
      </Link>

      <Link to={"sell-your-car"}>
        <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1 transition duration-150">
          <AiOutlineCar />
          Sell your car
        </div>
      </Link>

      <Link to={"menu"}>
        <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1 transition duration-150">
          <AiOutlineMenu />
          Menu
        </div>
      </Link>
    </div>
  );
}

export default Header;
