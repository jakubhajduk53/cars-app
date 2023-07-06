import Button from "./Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { changeSelectedCar } from "../store";

function CarsListItem(props) {
  const CarsListItemStyles = classNames(
    "flex items-center justify-center px-4 py-2 gap-8 xl:gap-16 w-full h-full border border-gray-300 hover:border-black",
    props.className
  );

  const dispatch = useDispatch();

  const car = props.car;

  return (
    <div className={CarsListItemStyles}>
      <div className="shrink-0">
        <img
          src={car.image_url}
          alt={car.name}
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 border border-gray-300"
        />
      </div>
      <div className="w-1/2">
        <p className="text-xl font-semibold md:text-2xl break-words truncate mb-2">
          {car.name}
        </p>
        <p className="text-gray-600 text-md md:text-lg mb-2">
          Cost: ${car.price}
        </p>
        <p className="text-gray-600 text-md md:text-lg mb-2">
          Year of production: {car.year_of_production}
        </p>
        <p className="text-gray-600 text-md md:text-lg break-words truncate mb-4">
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
