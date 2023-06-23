import Header from "./components/Header";
import Footer from "./components/Footer";
import SellYourCarPage from "./pages/SellYourCarPage";
import CarsForSalePage from "./pages/CarsForSalePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars-for-sale" element={<CarsForSalePage />} />
          <Route path="/sell-your-car" element={<SellYourCarPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
