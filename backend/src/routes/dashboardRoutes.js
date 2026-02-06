const express = require("express");
const router = express.Router();

const {
  Student,
  Teacher,
  Attendance,
  Result,
  Timetable,
  Subject,
  Class,
  Exam,
} = require("../models");

const auth = require("../middleware/auth");

// =========================
// STUDENT DASHBOARD
// =========================
router.get("/student", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    const studentId = req.user.id;

    const attendanceCount = await Attendance.count({
      where: { StudentId: studentId },
    });

    const presentCount = await Attendance.count({
      where: { StudentId: studentId, status: "present" },
    });

    const results = await Result.findAll({
      where: { StudentId: studentId },
      include: [Subject, Exam],
    });

    const timetable = await Timetable.findAll({
      include: [Class, Subject, Teacher],
      limit: 5,
      order: [["day", "ASC"]],
    });

    res.json({
      profile: req.user,
      attendance: {
        total: attendanceCount,
        present: presentCount,
        percentage:
          attendanceCount === 0
            ? 0
            : ((presentCount / attendanceCount) * 100).toFixed(2),
      },
      resultsCount: results.length,
      recentResults: results.slice(0, 5),
      timetable,
    });
  } catch (error) {
    res.status(500).json({
      message: "Student dashboard error",
      error: error.message,
    });
  }
});

// =========================
// TEACHER DASHBOARD
// =========================
router.get("/teacher", auth, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    const teacherId = req.user.id;

    const subjects = await Subject.findAll({
      where: { TeacherId: teacherId },
      include: [Class],
    });

    const attendanceMarked = await Attendance.count({
      where: { TeacherId: teacherId },
    });

    const resultsEntered = await Result.count({
      where: { TeacherId: teacherId },
    });

    const todayTimetable = await Timetable.findAll({
      where: { TeacherId: teacherId },
      include: [Class, Subject],
    });

    res.json({
      profile: req.user,
      subjectsCount: subjects.length,
      subjects,
      attendanceMarked,
      resultsEntered,
      todayTimetable,
    });
  } catch (error) {
    res.status(500).json({
      message: "Teacher dashboard error",
      error: error.message,
    });
  }
});

module.exports = router;
