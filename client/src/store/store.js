import { createSlice, configureStore } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", isLoggedIn: false, userId:'' },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem('id');
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.clear('id');
      state.userId = '';
    },
  },
});
export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer,
});