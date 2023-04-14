import { configureStore } from "@reduxjs/toolkit";
import { todoApi, queryToastifier } from "../services";
import loginReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware).concat(queryToastifier),
});

export default store;
