const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// استدعاء الميدلويرز
const isAdmin = require("../middleware/isAdmin");

// ==========================================
// User Routes
// ==========================================

// الـ GET Requests
// 1. جلب كل المستخدمين للوحة التحكم (للأدمن فقط)
router.get("/", isAdmin, userController.getUsers);

// 2. جلب بيانات المستخدم نفسه عن طريق Firebase UID (لأي مستخدم مسجل الدخول)
router.get("/me/:uid", userController.getUserByFirebaseUid);

// 3. جلب بيانات مستخدم محدد (للأدمن فقط عشان الخصوصية)
router.get("/:id", isAdmin, userController.getUserById);

// ==========================================
// الـ POST Requests
// ==========================================

// 1. تسجيل مستخدم جديد بعد Firebase 
// (بدون ميدلوير لأن المستخدم لسه بيعمل الحساب ومعهوش صلاحيات)
router.post("/register-db", userController.registerDb);

// 2. إضافة مستخدم يدوياً من لوحة التحكم (للأدمن فقط)
router.post("/add", isAdmin, userController.addUser);

// ==========================================
// الـ PATCH Requests (التحديثات)
// ==========================================

// 1. تحديث بيانات المستخدم (لأي مستخدم مسجل الدخول)
// ملاحظة: لو عايزة الأدمن بس هو اللي يعدل بيانات الناس، ضيفي isAdmin هنا كمان
router.patch("/:id", userController.updateUser);

// 2. تحديث كلمة المرور (للمستخدم نفسه)
router.patch("/:id/password", userController.updatePassword);

// ==========================================
// الـ DELETE Requests
// ==========================================

// 1. حذف مستخدم (للأدمن فقط)
router.delete("/:id", isAdmin, userController.deleteUser);

module.exports = router;