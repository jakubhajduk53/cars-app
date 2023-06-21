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
      <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1">
        <AiFillHome />
        <Link to={"/"}>Home</Link>
      </div>
      <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1">
        <AiFillCar />
        <Link to={"cars-for-sale"}>Cars for sale</Link>
      </div>
      <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1">
        <AiOutlineCar />
        <Link to={"sell-your-car"}>Sell your car</Link>
      </div>
      <div className="px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1">
        <AiOutlineMenu />
        <Link to={"menu"}>Menu</Link>
      </div>
    </div>
  );
}

export default Header;
