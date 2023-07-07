import Header from "./components/Header";
import Footer from "./components/Footer";
import SellYourCarPage from "./pages/SellYourCarPage";
import CarsForSalePage from "./pages/CarsForSalePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import UserPanelPage from "./pages/UserPanelPage";
import Login from "./components/Login";
import Register from "./components/Register";
import YourCarsPage from "./pages/YourCarsPage";
import UserOptionsPage from "./pages/UserOptionsPage";
import { Route, Routes, useHref } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUser, resetCars, resetPage } from "./store";

function App() {
  const dispatch = useDispatch();
  const href = useHref();

  useEffect(() => {
    dispatch(resetCars());
    dispatch(resetPage());
  }, [href]);
  useEffect(() => {
    dispatch(checkUser());
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="cars-for-sale" element={<CarsForSalePage />} />
          <Route path="sell-your-car" element={<SellYourCarPage />} />
          <Route path="menu" element={<MenuPage />}>
            <Route path="panel" element={<UserPanelPage />}>
              <Route path="your-cars" element={<YourCarsPage />} />
              <Route path="options" element={<UserOptionsPage />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
