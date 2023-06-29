import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

export const fetchAmountOfCars = createAsyncThunk(
  "cars/fetchAmountOfCars",
  async ({ term }) => {
    const { count: amount, error } = await supabase
      .from("cars")
      .select("*", { count: "exact", head: true })
      .ilike("name", `%${term}%`);
    if (error) {
      throw new Error(error.message);
    }
    return amount;
  }
);

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ first, last, term }) => {
    const { data: cars, error } = await supabase
      .from("cars")
      .select("*")
      .range(first, last)
      .ilike("name", `%${term}%`);
    if (error) {
      throw new Error(error.message);
    }
    return cars;
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    carsList: [],
    carsAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetCars(state, action) {
      state.carsList = [];
      state.carsAmount = 0;
      state.loading = false;
      state.error = null;
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
      .addCase(fetchAmountOfCars.fulfilled, (state, action) => {
        state.carsAmount = action.payload;
      })
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

export const { addCar, resetCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
