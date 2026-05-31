import React, { useState } from 'react';
import {
  Folder,
  Plus,
  Edit,
  Trash2,
  Search,
  X,

  // News & General
  Newspaper,
  Globe,
  Earth,
  Home,
  Users,

  // Politics
  Landmark,
  Scale,
  Vote,
  Flag,
  Crown,

  // Economy
  TrendingUp,
  TrendingDown,
  Banknote,
  Wallet,
  Coins,
  Bitcoin,
  Receipt,

  // Business
  Briefcase,
  Building2,
  Factory,
  Handshake,

  // Technology
  Cpu,
  Laptop,
  Smartphone,
  Rocket,
  Satellite,
  MonitorPlay,
  Sparkles,

  // Sports
  Trophy,
  Volleyball,
  Medal,
  Dumbbell,
  Gamepad2,

  // Health
  HeartPulse,
  Stethoscope,
  Activity,

  // Education
  GraduationCap,
  School,
  LibraryBig,
  BookOpen,

  // Travel
  Plane,
  Train,
  Ship,
  MapPin,

  // Environment
  Leaf,
  Trees,
  CloudRain,
  Thermometer,

  // Security
  ShieldAlert,
  BadgeAlert,
  AlertTriangle,
  Skull,
  Siren,

  // Entertainment
  Film,
  Clapperboard,
  Music,
  Tv,
  Radio,
  Camera,

  // Lifestyle
  Coffee,
  Shirt,
  Utensils,
  Baby,

  // Writing
  MessageSquare,
  PenTool,

  // Misc
  Palette,
  Flame,
  Zap,
  Target,
  Compass,
  Gem,
  Mic,
  Gavel,
  Car,
  ShoppingBag,
  Package,
} from "lucide-react";
import toast from 'react-hot-toast';

const ICONS_DICTIONARY = {
  Folder,

  // News & General
  Newspaper,
  Globe,
  Earth,
  Home,
  Users,

  // Politics
  Landmark,
  Scale,
  Vote,
  Flag,
  Crown,

  // Economy
  TrendingUp,
  TrendingDown,
  Banknote,
  Wallet,
  Coins,
  Bitcoin,
  Receipt,

  // Business
  Briefcase,
  Building2,
  Factory,
  Handshake,

  // Technology
  Cpu,
  Laptop,
  Smartphone,
  Rocket,
  Satellite,
  MonitorPlay,
  Sparkles,

  // Sports
  Trophy,
  Volleyball,
  Medal,
  Dumbbell,
  Gamepad2,

  // Health
  HeartPulse,
  Stethoscope,
  Activity,

  // Education
  GraduationCap,
  School,
  LibraryBig,
  BookOpen,

  // Travel
  Plane,
  Train,
  Ship,
  MapPin,

  // Environment
  Leaf,
  Trees,
  CloudRain,
  Thermometer,

  // Security
  ShieldAlert,
  BadgeAlert,
  AlertTriangle,
  Skull,
  Siren,

  // Entertainment
  Film,
  Clapperboard,
  Music,
  Tv,
  Radio,
  Camera,

  // Lifestyle
  Coffee,
  Shirt,
  Utensils,
  Baby,

  // Writing
  MessageSquare,
  PenTool,

  // Misc
  Palette,
  Flame,
  Zap,
  Target,
  Compass,
  Gem,
  Mic,
  Gavel,
  Car,
  ShoppingBag,
  Package,
};

export default function CategoriesTable({ 
  categories = [], 
  isLoading = false,
  onAddCategory, 
  onEditCategory, 
  onDeleteCategory 
}) {
const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', icon_name: 'Newspaper' });

  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ id: null, name: '', icon_name: 'Newspaper' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditMode(true);
    setFormData({ 
      id: category._id, 
      name: category.name, 
      icon_name: category.icon_name || 'Folder' 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editMode) {
        await onEditCategory(formData.id, { name: formData.name, icon_name: formData.icon_name });
        toast.success("تم تعديل القسم بنجاح!");
      } else {
        await onAddCategory({ name: formData.name, icon_name: formData.icon_name });
        toast.success("تم إضافة القسم بنجاح!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-bold text-sm">هل أنت متأكد؟</p>
        <p className="text-xs text-slate-600">سيتم حذف القسم وتحويل جميع الأخبار المرتبطة به إلى "قسم عام".</p>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              
              try {
                await onDeleteCategory(id);
                toast.success("تم حذف القسم والأخبار الخاصة به أصبحت غير مصنفة");
              } catch (error) {
                toast.error("فشل حذف القسم");
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold"
          >
            تأكيد الحذف
          </button>
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="bg-slate-200 px-3 py-1 rounded-md text-xs font-bold"
          >
            تراجع
          </button>
        </div>
      </div>
    ), { duration: Infinity });
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