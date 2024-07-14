var express = require("express");
var router = express.Router();
const createError = require("http-errors");
const todos = [{ id: 1, name: "utsav", completed: false }];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json(todos);
});

router.get("/:id", function (req, res, next) {
  const todo = todos.find((todo) => {
    return todo.id === Number(req.params.id);
  });
  if (!todo) {
    return next(createError(404, "Not found"));
  }
  res.status(200).json(todo);
});

router.post("/", function (req, res, next) {
  const { body } = req;
  if (typeof body.name !== "string") {
    return next(createError(422, "Validation Error"));
  }
  const newTodo = {
    id: todos.length + 1,
    name: body.name,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
