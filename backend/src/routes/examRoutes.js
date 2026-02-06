const express = require("express");
const router = express.Router();
const { Exam, Class } = require("../models");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// CREATE EXAM (ADMIN)
router.post("/", auth, adminOnly, async (req, res) => {
  const { name, date, classId } = req.body;
  if (!name || !date || !classId)
    return res.status(400).json({ message: "All fields required" });

  const exam = await Exam.create({ name, date, ClassId: classId });
  res.status(201).json({ message: "Exam created", exam });
});

// GET EXAMS (ADMIN / TEACHER)
router.get("/", auth, async (req, res) => {
  const exams = await Exam.findAll({ include: [Class] });
  res.json({ exams });
});

// UPDATE EXAM (ADMIN)
router.put("/:id", auth, adminOnly, async (req, res) => {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).json({ message: "Exam not found" });

  await exam.update({
    name: req.body.name ?? exam.name,
    date: req.body.date ?? exam.date,
  });

  res.json({ message: "Exam updated", exam });
});

// DELETE EXAM (ADMIN)
router.delete("/:id", auth, adminOnly, async (req, res) => {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).json({ message: "Exam not found" });

  await exam.destroy();
  res.json({ message: "Exam deleted" });
});

module.exports = router;
