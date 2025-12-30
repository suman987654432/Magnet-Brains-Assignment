const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["To-Do", "In-Progress", "Completed"],
      default: "To-Do",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
