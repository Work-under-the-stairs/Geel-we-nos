// src/pages/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. تسجيل الدخول عبر Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // الحصول على التوكين (ID Token) لإرساله للسيرفر
      const idToken = await user.getIdToken();

      // 2. جلب بيانات المستخدم من MongoDB
      const response = await api.get(`/users/me/${user.uid}`, {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      
      if (response.data) {
        const userData = response.data;
        
        // 3. تخزين البيانات والتوكن في localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", idToken);
        
        toast.success(`مرحباً بك مجدداً يا ${userData.name} 👋`);

        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4 font-['Cairo']" dir="rtl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.15] blur-[120px] rounded-full pointer-events-none animate-pulse duration-1000"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)] opacity-[0.15] blur-[100px] rounded-full pointer-events-none animate-pulse duration-1000 delay-500"></div>

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white flex flex-col gap-6"
        >
          <div className="text-center space-y-3 mb-2 flex flex-col items-center">
            <div className="w-50 h-30 bg-white p-1.5 rounded-2xl border border-none flex items-center justify-center overflow-hidden mb-2 relative group">
              <img src="/images/logo.jpeg" alt="جيل ونص" className="w-full h-full object-contain rounded-xl" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">تسجيل الدخول</h2>
            <p className="text-sm text-slate-500 font-medium">مرحباً بك مجدداً في <span className="text-[var(--color-primary)] font-bold">جيل ونص</span></p>
          </div>

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 mr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email" required dir="ltr"
                  className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pr-11 pl-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-left placeholder:text-slate-400 shadow-sm"
                  placeholder="example@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mr-2">
                <label className="text-xs font-bold text-slate-700">كلمة المرور</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-slate-400 hover:text-[var(--color-secondary)] transition-colors">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password" required dir="ltr"
                  className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pr-11 pl-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-left placeholder:text-slate-400 tracking-widest shadow-sm"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[var(--color-primary)]/90 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-2 overflow-hidden"
          >
            {loading ? (
              <>
                <span>جاري التحقق...</span>
                <Loader2 size={18} className="animate-spin" />
              </>
            ) : (
              <>
                <span className="relative z-10">تسجيل الدخول</span>
                <LogIn size={18} className="relative z-10 transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}