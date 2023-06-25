import Button from "./Button";
function CarsListItem(props) {
  return (
    <div className="flex items-center px-4 py-2 w-full h-full justify-center border hover:border-black">
      <img src={props.img} alt={props.name} className="w-32 h-32 mr-4 " />
      <div>
        <p className="text-xl font-semibold">{props.name}</p>
        <p className="text-gray-600">Cost: ${props.price}</p>
        <p className="text-gray-600">
          Year of production: {props.yearOfProduction}
        </p>
        <p className="text-gray-600">Location: {props.location}</p>
        <Button value="Check Availability" />
      </div>
    </div>
  );
}

export default CarsListItem;
