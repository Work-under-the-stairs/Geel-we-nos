const User = require("../models/User");

// جلب كل المستخدمين (مع الفلترة والبحث)
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "", role = "" } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } }
      ];
    }

    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query); 

    res.json({ 
      total, 
      page: Number(page), 
      totalPages: Math.ceil(total / limit),
      users 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تسجيل مستخدم جديد من Firebase
exports.registerDb = async (req, res) => {
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
};

// إضافة مستخدم يدوي (عن طريق الأدمن)
exports.addUser = async (req, res) => {
  try {
    const { username, password, email, name, avatar, role } = req.body;
    const user = await User.create({ username, password, email, name, avatar, role });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// جلب مستخدم عن طريق Firebase UID
exports.getUserByFirebaseUid = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.uid });
    
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود في قاعدة البيانات" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// جلب مستخدم عن طريق الـ ID (MongoDB ID)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تحديث بيانات المستخدم
exports.updateUser = async (req, res) => {
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
};

// تحديث كلمة المرور
exports.updatePassword = async (req, res) => {
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
};

// حذف مستخدم
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};