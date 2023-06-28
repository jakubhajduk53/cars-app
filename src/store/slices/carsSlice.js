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
    currentPage: 1,
    currentPageIndex: 0,
    firstItemOnPage: 0,
    lastItemOnPage: 5,
    itemsPerPage: 6,
    totalPages: 0,
    searchTerm: "",
    loading: false,
    error: null,
  },
  reducers: {
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
    changePage(state, action) {
      state.currentPage = action.payload;
      state.currentPageIndex = state.currentPage - 1;
      state.firstItemOnPage = state.currentPageIndex * state.itemsPerPage;
      state.lastItemOnPage =
        state.currentPageIndex * state.itemsPerPage + state.itemsPerPage - 1;
    },
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmountOfCars.fulfilled, (state, action) => {
        state.carsAmount = action.payload;
        state.totalPages = Math.ceil(state.carsAmount / state.itemsPerPage);
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

export const { changePage, addCar, changeSearchTerm } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
