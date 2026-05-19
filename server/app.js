require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// ─── DB Connection ─────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => { console.error("❌ MongoDB error:", err); process.exit(1); });

// ─── Routes ────────────────────────────────────────────────────────
app.use("/api/news",       require("./routes/news"));
app.use("/api/users",      require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/news", require("./routes/commentRoutes"));


// ─── Global error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));