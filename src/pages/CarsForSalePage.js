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

  const cars = useSelector(({ cars: { carsList, searchTerm } }) => {
    const filteredCars = carsList.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredCars;
  });

  return (
    <div className="w-full">
      <SearchBar />
      {cars.length > -1 ? <CarsList cars={cars} /> : <p>Loading...</p>}
    </div>
  );
}

export default CarsForSalePage;
