import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  addCar,
  fetchCars,
  fetchAmountOfCars,
  reset,
} from "./slices/carsSlice";
import { changePage, pageReducer, changeSearchTerm } from "./slices/pageSlice";

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
