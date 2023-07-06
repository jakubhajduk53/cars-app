import Button from "./Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { changeSelectedCar } from "../store";

function CarsListItem(props) {
  const CarsListItemStyles = classNames(
    "grid grid-cols-2 border border-gray-300 hover:border-black p-5",
    props.className
  );

  const dispatch = useDispatch();

  const car = props.car;

  return (
    <div className={CarsListItemStyles}>
      <div className="">
        <img
          src={car.image_url}
          alt={car.name}
          className="w-36 h-36 sm:w-52 sm:h-52 md:w-72 md:h-72 border-2 border-blue-300 rounded-xl shadow-2xl shadow-blue-200"
        />
      </div>
      <div className="grid">
        <p className="text-xl font-semibold md:text-3xl  break-words truncate">
          {car.name}
        </p>
        <p className="text-gray-600 text-md md:text-xl italic">
          Cost: ${car.price}
        </p>
        <p className="text-gray-600 text-md md:text-xl italic">
          Year of production: {car.year_of_production}
        </p>
        <p className="text-gray-600 text-md md:text-xl italic break-words truncate">
          Location: {car.location}
        </p>
        <Button
          value="Check Availability"
          className="justify-self-end shadow-xl"
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
