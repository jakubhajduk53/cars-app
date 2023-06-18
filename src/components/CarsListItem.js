function CarsListItem(props) {
  return (
    <div>
      <p>
        {props.name} - ${props.price} - {props.yearOfProduction} -
        {props.location}
      </p>
    </div>
  );
}

export default CarsListItem;
