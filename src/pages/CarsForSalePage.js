import CarsList from "../components/CarsList";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../store";

function CarsForSalePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  return (
    <div>
      <SearchBar />
      {/* {props.cars.length > -1 ? (
        <CarsList cars={props.cars} />
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default CarsForSalePage;
