// src/pages/Register.jsx
import React, { useState } from "react";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Mail, Lock, UserPlus, Loader2, User, AtSign } from "lucide-react";
import api from "../services/api";

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

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.");
      return toast.error("كلمة المرور قصيرة جداً.");
    }
    if (/\s/.test(formData.username)) {
      setError("اسم المستخدم لا يجب أن يحتوي على مسافات.");
      return toast.error("اسم المستخدم يحتوي على مسافات.");
    }

    setLoading(true);
    let firebaseUser = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email.toLowerCase().trim(), 
        formData.password
      );
      firebaseUser = userCredential.user;

      try {
        await api.post("/users/register-db", {
          firebaseUid: firebaseUser.uid,
          name: formData.name,
          username: formData.username.toLowerCase().trim(),
          email: formData.email.toLowerCase().trim(),
        });
        
        toast.success("تم إنشاء الحساب بنجاح! 🎉");
        navigate("/login");
      } catch (dbError) {
        console.error("MongoDB Save Failed, Rolling back Firebase user...");
        try {
          if (firebaseUser) {
            await firebaseUser.delete(); 
          }
        } catch (rollbackError) {
          console.error("Critical: Failed to delete Firebase user after DB failure", rollbackError);
        }
        throw dbError;
      }

    } catch (err) {
      console.error(err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else if (err.code === "auth/email-already-in-use") {
        setError("البريد الإلكتروني مستخدم بالفعل.");
        toast.error("البريد الإلكتروني مستخدم بالفعل.");
      } else if (err.code === "auth/invalid-email") {
        setError("صيغة البريد الإلكتروني غير صحيحة.");
        toast.error("صيغة البريد الإلكتروني غير صحيحة.");
      } else {
        setError("حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً.");
        toast.error("حدث خطأ أثناء إنشاء الحساب.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-10 font-['Cairo']" dir="rtl">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.15] blur-[120px] rounded-full pointer-events-none animate-pulse duration-1000"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)] opacity-[0.15] blur-[100px] rounded-full pointer-events-none animate-pulse duration-1000 delay-500"></div>

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white flex flex-col gap-6"
        >
          <div className="text-center space-y-2 mb-1 flex flex-col items-center">
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

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[var(--color-primary)]/90 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-2 overflow-hidden"
          >
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