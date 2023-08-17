import Button from "./Button";
import { useDispatch } from "react-redux";
import { selectCar, deleteYourCar } from "../store";
import classNames from "classnames";

function CarsListItem(props) {
  const CarsListItemStyles = classNames(
    "grid grid-cols-8 border border-gray-300 hover:border-black p-2 sm:p-5 gap-2 sm:gap-5",
    props.className
  );

  const carDescriptionsClasses = classNames(
    "text-gray-600 text-sm sm:text-lg md:text-xl italic "
  );

  const carListItemButtonClasses = classNames(
    "w-16 sm:w-24 md:w-40 md:h-12 shadow-xl text-xs md:text-base "
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
        <p className={carDescriptionsClasses}>Cost: ${car.price}</p>
        <p className={carDescriptionsClasses}>
          Year of production: {car.year_of_production}
        </p>
        <p className={carDescriptionsClasses + "break-words truncate"}>
          Location: {car.location}
        </p>
      </div>
      <div className="grid col-span-2 place-content-end gap-5">
        {props.yourCar ? (
          <>
            <Button
              value="Edit Offer"
              className={
                carListItemButtonClasses + " bg-blue-400 hover:bg-blue-500"
              }
              onClick={() => {
                dispatch(selectCar(car));
                props.openModal();
              }}
            />
            <Button
              value="Delete Offer"
              className={
                carListItemButtonClasses + " bg-red-500 hover:bg-red-600"
              }
              onClick={() => {
                dispatch(deleteYourCar({ carId: car.id }));
              }}
            />
          </>
        ) : (
          <Button
            value="Check Availability"
            className={
              carListItemButtonClasses +
              "justify-self-end place-self-end break-words"
            }
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
