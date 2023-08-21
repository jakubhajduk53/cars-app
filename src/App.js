import {
  Header,
  ChangePassword,
  ChangeUserData,
  ChangeEmail,
  Login,
  Register,
} from "./components/";
import SellYourCarPage from "./pages/SellYourCarPage";
import CarsForSalePage from "./pages/CarsForSalePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import UserPanelPage from "./pages/UserPanelPage";
import YourCarsPage from "./pages/YourCarsPage";
import UserOptionsPage from "./pages/UserOptionsPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUser, resetCars, resetPage } from "./store";
import { Route, Routes, useHref } from "react-router-dom";

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
              <Route path="options" element={<UserOptionsPage />}>
                <Route path="change-userdata" element={<ChangeUserData />} />
                <Route path="change-email" element={<ChangeEmail />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
