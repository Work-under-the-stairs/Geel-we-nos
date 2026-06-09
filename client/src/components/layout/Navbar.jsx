import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '/images/logo.jpeg'
import { Search, Menu, X, Home, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useCategories } from '../../hooks/useAdmin'
import { isAuthenticated, getUsername, isAdmin, logout } from '../../utils/auth'

const NavIcon = ({ name, size = 16, className = "" }) => {
  const IconComponent = LucideIcons[name]
  if (!IconComponent) return <LucideIcons.Newspaper size={size} className={className} />
  return <IconComponent size={size} className={className} />
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  
  const { data: categories = [] } = useCategories()
  

  const otherCategories = categories?.data?.filter(cat => cat.name !== 'كروس ميديا' && cat.name !== 'بودكاست') || [];
  const crossMediaCat = categories?.data?.find(cat => cat.name === 'كروس ميديا');
  const podcastCat = categories?.data?.find(cat => cat.name === 'بودكاست');

  const sortedCategories = [
    ...otherCategories,
    ...(crossMediaCat ? [crossMediaCat] : []),
    ...(podcastCat ? [podcastCat] : [])
  ];

  const isAuth = isAuthenticated();
  const username = getUsername();
  const isUserAdmin = isAdmin();

  return (
    <header className="w-full select-none pt-[90px] md:pt-[120px]" dir="rtl">
      
      <div className="fixed top-0 left-0 z-50 w-full bg-main-bg border-b border-gray-200 shadow-sm h-[90px] md:h-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-row-reverse items-center justify-between h-full relative">

          <div className="hidden sm:flex items-center gap-2.5 z-10">
            {isAuth ? (
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                <span className="font-bold text-sm text-slate-700">أهلاً، {username}</span>
                {isUserAdmin && (
                  <Link to="/admin" className="text-xs font-bold bg-slate-800 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-slate-900 transition-all">
                    <LayoutDashboard size={14} /> لوحة التحكم
                  </Link>
                )}
                <button onClick={logout} className="text-red-500 hover:text-red-600 transition-colors p-1 cursor-pointer">
                  <LogOut size={18}  />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-md font-extrabold text-primary px-5 py-2.5 rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200">
                  تسجيل الدخول
                </Link>
                <Link to="/register" className="text-md font-extrabold text-white px-5 py-2.5 rounded-xl bg-secondary shadow-[0_4px_12px_rgba(252,105,85,0.35)] hover:bg-secondary/85 transition-all">
                  إنشاء حساب ✦
                </Link>
              </>
            )}
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <img src={logo} alt="جيل ونص" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-2.5 z-10">
            <button onClick={() => setMenuOpen(p => !p)} className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button onClick={() => setSearchOpen(p => !p)} className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Search size={19} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white overflow-x-auto scrollbar-none relative z-30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <ul className="flex items-center lg:justify-between gap-6 min-w-max sm:min-w-0">
            <li><NavLink to="/" end className={({ isActive }) => `flex items-center gap-1.5 text-md font-bold py-4 px-1 border-b-2 ${isActive ? 'text-secondary border-secondary' : 'text-slate-500 border-transparent'}`}><Home size={16} /> الرئيسية</NavLink></li>
            
            {sortedCategories.map(cat => (
              <li key={cat._id || cat.name}>
                <NavLink to={`/${encodeURIComponent(cat.name)}`} className={({ isActive }) => `flex items-center gap-1.5 text-md font-bold py-4 px-1 border-b-2 ${isActive ? 'text-secondary border-secondary' : 'text-slate-500 border-transparent'}`}>
                  <NavIcon name={cat.icon_name} /> {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {searchOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setSearchOpen(false)} />
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg bg-white p-4 rounded-2xl shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = e.target.search.value.trim();
                console.log("Submit fired, value:", value);
                if (!value) return;
                setSearchOpen(false);
                navigate(`/search?q=${encodeURIComponent(value)}`);
              }}
            >
              <div className="relative flex items-center gap-2" dir="rtl">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    name="search"
                    type="text"
                    autoFocus
                    placeholder="عن ماذا تبحث؟..."
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-primary/90 transition-all"
                >
                  بحث
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-sm font-bold text-gray-500 px-2"
                >
                  إغلاق
                </button>  
              </div>
            </form>
          </div>
        </>
      )}

      {menuOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="font-extrabold text-primary text-lg">القائمة</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-500"><X size={18} /></button>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-2">
          {isAuth && (
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm mb-6 mx-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-black text-sm">
                  {username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">مرحباً بك،</p>
                  <p className="font-bold text-sm text-slate-800">{username}</p>
                </div>
              </div>

              {isUserAdmin && (
                <Link 
                  to="/admin" 
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-[var(--color-primary)]/20 active:scale-[0.98]"
                >
                  <LayoutDashboard size={14} />
                  <span>لوحة تحكم الأدمن</span>
                </Link>
              )}
            </div>
          )}
          
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-bold px-4 py-3 rounded-xl text-slate-600 hover:bg-gray-50"><Home size={16} /> الرئيسية</NavLink>
          
          {sortedCategories.map(cat => (
            <NavLink key={cat._id} to={`/${encodeURIComponent(cat.name)}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-bold px-4 py-3 rounded-xl text-slate-600 hover:bg-gray-50">
              <NavIcon name={cat.icon_name} /> {cat.name}
            </NavLink>
          ))}

          <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
            {isAuth ? (
              <button onClick={logout} className="w-full text-center font-bold text-red-500 py-3 rounded-xl border border-red-100 hover:bg-red-50">خروج</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full text-center font-bold text-primary py-3 rounded-xl border border-primary hover:bg-primary hover:text-white">تسجيل الدخول</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full text-center font-bold text-white bg-secondary py-3 rounded-xl">إنشاء حساب</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}