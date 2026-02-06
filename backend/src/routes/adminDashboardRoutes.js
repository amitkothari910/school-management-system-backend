const express = require("express");
const router = express.Router();

const {
  Student,
  Teacher,
  Class,
  Subject,
  Attendance,
  Result,
  Timetable,
  Exam,
} = require("../models");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// =========================
// ADMIN DASHBOARD
// =========================
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    // =========================
    // BASIC COUNTS
    // =========================
    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      totalSubjects,
    ] = await Promise.all([
      Student.count(),
      Teacher.count(),
      Class.count(),
      Subject.count(),
    ]);

    // =========================
    // TODAY STATS
    // =========================
    const today = new Date().toISOString().split("T")[0];

    const todayAttendance = await Attendance.count({
      where: { date: today },
    });

    const resultsEntered = await Result.count();

    const todayTimetable = await Timetable.findAll({
      include: [Class, Subject, Teacher],
    });

    // =========================
    // UPCOMING EXAMS (next 7 days)
    // =========================
    const upcomingExams = await Exam.findAll({
      where: {
        date: {
          $between: [
            today,
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          ],
        },
      },
      include: [Class],
    });

    res.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalSubjects,
      },
      today: {
        attendanceMarked: todayAttendance,
        resultsEntered,
        timetableSlots: todayTimetable.length,
      },
      todayTimetable,
      upcomingExams,
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin dashboard error",
      error: error.message,
    });
  }
});

module.exports = router;
