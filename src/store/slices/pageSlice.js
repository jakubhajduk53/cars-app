import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: 1,
    currentPageIndex: 0,
    firstItemOnPage: 0,
    lastItemOnPage: 5,
    itemsPerPage: 6,
    totalPages: 0,
  },
  reducers: {
    changePage(state, action) {
      state.currentPage = action.payload;
      state.currentPageIndex = state.currentPage - 1;
      state.firstItemOnPage = state.currentPageIndex * state.itemsPerPage;
      state.lastItemOnPage =
        state.currentPageIndex * state.itemsPerPage + state.itemsPerPage - 1;
    },
  },
});

export const { changePage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
