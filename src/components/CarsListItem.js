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
        className="w-64 h-64 mr-32 border border-gray-300"
      />
      <div>
        <p className="text-2xl font-semibold mb-2">{car.name}</p>
        <p className="text-gray-600 text-lg mb-2">Cost: ${car.price}</p>
        <p className="text-gray-600 text-lg mb-2">
          Year of production: {car.year_of_production}
        </p>
        <p className="text-gray-600 text-lg mb-4">Location: {car.location}</p>
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
