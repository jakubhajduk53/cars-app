import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SellYourCarPage from "./pages/SellYourCarPage";
import CarsForSalePage from "./pages/CarsForSalePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router-dom";

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

  const update = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    fetchImage();
  }, [searchValue]);

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cars-for-sale"
            element={
              <CarsForSalePage cars={cars} handleSearch={handleSearch} />
            }
          />
          <Route
            path="/sell-your-car"
            element={<SellYourCarPage update={update} />}
          />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
