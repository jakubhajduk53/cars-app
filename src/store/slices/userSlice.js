import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const { user, error } = await supabase.auth.session();
  if (error) {
    throw new Error(error.message);
  } else {
    return user;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
