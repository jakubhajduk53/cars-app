import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  addCar,
  changePage,
  fetchCars,
  changeSearchTerm,
} from "./slices/carsSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export { store, addCar, changePage, fetchCars, changeSearchTerm };
