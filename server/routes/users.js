const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .sort("-registration_date")
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments();
    res.json({ total, page: Number(page), users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register-db", async (req, res) => {
  try {
    const { firebaseUid, username, email, name, avatar } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ message: "البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل." });
    }

    const user = await User.create({
      firebaseUid,
      username,
      email,
      name,
      avatar: avatar || "",
      role: "user",
    });

    const userObj = user.toObject();
    res.status(201).json(userObj);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/me/:uid", async (req, res) => {
  try {
    // نبحث في MongoDB عن المستخدم الذي يملك هذا الـ firebaseUid
    const user = await User.findOne({ firebaseUid: req.params.uid });
    
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود في قاعدة البيانات" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH /api/users/:id
router.patch("/:id", async (req, res) => {
  try {
    const allowed = ["name", "avatar", "email", "role"];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/users/:id/password
router.patch("/:id/password", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const { currentPassword, newPassword } = req.body;
    if (!(await user.comparePassword(currentPassword)))
      return res.status(401).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// POST /api/users
router.post("/add", async (req, res) => {
  try {
    const { username, password, email, name, avatar, role } = req.body;
    const user = await User.create({ username, password, email, name, avatar, role });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;