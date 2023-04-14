import express from "express";
import { models } from "../db";
import { getResponse, authorizeMiddleware } from "../utils";

const router = express.Router();

router.get("/", async (req, res) => {
  const {
    sort = "desc",
    sortField = "createdAt",
    limit = 3,
    page = 0,
  } = req.query;

  if (Object.keys(models.Todo.rawAttributes).indexOf(sortField) === -1) {
    res.status(400).json(
      getResponse({
        status: false,
        code: 400,
        message: "sortField is invalid",
      })
    );
    return;
  }
  try {
    const todos = await models.Todo.findAll({
      limit,
      offset: limit * page,
      order: [[sortField, sort]],
    });

    const count = await models.Todo.count();

    res.json(
      getResponse({
        data: {
          todoList: todos,
          pagination: {
            todoCount: count,
            pagesCount: Math.ceil(count / limit),
          },
        },
      })
    );
  } catch (err) {
    res.status(500).json(
      getResponse({
        status: false,
        code: 500,
        data: err,
      })
    );
    return;
  }
});

router.post("/", async (req, res) => {
  const { userName, userEmail, text } = req.body;
  if (!userName || !userEmail || !text) {
    res.status(400).json(
      getResponse({
        status: false,
        code: 400,
        message: "userName, userEmail, text are required params",
      })
    );
    return;
  }
  try {
    const todo = await models.Todo.create({
      userName,
      userEmail,
      text,
    });
    res.json(getResponse({ data: todo }));
  } catch (err) {
    res.status(500).json(
      getResponse({
        status: false,
        code: 500,
        data: err,
      })
    );
    return;
  }
});
router.put("/complete/:todoId", authorizeMiddleware(), async (req, res) => {
  const { todoId } = req.params;

  try {
    await models.Todo.update(
      {
        completed: true,
      },
      {
        where: {
          id: todoId,
        },
      }
    );
    res.json(
      getResponse({
        data: await models.Todo.findOne({
          where: {
            id: todoId,
          },
        }),
      })
    );
  } catch (err) {
    if (err.original.code === "22P02") {
      res.status(404).json(
        getResponse({
          status: false,
          code: 404,
          message: `todo with id ${todoId} not found`,
        })
      );
      return;
    }
    res.status(500).json(
      getResponse({
        status: false,
        code: 500,
        data: err,
      })
    );
    return;
  }
});
router.put("/edit/:todoId", authorizeMiddleware(), async (req, res) => {
  const { todoId } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json(
      getResponse({
        status: false,
        code: 400,
        message: "Text are required param",
      })
    );
    return;
  }

  try {
    await models.Todo.update(
      {
        text,
        editedByAdmin: true,
      },
      {
        where: {
          id: todoId,
        },
      }
    );
    res.json(
      getResponse({
        data: await models.Todo.findOne({
          where: {
            id: todoId,
          },
        }),
      })
    );
  } catch (err) {
    if (err.original.code === "22P02") {
      res.status(404).json(
        getResponse({
          status: false,
          code: 404,
          message: `todo with id ${todoId} not found`,
        })
      );
      return;
    }
    res.status(500).json(
      getResponse({
        status: false,
        code: 500,
        data: err,
      })
    );
    return;
  }
});

export default router;
