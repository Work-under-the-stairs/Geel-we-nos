// src/pages/Register.jsx
import React, { useState } from "react";
import { auth } from "../firebase"; // استيراد إعدادات فايربيس التي أنشأناها
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Mail, Lock, UserPlus, Loader2, User, AtSign } from "lucide-react"; // أيقونات التصميم الجديد

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-10 font-['Cairo']" dir="rtl">
      
      {/* ======= الخلفية الإبداعية (متطابقة مع اللوجين) ======= */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.15] blur-[120px] rounded-full pointer-events-none animate-pulse duration-1000"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)] opacity-[0.15] blur-[100px] rounded-full pointer-events-none animate-pulse duration-1000 delay-500"></div>

      {/* ======= كارت إنشاء الحساب ======= */}
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white flex flex-col gap-6"
        >
          {/* الهيدر واللوجو */}
          <div className="text-center space-y-2 mb-1 flex flex-col items-center">
            {/* اللوجو بدون أي بوردر أو شادو حسب طلبك */}
            <div className="w-40 h-20 mb-2 flex items-center justify-center">
              <img 
                src="/images/logo.jpeg" 
                alt="جيل ونص" 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </div>

            <h2 className="text-3xl font-black text-slate-800 tracking-tight">إنشاء حساب جديد</h2>
            <p className="text-sm text-slate-500 font-medium">انضم إلى منصة <span className="text-[var(--color-primary)] font-bold">جيل ونص</span> التحريرية</p>
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* حقل الاسم الكامل */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 mr-2">الاسم الكامل</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pr-11 pl-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-slate-400 shadow-sm"
                  placeholder="مثال: أحمد محمد"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* حقل اسم المستخدم */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 mr-2">اسم المستخدم (English)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <AtSign size={18} />
                </div>
                <input
                  type="text"
                  required
                  dir="ltr"
                  className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pr-11 pl-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-left placeholder:text-slate-400 font-mono shadow-sm"
                  placeholder="ahmed_99"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* حقل الإيميل */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 mr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  dir="ltr"
                  className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pr-11 pl-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-left placeholder:text-slate-400 shadow-sm"
                  placeholder="example@mail.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* حقل الباسورد */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 mr-2">كلمة المرور</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  dir="ltr"
                  className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pr-11 pl-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-left placeholder:text-slate-400 tracking-widest shadow-sm"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* زر إنشاء الحساب */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[var(--color-primary)]/90 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-2 overflow-hidden"
          >
            {/* تأثير إضاءة خفيف يمر على الزر */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            
            {loading ? (
              <>
                <span>جاري إنشاء الحساب...</span>
                <Loader2 size={18} className="animate-spin" />
              </>
            ) : (
              <>
                <span className="relative z-10">تسجيل الحساب</span>
                <UserPlus size={18} className="relative z-10 transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </button>

          {/* رابط تسجيل الدخول */}
          <p className="text-xs text-center text-slate-500 font-medium mt-1">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-[var(--color-primary)] font-bold hover:text-[var(--color-secondary)] transition-colors inline-flex items-center gap-1 underline decoration-2 underline-offset-4">
              سجل دخولك من هنا
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}