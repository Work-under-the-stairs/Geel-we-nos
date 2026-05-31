import React, { useState } from 'react';
import { Search, User, Trash2, Edit, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminUsers, useUpdateUser, useDeleteUser } from '../../../hooks/useAdmin'; // 👈 استدعاء هوك الحذف

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // States الخاصة بالمودال (نافذة التعديل)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  // الهوكس
  const { data, isLoading, isError } = useAdminUsers({ page, limit: 10, search, role: roleFilter });
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser(); // 👈 تفعيل هوك الحذف

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  // ====== دوال التعديل ======
  const openEditModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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

  // ====== دالة الحذف (Custom Toast) ======
  const handleDeleteUser = (user) => {
    toast((t) => (
      <div className="flex flex-col gap-3" dir="rtl">
        <div className="flex items-center gap-2 text-slate-800">
          <AlertTriangle className="text-red-500" size={20} />
          <p className="font-bold text-sm">هل أنت متأكد من حذف المستخدم؟</p>
        </div>
        <p className="text-xs text-slate-500">
          سيتم حذف حساب "<span className="font-bold text-slate-700">{user.name}</span>" نهائياً. لا يمكن التراجع.
        </p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id); // إغلاق التوست
              // تنفيذ الحذف
              deleteUser(user._id, {
                onSuccess: () => toast.success("تم حذف المستخدم بنجاح"),
                onError: (error) => toast.error(error.response?.data?.message || "حدث خطأ أثناء الحذف")
              });
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

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 relative shadow-sm">
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
            <option value="admin">أدمن</option>
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
        <div className="py-10 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          <span>جاري تحميل المستخدمين...</span>
        </div>
      ) : isError ? (
        <div className="py-10 text-center text-red-500 font-bold bg-red-50 rounded-xl">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">المستخدم</th>
                  <th className="pb-3 font-semibold">البريد الإلكتروني</th>
                  <th className="pb-3 font-semibold">الرتبة</th>
                  <th className="pb-3 font-semibold text-left pl-2">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {data?.users?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-slate-400">لا يوجد مستخدمين مطابقين للبحث.</td>
                  </tr>
                ) : (
                  data?.users?.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] font-bold shrink-0 border border-[var(--color-secondary)]/20 shadow-sm">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800">{user.name}</h3>
                          <p className="text-[11px] text-slate-400 font-medium">@{user.username}</p>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-xs font-medium">{user.email}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                          user.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-100' :
                          user.role === 'writer' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                          'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {user.role === 'admin' ? 'أدمن' : 'مستخدم'}
                        </span>
                      </td>
                      <td className="py-4 text-left pl-2">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => openEditModal(user)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mx-1 cursor-pointer"
                            title="تعديل الرتبة"
                          >
                            <Edit size={16} />
                          </button>
                          {/* 👈 زر الحذف هنا */}
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            disabled={isDeleting}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                            title="حذف المستخدم"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {data?.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-4">
              <p className="text-xs text-slate-400 font-medium">
                إجمالي: <span className="font-bold text-slate-700">{data.total}</span> مستخدم
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-1.5 text-xs font-bold border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition-colors"
                >
                  السابق
                </button>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  صفحة {page} من {data.totalPages}
                </span>
                <button 
                  disabled={page === data.totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-1.5 text-xs font-bold border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition-colors"
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
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* رأس النافذة */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800">تعديل رتبة المستخدم</h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-1.5 rounded-xl transition-colors border border-slate-200 shadow-sm"
              >
                <X size={16} />
              </button>
            </div>

            {/* محتوى النافذة */}
            <div className="p-5 space-y-5">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold shrink-0">
                  {selectedUser?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{selectedUser?.name}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedUser?.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">اختر الرتبة الجديدة:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all cursor-pointer font-medium text-slate-700"
                >
                  <option value="user">مستخدم عادي (قارئ)</option>
                  <option value="admin">أدمن (صلاحيات كاملة)</option>
                </select>
              </div>
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <button 
                onClick={handleSaveRole}
                disabled={isUpdating || newRole === selectedUser?.role}
                className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-sm"
              >
                {isUpdating ? 'جاري الحفظ...' : 'حفظ التعديلات'}
              </button>
              <button 
                onClick={closeModal}
                disabled={isUpdating}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
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