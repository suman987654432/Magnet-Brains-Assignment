const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());

/* ---------- Routes ---------- */
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

/* ---------- DB Connection ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

/* ---------- Test Route ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
