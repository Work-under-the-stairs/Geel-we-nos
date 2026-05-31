require("dotenv").config();
require("./config/firebaseAdmin"); 

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ImageKit } = require("imagekit"); 
const crypto = require("crypto");

const app = express();

// ─── CORS CONFIG ──────────────────────────────────────────────────
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

// ─── MONGODB CONNECTION ───────────────────────────────────────────
// تم تعديل هذا الجزء لحفظ الـ Promise لمنع محاولات الاتصال المتكررة في نفس المايكروثانية
let databasePromise = null;

const connectDB = async () => {
  // 1. إذا كان الاتصال قائماً بالفعل، اخرج فوراً
  if (mongoose.connection.readyState === 1) return;

  // 2. إذا كان هناك اتصال قيد التنفيذ الآن، انتظر نفس الوعد ولا تفتح اتصالاً جديداً
  if (!databasePromise) {
    databasePromise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: true, // تفعيلها يحمي الاستعلامات المتزامنة من السقوط الفوري
    });
  }

  try {
    await databasePromise;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    databasePromise = null; // إعادة التعيين في حالة الفشل لكي يحاول مجدداً مع الطلب القادم
    console.error("❌ MongoDB Error:", err);
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

// ─── IMAGEKIT INSTANCE FUNCTION ──────────────────────────────────
const getExpressImageKitInstance = () => {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
    throw new Error("Missing ImageKit Environment Variables!");
  }
  return new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
};

// ─── IMAGEKIT AUTH ROUTE ──────────────────────────────────────────
app.get("/api/imagekit/auth", (req, res) => {
  try {
    const token = req.query.token || crypto.randomUUID();
    const expire = req.query.expire || Math.floor(Date.now() / 1000) + 30 * 60;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return res.status(500).json({ message: "ImageKit private key missing" });
    }

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    res.json({ token, expire, signature });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    res.status(500).json({ message: "ImageKit auth failed" });
  }
});

// ─── IMAGEKIT DELETE ROUTE ────────────────────────────────────────
app.delete("/api/imagekit/delete/:fileId", async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).json({ message: "معرف الملف (fileId) مطلوب" });
  }

  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return res.status(500).json({ message: "المفتاح السري لـ ImageKit مفقود" });
    }

    // تشفير الـ Private Key باستخدام Base64
    const authToken = Buffer.from(privateKey + ":").toString("base64");

    // ✅ تم تصحيح الرابط المباشر هنا وحذف localhost:5000 الخطأ
    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });

    if (response.status === 204 || response.ok) {
      console.log(`✅ ImageKit Direct Delete Success for file: ${fileId}`);
      return res.json({ success: true, message: "تم حذف الملف بنجاح" });
    }

    const errorData = await response.json().catch(() => ({}));
    console.error("❌ ImageKit API responded with error:", errorData);
    
    return res.status(response.status || 500).json({
      message: "فشل حذف الملف من السيرفر السحابي لـ ImageKit",
      error: errorData,
    });

  } catch (error) {
    console.error("❌ [ImageKit Direct API Error]:", error);
    return res.status(500).json({
      message: "فشل غير متوقع أثناء معالجة طلب الحذف",
      error: error.message || error,
    });
  }
});

// ─── ROUTES & ERROR HANDLER ───────────────────────────────────────
app.use("/api/news",       require("./routes/news"));
app.use("/api/users",      require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/news",       require("./routes/commentRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;