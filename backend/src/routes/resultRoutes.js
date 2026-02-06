const express = require("express");
const router = express.Router();
const { Result, Student, Subject, Exam, Teacher } = require("../models");

const auth = require("../middleware/auth");

// ENTER RESULT (TEACHER / ADMIN)
router.post("/", auth, async (req, res) => {
  if (!["teacher", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const { studentId, subjectId, examId, marksObtained, maxMarks } = req.body;

  if (!studentId || !subjectId || !examId || !marksObtained || !maxMarks) {
    return res.status(400).json({ message: "All fields required" });
  }

  const result = await Result.create({
    StudentId: studentId,
    SubjectId: subjectId,
    ExamId: examId,
    TeacherId: req.user.id,
    marksObtained,
    maxMarks,
  });

  res.status(201).json({ message: "Result added", result });
});

// GET RESULTS (ADMIN / TEACHER)
router.get("/", auth, async (req, res) => {
  const results = await Result.findAll({
    include: [Student, Subject, Exam, Teacher],
  });
  res.json({ results });
});

module.exports = router;
