const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// =========================
// CREATE TEACHER (ADMIN)
// =========================
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { name, email, subject } = req.body;

    if (!name || !email || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teacher = await Teacher.create({ name, email, subject });

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating teacher",
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
// GET TEACHERS (ADMIN / TEACHER)
// =========================
router.get("/", auth, allowAdminOrTeacher, async (req, res) => {
  try {
    const teachers = await Teacher.findAll();

    res.status(200).json({
      message: "Teachers fetched successfully",
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching teachers",
      error: error.message,
    });
  }
});

// =========================
// UPDATE TEACHER (ADMIN)
// =========================
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject } = req.body;

    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await teacher.update({
      name: name ?? teacher.name,
      email: email ?? teacher.email,
      subject: subject ?? teacher.subject,
    });

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating teacher",
      error: error.message,
    });
  }
});

// =========================
// DELETE TEACHER (ADMIN)
// =========================
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await teacher.destroy();

    res.status(200).json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting teacher",
      error: error.message,
    });
  }
});

module.exports = router;
