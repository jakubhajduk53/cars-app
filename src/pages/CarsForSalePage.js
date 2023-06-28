import CarsList from "../components/CarsList";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAmountOfCars } from "../store/slices/carsSlice";

function CarsForSalePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAmountOfCars({ term: "" }));
  }, []);

  const amount = useSelector(({ cars: { carsAmount } }) => {
    return carsAmount;
  });

  return (
    <div className="w-full">
      <SearchBar />
      {amount > -1 ? <CarsList /> : <p>Loading...</p>}
    </div>
  );
}

export default CarsForSalePage;
