import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // loading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    //logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
