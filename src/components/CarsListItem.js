import Button from "./Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { selectCar, deleteYourCar } from "../store";

function CarsListItem(props) {
  const CarsListItemStyles = classNames(
    "grid grid-cols-8 border border-gray-300 hover:border-black p-5",
    props.className
  );

  const dispatch = useDispatch();

  const car = props.car;

  return (
    <div className={CarsListItemStyles}>
      <div className="grid col-span-3">
        <img
          src={car.image_url}
          alt={car.name}
          className="w-28 h-28 sm:w-52 sm:h-52 md:w-72 md:h-72 self-center border-2 border-blue-300 rounded-xl shadow-2xl shadow-blue-200"
        />
      </div>
      <div className="grid col-span-3">
        <p className="text-md font-semibold sm:text-xl md:text-3xl break-words truncate">
          {car.name}
        </p>
        <p className="text-gray-600 text-sm sm:text-lg md:text-xl italic">
          Cost: ${car.price}
        </p>
        <p className="text-gray-600 text-sm sm:text-lg md:text-xl italic">
          Year of production: {car.year_of_production}
        </p>
        <p className="text-gray-600 text-sm sm:text-lg md:text-xl italic break-words truncate">
          Location: {car.location}
        </p>
      </div>
      <div className="grid col-span-2">
        {props.yourCar ? (
          <Button
            value="Delete Offer"
            className="justify-self-end self-end shadow-xl px-0 py-0 text-sm md:text-base w-20 md:w-40 md:h-12 break-words"
            onClick={() => {
              console.log(car.id);
              dispatch(deleteYourCar({ carId: car.id }));
            }}
          />
        ) : (
          <Button
            value="Check Availability"
            className="justify-self-end self-end shadow-xl px-0 py-0 text-sm md:text-base w-20 md:w-40 md:h-12 break-words"
            onClick={() => {
              dispatch(selectCar(car));
              props.openModal();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CarsListItem;
