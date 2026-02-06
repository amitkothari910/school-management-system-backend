const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// =========================
// UPDATE STUDENT (ADMIN)
// =========================
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rollNumber, className } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.update({
      name: name ?? student.name,
      email: email ?? student.email,
      rollNumber: rollNumber ?? student.rollNumber,
      className: className ?? student.className,
    });

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
});


router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { name, email, rollNumber, className } = req.body;

    if (!name || !email || !rollNumber || !className) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.create({
      name,
      email,
      rollNumber,
      className,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
});

// =========================
// ROLE CHECK (ADMIN / TEACHER)
// =========================
const allowAdminOrTeacher = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "teacher") {
    return next();
  }
  return res.status(403).json({ message: "Access denied 🚫" });
};

// =========================
// GET STUDENTS (ADMIN / TEACHER)
// =========================
router.get("/", auth, allowAdminOrTeacher, async (req, res) => {
  try {
    const students = await Student.findAll();

    res.status(200).json({
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
});

// 🔥 THIS LINE WAS MISSING

// =========================
// DELETE STUDENT (ADMIN)
// =========================
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
});

module.exports = router;
