import Button from "./Button";
import classNames from "classnames";

function CarsListItem(props) {
  const CarsListItemStyles = classNames(
    "flex items-center px-4 py-2 w-full h-full justify-center border border-gray-300 hover:border-black",
    props.className
  );
  return (
    <div className={CarsListItemStyles}>
      <img
        src={props.img}
        alt={props.name}
        className="w-64 h-64 mr-32 border border-gray-300"
      />
      <div>
        <p className="text-2xl font-semibold mb-2">{props.name}</p>
        <p className="text-gray-600 text-lg mb-2">Cost: ${props.price}</p>
        <p className="text-gray-600 text-lg mb-2">
          Year of production: {props.yearOfProduction}
        </p>
        <p className="text-gray-600 text-lg mb-4">Location: {props.location}</p>
        <Button value="Check Availability" />
      </div>
    </div>
  );
}

export default CarsListItem;
