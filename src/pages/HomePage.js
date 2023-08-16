import { Button } from "../components/";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      className="flex justify-center items-center w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2021/12/18/15/51/car-6879134_1280.jpg)",
      }}
    >
      <Link to="/cars-for-sale">
        <Button
          value="Get Started"
          className="bg-transparent hover:bg-opacity-70 text-white uppercase border border-gray"
        />
      </Link>
    </div>
  );
}

export default HomePage;
