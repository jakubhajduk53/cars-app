import Button from "./Button";

function CarsListItem(props) {
  return (
    <div className="flex items-center px-4 py-2 w-full h-full justify-center border border-gray-300 hover:border-black">
      <img
        src={props.img}
        alt={props.name}
        className="w-48 h-48 mr-4 border border-gray-300"
      />
      <div>
        <p className="text-xl font-semibold mb-2">{props.name}</p>
        <p className="text-gray-600 mb-2">Cost: ${props.price}</p>
        <p className="text-gray-600 mb-2">
          Year of production: {props.yearOfProduction}
        </p>
        <p className="text-gray-600 mb-4">Location: {props.location}</p>
        <Button value="Check Availability" />
      </div>
    </div>
  );
}

export default CarsListItem;
