import { useState } from "react";
import Button from "./Button";

function SearchBar(props) {
  const [value, setValue] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    props.handleSearch(value);
  };

  return (
    <form className="flex items-center gap-8 m-5 w-3/4 mx-auto">
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <Button onClick={handleClick} value="Search" />
    </form>
  );
}

export default SearchBar;
