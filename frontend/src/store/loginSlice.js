import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "login",
  initialState: { token: null, login: null },
  reducers: {
    setToken: (state, { payload: { token, login } }) => {
      state.token = token;
      state.login = login;
    },
  },
});

export const { setToken } = slice.actions;
export default slice.reducer;
export const selectCurrentUser = (state) => state.loginReducer.login;
export const selectCurrentToken = (state) => state.loginReducer.token;
