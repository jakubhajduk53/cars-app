import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import CarsList from "./components/CarsList";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import SellYourCarPage from "./pages/SellYourCarPage";

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
  const fetchImage = async () => {
    const { img, error } = await supabase.storage.from("cars");
  };

  useEffect(() => {
    fetchData();
    fetchImage();
  }, [searchValue]);

  return (
    <div className="App">
      <Header />
      <SearchBar handleSearch={handleSearch} />
      {cars.length > -1 ? <CarsList cars={cars} /> : <p>Loading...</p>}
      <Footer />
      <hr></hr>
      <SellYourCarPage />
    </div>
  );
}

export default App;
