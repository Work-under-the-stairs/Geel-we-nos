const admin = require("firebase-admin");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "أنت غير مسجل دخول، يرجى تسجيل الدخول أولاً للوصول.",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    const currentUser = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "المستخدم غير موجود في النظام.",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      status: "fail",
      message: "التوكن غير صالح أو منتهي الصلاحية، يرجى تسجيل الدخول مجدداً.",
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "ليس لديك الصلاحية للقيام بهذا الإجراء على الموقع.",
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };