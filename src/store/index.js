import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  addCar,
  fetchCars,
  fetchAmountOfCars,
  resetCars,
  selectCar,
  fetchAmountOfYourCars,
  fetchYourCars,
  deleteYourCar,
} from "./slices/carsSlice";
import {
  changePage,
  pageReducer,
  changeSearchTerm,
  resetPage,
} from "./slices/pageSlice";
import { userReducer, checkUser, logOut } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    page: pageReducer,
    user: userReducer,
  },
});

export {
  store,
  addCar,
  changePage,
  fetchCars,
  fetchAmountOfCars,
  changeSearchTerm,
  resetCars,
  resetPage,
  selectCar,
  checkUser,
  logOut,
  fetchAmountOfYourCars,
  fetchYourCars,
  deleteYourCar,
};
