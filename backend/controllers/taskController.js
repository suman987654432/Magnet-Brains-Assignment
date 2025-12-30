const Task = require("../models/taskModel");

// GET all tasks for a specific user
exports.getAllTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }
    
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// CREATE new task
exports.createTask = async (req, res) => {
  try {
    const { userId, title, description, priority, status, dueDate } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }
    
    const task = new Task({
      userId,
      title,
      description,
      priority: priority || "Low",
      status: status || "To-Do",
      dueDate,
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    // Update task
    Object.assign(task, updates);
    await task.save();
    
    res.json(task);
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
