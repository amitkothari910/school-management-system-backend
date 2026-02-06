const express = require("express");
const app = express();

// middleware
app.use(express.json());

// 🔥 HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// routes
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const attendanceReportRoutes = require("./routes/attendanceReportRoutes");
const resultReportRoutes = require("./routes/resultReportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/reports/attendance", attendanceReportRoutes);
app.use("/api/reports/results", resultReportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dashboard/admin", adminDashboardRoutes);


// test route
app.get("/", (req, res) => {
  res.send("School Management System Backend is running 🚀");
});

module.exports = app;
