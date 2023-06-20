import CarsList from "../components/CarsList";
import SearchBar from "../components/SearchBar";

function CarsForSalePage(props) {
  return (
    <div>
      <SearchBar handleSearch={props.handleSearch} />
      {props.cars.length > -1 ? (
        <CarsList cars={props.cars} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CarsForSalePage;
