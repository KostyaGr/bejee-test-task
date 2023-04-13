import basicAuth from "express-basic-auth";
import { getResponse } from "./";

const authorizeMiddleware = () =>
  basicAuth({
    users: { admin: "123" },
    unauthorizedResponse: getResponse({
      status: false,
      code: 401,
      message: "Unauthorized",
    }),
  });

export default authorizeMiddleware;
