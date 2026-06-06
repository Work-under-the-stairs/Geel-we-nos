import { Link } from 'react-router-dom'
import logo from '/images/logo_rev_crop.png'
import { useCategories } from '../../hooks/useAdmin'

export default function Footer() {
  const { data: categories = [] } = useCategories()

  return (
    <footer className="w-full bg-primary mt-16 select-none" dir="rtl">
      
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Brand & Bio */}
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Geel W Nos" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-white text-[14px] leading-relaxed max-w-sm">
              منصة جيل ونص الصحفية مساحتكم الشبابية الملهمة لمتابعة مستجدات التكنولوجيا، الاقتصاد، الصحة، وقصص النجاح التي تصنع الفارق.
            </p>
          </div>

          {/* Dynamic Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-black text-[15px] border-r-4 border-secondary pr-2">
              أقسام المنصة
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {categories?.data?.map((cat) => (
                <li key={cat._id || cat.name}>
                  <Link
                    to={`/${encodeURIComponent(cat.name)}`}
                    className="text-white/70 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block"
                  >
                    • {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-black text-[15px] border-r-4 border-secondary pr-2">
              روابط تهمك
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link to="/about" className="text-white/70 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-white/70 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  رؤيتنا 
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/70 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-secondary font-bold text-[14px] transition-colors duration-200 block">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Socials & Copyright */}
      <div className="border-t border-white/10 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-white/50 text-xs font-semibold tracking-wide order-2 sm:order-1">
            &copy; {new Date().getFullYear()} جيل ونص. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-5 order-1 sm:order-2">
            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@geelwnos_?_r=1&_t=ZS-96FmnUVLqlE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-secondary transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
              </svg>
            </a>
            
            {/* Facebook */}
            {/* <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-secondary transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a> */}
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/geelwnos/?utm_source=ig_web_button_share_sheet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-secondary transition-colors duration-200"
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            
            {/* Twitter */}
            {/* <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-secondary transition-colors duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a> */}
          </div>

        </div>
      </div>
    </footer>
  )
}