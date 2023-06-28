import CarsListItem from "./CarsListItem";
import Button from "./Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCars } from "../store";
import { changePage, changeSearchTerm } from "../store/slices/carsSlice";

function CarsList() {
  const dispatch = useDispatch();

  const {
    currentPage,
    searchTerm,
    firstItemOnPage,
    lastItemOnPage,
    totalPages,
  } = useSelector((state) => ({
    currentPage: state.cars.currentPage,
    searchTerm: state.cars.searchTerm,
    firstItemOnPage: state.cars.firstItemOnPage,
    lastItemOnPage: state.cars.lastItemOnPage,
    totalPages: state.cars.totalPages,
  }));

  useEffect(() => {
    dispatch(changeSearchTerm(""));
    dispatch(
      fetchCars({
        first: 0,
        last: 5,
        term: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(changePage(1));
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      fetchCars({
        first: firstItemOnPage,
        last: lastItemOnPage,
        term: searchTerm,
      })
    );
  }, [currentPage, searchTerm]);

  const cars = useSelector(({ cars: { carsList } }) => {
    return carsList;
  });

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(changePage(currentPage + 1));
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(changePage(currentPage - 1));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-8">
        {cars.map((car) => (
          <CarsListItem
            key={car.id}
            img={car.image_url}
            name={car.name}
            price={car.price}
            yearOfProduction={car.year_of_production}
            location={car.location}
          />
        ))}
      </div>
      <div className="bottom-bar fixed left-0 bg-neutral-100 bottom-0 w-full bg-white flex justify-center items-center py-4 ">
        <Button
          value="<"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        />
        <p className="mx-2 text-center">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          value=">"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}

export default CarsList;
