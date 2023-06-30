import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  addCar,
  fetchCars,
  fetchAmountOfCars,
  resetCars,
  changeSelectedCar,
} from "./slices/carsSlice";
import {
  changePage,
  pageReducer,
  changeSearchTerm,
  resetPage,
} from "./slices/pageSlice";

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
  resetCars,
  resetPage,
  changeSelectedCar,
};
