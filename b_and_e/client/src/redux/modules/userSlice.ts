import { createSlice } from "@reduxjs/toolkit";

export interface user {
  isLogin: boolean;
  accessToken: string;
  // userInfo: {
  //   id?: number;
  //   email?: string;
  // }
};
const initialState: user = {
  isLogin: false,
  accessToken: '',
};
const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      console.log(action);
    },
    logout: state => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;