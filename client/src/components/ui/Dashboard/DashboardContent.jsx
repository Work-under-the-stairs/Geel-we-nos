import React from 'react';
import { FileText, Eye, Edit, Trash2, MoreVertical, TrendingUp } from 'lucide-react';

export default function DashboardContent({ recentArticles, topViewed, categoryDistribution, quickStats }) {
  return (
    <>
      {/* Middle Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 xl:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-slate-400" />
                <span>آخر المقالات</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400">
                    <th className="pb-3 font-semibold">المقال</th>
                    <th className="pb-3 font-semibold">التصنيف</th>
                    <th className="pb-3 font-semibold">التاريخ</th>
                    <th className="pb-3 font-semibold">الحالة</th>
                    <th className="pb-3 font-semibold">المشاهدات</th>
                    <th className="pb-3 font-semibold text-left pl-2">العمليات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {recentArticles.map((art, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all group">
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          {/* التعديل 1: art.image بدل art.images */}
                          <img src={art.image} alt={art.title} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                          <div className="min-w-0">
                            <h3 className="font-semibold text-slate-800 truncate max-w-[220px]">{art.title}</h3>
                            <p className="text-xs text-slate-400 mt-1">بواسطة الإدارة</p>
                          </div>
                        </div>
                      </td>
                      {/* التعديل 2: art.category بدل art.category?.name */}
                      <td className="py-3.5 text-slate-500 text-xs">{art.category}</td>
                      <td className="py-3.5 text-slate-400 text-xs">{art.date}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${art.statusColor}`}>{art.status}</span>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-700 text-xs">{art.views}</td>
                      <td className="py-3.5 text-left pl-2">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"><Eye size={14} /></button>
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100"><Edit size={14} /></button>
                          <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100"><Trash2 size={14} /></button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"><MoreVertical size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="w-full mt-5 py-3 bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] font-semibold text-sm rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
            عرض جميع المقالات
          </button>
        </div>

        {/* Top Viewed */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-slate-400" />
                <span>أكثر المقالات مشاهدة</span>
              </h3>
            </div>
            <div className="space-y-3">
              {topViewed.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${idx === 0 ? "bg-red-50 text-red-600" : idx === 1 ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                    {item.rank}
                  </span>
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#FF6B4A] transition-colors">{item.title}</p>
                    <span className="text-[11px] text-slate-400 font-semibold">{item.views} مشاهدة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-5 py-3 bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] font-semibold text-sm rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
            عرض جميع المقالات
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Graph Placeholder */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-sm">المشاهدات خلال آخر 7 أيام</h3>
            <select className="bg-slate-50 text-xs font-medium text-slate-500 border border-slate-100 rounded-lg px-2 py-1.5 outline-none">
              <option>7 أيام</option>
              <option>30 يوم</option>
            </select>
          </div>
          <div className="h-44 flex flex-col justify-between pt-4 relative">
             <div className="absolute inset-x-0 bottom-6 top-4 flex flex-col justify-between pointer-events-none">
               {[40, 30, 20, 10, 0].map((v, i) => (
                 <div key={i} className="w-full border-t border-slate-100/70 flex justify-between text-[10px] text-slate-300 pt-0.5">
                   <span></span><span>{v}K</span>
                 </div>
               ))}
             </div>
             <div className="flex-1 w-full bottom-0 flex items-end justify-between px-2 z-10 h-28">
               <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                 <defs>
                   <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="#FF5A36" stopOpacity="0.2" />
                     <stop offset="100%" stopColor="#FF5A36" stopOpacity="0.0" />
                   </linearGradient>
                 </defs>
                 <path d="M 0 80 Q 25 50 50 55 T 100 65 T 150 75 T 200 45 T 250 50 T 300 15 L 300 100 L 0 100 Z" fill="url(#grad)" />
                 <path d="M 0 80 Q 25 50 50 55 T 100 65 T 150 75 T 200 45 T 250 50 T 300 15" fill="none" stroke="#FF5A36" strokeWidth="2.5" />
                 <circle cx="300" cy="15" r="4" fill="#FF5A36" />
               </svg>
             </div>
             <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium px-1 border-t border-slate-100 pt-2 z-10">
               {["الجمعة", "الخميس", "الأربعاء", "الثلاثاء", "الاثنين", "الأحد", "السبت"].map((day, i) => (
                 <span key={i}>{day}</span>
               ))}
             </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">المقالات حسب التصنيف</h3>
            <div className="flex flex-row-reverse items-center justify-between gap-4 mt-2">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-full border-[14px] border-slate-100 absolute"></div>
                <div className="w-full h-full rounded-full border-[14px] border-t-[#FF6347] border-r-[#2E8B57] border-b-[#4682B4] border-l-transparent rotate-45 absolute"></div>
                <div className="text-center z-10">
                  <span className="text-xs text-slate-400 block">الإجمالي</span>
                  <span className="text-sm font-bold text-slate-700">1,250</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {categoryDistribution.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-right text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                      <span className="text-slate-500 font-medium">{cat.name}</span>
                    </div>
                    <span className="text-slate-400 font-mono font-semibold">{cat.percentage}% ({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 text-sm mb-4">إحصائيات سريعة</h3>
          <div className="divide-y divide-slate-50">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 text-xs">
                <span className="text-slate-500 font-medium">{stat.label}</span>
                <span className="font-bold text-slate-800 font-mono">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}