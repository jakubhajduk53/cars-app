import {
  AiFillCar,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineCar,
} from "react-icons/ai";
import RouterLink from "./RouterLink";

function Header() {
  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0">
      <RouterLink to="/" icon={AiFillHome} name="Home" />
      <RouterLink to="/cars-for-sale" icon={AiFillCar} name="Cars for sale" />
      <RouterLink
        to="/sell-your-car"
        icon={AiOutlineCar}
        name="Sell your car"
      />
      <RouterLink to="/menu" icon={AiOutlineMenu} name="Menu" />
    </div>
  );
}

export default Header;
