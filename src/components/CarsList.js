import CarsListItem from "./CarsListItem";

function CarsList(props) {
  const cars = props.cars;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cars.map((car) => {
        return (
          <CarsListItem
            key={car.id}
            id={car.id}
            img={car.image_url}
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
