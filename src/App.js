import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import CarsList from "./components/CarsList";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  const [cars, setCars] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  async function fetchData() {
    let { data: cars, error } = await supabase
      .from("cars")
      .select("*")
      .ilike("name", `%${searchValue}%`);
    setCars(cars);
  }

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  return (
    <div className="App">
      <Header />
      <SearchBar handleSearch={handleSearch} />
      {cars.length > -1 ? <CarsList cars={cars} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
