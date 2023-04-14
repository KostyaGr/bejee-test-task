import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodoList: builder.query({
      query: ({ page = 0, sortField = "createdAt", sort = "desc" }) =>
        `todo?page=${page}&sortField=${sortField}&sort=${sort}`,
      providesTags: (result) => {
        return result
          ? [
              ...result.data.todoList.map(({ id }) => ({ type: "todo", id })),
              { type: "todo", id: "LIST" },
            ]
          : [{ type: "todo", id: "LIST" }];
      },
    }),
    addTodo: builder.mutation({
      query: (body) => ({
        url: `todo`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "todo", id: "LIST" }],
    }),
    editTodo: builder.mutation({
      query: ({ data, token }) => ({
        url: `todo/edit/${data.todoId}`,
        method: "PUT",
        headers: {
          Authorization: "Basic " + token,
        },
        body: { text: data.text },
      }),
      invalidatesTags: [{ type: "todo", id: "LIST" }],
    }),
    completeTodo: builder.mutation({
      query: ({ data, token }) => ({
        url: `todo/complete/${data}`,
        method: "PUT",
        headers: {
          Authorization: "Basic " + token,
        },
      }),
      invalidatesTags: [{ type: "todo", id: "LIST" }],
    }),

    login: builder.mutation({
      query: (token) => ({
        url: "login",
        headers: {
          Authorization: "Basic " + token,
        },
      }),
    }),
  }),
});

export default todoApi;
