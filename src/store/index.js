import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  changeSearchTerm,
  addCar,
  importCars,
} from "./slices/carsSlice";
import { formReducer, updateForm } from "./slices/formSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    form: formReducer,
  },
});

export { store, changeSearchTerm, addCar, importCars, updateForm };
