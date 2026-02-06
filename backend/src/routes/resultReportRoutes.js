const express = require("express");
const router = express.Router();
const { Result, Student, Subject, Exam, Class } = require("../models");
const auth = require("../middleware/auth");

// =========================
// RESULT REPORT (FILTERED)
// =========================
// /api/reports/results?studentId=&classId=&subjectId=
router.get("/", auth, async (req, res) => {
  try {
    const { studentId, subjectId, classId } = req.query;

    const where = {};
    if (studentId) where.StudentId = studentId;
    if (subjectId) where.SubjectId = subjectId;

    const results = await Result.findAll({
      where,
      include: [
        { model: Student },
        { model: Subject },
        { model: Exam, include: [Class] },
      ],
    });

    // calculate percentage
    const formatted = results.map((r) => {
      const percentage = ((r.marksObtained / r.maxMarks) * 100).toFixed(2);
      return {
        id: r.id,
        student: r.Student?.name,
        subject: r.Subject?.name,
        exam: r.Exam?.name,
        class: r.Exam?.Class?.name,
        marksObtained: r.marksObtained,
        maxMarks: r.maxMarks,
        percentage,
      };
    });

    res.json({ count: formatted.length, results: formatted });
  } catch (error) {
    res.status(500).json({
      message: "Error generating result report",
      error: error.message,
    });
  }
});

module.exports = router;
