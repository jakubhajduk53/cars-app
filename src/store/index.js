import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  changeSearchTerm,
  addCar,
  fetchCars,
} from "./slices/carsSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export { store, changeSearchTerm, addCar, fetchCars };
