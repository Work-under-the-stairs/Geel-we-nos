const admin = require("firebase-admin");
const User = require("../models/User");

// 1️⃣ ميدل وير لحماية الروتس (تأكيد تسجيل الدخول)
const protect = async (req, res, next) => {
  try {
    let token;

    // استخراج التوكين من الهيدر (Bearer Token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // إذا لم يوجد توكن
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "أنت غير مسجل دخول، يرجى تسجيل الدخول أولاً للوصول.",
      });
    }

    // التحقق من التوكين عبر Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // البحث عن المستخدم في MongoDB باستخدام الـ uid القادم من Firebase
    // تأكدي أن الـ User schema يحتوي على حقل firebaseUid
    const currentUser = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "المستخدم غير موجود في النظام.",
      });
    }

    // تمرير بيانات المستخدم للـ Request لاستخدامها لاحقاً في الـ Controllers
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

// 2️⃣ ميدل وير للتحقق من الصلاحيات (أدمن، كاتب، إلخ)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user مضمون هنا بفضل ميدل وير protect الذي يعمل قبله
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