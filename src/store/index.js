import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  changeSearchTerm,
  addCar,
  importCars,
} from "./slices/carsSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export { store, changeSearchTerm, addCar, importCars };
