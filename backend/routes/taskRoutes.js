const express = require("express");
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

// Get all tasks
router.get("/", getTasks);

// Add Task route
router.post("/", addTask);

// Update task
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;
