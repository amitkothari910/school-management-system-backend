const express = require("express");
const router = express.Router();

const { Timetable, Class, Subject, Teacher } = require("../models");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// =========================
// CREATE TIMETABLE (ADMIN)
// =========================
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { day, startTime, endTime, classId, subjectId, teacherId } = req.body;

    if (!day || !startTime || !endTime || !classId || !subjectId || !teacherId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const timetable = await Timetable.create({
      day,
      startTime,
      endTime,
      ClassId: classId,
      SubjectId: subjectId,
      TeacherId: teacherId,
    });

    res.status(201).json({
      message: "Timetable slot created",
      timetable,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating timetable",
      error: error.message,
    });
  }
});

// =========================
// GET TIMETABLE (ADMIN / TEACHER)
// =========================
router.get("/", auth, async (req, res) => {
  try {
    const timetable = await Timetable.findAll({
      include: [Class, Subject, Teacher],
      order: [["day", "ASC"], ["startTime", "ASC"]],
    });

    res.status(200).json({ timetable });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching timetable",
      error: error.message,
    });
  }
});

// =========================
// DELETE TIMETABLE SLOT (ADMIN)
// =========================
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const slot = await Timetable.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: "Timetable slot not found" });
    }

    await slot.destroy();
    res.json({ message: "Timetable slot deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting timetable",
      error: error.message,
    });
  }
});

module.exports = router;
