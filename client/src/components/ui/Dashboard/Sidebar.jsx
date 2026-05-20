import React from 'react';
import { Home, FileText, PlusCircle, Folder, MessageSquare, Users, BarChart2, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab }) {
  const sidebarLinks = [
    { name: "الرئيسية", icon: Home, active: true },
    { name: "المقالات", icon: FileText },
    { name: "إضافة مقال", icon: PlusCircle },
    { name: "التصنيفات", icon: Folder },
    { name: "التعليقات", icon: MessageSquare },
    { name: "المستخدمين", icon: Users },
    { name: "الإحصائيات", icon: BarChart2 },
    { name: "الإعدادات", icon: Settings },
  ];

  return (
    <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-[var(--color-primary)] text-white transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col bulk-sidebar`}>
      <div className="p-6 flex items-center justify-between border-b border-[#134E5E]">
        <div className="flex items-center gap-3">
          <img src="/images/logo_rev_crop.png" alt="جيل ونص" className="w-60 h-15 rounded-2xl object-contain" />
        </div>
        <button className="lg:hidden text-slate-400 hover:text-white transition" onClick={() => setIsSidebarOpen(false)}>
          ✕
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link, idx) => {
          const Icon = link.icon;
          return (
            <a
            key={idx}
            href="#"
            onClick={(e) => {
                e.preventDefault();
                setActiveTab(link.name); // تغيير الصفحة
                if(window.innerWidth < 1024) setIsSidebarOpen(false); // قفل القائمة في الموبايل
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === link.name // 👈 التعديل هنا
                ? "bg-[var(--color-secondary)] text-white shadow-lg shadow-orange-600/10"
                : "text-slate-300 hover:bg-[#134E5E] hover:text-white"
            }`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#134E5E]">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-all">
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </a>
      </div>
    </aside>
  );
}