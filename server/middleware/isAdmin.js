// middlewares/isAdmin.js
const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    // 1. التأكد إن فيه بيانات مستخدم مبعوتة من ميدلوير تسجيل الدخول اللي قبله
    // (بافتراض إن الميدلوير اللي قبله بيحفظ الـ ID في req.user.id أو req.user._id)
    if (!req.user) {
      return res.status(401).json({ message: "يرجى تسجيل الدخول أولاً." });
    }

    // 2. هنجيب اليوزر من الداتابيز عشان نتأكد من الرتبة الحالية بتاعته
    // (عشان لو كان أدمن واتسحبت منه الصلاحية، التوكن القديم ميشغلوش)
    const user = await User.findById(req.user.id || req.user._id);

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    // 3. التحقق من الرتبة
    if (user.role !== "admin") {
      return res.status(403).json({ 
        message: "غير مصرح لك بالدخول. هذه الصلاحية لمديري النظام فقط." 
      });
    }

    // 4. لو هو أدمن فعلاً، هنكمل الريكويست للراوت اللي بعده
    next();
    
  } catch (err) {
    res.status(500).json({ message: "خطأ في التحقق من الصلاحيات", error: err.message });
  }
};

module.exports = isAdmin;