import { createSlice } from "@reduxjs/toolkit";
import { fetchAmountOfCars } from "../index";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: 1,
    currentPageIndex: 0,
    firstItemOnPage: 0,
    lastItemOnPage: 5,
    itemsPerPage: 6,
    totalPages: 0,
    searchTerm: "",
  },
  reducers: {
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
      state.lastItemOnPage = 5;
      state.itemsPerPage = 6;
      state.totalPages = 0;
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAmountOfCars.fulfilled, (state, action) => {
      state.totalPages = Math.ceil(action.payload / state.itemsPerPage);
    });
  },
});

export const { changePage, changeSearchTerm } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
