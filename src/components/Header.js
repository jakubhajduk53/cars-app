import { Link } from "react-router-dom";
import {
  AiFillCar,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineCar,
} from "react-icons/ai";
import classNames from "classnames";

function Header() {
  const linkStyles = classNames(
    "px-8 py-4 text-lg text-black-500 hover:text-blue-700 flex items-center gap-1 transition duration-150"
  );
  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0 ">
      <Link to={"/"}>
        <div className={linkStyles}>
          <AiFillHome />
          Home
        </div>
      </Link>

      <Link to={"cars-for-sale"}>
        <div className={linkStyles}>
          <AiFillCar />
          Cars for sale
        </div>
      </Link>

      <Link to={"sell-your-car"}>
        <div className={linkStyles}>
          <AiOutlineCar />
          Sell your car
        </div>
      </Link>

      <Link to={"menu"}>
        <div className={linkStyles}>
          <AiOutlineMenu />
          Menu
        </div>
      </Link>
    </div>
  );
}

export default Header;
