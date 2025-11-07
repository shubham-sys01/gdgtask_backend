const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const todo = await Todo.create({ userId: req.user.id, title });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };

