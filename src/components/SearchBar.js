import { useState } from "react";
import Button from "./Button";

function SearchBar(props) {
  const [value, setValue] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    props.handleSearch(value);
  };

  return (
    <form>
      <input
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
