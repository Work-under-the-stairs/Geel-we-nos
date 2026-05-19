const fs = require("fs");
const path = require("path");
const express = require("express"); // 1. تعريفه في البداية
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express(); // 2. إنشاء app أولاً

// 3. الآن استخدمي الـ middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// ─── الفحص التلقائي لملف .env ────────────────────────────────────────
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  const defaultEnvContent = `PORT=5000
MONGO_URI=mongodb://jeelwenos_db_user:g4q43UFfbSYTgrus@ac-wkbjlsw-shard-00-00.iylvrbz.mongodb.net:27017,ac-wkbjlsw-shard-00-01.iylvrbz.mongodb.net:27017,ac-wkbjlsw-shard-00-02.iylvrbz.mongodb.net:27017/?ssl=true&replicaSet=atlas-o7vt8j-shard-0&authSource=admin&appName=jeelwenos
CLOUDINARY_CLOUD_NAME=dtjgjznfi
CLOUDINARY_API_KEY=213111789736113
CLOUDINARY_API_SECRET=oGqqfd4cu38kSyx8sdZNJLwPq8o\n`;
  fs.writeFileSync(envPath, defaultEnvContent, "utf8");
  console.log("⚠️ ملف .env تم إنشاؤه تلقائياً!");
}

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

// ─── Global error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));