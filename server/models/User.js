const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // ✅ جديد
    firebaseUid: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    password: {
      type: String,
      required: false,      // ✅ عدّلنا من true لـ false
      default: "",          // ✅ أضفنا default
      select: false,
      // ✅ شلنا minlength لأن Firebase users مش بيبعتوا password
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "writer", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// ✅ عدّلنا الـ pre-save بحيث يتخطى الهاش لو password فاضي
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (!this.password || this.password === "") return next(); // ✅ Firebase users
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);