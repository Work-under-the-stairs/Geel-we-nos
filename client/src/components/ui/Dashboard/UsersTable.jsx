import React, { useState } from 'react';
import { Search, User, Trash2, Edit, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminUsers, useUpdateUser } from '../../../hooks/useAdmin'; 

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // States الخاصة بالمودال (نافذة التعديل)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const { data, isLoading, isError } = useAdminUsers({ page, limit: 10, search, role: roleFilter });
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(); // 👈 استدعاء هوك التحديث

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  // فتح نافذة التعديل وتجهيز الداتا
  const openEditModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  // إغلاق النافذة
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // تنفيذ التحديث
  const handleSaveRole = () => {
    if (!selectedUser || !newRole) return;

    updateUser({ id: selectedUser._id, data: { role: newRole } }, {
      onSuccess: () => {
        toast.success(`تم تحديث رتبة ${selectedUser.name} بنجاح`);
        closeModal();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث");
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 relative">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <User size={18} className="text-slate-400" />
          <span>إدارة المستخدمين</span>
        </h3>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-slate-300 transition-colors cursor-pointer"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option value="">الكل</option>
            <option value="user">مستخدم عادي</option>
            <option value="writer">كاتب</option>
            <option value="admin">مدير</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو الإيميل..."
              value={search}
              onChange={handleSearch}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pr-10 pl-4 py-2 outline-none focus:bg-white focus:border-[var(--color-primary)] transition-all"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-10 text-center text-slate-400">جاري تحميل المستخدمين...</div>
      ) : isError ? (
        <div className="py-10 text-center text-red-500">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400">
                  <th className="pb-3 font-semibold">المستخدم</th>
                  <th className="pb-3 font-semibold">البريد الإلكتروني</th>
                  <th className="pb-3 font-semibold">الرتبة</th>
                  <th className="pb-3 font-semibold text-left pl-2">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {data?.users?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">لا يوجد مستخدمين مطابقين للبحث.</td>
                  </tr>
                ) : (
                  data?.users?.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="py-3.5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800">{user.name}</h3>
                          <p className="text-xs text-slate-400">@{user.username}</p>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-500 text-xs">{user.email}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-50 text-red-600' :
                          user.role === 'writer' ? 'bg-teal-50 text-teal-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {user.role === 'admin' ? 'مدير' : user.role === 'writer' ? 'كاتب' : 'مستخدم'}
                        </span>
                      </td>
                      <td className="py-3.5 text-left pl-2">
                        {/* 👈 زر التعديل أصبح يفتح المودال */}
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mx-1"
                          title="تعديل الرتبة"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {data?.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
              <p className="text-xs text-slate-400">
                إجمالي: {data.total} مستخدم
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1 text-xs border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"
                >
                  السابق
                </button>
                <span className="text-xs font-semibold text-slate-600">
                  صفحة {page} من {data.totalPages}
                </span>
                <button 
                  disabled={page === data.totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1 text-xs border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ======================= نافذة التعديل (Modal) ======================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* رأس النافذة */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800">تعديل رتبة المستخدم</h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-1 rounded-md transition-colors border border-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* محتوى النافذة */}
            <div className="p-5 space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">المستخدم الحالي:</p>
                <p className="font-bold text-sm text-slate-800">{selectedUser?.name}</p>
                <p className="text-xs text-slate-400 font-mono">{selectedUser?.email}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">اختر الرتبة الجديدة:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer"
                >
                  <option value="user">مستخدم عادي (قارئ)</option>
                  <option value="writer">كاتب (يضيف مقالات)</option>
                  <option value="admin">مدير (صلاحيات كاملة)</option>
                </select>
              </div>
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <button 
                onClick={handleSaveRole}
                disabled={isUpdating || newRole === selectedUser?.role}
                className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'جاري الحفظ...' : 'حفظ التعديلات'}
              </button>
              <button 
                onClick={closeModal}
                disabled={isUpdating}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                إلغاء
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}