import CarsList from "../components/CarsList";

function CarsForSalePage(props) {
  return (
    <div>
      {props.cars.length > -1 ? (
        <CarsList cars={props.cars} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CarsForSalePage;
