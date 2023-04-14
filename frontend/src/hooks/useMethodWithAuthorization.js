import React from "react";
import { useDispatch } from "react-redux";
import { storage } from "../utils";
import { setToken } from "../store/loginSlice";

export default function useMethodWithAuthorization(callback) {
  const dispatch = useDispatch();
  return async (data) => {
    const { token } = await storage.getLoginDataFromStorage();
    if (token) {
      callback({ token, data });
    } else {
      dispatch(setToken({ login: null, token: null }));
    }
  };
}
