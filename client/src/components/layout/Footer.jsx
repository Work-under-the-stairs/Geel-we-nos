// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants/Categories'
import logo from '/images/logo.jpeg'
import { Send, Globe, MessageCircle, Video } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-main-bg border-t border-gray-200 mt-16 select-none">
      
      {/* ======= UPPER SECTION: Newsletter Box ======= */}
      <div className=" bg-primary text-whiteborder-b border-gray-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-right lg:max-w-md">
            <h3 className="text-white font-black text-[17px] sm:text-lg mb-1">
              جرعة ثقافة سريعة في بريدك الإلكتروني ✦
            </h3>
            <p className="text-secondary text-sm font-medium">
              اشترك في نشرة جيل ونص لتصلك أحدث المقالات والبودكاست فور صدورها.
            </p>
          </div>
          
          {/* Email Input Form (Matches your custom button styles) */}
          <form className="w-full lg:max-w-md flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="أدخل بريدك الإلكتروني..."
                className="w-full bg-slate-50 border border-gray-200 rounded-xl pr-4 pl-10 py-3 text-[14px] text-gray-800 outline-none focus:border-primary transition-colors placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="text-sm font-extrabold text-white px-6 py-3 rounded-xl bg-secondary shadow-[0_4px_12px_rgba(252,105,85,0.25)] hover:bg-secondary/85 hover:-translate-y-px active:scale-95 active:translate-y-0 transition-all duration-200 flex items-center gap-2 flex-shrink-0"
            >
              <span>اشترك</span>
              <Send size={14} className="transform rotate-180" />
            </button>
          </form>
        </div>
      </div>

      {/* ======= MIDDLE SECTION: Main Footer Directory ======= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="جيل ونص" className="h-16 w-auto object-contain rounded-xl" />
            </Link>
            <p className="text-slate-500 text-[14px] leading-relaxed max-w-sm">
              منصة جيل ونص الصحفية مساحتكم الشبابية الملهمة لمتابعة مستجدات التكنولوجيا، الاقتصاد، الصحة، وقصص النجاح التي تصنع الفارق.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-black text-[15px] border-r-4 border-secondary pr-2">
              أقسام المنصة
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/section/${encodeURIComponent(cat)}`}
                    className="text-slate-500 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block"
                  >
                    • {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-black text-[15px] border-r-4 border-secondary pr-2">
              روابط تهمك
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link to="/about" className="text-slate-500 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-500 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ======= LOWER SECTION: Socials & Copyright ======= */}
        <div className="border-t border-gray-200/60 bg-primary text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Copyright Statement */}
            <p className="text-slate-400 text-xs font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} جيل ونص. جميع الحقوق محفوظة.
            </p>

            {/* Stable Social Media Icons */}
            <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-primary transition-colors duration-200" aria-label="Website">
                <Globe size={18} />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200" aria-label="Community">
                <MessageCircle size={18} />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200" aria-label="Videos">
                <Video size={18} />
            </a>
            </div>

        </div>
        </div>

    </footer>
  )
}