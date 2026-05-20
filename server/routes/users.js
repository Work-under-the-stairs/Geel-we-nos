const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../middleware/authMiddleware"); 
// ==========================================
// User Routes
// ==========================================

// الـ GET Requests
// 1. جلب كل المستخدمين للوحة التحكم (للأدمن فقط)
// router.get("/", isAdmin, userController.getUsers);
router.get("/", protect, restrictTo("admin"), userController.getUsers);

// 2. جلب بيانات المستخدم نفسه عن طريق Firebase UID (لأي مستخدم مسجل الدخول)
router.get("/me/:uid",protect, userController.getUserByFirebaseUid);

router.get("/dashboard",protect, restrictTo("admin"),userController.getDashboardSummary);

router.get("/:id",protect, userController.getUserById);

// ==========================================
// الـ POST Requests
// ==========================================

// 1. تسجيل مستخدم جديد بعد Firebase 
router.post("/register-db", userController.registerDb);

// 2. إضافة مستخدم يدوياً من لوحة التحكم (للأدمن فقط)
router.post("/add", protect, restrictTo("admin"), userController.addUser);

// ==========================================
// الـ PATCH Requests (التحديثات)
// ==========================================

// 1. تحديث بيانات المستخدم (لأي مستخدم مسجل الدخول)
// ملاحظة: لو عايزة الأدمن بس هو اللي يعدل بيانات الناس، ضيفي isAdmin هنا كمان
router.patch("/:id", protect, userController.updateUser);

// 2. تحديث كلمة المرور (للمستخدم نفسه)
router.patch("/:id/password", protect, userController.updatePassword);

// ==========================================
// الـ DELETE Requests
// ==========================================

// 1. حذف مستخدم (للأدمن فقط)
router.delete("/:id", protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;