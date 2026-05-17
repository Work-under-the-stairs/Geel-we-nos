// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CATEGORIES } from '../../constants/Categories'
import logo from '/images/logo.jpeg'
import {
  Search, Menu, X,
  BookOpen, TrendingUp, Sparkles,
  Laptop, Mic, HeartPulse,
} from 'lucide-react'

const CATEGORY_ICONS = {
  'تعليم وثقافة':       <BookOpen   size={16} />,
  'اقتصاد':             <TrendingUp size={16} />,
  'ألهمني':            <Sparkles   size={16} />,
  'تكنولوجيا ومهارات': <Laptop      size={16} />,
  'بودكاست':           <Mic        size={16} />,
  'صحة':                <HeartPulse size={16} />,
}

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-main-bg shadow-sm select-none">

      {/* ======= ROW 1 ======= */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex  items-center justify-between min-h-[90px] md:min-h-[140px] py-4 gap-4">

          {/* أقصى اليمين — اللوجو فقط */}
          <div className="flex items-center z-10 shrink-0">
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="جيل ونص"
                className="h-16 sm:h-16 md:h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* منتصف الشاشة — بيانات مجلس الإدارة والتحرير */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center flex-1 px-4">
            
            {/* رئيس مجلس الإدارة */}
            <div className="flex flex-col items-center">
              <span className="text-xs md:text-lg font-black text-primary mb-0.5">رئيس مجلس الإدارة</span>
              <span className="text-sm md:text-lg font-bold text-secondary whitespace-nowrap">أ.د. هبة شاهين</span>
            </div>

            {/* فاصل عمودي يظهر في الشاشات الكبيرة فقط */}
            <div className="hidden md:block h-8 w-px bg-gray-200" />

            {/* المشرف العام */}
            <div className="flex flex-col items-center">
              <span className="text-xs md:text-lg font-black text-primary mb-0.5">المشرف العام</span>
              <span className="text-sm md:text-lg font-bold text-secondary whitespace-nowrap">د. مروة سعيد</span>
            </div>

            <div className="hidden md:block h-8 w-px bg-gray-200" />

            {/* رئيس التحرير */}
            <div className="flex flex-col items-center">
              <span className="text-xs md:text-lg font-black text-primary mb-0.5">رئيس التحرير</span>
              <span className="text-sm md:text-lg font-bold text-secondary whitespace-nowrap">أ. خلود خالد</span>
            </div>

          </div>

          {/* أقصى اليسار — كل الأزرار معاً (الحساب + البحث + القائمة) */}
          <div className="flex items-center gap-3 z-10 flex-row-reverse shrink-0">
            
            {/* أزرار التحكم (البحث والقائمة) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMenuOpen(p => !p)}
                aria-label="القائمة"
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white
                           flex items-center justify-center text-primary
                           hover:bg-primary hover:text-white hover:border-primary
                           transition-all duration-200"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                onClick={() => setSearchOpen(p => !p)}
                aria-label="بحث"
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white
                           flex items-center justify-center text-primary
                           hover:bg-primary hover:text-white hover:border-primary
                           transition-all duration-200"
              >
                <Search size={19} />
              </button>
            </div>

            {/* أزرار الحساب الشخصي (تختفي في الشاشات الأصغر من sm) */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm md:text-md font-extrabold text-primary
                           px-4 py-2.5 rounded-xl
                           border-2 border-primary
                           hover:bg-primary hover:text-white
                           transition-all duration-200 whitespace-nowrap"
              >
                تسجيل الدخول
              </Link>

              <Link
                to="/register"
                className="text-sm md:text-md font-extrabold text-white
                           px-4 py-2.5 rounded-xl
                           bg-secondary
                           shadow-[0_4px_12px_rgba(252,105,85,0.35)]
                           hover:bg-secondary/85
                           hover:-translate-y-px
                           transition-all duration-200 whitespace-nowrap"
              >
                إنشاء حساب ✦
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* ======= ROW 2 — Categories ======= */}
      <div className="border-b border-gray-200 bg-white overflow-x-auto scrollbar-none">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <ul className="flex items-center lg:justify-between gap-6 lg:gap-0 min-w-max sm:min-w-0">
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <NavLink
                  to={`/section/${encodeURIComponent(cat)}`}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 text-md font-bold
                     py-4 px-1 whitespace-nowrap
                     border-b-2 -mb-px transition-all duration-200
                     ${isActive
                       ? 'text-secondary border-secondary'
                       : 'text-slate-500 border-transparent hover:text-primary hover:border-primary'
                     }`
                  }
                >
                  {CATEGORY_ICONS[cat]}
                  {cat}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ======= Search Bar ======= */}
      {searchOpen && (
        <div className="border-b border-gray-200 bg-main-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3">
            <div className="relative">
              <Search
                size={17}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                autoFocus
                placeholder="ابحث في جيل ونص..."
                className="w-full bg-white border border-gray-200 rounded-xl
                           pr-10 pl-4 py-2.5 text-[14px] text-gray-800
                           placeholder:text-gray-400 outline-none
                           focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======= Global Menu Drawer ======= */}
      {menuOpen && (
        <div 
          className="fixed inset-0 top-[138px] sm:top-[139px] md:top-[169px] bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div 
        className={`absolute top-[138px] sm:top-[139px] md:top-[169px] left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 transition-all duration-300 ease-in-out transform origin-top ${
          menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-1.5">
          <p className="text-xs font-bold text-gray-400 px-4 mb-1">تصفح الأقسام</p>
          
          {CATEGORIES.map(cat => (
            <NavLink
              key={cat}
              to={`/section/${encodeURIComponent(cat)}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[14px] font-bold
                 px-4 py-3.5 rounded-xl transition-all duration-200
                 ${isActive
                   ? 'bg-secondary/10 text-secondary'
                   : 'text-slate-600 hover:bg-gray-50 hover:text-primary'
                 }`
              }
            >
              <span className="text-gray-400">{CATEGORY_ICONS[cat]}</span>
              {cat}
            </NavLink>
          ))}

          {/* أزرار الموبايل */}
          <div className="flex sm:hidden gap-3 mt-4 pt-4 border-t border-gray-100">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center text-md font-extrabold text-primary py-2.5 rounded-xl border-2 border-primary"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center text-md font-extrabold text-white bg-secondary py-2.5 rounded-xl shadow-[0_4px_12px_rgba(252,105,85,0.35)]"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>

    </header>
  )
}