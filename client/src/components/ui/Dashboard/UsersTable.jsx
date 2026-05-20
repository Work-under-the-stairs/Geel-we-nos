import React, { useState } from 'react';
import { Search, User, Trash2, Edit } from 'lucide-react';
import { useAdminUsers } from '../../../hooks/useAdmin'; // 👈 اتأكدي إن مسار الهوك صح حسب مكان الفايل

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const { data, isLoading, isError } = useAdminUsers({ page, limit: 10, search, role });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <User size={18} className="text-slate-400" />
          <span>إدارة المستخدمين</span>
        </h3>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-slate-300"
            value={role}
            onChange={(e) => { setRole(e.target.value); setPage(1); }}
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
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pr-10 pl-4 py-2 outline-none focus:bg-white focus:border-orange-400 transition-all"
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
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-all">
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
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md mx-1">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md">
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
    </div>
  );
}