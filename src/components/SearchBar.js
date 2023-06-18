import { useState } from "react";

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
      <button onClick={handleClick}>Search</button>
    </form>
  );
}

export default SearchBar;
