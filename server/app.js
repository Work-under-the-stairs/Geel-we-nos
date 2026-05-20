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
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
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
      bufferCommands: false, 
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Atlas connected successfully 🌍");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

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

    // التأكد من وجود المفتاح السري قبل التشفير
    if (!privateKey) {
      return res.status(500).json({ message: "ImageKit private key is missing in environment variables" });
    }

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
// ✅ IMAGEKIT DELETE ROUTE (النسخة الحديثة المتوافقة مع Vercel)
// ==========================================
app.delete("/api/imagekit/delete/:fileId", async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).json({ message: "معرف الملف (fileId) مطلوب" });
  }

  try {
    // الـ SDK يدعم الـ Promises تلقائياً باستخدام async/await دون الحاجة لـ Callback يدوية
    const result = await imagekit.deleteFile(fileId);
    
    console.log("✅ ImageKit Delete Success:", result);
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

// 💡 تشغيل الـ listen فقط عند التطوير المحلي (Local)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
}

module.exports = app;