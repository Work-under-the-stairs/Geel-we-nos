import React, { useState } from "react";
import { auth } from "../firebase"; // استيراد إعدادات فايربيس التي أنشأناها
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // الخطوة 1: إنشاء الحساب في Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const firebaseUser = userCredential.user;

      // الخطوة 2: إرسال الـ UID والبيانات الإضافية إلى الباك إند (MongoDB)
      const response = await fetch("http://localhost:5000/api/users/register-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: firebaseUser.uid,
          name: formData.name,
          username: formData.username.toLowerCase().trim(),
          email: formData.email,
          avatar: "", // يمكنكِ إضافة رابط صورة افتراضية هنا لاحقاً
        }),
      });

      const data = await response.json();

      if (response.ok) {
    toast.success("تم إنشاء الحساب بنجاح! 🎉"); // 2. استخدمي toast بدلاً من alert
    navigate("/login");
} else {
    toast.error(data.message || "حدث خطأ ما."); // 3. استخدمي toast.error للأخطاء
}
    } catch (err) {
      // معالجة أخطاء فايربيس الشائعة مثل إيميل مسجل مسبقاً أو كلمة مرور ضعيفة
      if (err.code === "auth/email-already-in-use") {
        setError("البريد الإلكتروني مستخدم بالفعل.");
      } else if (err.code === "auth/weak-password") {
        setError("كلمة المرور ضعيفة جداً، يجب أن تكون 6 أحرف على الأقل.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4" dir="rtl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-sm border max-w-md w-full flex flex-col gap-4"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-black text-slate-800">إنشاء حساب جديد</h2>
          <p className="text-sm text-slate-500 mt-1">انضم إلى منصة جيل ونص التحريرية</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600 mr-1">الاسم الكامل</label>
          <input
            type="text"
            required
            className="p-3 border rounded-xl text-sm focus:outline-none focus:border-slate-400 bg-slate-50"
            placeholder="مثال: أحمد محمد"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600 mr-1">اسم المستخدم (English)</label>
          <input
            type="text"
            required
            className="p-3 border rounded-xl text-sm focus:outline-none focus:border-slate-400 bg-slate-50 text-left font-mono"
            placeholder="ahmed_99"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600 mr-1">البريد الإلكتروني</label>
          <input
            type="email"
            required
            className="p-3 border rounded-xl text-sm focus:outline-none focus:border-slate-400 bg-slate-50 text-left"
            placeholder="example@mail.com"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600 mr-1">كلمة المرور</label>
          <input
            type="password"
            required
            className="p-3 border rounded-xl text-sm focus:outline-none focus:border-slate-400 bg-slate-50 text-left"
            placeholder="••••••••"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white p-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors mt-2 disabled:bg-slate-400"
        >
          {loading ? "جاري إنشاء الحساب..." : "تسجيل الحساب"}
        </button>

        <p className="text-xs text-center text-slate-500 mt-2">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-slate-900 font-bold underline">
            سجل دخولك من هنا
          </Link>
        </p>
      </form>
    </div>
  );
}