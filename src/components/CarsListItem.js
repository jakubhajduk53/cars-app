function CarsListItem(props) {
  return (
    <div>
      <img src={props.img} alt={props.name} />
      <p>
        {props.name} - ${props.price} - {props.yearOfProduction} -
        {props.location}
      </p>
    </div>
  );
}

export default CarsListItem;
