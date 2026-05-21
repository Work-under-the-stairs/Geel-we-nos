import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Edit, Eye, AlertTriangle, Plus, ChevronRight, ChevronLeft, ArrowUpDown, Loader2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAdminArticles } from '../../../hooks/useAdmin'; // 👈 تأكدي من مسار الاستيراد الصحيح

export default function ManageArticles({ categories = [], onDeleteArticle, isDeletingArticle }) {
  const navigate = useNavigate();
  
  // ================= State للفلترة والبحث =================
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10, // عدد المقالات في الصفحة
    search: '',
    status: '',
    category: '',
    sort: '-createdAt' // الافتراضي: الأحدث
  });

  // ================= Debounce للبحث =================
  // عشان ما يبعتش Request للسيرفر مع كل حرف، بيستنى نص ثانية بعد ما اليوزر يخلص كتابة
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput, page: 1 }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // ================= جلب الداتا من السيرفر =================
  const { data: articlesData, isLoading, isFetching } = useAdminArticles(filters);
  
  // استخراج الداتا (تأكدي من شكل الرد من الباك إند، غالباً بيكون data.data للمصفوفة و data.totalPages للصفحات)
  const articles = articlesData?.data || [];
  const totalPages = articlesData?.totalPages || 1;

  // ================= دوال التغيير =================
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  const toggleSort = () => {
    setFilters(prev => ({
      ...prev,
      sort: prev.sort === '-createdAt' ? '-views' : '-createdAt',
      page: 1
    }));
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3" dir="rtl">
        <div className="flex items-center gap-2 text-slate-800">
          <AlertTriangle className="text-red-500" size={20} />
          <p className="font-bold text-sm">هل أنت متأكد من حذف هذا المقال؟</p>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <button onClick={() => { toast.dismiss(t.id); onDeleteArticle(id); }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">تأكيد الحذف</button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">تراجع</button>
        </div>
      </div>
    ), { duration: 5000, position: 'top-center' });
  };

  return (
    <div className="space-y-6">
      
      {/* ================= 1. شريط البحث والفلاتر ================= */}
      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        
        {/* البحث */}
        <div className="relative w-full xl:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث بالعنوان، المحتوى، أو الكاتب..."
            className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        {/* الفلاتر والأزرار */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 flex-1 sm:flex-none">
            <Filter size={16} className="text-slate-400 shrink-0" />
            <select 
              className="bg-transparent py-2.5 px-2 text-sm outline-none w-full cursor-pointer text-slate-700 font-medium"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
            >
              <option value="">كل الأقسام</option>
              {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
          </div>

          <select 
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer text-slate-700 font-medium flex-1 sm:flex-none"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
          >
            <option value="">كل الحالات</option>
            <option value="published">منشور فقط</option>
            <option value="draft">مسودة فقط</option>
          </select>

          <button 
            onClick={toggleSort}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors flex-1 sm:flex-none justify-center ${filters.sort === '-views' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
          >
            <ArrowUpDown size={16} />
            {filters.sort === '-views' ? 'الأكثر مشاهدة' : 'الأحدث'}
          </button>

          <button onClick={() => navigate('/add-article')} className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
            <Plus size={18} /> مقال جديد
          </button>
        </div>
      </div>

      {/* ================= 2. الجدول ================= */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative min-h-[400px]">
        {/* مؤشر التحميل */}
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="p-4">المقال</th>
                <th className="p-4">التصنيف</th>
                <th className="p-4">الكاتب</th>
                <th className="p-4 text-center">المشاهدات</th>
                <th className="p-4 text-center">الحالة</th>
                <th className="p-4 text-left">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length > 0 ? articles.map((art) => (
                <tr key={art._id} className="hover:bg-slate-50/80 transition-colors group">
                  
                  {/* عمود الصورة والعنوان */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={art.images?.[0] || 'https://via.placeholder.com/150'} 
                        alt={art.title} 
                        className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0" 
                      />
                      <div className="min-w-0 max-w-[250px] md:max-w-[300px]">
                        <p className="font-bold text-slate-800 text-sm truncate group-hover:text-[var(--color-primary)] transition-colors" title={art.title}>
                          {art.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">
                          {new Date(art.createdAt).toLocaleString('ar-EG', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* عمود التصنيف */}
                  <td className="p-4 text-sm font-semibold text-slate-600">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
                      {art.category?.name || art.category || 'غير محدد'}
                    </span>
                  </td>

                  {/* عمود الكاتب */}
                  <td className="p-4 text-sm font-medium text-slate-600">
                    {art.writer?.name || 'الإدارة'}
                  </td>

                  {/* عمود المشاهدات */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-sm font-mono font-bold text-slate-700">
                      {art.views || 0}
                    </span>
                  </td>

                  {/* عمود الحالة */}
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                      art.status === 'draft' // 👈 غيرنا الشرط هنا
                        ? 'bg-amber-50 text-amber-600 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                    }`}>
                      {art.status === 'draft' ? 'مسودة' : 'منشور'} 
                    </span>
                  </td>

                  {/* عمود العمليات */}
                  <td className="p-4 text-left">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => navigate(`/news/${art._id}`)} // افتراضي لصفحة عرض المقال
                        className="p-2 text-slate-400 hover:text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)]/10 rounded-lg transition-all" 
                        title="عرض"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => navigate(`/edit/article/${art._id}`)} 
                        className="p-2 text-slate-400 hover:text-blue-600 bg-transparent hover:bg-blue-50 rounded-lg transition-all"
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(art._id)} 
                        disabled={isDeletingArticle} 
                        className="p-2 text-slate-400 hover:text-red-600 bg-transparent hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <FileText size={48} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-slate-500 font-medium text-lg">لا توجد مقالات تطابق معايير البحث.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= 3. الترقيم (Pagination) ================= */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-sm font-medium text-slate-500">
              صفحة <span className="font-bold text-slate-800">{filters.page}</span> من <span className="font-bold text-slate-800">{totalPages}</span>
            </span>
            
            <div className="flex items-center gap-1" dir="ltr">
              {/* زر السابق (عكس الاتجاه لأن الموقع RTL) */}
              <button 
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {/* أرقام الصفحات */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border transition-all ${
                    filters.page === page 
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* زر التالي */}
              <button 
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}