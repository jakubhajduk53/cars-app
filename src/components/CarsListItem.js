import Button from "./Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { changeSelectedCar } from "../store";

function CarsListItem(props) {
  const dispatch = useDispatch();
  const car = props.car;

  const CarsListItemStyles = classNames(
    "flex items-center px-4 py-2 w-full h-full justify-center border border-gray-300 hover:border-black",
    props.className
  );
  return (
    <div className={CarsListItemStyles}>
      <img
        src={car.image_url}
        alt={car.name}
        className="w-48 h-48 mr-8 border border-gray-300 xl:mr-32 md:w-64 md:h-64"
      />
      <div>
        <p className="text-xl font-semibold mb-2 md:text-2xl">{car.name}</p>
        <p className="text-gray-600 text-md mb-2 md:text-lg">
          Cost: ${car.price}
        </p>
        <p className="text-gray-600 text-md mb-2 md:text-lg">
          Year of production: {car.year_of_production}
        </p>
        <p className="text-gray-600 text-md mb-4 md:text-lg">
          Location: {car.location}
        </p>
        <Button
          value="Check Availability"
          onClick={() => {
            dispatch(changeSelectedCar(car));
            props.openModal();
          }}
        />
      </div>
    </div>
  );
}

export default CarsListItem;
