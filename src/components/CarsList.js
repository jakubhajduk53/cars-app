import CarsListItem from "./CarsListItem";
import Button from "./Button";
import { useState } from "react";

function CarsList(props) {
  const cars = props.cars;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = cars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-8">
        {itemsToShow.map((car) => (
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
      <div className="flex justify-center items-center mt-4">
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
