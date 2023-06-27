import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { fetchCars } from "../store";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let items = 999;
    if (searchTerm === "") {
      items = 24;
    }
    dispatch(
      fetchCars({
        first: 0,
        last: items,
        term: searchTerm,
      })
    );
  };

  return (
    <form
      className="flex items-center gap-8 m-5 w-3/4 mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button value="Search" />
    </form>
  );
}

export default SearchBar;
