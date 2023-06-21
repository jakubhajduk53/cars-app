import Button from "../components/Button";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2021/12/18/15/51/car-6879134_1280.jpg)",
      }}
    >
      <Link to="/cars-for-sale">
        <Button
          value="Get Started"
          className="relative overflow-hidden bg-transparent hover:bg-opacity-70 text-white uppercase border border-gray"
        />
      </Link>
    </div>
  );
}

export default HomePage;
