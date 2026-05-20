require("dotenv").config();
// تهيئة Firebase Admin في بداية التطبيق لربطه بالـ Middleware
require("./config/firebaseAdmin"); 

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ImageKit } = require("@imagekit/nodejs");
const crypto = require("crypto");

const app = express();

// 💡 تعديل CORS: السماح بـ localhost أثناء التطوير ونطاق Vercel تلقائياً عند الرفع
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  process.env.FRONTEND_URL // أضف رابط الـ frontend الخاص بك على فيرسيل في المتغيرات البيئية لاحقاً
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // السماح بالطلبات التي ليس لها Origin (مثل تطبيقات الموبايل أو الـ Postman) أو المتواجدة في القائمة
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 💡 إدارة اتصال MONGODB لبيئة SERVERLESS
// ==========================================
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // إيقاف التخزين المؤقت للأوامر لتجنب تعليق الدوال السحابية
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Atlas connected successfully 🌍");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // في بيئة Serverless لا نستخدم process.exit(1) لكي لا نقتل الحاوية بالكامل، بل نترك الخطأ يظهر للدالة
    throw err;
  }
};

// Middleware للتأكد من الاتصال بقاعدة البيانات قبل معالجة أي طلب
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

// =========================
// IMAGEKIT CONFIG
// =========================
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// =========================
// IMAGEKIT AUTH ROUTE
// =========================
app.get("/api/imagekit/auth", (req, res) => {
  try {
    const token = req.query.token || crypto.randomUUID();
    const expire = req.query.expire || Math.floor(Date.now() / 1000) + 30 * 60;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    res.json({
      token,
      expire,
      signature,
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    res.status(500).json({ message: "ImageKit auth failed" });
  }
});

// ==========================================
// IMAGEKIT DELETE ROUTE
// ==========================================
app.delete("/api/imagekit/delete/:fileId", async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).json({ message: "معرف الملف (fileId) مطلوب" });
  }

  try {
    await new Promise((resolve, reject) => {
      imagekit.deleteFile(fileId, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });

    return res.json({ success: true, message: "تم حذف الملف بنجاح من خوادم ImageKit" });

  } catch (error) {
    console.error("❌ [ImageKit Error]:", error);
    return res.status(500).json({
      message: "فشل حذف الملف من السيرفر السحابي",
      error: error.message || error,
    });
  }
});

// ─── Routes ────────────────────────────────────────────────────────
app.use("/api/news",       require("./routes/news"));
app.use("/api/users",      require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/news",       require("./routes/commentRoutes"));

// ─── Global error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// 💡 تعديل البيئة: تشغيل الـ listen فقط عند التطوير المحلي (Local) وليس على Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
}

// تصدير التطبيق ليعامل كـ Serverless Function بواسطة Vercel
module.exports = app;