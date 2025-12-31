const express = require("express");
const router = express.Router();
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");

// Get all tasks
router.get("/", getAllTasks);

// Add Task route
router.post("/", createTask);

// Update task
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;
