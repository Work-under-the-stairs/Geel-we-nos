const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1️⃣ ميدل وير لحماية الروتس (تأكيد تسجيل الدخول)
const protect = async (req, res, next) => {
  try {
    let token;

    // التأكد إذا كان التوكن مبعوث في الـ Headers بالشكل الصحيح (Bearer Token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // لو مفيش توكن مبعوث
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "أنت غير مسجل دخول، يرجى تسجيل الدخول أولاً للوصول.",
      });
    }

    // 2. التحقق من صحة التوكن (Verify Token)
    // تأكدي إن عندك JWT_SECRET متconfig في ملف الـ .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key-geel-we-nos");

    // 3. التأكد إن اليوزر صاحب التوكن لسه موجود في الداتابيز ومتمسحش
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "اليوزر صاحب هذا التوكن لم يعد موجوداً في النظام.",
      });
    }

    // 4. تمرير بيانات المستخدم للـ Request المكمل للـ Route اللي بعده
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "التوكن غير صحيح أو منتهي الصلاحية، يرجى تسجيل الدخول مجدداً.",
    });
  }
};

// 2️⃣ ميدل وير للتحقق من الصلاحيات (أدمن، كاتب، إلخ)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user جاي جاهز ومضمون من ميدل وير protect اللي بيشتغل قبله علطول
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "ليس لديك الصلاحية للقيام بهذا الإجراء على الموقع.",
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };