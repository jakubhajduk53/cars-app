import { createSlice } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerm: "",
    carsList: [],
    carsToAdd: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addCar(state, action) {
      state.carsToAdd.push({
        name: action.payload.name,
        year_of_production: action.payload.year_of_production,
        price: action.payload.price,
        location: action.payload.location,
        image_url: action.payload.image_url,
      });
    },
    importCars(state, action) {
      state.carsList.push(action.payload);
    },
  },
});

export const { changeSearchTerm, addCar, importCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
