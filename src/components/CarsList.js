import CarsListItem from "./CarsListItem";

function CarsList(props) {
  const cars = props.cars;

  return (
    <div>
      {cars.map((car) => {
        return (
          <CarsListItem
            key={car.id}
            id={car.id}
            name={car.name}
            price={car.price}
            yearOfProduction={car.year_of_production}
            location={car.location}
          />
        );
      })}
    </div>
  );
}

export default CarsList;
