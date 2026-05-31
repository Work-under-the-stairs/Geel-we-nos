import React, { useState } from 'react';
import { 
  // الأيقونات الأساسية للواجهة
  Folder, Plus, Edit, Trash2, Search, X,
  
  // --- الأيقونات القديمة (30 أيقونة) ---
  Newspaper, Globe, TrendingUp, Landmark, Scale, 
  Briefcase, Cpu, HeartPulse, Trophy, Film, 
  Music, BookOpen, ShieldAlert, Zap, Flame,
  Camera, Radio, Tv, MapPin, Stethoscope,
  Activity, Laptop, Rocket, Palette, Coins,
  Gavel, Siren, Target, Compass, Users,

  // --- الأيقونات الجديدة (21 أيقونة إضافية) ---
  Sparkles,       // حصريات / تريند / ذكاء اصطناعي
  Car,            // سيارات ومحركات
  Banknote,       // اقتصاد / بنوك / عملات
  Wallet,         // مالية / محافظ
  Building2,      // عقارات / شركات
  Plane,          // سفر / سياحة / طيران
  Utensils,       // طبخ / مطاعم / غذاء
  Dumbbell,       // لياقة بدنية / رياضة
  Medal,          // بطولات / أولمبياد
  AlertTriangle,  // حوادث / طوارئ
  Skull,          // جرائم / حوادث خطيرة
  BadgeAlert,     // أخبار عاجلة / أمنية
  Home,           // أخبار محلية / شؤون المحافظات
  CloudRain,      // طقس / مناخ
  Thermometer,    // درجات الحرارة
  Coffee,         // لايف ستايل / صباحيات
  Shirt,          // أزياء / موضة
  MessageSquare,  // مقالات رأي / نقاشات
  PenTool,        // تحرير / كتابات
  Mic,            // بودكاست / مقابلات
  Baby            // أسرة / طفولة
} from 'lucide-react';

// قاموس الأيقونات (51 أيقونة مخصصة للأقسام)
const ICONS_DICTIONARY = {
  // القديم
  Newspaper, Globe, TrendingUp, Landmark, Scale, 
  Briefcase, Cpu, HeartPulse, Trophy, Film, 
  Music, BookOpen, ShieldAlert, Zap, Flame,
  Camera, Radio, Tv, MapPin, Stethoscope,
  Activity, Laptop, Rocket, Palette, Coins,
  Gavel, Siren, Target, Compass, Users,
  
  // الجديد
  Sparkles, Car, Banknote, Wallet, Building2, 
  Plane, Utensils, Dumbbell, Medal, AlertTriangle, 
  Skull, BadgeAlert, Home, CloudRain, Thermometer, 
  Coffee, Shirt, MessageSquare, PenTool, Mic, Baby
};

export default function CategoriesTable({ 
  categories = [], 
  isLoading = false,
  onAddCategory, 
  onEditCategory, 
  onDeleteCategory 
}) {
  const [search, setSearch] = useState('');
  
  // حالات الـ Modal (النافذة المنبثقة)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // بيانات القسم الحالي (للإضافة أو التعديل)
  const [formData, setFormData] = useState({ id: null, name: '', icon_name: 'Newspaper' });

  // فلترة الأقسام محلياً
    const filteredCategories = (Array.isArray(categories) ? categories : []).filter(cat => 
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

  // فتح نافذة الإضافة
  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ id: null, name: '', icon_name: 'Newspaper' });
    setIsModalOpen(true);
  };

  // فتح نافذة التعديل
  const handleOpenEdit = (category) => {
    setEditMode(true);
    setFormData({ 
      id: category._id, 
      name: category.name, 
      icon_name: category.icon_name || 'Folder' 
    });
    setIsModalOpen(true);
  };

  // إرسال البيانات (إضافة أو تعديل)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editMode) {
      onEditCategory(formData.id, { name: formData.name, icon_name: formData.icon_name });
    } else {
      onAddCategory({ name: formData.name, icon_name: formData.icon_name });
    }
    setIsModalOpen(false);
  };

  // تأكيد الحذف
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا القسم؟ قد يؤثر ذلك على المقالات المرتبطة به.")) {
      onDeleteCategory(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      {/* --- الهيدر العلوي --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Folder size={18} className="text-slate-400" />
          <span>إدارة التصنيفات والأقسام</span>
        </h3>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* مربع البحث */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن قسم..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pr-10 pl-4 py-2 outline-none focus:bg-white focus:border-orange-400 transition-all"
            />
          </div>
          
          {/* زر إضافة قسم جديد */}
          <button 
            onClick={handleOpenAdd}
            className="bg-[var(--color-secondary)] hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-orange-600/10 shrink-0"
          >
            <Plus size={16} />
            <span>قسم جديد</span>
          </button>
        </div>
      </div>

      {/* --- جدول الأقسام --- */}
      {isLoading ? (
        <div className="py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400">
                <th className="pb-3 font-semibold pr-4">الأيقونة</th>
                <th className="pb-3 font-semibold">اسم القسم</th>
                <th className="pb-3 font-semibold">تاريخ الإضافة</th>
                <th className="pb-3 font-semibold text-left pl-4">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-400">لا توجد أقسام متاحة.</td>
                </tr>
              ) : (
                filteredCategories.map((cat) => {
                  // استخراج الأيقونة الديناميكية، لو مش موجودة نحط Folder كافتراضي
                  const IconComponent = ICONS_DICTIONARY[cat.icon_name] || Folder;

                  return (
                    <tr key={cat._id} className="hover:bg-slate-50/50 transition-all">
                      <td className="py-3.5 pr-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                          <IconComponent size={20} />
                        </div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-800">{cat.name}</td>
                      <td className="py-3.5 text-slate-500 text-xs">
                        {new Date(cat.createdAt || cat.updatedAt).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="py-3.5 text-left pl-4">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleOpenEdit(cat)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors" 
                            title="تعديل"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(cat._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 transition-colors" 
                            title="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- نافذة الإضافة والتعديل (Modal) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* رأس النافذة */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">
                {editMode ? 'تعديل القسم' : 'إضافة قسم جديد'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* محتوى النموذج */}
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              {/* اسم القسم */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">اسم القسم</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: تكنولوجيا، رياضة، سياسة..."
                  className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[var(--color-secondary)] transition-all"
                />
              </div>

              {/* اختيار الأيقونة */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">اختر أيقونة مناسبة</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-48 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                    {Object.keys(ICONS_DICTIONARY).map((iconName) => {
                      const IconNode = ICONS_DICTIONARY[iconName];
                      const isSelected = formData.icon_name === iconName;
                      
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon_name: iconName })}
                          title={iconName}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                            isSelected 
                              ? 'bg-[var(--color-secondary)] text-white shadow-md' 
                              : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                          }`}
                        >
                          <IconNode size={20} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[var(--color-secondary)] hover:bg-orange-600 transition-colors shadow-md shadow-orange-600/10"
                >
                  {editMode ? 'حفظ التعديلات' : 'إضافة القسم'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}