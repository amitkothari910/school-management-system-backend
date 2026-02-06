const express = require("express");
const router = express.Router();
const { Class } = require("../models");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// CREATE CLASS (ADMIN)
router.post("/", auth, adminOnly, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Class name required" });
  const cls = await Class.create({ name });
  res.status(201).json({ message: "Class created", class: cls });
});

// GET CLASSES (ADMIN / TEACHER)
router.get("/", auth, async (req, res) => {
  const classes = await Class.findAll();
  res.json({ classes });
});

// UPDATE CLASS (ADMIN)
router.put("/:id", auth, adminOnly, async (req, res) => {
  const cls = await Class.findByPk(req.params.id);
  if (!cls) return res.status(404).json({ message: "Class not found" });
  await cls.update({ name: req.body.name ?? cls.name });
  res.json({ message: "Class updated", class: cls });
});

// DELETE CLASS (ADMIN)
router.delete("/:id", auth, adminOnly, async (req, res) => {
  const cls = await Class.findByPk(req.params.id);
  if (!cls) return res.status(404).json({ message: "Class not found" });
  await cls.destroy();
  res.json({ message: "Class deleted" });
});

module.exports = router;
