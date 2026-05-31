const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


const { protect, restrictTo } = require("../middleware/authMiddleware"); 


// ==========================================
// User Routes
// ==========================================

// الـ GET Requests
// 1. جلب كل المستخدمين للوحة التحكم (للأدمن فقط)
router.get("/me", protect, async (req, res) => {
    try {
        // req.user يأتي من الـ middleware بعد التحقق من Firebase
        const user = await require("../models/User").findOne({ firebaseUid: req.user.uid });
        if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/", protect, restrictTo("admin"), userController.getUsers);

// 2. جلب بيانات المستخدم نفسه عن طريق Firebase UID (لأي مستخدم مسجل الدخول)
 // أضيفي الميدلوير protect هنا للتأكد من وجود بيانات المستخدم
router.get("/me/:uid", protect, userController.getUserByFirebaseUid);

router.get("/dashboard", userController.getDashboardSummary);

// 3. جلب بيانات مستخدم محدد
router.get("/:id", protect, restrictTo("admin"), userController.getUserById);

// ==========================================
// الـ POST Requests
// ==========================================

// 1. تسجيل مستخدم جديد بعد Firebase 
// (بدون ميدلوير لأن المستخدم لسه بيعمل الحساب ومعهوش صلاحيات)
router.post("/register-db", userController.registerDb);

// 2. إضافة مستخدم يدوياً من لوحة التحكم (للأدمن فقط)
router.post("/add", protect, restrictTo("admin"), userController.addUser);

// ==========================================
// الـ PATCH Requests (التحديثات)
// ==========================================

// 1. تحديث بيانات المستخدم (لأي مستخدم مسجل الدخول)
// ملاحظة: لو عايزة الأدمن بس هو اللي يعدل بيانات الناس، ضيفي isAdmin هنا كمان
router.patch("/:id", protect, restrictTo("admin"), userController.updateUser);

// 2. تحديث كلمة المرور (للمستخدم نفسه)
router.patch("/:id/password", userController.updatePassword);

// ==========================================
// الـ DELETE Requests
// ==========================================

// 1. حذف مستخدم (للأدمن فقط)
router.delete("/:id", protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;