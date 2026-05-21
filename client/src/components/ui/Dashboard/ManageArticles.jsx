import React, { useState, useMemo } from 'react';
import { Search, Filter, Trash2, Edit, Eye, FileText, AlertTriangle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ManageArticles({ articles = [], categories = [], onDeleteArticle, isDeletingArticle }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // 1. منطق الفلترة والبحث (دائناميكي)
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesSearch = 
        art.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.writer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'الكل' || art.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3" dir="rtl">
        <div className="flex items-center gap-2 text-slate-800">
          <AlertTriangle className="text-red-500" size={20} />
          <p className="font-bold text-sm">هل أنت متأكد من حذف هذا المقال؟</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={() => { toast.dismiss(t.id); onDeleteArticle(id); }} className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold">تأكيد</button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold">تراجع</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* 2. شريط البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث بالعنوان، المحتوى، أو الكاتب..."
            className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-slate-400" />
          <select 
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>الكل</option>
            {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
          </select>
          <button onClick={() => navigate('/add-article')} className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <Plus size={16} /> إضافة مقال
          </button>
        </div>
      </div>

      {/* 3. الجدول المفصل */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">المقال</th>
              <th className="p-4">التصنيف</th>
              <th className="p-4">الكاتب</th>
              <th className="p-4 text-center">المشاهدات</th>
              <th className="p-4 text-center">الحالة</th>
              <th className="p-4 text-left">العمليات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredArticles.length > 0 ? filteredArticles.map((art) => (
              <tr key={art._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4 flex items-center gap-3">
                  <img src={art.images?.[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <span className="font-bold text-slate-800 text-sm">{art.title}</span>
                </td>
                <td className="p-4 text-sm text-slate-600">{art.category}</td>
                <td className="p-4 text-sm text-slate-600">{art.writer?.name || 'غير معروف'}</td>
                <td className="p-4 text-center text-sm font-mono font-bold text-slate-700">{art.views || 0}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${art.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {art.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                </td>
                <td className="p-4 text-left">
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Eye size={16} /></button>
                    <button onClick={() => navigate(`/edit/article/${art._id}`)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(art._id)} disabled={isDeletingArticle} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-slate-400">لا توجد مقالات تطابق معايير البحث.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}