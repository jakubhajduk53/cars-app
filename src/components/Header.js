import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center bg-neutral-100 sticky top-0">
      <Link
        to={"/"}
        className="px-8 py-4 text-lg text-black-500 hover:text-blue-700"
      >
        Home
      </Link>
      <Link
        to={"cars-for-sale"}
        className="px-8 py-4 text-lg text-black-500 hover:text-blue-700"
      >
        Cars for sale
      </Link>
      <Link
        to={"sell-your-car"}
        className="px-8 py-4 text-lg text-black-500 hover:text-blue-700"
      >
        Sell your car
      </Link>
      <Link
        to={"menu"}
        className="px-8 py-4 text-lg text-black-500 hover:text-blue-700"
      >
        Menu
      </Link>
    </div>
  );
}

export default Header;
