import express from "express";
import { getResponse, authorizeMiddleware } from "../utils";

const router = express.Router();

router.get("/", authorizeMiddleware(), async (req, res) => {
  res.json(
    getResponse({
      data: {
        user: "admin",
      },
    })
  );
});

export default router;
