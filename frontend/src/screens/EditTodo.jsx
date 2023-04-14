import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

export default function EditTodo({
  handleClose,
  open,
  todoId,
  text,
  editTodo,
}) {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const onSubmit = (data) => {
    editTodo({ text: data.text, todoId });
    handleClose();
    reset();
  };
  useEffect(() => {
    setValue("text", text);
  }, [text]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Изменить задачу</DialogTitle>
        <DialogContent>
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
          <Button type="submit">Изменить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
