const express = require("express");
const router = express.Router();
const { Subject, Class, Teacher } = require("../models");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// CREATE SUBJECT (ADMIN) + ASSIGN
router.post("/", auth, adminOnly, async (req, res) => {
  const { name, classId, teacherId } = req.body;
  if (!name || !classId || !teacherId)
    return res.status(400).json({ message: "name, classId, teacherId required" });

  const subject = await Subject.create({
    name,
    ClassId: classId,
    TeacherId: teacherId,
  });

  res.status(201).json({ message: "Subject created", subject });
});

// GET SUBJECTS (ADMIN / TEACHER)
router.get("/", auth, async (req, res) => {
  const subjects = await Subject.findAll({
    include: [Class, Teacher],
  });
  res.json({ subjects });
});

module.exports = router;
