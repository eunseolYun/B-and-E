import { createSlice } from "@reduxjs/toolkit";

type initial = {
  isLogin: boolean;
};
const initialState: initial = {
  isLogin: false,
};
const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    login: state => {
      state.isLogin = true;
    },
    logout: state => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;