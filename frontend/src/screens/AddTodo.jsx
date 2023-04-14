import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

export default function AddTodo({ open, handleClose, addTodo }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      userEmail: "",
      text: "",
    },
  });
  const onSubmit = (data) => {
    addTodo(data);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Добавить задачу</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавить задачу введите имя пользователя, e-mail и текст
            задачи.
          </DialogContentText>

          <Controller
            name="userName"
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
            name="userEmail"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                label="E-mail"
                type="email"
                fullWidth
                variant="standard"
                required
                {...field}
              />
            )}
          />
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                label="Текст задачи"
                type="multiline"
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
          <Button type="submit">Добавить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
