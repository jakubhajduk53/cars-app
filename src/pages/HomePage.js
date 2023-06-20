import Button from "../components/Button";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="flex justify-center">
      <Link to="/cars-for-sale">
        <Button value="Get Started" />
      </Link>
    </div>
  );
}

export default HomePage;
