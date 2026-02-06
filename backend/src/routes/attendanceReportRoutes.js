const express = require("express");
const router = express.Router();
const { Attendance, Student, Class, Subject } = require("../models");
const auth = require("../middleware/auth");

// =========================
// ATTENDANCE REPORT (FILTERED)
// =========================
// /api/reports/attendance?classId=&studentId=&date=
router.get("/", auth, async (req, res) => {
  try {
    const { classId, studentId, date } = req.query;

    const where = {};
    if (classId) where.ClassId = classId;
    if (studentId) where.StudentId = studentId;
    if (date) where.date = date;

    const attendance = await Attendance.findAll({
      where,
      include: [Student, Class, Subject],
      order: [["date", "DESC"]],
    });

    res.json({ count: attendance.length, attendance });
  } catch (error) {
    res.status(500).json({
      message: "Error generating attendance report",
      error: error.message,
    });
  }
});

module.exports = router;
