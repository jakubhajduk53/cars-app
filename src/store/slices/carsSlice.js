import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

// Async thunk do pobierania danych samochodów
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const { data: cars, error } = await supabase.from("cars").select("*");
  return cars;
});

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerm: "",
    carsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addCar(state, action) {
      state.carsList.push({
        id: action.payload.id,
        name: action.payload.name,
        year_of_production: action.payload.year_of_production,
        price: action.payload.price,
        location: action.payload.location,
        image_url: action.payload.image_url,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.carsList = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { changeSearchTerm, addCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
