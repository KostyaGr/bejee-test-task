import React, { useMemo, useState, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { todoApi } from "../services";
import { TodoList } from "../components";
import { AddTodo, Login, EditTodo } from "./";
import { selectCurrentUser, selectCurrentToken } from "../store/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../utils";
import { setToken } from "../store/loginSlice";
import { useMethodWithAuthorization } from "../hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const {
  useGetTodoListQuery,
  useAddTodoMutation,
  useLoginMutation,
  useCompleteTodoMutation,
  useEditTodoMutation,
} = todoApi;

const mainBoxStyle = {
  position: "relative",
  height: "100vh",
};

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function Main() {
  const [addTodoScreenState, setAddTodoScreenState] = useState(false);
  const [editTodoScreenState, setEditTodoScreenState] = useState({
    open: false,
    text: "",
    todoId: "",
  });
  const [loginScreenState, setLoginScreenState] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState({
    sortField: "createdAt",
    sort: "desc",
  });

  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const { data, error, isLoading, refetch } = useGetTodoListQuery({
    page: currentPage,
    ...sorting,
  });

  const [addTodo] = useAddTodoMutation();
  const [login] = useLoginMutation();
  const [complete] = useCompleteTodoMutation();
  const [edit] = useEditTodoMutation();

  useEffect(() => {
    refetch();
  }, [currentPage, sorting]);

  const dataIsFetched = useMemo(
    () => data && data.status && !error && !isLoading,
    [data, error, isLoading]
  );

  const handlePagination = (event, value) => {
    setCurrentPage(value - 1);
  };

  const handleOpenAddTodoScreen = () => setAddTodoScreenState(true);
  const handleCloseAddTodoScreen = () => setAddTodoScreenState(false);
  const handleOpenLoginScreen = () => setLoginScreenState(true);
  const handleCloseLoginScreen = () => setLoginScreenState(false);
  const handleLogout = () => {
    storage.clearLoginDataFromStorage();
    dispatch(setToken({ login: null, token: null }));
  };
  const handleOpenEditScreen = (text, todoId) =>
    setEditTodoScreenState({
      open: true,
      text,
      todoId,
    });
  const handleCloseEditScreen = () =>
    setEditTodoScreenState({
      open: false,
      text: "",
      todoId: "",
    });

  const completeTodo = useMethodWithAuthorization(complete);
  const editTodo = useMethodWithAuthorization(edit);

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo list
            </Typography>
            {!user && (
              <Button onClick={handleOpenLoginScreen} color="inherit">
                Войти
              </Button>
            )}
            {user && (
              <>
                <Typography variant="caption" component="div">
                  Вы вошли как {user}
                </Typography>
                <Button onClick={handleLogout} color="inherit">
                  Выйти
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        {dataIsFetched && (
          <TodoList
            todoList={data.data.todoList}
            pagination={data.data.pagination}
            handlePagination={handlePagination}
            sorting={sorting}
            setSorting={setSorting}
            user={user}
            completeTodo={completeTodo}
            handleOpenEditScreen={handleOpenEditScreen}
          ></TodoList>
        )}
      </Box>
      <Login
        handleClose={handleCloseLoginScreen}
        open={loginScreenState}
        login={login}
      />
      <AddTodo
        open={addTodoScreenState}
        handleClose={handleCloseAddTodoScreen}
        addTodo={addTodo}
      />
      <EditTodo
        {...editTodoScreenState}
        handleClose={handleCloseEditScreen}
        editTodo={editTodo}
      />
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Tooltip title="Добавить задачу">
          <Fab
            sx={fabStyle}
            color="primary"
            aria-label="add"
            onClick={handleOpenAddTodoScreen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <ToastContainer position="bottom-left" />
    </Box>
  );
}
