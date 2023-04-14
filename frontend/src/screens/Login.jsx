import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToken } from "../store/loginSlice";
import { Buffer } from "buffer";
import { storage } from "../utils";

export default function Login({ open, handleClose, login }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await checkLogin();
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = new Buffer(data.login + ":" + data.password).toString(
        "base64"
      );
      await checkLogin(data.login, token);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const checkLogin = async (loginStr, token) => {
    const data = { login: loginStr, token };
    const storageData = await storage.getLoginDataFromStorage();

    if (!loginStr && !token) {
      if (!storageData.login && !storageData.token) {
        return;
      }
      data.login = storageData.login;
      data.token = storageData.token;
    }

    try {
      const loginData = await login(data.token).unwrap();
      if (loginData.status) {
        dispatch(setToken(data));
        if (
          storageData.login !== data.login &&
          storageData.token !== data.token
        ) {
          storage.saveLoginDataToStorage(data.login, data.token);
        }
      } else {
        storage.clearLoginDataFromStorage();
        dispatch(setToken({ login: null, token: null }));
      }
    } catch (err) {
      if (storageData.login && storageData.token) {
        storage.clearLoginDataFromStorage();
        dispatch(setToken({ login: null, token: null }));
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Войти</DialogTitle>
        <DialogContent>
          <Controller
            name="login"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                label="Имя пользователя"
                fullWidth
                variant="standard"
                required
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                label="Пароль"
                type="password"
                fullWidth
                variant="standard"
                required
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button color={"error"} onClick={handleClose}>
            Отмена
          </Button>
          <Button type="submit">Войти</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
