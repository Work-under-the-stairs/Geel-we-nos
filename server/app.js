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

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// IMAGEKIT DELETE ROUTE (مسار الحذف الفعلي)
// ==========================================
// ==========================================
// IMAGEKIT DELETE ROUTE (مسار الحذف المعدل)
// ==========================================
// ==========================================
// IMAGEKIT DELETE ROUTE (الإصدار الشامل والمقاوم للأخطاء)
// ==========================================
app.delete("/api/imagekit/delete/:fileId", async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).json({ message: "معرف الملف (fileId) مطلوب" });
  }


  try {
    // نغلف دالة الـ SDK بوعد (Promise) لضمان عدم حدوث أي تعليق أو انهيار 500 غير مبرر
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
    // طباعة تفاصيل الخطأ الحقيقية في شاشة السيرفر السفلية (Terminal) لفحصها
    console.error("❌ [ImageKit Error]:", error);
    
    return res.status(500).json({
      message: "فشل حذف الملف من السيرفر السحابي",
      error: error.message || error,
    });
  }
});

// ─── DB Connection ─────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully 🌍"))
  .catch((err) => { 
    console.error("❌ MongoDB connection error:", err); 
    process.exit(1); 
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));