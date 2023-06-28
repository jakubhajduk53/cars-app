import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { fetchAmountOfCars } from "../store/slices/carsSlice";
import { changeSearchTerm } from "../store/slices/carsSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(changeSearchTerm(localSearchTerm));

    dispatch(fetchAmountOfCars({ term: localSearchTerm }));
  };

  return (
    <form
      className="flex items-center gap-8 m-5 w-3/4 mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        onChange={handleChange}
        value={localSearchTerm}
      />
      <Button value="Search" />
    </form>
  );
}

export default SearchBar;
