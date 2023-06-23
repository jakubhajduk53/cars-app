import React, { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { changeSearchTerm } from "../store";

function SearchBar() {
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeSearchTerm(localSearchTerm));
  };

  return (
    <form
      className="flex items-center gap-8 m-5 w-3/4 mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        value={localSearchTerm}
        onChange={handleChange}
      />
      <Button value="Search" />
    </form>
  );
}

export default SearchBar;
