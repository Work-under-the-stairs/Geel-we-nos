import React from 'react';
import { FileText, Eye, Edit, Trash2, TrendingUp, PieChart, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function DashboardContent({ 
  recentArticles = [], 
  topViewed = [], 
  categoryDistribution = [], 
  onDeleteArticle, 
  isDeletingArticle 
}) {
  const navigate = useNavigate();
  const fallbackPlaceholder = 'https://via.placeholder.com/150';

  // دالة الحذف باستخدام React Hot Toast
  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3" dir="rtl">
        <div className="flex items-center gap-2 text-slate-800">
          <AlertTriangle className="text-red-500" size={20} />
          <p className="font-bold text-sm">هل أنت متأكد من حذف هذا المقال؟</p>
        </div>
        <p className="text-xs text-slate-500">لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.</p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onDeleteArticle(id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            تأكيد الحذف
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            تراجع
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  // تحديد حالة المقال
  const getStatusBadge = (status) => {
    const safeStatus = String(status || '').toLowerCase().trim();
    const isDraft = safeStatus === 'draft';

    return {
      text: isDraft ? 'مسودة' : 'منشور',
      colorClass: isDraft 
        ? 'bg-amber-50 text-amber-600 border border-amber-200' 
        : 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
    };
  };

  // دالة مساعدة لاستخراج اللون كـ Hex Code من كلاس الباك اند
  const extractHexColor = (colorString) => {
    if (!colorString) return '#cbd5e1'; 
    const match = colorString.match(/\[(.*?)\]/);
    return match ? match[1] : '#cbd5e1';
  };

  const totalArticlesCount = categoryDistribution.reduce((acc, curr) => acc + curr.count, 0);

  // دالة رسم الدايرة الملونة
  const generateConicGradient = () => {
    if (!categoryDistribution || categoryDistribution.length === 0) {
      return 'conic-gradient(#f1f5f9 0% 100%)';
    }
    
    let cumulative = 0;
    const stops = categoryDistribution.map(cat => {
      const hexColor = extractHexColor(cat.color); 
      const start = cumulative;
      cumulative += cat.percentage;
      return `${hexColor} ${start}% ${cumulative}%`;
    });

    if (cumulative < 100) {
      stops.push(`#f1f5f9 ${cumulative}% 100%`);
    }

    return `conic-gradient(${stops.join(', ')})`;
  };

  return (
    <div className="space-y-6">
      {/* ================= الصف الأول: آخر المقالات + الأكثر مشاهدة ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* جدول آخر المقالات */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 xl:col-span-2 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <span>آخر المقالات</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">المقال</th>
                    <th className="pb-3 font-semibold">التصنيف</th>
                    <th className="pb-3 font-semibold">التاريخ</th>
                    <th className="pb-3 font-semibold text-center">الحالة</th>
                    <th className="pb-3 font-semibold text-center">المشاهدات</th>
                    <th className="pb-3 font-semibold text-left pl-2">العمليات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {recentArticles.length > 0 ? recentArticles.map((art, idx) => {
                    const statusBadge = getStatusBadge(art.status);
                    
                    // ✅ تأمين الرابط وجلب الصورة المناسبة من الكائن أو النص المباشر
                    const artImg = art.image || art.images?.[0];
                    const artImgUrl = typeof artImg === 'object' ? artImg?.url : artImg;

                    // ✅ تأمين التصنيف (Object vs String) لمنع تدمير الرندرة
                    const categoryName = typeof art.category === 'object' ? art.category?.name : art.category;

                    // ✅ تأمين وتنسيق التاريخ البرمجي بشكل احترافي
                    const rawDate = art.createdAt || art.date;
                    const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'غير محدد';

                    // معرف المقال المرن (id أو _id)
                    const articleId = art.id || art._id;

                    return (
                      <tr key={articleId || idx} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={artImgUrl || fallbackPlaceholder} 
                              alt={art.title} 
                              className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-sm border border-slate-100" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackPlaceholder;
                              }}
                            />
                            <div className="min-w-0">
                              <h3 className="font-semibold text-slate-800 truncate max-w-[220px] group-hover:text-primary transition-colors" title={art.title}>
                                {art.title}
                              </h3>
                              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                                بواسطة {art.writer?.name || 'الإدارة'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                            {categoryName || 'عام'}
                          </span>
                        </td>
                        <td className="py-4 text-slate-500 text-xs font-medium">{formattedDate}</td>
                        <td className="py-4 text-center">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${statusBadge.colorClass}`}>
                            {statusBadge.text}
                          </span>
                        </td>
                        <td className="py-4 font-bold text-slate-700 text-xs text-center">{art.views || 0}</td>
                        <td className="py-4 text-left pl-2">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => navigate(`/news/${articleId}`)} className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors" title="عرض">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => navigate(`/edit/article/${articleId}`)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100"
                              title="تعديل"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => handleDelete(articleId)}
                              disabled={isDeletingArticle}
                              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-slate-400">لا توجد مقالات مضافة حتى الآن.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* الأكثر مشاهدة */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-[var(--color-secondary)]" />
              <span>أكثر المقالات مشاهدة</span>
            </h3>
          </div>
          <div className="space-y-3 flex-1">
            {topViewed.length > 0 ? topViewed.map((item, idx) => {
              const itemViewedImg = item.image || item.images?.[0];
              const itemViewedImgUrl = typeof itemViewedImg === 'object' ? itemViewedImg?.url : itemViewedImg;
              const itemId = item.id || item._id;

              return (
                <div 
                  key={itemId || idx} 
                  onClick={() => itemId && navigate(`/news/${itemId}`)}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group cursor-pointer"
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${idx === 0 ? "bg-red-50 text-red-600 border border-red-100" : idx === 1 ? "bg-orange-50 text-orange-600 border border-orange-100" : "bg-slate-50 text-slate-500 border border-slate-200"}`}>
                    {item.rank || (idx + 1)}
                  </span>
                  <img 
                    src={itemViewedImgUrl || fallbackPlaceholder} 
                    alt={item.title} 
                    className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackPlaceholder;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[var(--color-secondary)] transition-colors">{item.title}</p>
                    <span className="text-[11px] text-slate-400 font-semibold">{item.views || 0} مشاهدة</span>
                  </div>
                </div>
              );
            }) : (
              <div className="text-sm text-slate-400 text-center py-10">لا توجد بيانات للمشاهدات.</div>
            )}
          </div>
        </div>
      </div>

      {/* ================= الصف الثاني: توزيع المقالات (الدائرة + البارات) ================= */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm max-w-4xl">
        <h3 className="font-bold text-slate-800 text-base mb-6 flex items-center gap-2">
          <PieChart size={18} className="text-slate-400" />
          توزيع المقالات حسب التصنيف
        </h3>
        
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          
          {/* الدائرة الملونة */}
          <div 
            className="relative w-36 h-36 flex items-center justify-center shrink-0 rounded-full shadow-inner"
            style={{ background: generateConicGradient() }}
          >
            <div className="w-24 h-24 bg-white rounded-full absolute z-0 shadow-sm"></div>
            <div className="text-center z-10 relative">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">الإجمالي</span>
              <span className="text-2xl font-black text-slate-700 leading-tight">{totalArticlesCount}</span>
            </div>
          </div>

          {/* البارات والأقسام */}
          <div className="flex-1 w-full space-y-5">
            {categoryDistribution.length > 0 ? (
              categoryDistribution.map((cat, idx) => {
                const hexColor = extractHexColor(cat.color); 

                return (
                  <div key={cat._id || idx}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full shadow-sm" 
                          style={{ backgroundColor: hexColor }}
                        ></span>
                        <span className="font-bold text-slate-700">{cat.name}</span>
                      </div>
                      <span className="text-slate-500 font-mono font-bold">
                        {cat.percentage}% <span className="text-slate-400 text-xs font-normal">({cat.count} مقال)</span>
                      </span>
                    </div>
                    {/* البار الخلفي */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${cat.percentage}%`, backgroundColor: hexColor }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-slate-400 text-center py-6">لا توجد تصنيفات لعرضها حالياً.</div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}