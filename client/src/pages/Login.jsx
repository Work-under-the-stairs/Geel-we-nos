import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast"; // استيراد مكتبة الـ toast

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. تسجيل الدخول عبر Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. جلب بيانات المستخدم من MongoDB
      const response = await fetch(`http://localhost:5000/api/users/me/${firebaseUser.uid}`);
      
      if (response.ok) {
        const mongoUserData = await response.json();
        
        // 3. تخزين البيانات
        localStorage.setItem("user", JSON.stringify(mongoUserData));
        
        toast.success(`مرحباً بك مجدداً يا ${mongoUserData.name} 👋`);
        navigate("/"); 
      } else {
        toast.error("فشل جلب بياناتك من السيرفر.");
        setError("فشل جلب ملفك الشخصي الموثق من قاعدة البيانات.");
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول.");
        setError("حدث خطأ أثناء محاولة تسجيل الدخول.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4" dir="rtl">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-sm border max-w-md w-full flex flex-col gap-4"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-black text-slate-800">تسجيل الدخول</h2>
          <p className="text-sm text-slate-500 mt-1">مرحباً بك مجدداً في جيل ونص</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600 mr-1">البريد الإلكتروني</label>
          <input
            type="email"
            required
            className="p-3 border rounded-xl text-sm focus:outline-none focus:border-slate-400 bg-slate-50 text-left"
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600 mr-1">كلمة المرور</label>
          <input
            type="password"
            required
            className="p-3 border rounded-xl text-sm focus:outline-none focus:border-slate-400 bg-slate-50 text-left"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white p-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors mt-2 disabled:bg-slate-400"
        >
          {loading ? "جاري التحقق..." : "دخول"}
        </button>

        <p className="text-xs text-center text-slate-500 mt-2">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-slate-900 font-bold underline">
            أنشئ حسابك الآن
          </Link>
        </p>
      </form>
    </div>
  );
}