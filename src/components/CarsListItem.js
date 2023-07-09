import Button from "./Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { selectCar, deleteYourCar } from "../store";

function CarsListItem(props) {
  const CarsListItemStyles = classNames(
    "grid grid-cols-8 border border-gray-300 hover:border-black p-5 gap-5",
    props.className
  );

  const dispatch = useDispatch();

  const car = props.car;

  return (
    <div className={CarsListItemStyles}>
      <div className="grid col-span-3 relative justify-content-center overflow-hidden border rounded-xl">
        <div
          className="absolute inset-0 blur-sm bg-cover -m-1"
          style={{
            backgroundImage: `url(${car.image_url})`,
          }}
        ></div>
        <div className="flex justify-center items-center">
          <img
            src={car.image_url}
            alt={car.name}
            className="object-scale-down h-28 sm:h-52 md:h-72 z-10"
          />
        </div>
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
          <div className="justify-self-end self-end">
            <Button
              value="Edit Offer"
              className="bg-blue-400 hover:bg-blue-500 shadow-xl mb-5 px-0 py-0 text-sm md:text-base w-20 md:w-40 md:h-12 break-words"
              onClick={() => {
                dispatch(selectCar(car));
                props.openModal();
              }}
            />
            <Button
              value="Delete Offer"
              className="bg-red-500 hover:bg-red-600 shadow-xl px-0 py-0 text-sm md:text-base w-20 md:w-40 md:h-12 break-words"
              onClick={() => {
                dispatch(deleteYourCar({ carId: car.id }));
              }}
            />
          </div>
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
