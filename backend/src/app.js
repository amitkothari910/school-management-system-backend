const express = require("express");
const app = express();

// middleware
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("School Management System Backend is running 🚀");
});

module.exports = app;
