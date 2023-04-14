import express from "express";
import logger from "morgan";
import cors from "cors";
import { todoRouter, loginRouter } from "./routes";

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todo", todoRouter);
app.use("/login", loginRouter);

module.exports = app;
