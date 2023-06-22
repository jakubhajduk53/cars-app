import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    data: {
      name: "",
      year_of_production: 0,
      price: 0,
      location: "",
      image_url: "",
    },
  },
  reducers: {
    updateForm: (state, action) => {
      state.data.name = action.payload.name;
      state.data.year_of_production = action.payload.year_of_production;
      state.data.price = action.payload.price;
      state.data.location = action.payload.location;
      state.data.image_url = action.payload.image_url;
    },
  },
});

export const { updateForm } = formSlice.actions;
export const formReducer = formSlice.reducer;
