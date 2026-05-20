import React, { useState } from "react";
import {
  Home,
  FileText,
  PlusCircle,
  Folder,
  MessageSquare,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Search,
  Grid,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Mock Data & Configurations (Prevents Duplication) ---
  const sidebarLinks = [
    { name: "الرئيسية", icon: Home, active: true },
    { name: "المقالات", icon: FileText },
    { name: "إضافة مقال", icon: PlusCircle },
    { name: "التصنيفات", icon: Folder },
    { name: "التعليقات", icon: MessageSquare },
    { name: "المستخدمين", icon: Users },
    { name: "الإحصائيات", icon: BarChart2 },
    { name: "الإعدادات", icon: Settings },
  ];

  const topStats = [
    {
      title: "المقالات",
      value: "1,250",
      sub: "إجمالي المقالات",
      icon: FileText,
      color: "bg-red-50 text-red-500",
    },
    {
      title: "المشاهدات",
      value: "156,320",
      sub: "+ 12.5% هذا الأسبوع",
      icon: Eye,
      color: "bg-orange-50 text-orange-500",
      trend: true,
    },
    {
      title: "المستخدمين",
      value: "2,450",
      sub: "+ 180+ هذا الأسبوع",
      icon: Users,
      color: "bg-teal-50 text-teal-500",
      trend: true,
    },
    {
      title: "المقالات اليوم",
      value: "8",
      sub: "من أمس",
      icon: FileText,
      color: "bg-red-50 text-red-500",
      trend: true,
    },
  ];

  const recentArticles = [
    {
      title: "الذكاء الاصطناعي في التعليم الجامعي",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      category: "تعليم وثقافة",
      date: "17 مايو 2024",
      status: "منشور",
      views: "24,530",
      statusColor: "bg-green-50 text-green-600",
    },
    {
      title: "دراسة: النوم المبكر يزيد من الإنتاجية",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e",
      category: "صحة",
      date: "16 مايو 2024",
      status: "منشور",
      views: "18,220",
      statusColor: "bg-green-50 text-green-600",
    },
    {
      title: "تطورات جديدة في عالم التكنولوجيا",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      category: "تكنولوجيا",
      date: "15 مايو 2024",
      status: "مسودة",
      views: "15,870",
      statusColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "خطوات بسيطة لتحسين صحتك النفسية",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      category: "صحة",
      date: "14 مايو 2024",
      status: "منشور",
      views: "12,450",
      statusColor: "bg-green-50 text-green-600",
    },
    {
      title: "التضخم العالمي وتأثيره علي الاقتصاد",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      category: "اقتصاد",
      date: "13 مايو 2024",
      status: "منشور",
      views: "11,230",
      statusColor: "bg-green-50 text-green-600",
    },
  ];

  const topViewed = [
    {
      rank: 1,
      title: "الذكاء الاصطناعي يغير مستقبل التعليم",
      views: "24,530",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e",
    },
    {
      rank: 2,
      title: "تطورات جديدة في عالم التكنولوجيا",
      views: "18,220",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    },
    {
      rank: 3,
      title: "خطوات لتحسين الصحة النفسية",
      views: "12,450",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      rank: 4,
      title: "تطورات جديدة في عالم التكنولوجيا",
      views: "18,220",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    },
    {
      rank: 5,
      title: "خطوات لتحسين الصحة النفسية",
      views: "12,450",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
  ];

  const categoryDistribution = [
    { name: "تعليم وثقافة", percentage: 35, count: 438, color: "bg-[#FF6347]" },
    { name: "تكنولوجيا", percentage: 25, count: 313, color: "bg-[#2E8B57]" },
    { name: "صحة", percentage: 15, count: 188, color: "bg-[#4682B4]" },
    { name: "اقتصاد", percentage: 10, count: 125, color: "bg-[#DAA520]" },
    { name: "أمني", percentage: 5, count: 63, color: "bg-[#BA55D3]" },
    { name: "أخرى", percentage: 10, count: 123, color: "bg-[#A9A9A9]" },
  ];

  const quickStats = [
    { label: "التعليقات", value: "1,230" },
    { label: "المشاركات", value: "3,456" },
    { label: "المستخدمين النشطين", value: "1,890" },
    { label: "نسبة الارتداد", value: "45.2%" },
  ];

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 flex"
      dir="rtl"
    >
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-[var(--color-primary)] text-white transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col bulk-sidebar`}
      >
        {/* Brand Logo */}
        <div className="p-6 flex items-center justify-between border-b border-[#134E5E]">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo_rev_crop.png"
              alt="جيل ونص"
              className="w-60 h-15 rounded-2xl object-contain"
            />

            {/* <div>
              <h1 className="font-black text-lg leading-tight text-white">
                جيل ونص
              </h1>

              <span className="text-xs text-slate-400">لوحة التحكم</span>
            </div> */}
          </div>

          <button
            className="lg:hidden text-slate-400 hover:text-white transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={idx}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  link.active
                    ? "bg-[var(--color-secondary)] text-white shadow-lg shadow-orange-600/10"
                    : "text-slate-300 hover:bg-[#134E5E] hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#134E5E]">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </a>
        </div>
      </aside>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="flex-1 lg:mr-64 min-w-0 flex flex-col min-h-screen">
        {/* --- TOP NAVBAR --- */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          {/* Right Side: Profile & Search Trigger */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-slate-600 bg-slate-50 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Grid size={20} />
            </button>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
              />
              <div className="hidden sm:block text-right">
                <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                  <span>أ. محمد السيد</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
                <span className="text-xs text-slate-400">مدير النظام</span>
              </div>
            </div>
          </div>

          {/* Left Side: Search Bar & Global CTA */}
          <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
            <div className="relative w-full max-w-xs hidden md:block">
              <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="بحث عن مقال، تصنيف، مستخدم..."
                className="w-full bg-slate-50 text-sm py-2.5 pr-10 pl-4 rounded-xl border border-transparent focus:bg-white focus:border-slate-200 outline-none transition-all text-right"
              />
            </div>
            <button className="bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-orange-600 transition-all shadow-md shadow-orange-600/10 whitespace-nowrap">
              <span>+ إضافة مقال جديد</span>
            </button>
          </div>
        </header>

        {/* --- MAIN BODY WORKSPACE --- */}
        <main className="p-4 lg:p-8 space-y-6 flex-1">
          {/* Welcome Message */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>مرحباً بك، محمد السيد</span>
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                إليك ملخصاً لأداء موقعك اليوم
              </p>
            </div>
          </div>

          {/* --- TOP ROW STAT CARDS --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-400">
                      {stat.title}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800">
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                      {stat.trend && <ArrowUpRight size={12} />}
                      <span>{stat.sub}</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- MIDDLE ROW: ARTICLES TABLE & MOST VIEWED --- */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Articles Main Table */}
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
                        <th className="pb-3 font-semibold text-left pl-2">
                          العمليات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {recentArticles.map((art, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 transition-all group"
                        >
                          <td className="py-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.image}
                                alt={art.title}
                                className="w-14 h-14 rounded-2xl object-cover shrink-0"
                              />

                              <div className="min-w-0">
                                <h3 className="font-semibold text-slate-800 truncate max-w-[220px]">
                                  {art.title}
                                </h3>

                                <p className="text-xs text-slate-400 mt-1">
                                  بواسطة الإدارة
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 text-slate-500 text-xs">
                            {art.category}
                          </td>

                          <td className="py-3.5 text-slate-400 text-xs">
                            {art.date}
                          </td>

                          <td className="py-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${art.statusColor}`}
                            >
                              {art.status}
                            </span>
                          </td>

                          <td className="py-3.5 font-semibold text-slate-700 text-xs">
                            {art.views}
                          </td>

                          <td className="py-3.5 text-left pl-2">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
                                <Eye size={14} />
                              </button>

                              <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100">
                                <Edit size={14} />
                              </button>

                              <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100">
                                <Trash2 size={14} />
                              </button>

                              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md">
                                <MoreVertical size={14} />
                              </button>
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

            {/* Top Viewed List Card */}
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
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer"
                    >
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          idx === 0
                            ? "bg-red-50 text-red-600"
                            : idx === 1
                              ? "bg-orange-50 text-orange-600"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.rank}
                      </span>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#FF6B4A] transition-colors">
                          {item.title}
                        </p>

                        <span className="text-[11px] text-slate-400 font-semibold">
                          {item.views} مشاهدة
                        </span>
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

          {/* --- BOTTOM ROW: METRICS & DISTRIBUTION CHARTS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Views Over Time Line Graph Card Placeholder */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 text-sm">
                  المشاهدات خلال آخر 7 أيام
                </h3>
                <select className="bg-slate-50 text-xs font-medium text-slate-500 border border-slate-100 rounded-lg px-2 py-1.5 outline-none">
                  <option>7 أيام</option>
                  <option>30 يوم</option>
                </select>
              </div>

              {/* Clean Simulated Area Graph */}
              <div className="h-44 flex flex-col justify-between pt-4 relative">
                <div className="absolute inset-x-0 bottom-6 top-4 flex flex-col justify-between pointer-events-none">
                  {[40, 30, 20, 10, 0].map((v, i) => (
                    <div
                      key={i}
                      className="w-full border-t border-slate-100/70 flex justify-between text-[10px] text-slate-300 pt-0.5"
                    >
                      <span></span>
                      <span>{v}K</span>
                    </div>
                  ))}
                </div>

                {/* Visual Line Graph Shape Component */}
                <div className="flex-1 w-full bottom-0 flex items-end justify-between px-2 z-10 h-28">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 300 100"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="grad"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FF5A36"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF5A36"
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 80 Q 25 50 50 55 T 100 65 T 150 75 T 200 45 T 250 50 T 300 15 L 300 100 L 0 100 Z"
                      fill="url(#grad)"
                    />
                    <path
                      d="M 0 80 Q 25 50 50 55 T 100 65 T 150 75 T 200 45 T 250 50 T 300 15"
                      fill="none"
                      stroke="#FF5A36"
                      strokeWidth="2.5"
                    />
                    <circle cx="300" cy="15" r="4" fill="#FF5A36" />
                  </svg>
                </div>

                {/* X-Axis labels */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium px-1 border-t border-slate-100 pt-2 z-10">
                  {[
                    "الجمعة",
                    "الخميس",
                    "الأربعاء",
                    "الثلاثاء",
                    "الاثنين",
                    "الأحد",
                    "السبت",
                  ].map((day, i) => (
                    <span key={i}>{day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Breakdown Donut Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-4">
                  المقالات حسب التصنيف
                </h3>
                <div className="flex flex-row-reverse items-center justify-between gap-4 mt-2">
                  {/* Pseudo Donut Chart Layout */}
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <div className="w-full h-full rounded-full border-[14px] border-slate-100 absolute"></div>
                    <div className="w-full h-full rounded-full border-[14px] border-t-[#FF6347] border-r-[#2E8B57] border-b-[#4682B4] border-l-transparent rotate-45 absolute"></div>
                    <div className="text-center z-10">
                      <span className="text-xs text-slate-400 block">
                        الإجمالي
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        1,250
                      </span>
                    </div>
                  </div>

                  {/* List items without redundancy */}
                  <div className="flex-1 space-y-1.5">
                    {categoryDistribution.map((cat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-right text-[11px]"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${cat.color}`}
                          ></span>
                          <span className="text-slate-500 font-medium">
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-slate-400 font-mono font-semibold">
                          {cat.percentage}% ({cat.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Micro Performance Metrics */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 text-sm mb-4">
                إحصائيات سريعة
              </h3>
              <div className="divide-y divide-slate-50">
                {quickStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 text-xs"
                  >
                    <span className="text-slate-500 font-medium">
                      {stat.label}
                    </span>
                    <span className="font-bold text-slate-800 font-mono">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
