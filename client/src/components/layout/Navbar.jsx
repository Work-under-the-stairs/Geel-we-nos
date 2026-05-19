// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CATEGORIES } from '../../constants/Categories'
import logo from '/images/logo.jpeg'
import { Search, Menu, X, Home } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

const NavIcon = ({ name, size = 16, className = "" }) => {
  const IconComponent = LucideIcons[name]
  if (!IconComponent) {
    return <LucideIcons.Newspaper size={size} className={className} />
  }
  return <IconComponent size={size} className={className} />
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    // تم تحويل الحاوية الرئيسية لتأخذ حيز الصف الأول الثابت منعاً لتداخل العناصر تحته
    <header className="w-full select-none pt-[90px] md:pt-[120px]" dir="rtl">

      {/* ======= ROW 1 (تم تحويله إلى fixed لضمان الثبات الكامل) ======= */}
      <div className="fixed top-0 left-0 z-50 w-full bg-main-bg border-b border-gray-200 shadow-sm h-[90px] md:h-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-row-reverse items-center justify-between h-full relative">

          {/* يمين — الأزرار */}
          <div className="hidden sm:flex items-center gap-2.5 z-10">
            <Link
              to="/login"
              className="text-md font-extrabold text-primary px-5 py-2.5 rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              تسجيل الدخول
            </Link>

            <Link
              to="/register"
              className="text-md font-extrabold text-white px-5 py-2.5 rounded-xl bg-secondary shadow-[0_4px_12px_rgba(252,105,85,0.35)] hover:bg-secondary/85 hover:-translate-y-px transition-all duration-200"
            >
              إنشاء حساب ✦
            </Link>
          </div>

          {/* وسط — اللوجو */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          >
            <img
              src={logo}
              alt="جيل ونص"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* يسار — القائمة والبحث */}
          <div className="flex items-center gap-2.5 z-10">
            <button
              onClick={() => setMenuOpen(p => !p)}
              aria-label="القائمة"
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <button
              onClick={() => setSearchOpen(p => !p)}
              aria-label="بحث"
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              <Search size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* ======= ROW 2 — صف التبويبات (يتحرك طبيعياً ويختفي عند النزول) ======= */}
      <div className="border-b border-gray-200 bg-white overflow-x-auto scrollbar-none relative z-30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <ul className="flex items-center lg:justify-between gap-6 lg:gap-0 min-w-max sm:min-w-0">
            
            {/* تبويبة الرئيسية */}
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-1.5 text-md font-bold py-4 px-1 whitespace-nowrap border-b-2 -mb-px transition-all duration-200
                   ${isActive ? 'text-secondary border-secondary' : 'text-slate-500 border-transparent hover:text-primary hover:border-primary'}`
                }
              >
                <Home size={16} />
                الرئيسية
              </NavLink>
            </li>

            {CATEGORIES.map(cat => (
              <li key={cat.name}>
                <NavLink
                  to={`/${encodeURIComponent(cat.name)}`}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 text-md font-bold py-4 px-1 whitespace-nowrap border-b-2 -mb-px transition-all duration-200
                     ${isActive ? 'text-secondary border-secondary' : 'text-slate-500 border-transparent hover:text-primary hover:border-primary'}`
                  }
                >
                  <NavIcon name={cat.icon_name} size={16} />
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ======= شريط البحث ======= */}
      {searchOpen && (
        <div className="fixed top-[90px] md:top-[120px] left-0 w-full border-b border-gray-200 bg-main-bg z-40 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3">
            <div className="relative">
              <Search size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                autoFocus
                placeholder="ابحث في جيل ونص..."
                className="w-full bg-white border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-[14px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======= خلفية معتمة السايد بار ======= */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ======= السايد بار الجانبي الثابت ======= */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 
          transition-transform duration-300 ease-in-out transform flex flex-col
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="font-extrabold text-primary text-lg">القائمة</span>
          <button 
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 px-3 mb-1">تصفح الموقع</p>
          
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 text-[14px] font-bold px-4 py-3.5 rounded-xl transition-all duration-200
               ${isActive ? 'bg-secondary/10 text-secondary' : 'text-slate-600 hover:bg-gray-50 hover:text-primary'}`
            }
          >
            <span className="text-gray-400"><Home size={16} /></span>
            الرئيسية
          </NavLink>

          {CATEGORIES.map(cat => (
            <NavLink
              key={cat.name}
              to={`/${encodeURIComponent(cat.name)}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[14px] font-bold px-4 py-3.5 rounded-xl transition-all duration-200
                 ${isActive ? 'bg-secondary/10 text-secondary' : 'text-slate-600 hover:bg-gray-50 hover:text-primary'}`
              }
            >
              <span className="text-gray-400"><NavIcon name={cat.icon_name} size={16} /></span>
              {cat.name}
            </NavLink>
          ))}

          <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-gray-100">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center text-md font-extrabold text-primary py-2.5 rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center text-md font-extrabold text-white bg-secondary py-2.5 rounded-xl shadow-[0_4px_12px_rgba(252,105,85,0.35)]"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>

    </header>
  )
}