import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const cardStyle = {
  margin: "10px 5px",
};

export default function Todo({
  id,
  userName,
  userEmail,
  text,
  completed,
  user,
  completeTodo,
  handleOpenEditScreen,
  editedByAdmin,
}) {
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {userName} | {userEmail}
        </Typography>
        <Typography variant="h5" component="div">
          {text}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => completeTodo(id)}
              disabled={!user || completed}
              checked={completed}
            />
          }
          label={completed ? "Выполнена" : "Не выполнена"}
        />
      </CardContent>
      {user && (
        <CardActions>
          <Button onClick={() => handleOpenEditScreen(text, id)} size="small">
            Изменить текст задачи
          </Button>
          {editedByAdmin && (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              отредактировано администратором
            </Typography>
          )}
        </CardActions>
      )}
    </Card>
  );
}
