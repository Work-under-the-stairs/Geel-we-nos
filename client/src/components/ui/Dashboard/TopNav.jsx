import React from 'react';
import { Grid, ChevronDown, Search } from 'lucide-react';

export default function TopNav({ setIsSidebarOpen }) {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-600 bg-slate-50 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
          <Grid size={20} />
        </button>

        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" />
          <div className="hidden sm:block text-right">
            <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
              <span>أ. محمد السيد</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
            <span className="text-xs text-slate-400">مدير النظام</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
        <div className="relative w-full max-w-xs hidden md:block">
          <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
            <Search size={16} />
          </span>
          <input type="text" placeholder="بحث عن مقال، تصنيف، مستخدم..." className="w-full bg-slate-50 text-sm py-2.5 pr-10 pl-4 rounded-xl border border-transparent focus:bg-white focus:border-slate-200 outline-none transition-all text-right" />
        </div>
        <button className="bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-orange-600 transition-all shadow-md shadow-orange-600/10 whitespace-nowrap">
          <span>+ إضافة مقال جديد</span>
        </button>
      </div>
    </header>
  );
}