import { createSlice } from "@reduxjs/toolkit";
import { fetchAmountOfCars } from "../index";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: 1,
    currentPageIndex: 0,
    firstItemOnPage: 0,
    lastItemOnPage: 3,
    itemsPerPage: 4,
    totalPages: 0,
    searchTerm: "",
    loading: false,
    error: null,
  },
  reducers: {
    resetPage(state) {
      state.currentPage = 1;
      state.currentPageIndex = 0;
      state.firstItemOnPage = 0;
      state.lastItemOnPage = 3;
      state.itemsPerPage = 4;
      state.totalPages = 0;
      state.searchTerm = "";
    },
    changePage(state, action) {
      state.currentPage = action.payload;
      state.currentPageIndex = state.currentPage - 1;
      state.firstItemOnPage = state.currentPageIndex * state.itemsPerPage;
      state.lastItemOnPage =
        state.currentPageIndex * state.itemsPerPage + state.itemsPerPage - 1;
    },
    changeSearchTerm(state, action) {
      state.currentPage = 1;
      state.currentPageIndex = 0;
      state.firstItemOnPage = 0;
      state.lastItemOnPage = 3;
      state.itemsPerPage = 4;
      state.totalPages = 0;
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAmountOfCars.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAmountOfCars.fulfilled, (state, action) => {
      state.loading = false;
      state.totalPages = Math.ceil(action.payload / state.itemsPerPage);
    });
    builder.addCase(fetchAmountOfCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { changePage, changeSearchTerm, resetPage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
