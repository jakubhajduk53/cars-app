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

export const fetchAmountOfYourCars = createAsyncThunk(
  "cars/fetchAmountOfYourCars",
  async ({ userId }) => {
    const { count: amount, error } = await supabase
      .from("cars")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", `${userId}`);
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

export const fetchYourCars = createAsyncThunk(
  "cars/fetchYourCars",
  async ({ first, last, userId }) => {
    const { data: cars, error } = await supabase
      .from("cars")
      .select("*")
      .eq("owner_id", `${userId}`)
      .range(first, last)
      .order("id", { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    return cars;
  }
);

export const deleteYourCar = createAsyncThunk(
  "cars/deleteYourCar",
  async ({ carId }) => {
    const { error } = await supabase.from("cars").delete().eq("id", `${carId}`);
    if (error) {
      throw new Error(error.message);
    }
    return carId;
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    carsList: [],
    carsAmount: 0,
    selectedCar: {},
    isLoaded: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetCars(state) {
      state.carsList = [];
      state.carsAmount = 0;
      state.selectedCar = {};
      state.isLoaded = false;
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
    selectCar(state, action) {
      state.selectedCar = {
        id: action.payload.id,
        name: action.payload.name,
        year_of_production: action.payload.year_of_production,
        price: action.payload.price,
        location: action.payload.location,
        image_url: action.payload.image_url,
      };
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
        state.isLoaded = true;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAmountOfYourCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmountOfYourCars.fulfilled, (state, action) => {
        state.loading = false;
        state.carsAmount = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchAmountOfYourCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchYourCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYourCars.fulfilled, (state, action) => {
        state.loading = false;
        state.carsList = action.payload;
      })
      .addCase(fetchYourCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteYourCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteYourCar.fulfilled, (state, action) => {
        state.loading = false;
        state.carsList = state.carsList.filter((car) => {
          return car.id !== action.payload;
        });
      })
      .addCase(deleteYourCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addCar, resetCars, selectCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
