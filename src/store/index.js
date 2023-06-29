import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  addCar,
  fetchCars,
  fetchAmountOfCars,
  changeSearchTerm,
  reset,
} from "./slices/carsSlice";
import { changePage, pageReducer } from "./slices/pageSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    page: pageReducer,
  },
});

export {
  store,
  addCar,
  changePage,
  fetchCars,
  fetchAmountOfCars,
  changeSearchTerm,
  reset,
};
