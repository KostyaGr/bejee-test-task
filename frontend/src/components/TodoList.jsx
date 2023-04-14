import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Todo, Sort } from "./";

export default function TodoList({
  todoList,
  pagination,
  handlePagination,
  sorting,
  setSorting,
  user,
  completeTodo,
  handleOpenEditScreen,
}) {
  return (
    <>
      <Sort sorting={sorting} setSorting={setSorting}></Sort>
      {todoList.map((todo) => (
        <Todo
          handleOpenEditScreen={handleOpenEditScreen}
          completeTodo={completeTodo}
          user={user}
          key={todo.id}
          {...todo}
        ></Todo>
      ))}
      {pagination.pagesCount > 1 && (
        <Stack spacing={2}>
          <Pagination
            count={pagination.pagesCount}
            onChange={handlePagination}
          />
        </Stack>
      )}
    </>
  );
}
