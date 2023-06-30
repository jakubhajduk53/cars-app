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
      .ilike("name", `%${term}%`)
      .order("id", { ascending: true });
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
    selectedCar: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetCars(state, action) {
      state.carsList = [];
      state.carsAmount = 0;
      state.selectedCar = {};
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
    changeSelectedCar(state, action) {
      state.selectedCar = {
        id: action.payload.id,
        name: action.payload.name,
        year_of_production: action.payload.year_of_production,
        price: action.payload.price,
        location: action.payload.location,
        image_url: action.payload.image_url,
      };
      console.log(state.selectedCar);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmountOfCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmountOfCars.fulfilled, (state, action) => {
        state.loading = false;
        state.carsAmount = action.payload;
      })
      .addCase(fetchAmountOfCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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

export const { addCar, resetCars, changeSelectedCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
