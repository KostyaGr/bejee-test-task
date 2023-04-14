import { isRejected, isFulfilled } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const queryToastifier = () => (next) => (action) => {
  const isSuccess = isFulfilled(action);
  const isRej = isRejected(action);

  if (action && action.payload && action.meta && action.meta.arg) {
    const { endpointName } = action.meta.arg;
    const code = action.payload.data.code || action.payload.code;

    switch (endpointName) {
      case "login": {
        if (code === 401 && isRej) {
          toast("Неверная пара логин/пароль");
        }
        if (code === 200 && isSuccess) {
          toast("Успешный вход");
        }
        break;
      }
      case "getTodoList": {
        break;
      }
      default: {
        if (code === 500 || (code === 400 && isRej)) {
          toast("Что-то пошло не так");
        }
        if (code === 200 && isSuccess) {
          toast("Успешно");
        }
        break;
      }
    }
  }

  return next(action);
};

export default queryToastifier;
