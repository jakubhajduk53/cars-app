import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import SellYourCarPage from "./pages/SellYourCarPage";
import CarsForSalePage from "./pages/CarsForSalePage";
import HomePage from "./pages/HomePage";
import { Router, Route, Routes } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cars-for-sale"
          element={<CarsForSalePage cars={cars} />}
        />
        <Route path="/sell-your-car" element={<SellYourCarPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
