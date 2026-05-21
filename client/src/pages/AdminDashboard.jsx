import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FileText, Eye, Users, BarChart2, Menu, Plus } from "lucide-react";
import Sidebar from "../components/ui/Dashboard/Sidebar";
import StatCards from "../components/ui/Dashboard/StatCards";
import DashboardContent from "../components/ui/Dashboard/DashboardContent";
import UsersTable from "../components/ui/Dashboard/UsersTable";
import CategoriesTable from "../components/ui/Dashboard/CategoriesTable";
import { getUserData } from "../utils/auth"; // 👈 استدعاء دالة جلب بيانات اليوزر
import { 
  useDashboardSummary, 
  useCategories, 
  useAddCategory, 
  useUpdateCategory, 
  useDeleteCategory,
  useDeleteArticle 
} from "../hooks/useAdmin";
import AddArticle from "./AddArticle";
import ManageArticles from "../components/ui/Dashboard/ManageArticles";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("الرئيسية");

  // جلب بيانات اليوزر من الـ localStorage (المخزنة عند تسجيل الدخول)
  const userData = getUserData();

  // ==========================================
  // 1. هوكس الإحصائيات (الرئيسية) والمقالات
  // ==========================================
  const { data: dashboardData, isLoading: isDashboardLoading, isError: isDashboardError } = useDashboardSummary();
  const { mutate: deleteArticle, isPending: isDeletingArticle } = useDeleteArticle();

  // ==========================================
  // 2. هوكس الأقسام
  // ==========================================
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
  const { mutate: addCategory } = useAddCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  // خريطة الأيقونات
  const iconMap = {
    "المقالات": FileText,
    "المشاهدات": Eye,
    "المستخدمين": Users,
    "المقالات اليوم": FileText,
  };

  const topStatsWithIcons = dashboardData?.topStats?.map(stat => ({
    ...stat,
    icon: iconMap[stat.title] || BarChart2 
  })) || [];

  // دالة عرض المحتوى
  const renderContent = () => {
    if (isDashboardLoading && activeTab === "الرئيسية") {
      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-secondary)]"></div>
          <p className="text-slate-400 mt-4 font-medium">جاري جلب إحصائيات لوحة التحكم...</p>
        </div>
      );
    }

    if (isDashboardError && activeTab === "الرئيسية") {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[400px] text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100">
          حدث خطأ أثناء تحميل بيانات لوحة التحكم. تأكد من تشغيل الخادم.
        </div>
      );
    }

    switch (activeTab) {
      case "المقالات":
        return (
          <ManageArticles 
            categories={categoriesData?.data || []} 
            onDeleteArticle={deleteArticle}
            isDeletingArticle={isDeletingArticle}
          />
        );
      case "إضافة مقال":
        return (
          // <Navigate to="/add/article" />
          <AddArticle />
        );
      case "التصنيفات":
        return (
          <CategoriesTable 
            categories={categoriesData?.data || []} 
            isLoading={isCategoriesLoading}
            onAddCategory={(data) => addCategory(data)}
            onEditCategory={(id, data) => updateCategory({ id, data })} 
            onDeleteCategory={(id) => deleteCategory(id)}
          />
        );
      case "المستخدمين":
        return <UsersTable />;
      case "الرئيسية":
      default:
        return (
          <>
            <StatCards stats={topStatsWithIcons} />
            <DashboardContent 
              recentArticles={dashboardData?.recentArticles || []} 
              topViewed={dashboardData?.topViewed || []} 
              categoryDistribution={dashboardData?.categoryDistribution || []} 
              quickStats={dashboardData?.quickStats || []} 
              onDeleteArticle={deleteArticle}
              isDeletingArticle={isDeletingArticle}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 flex" dir="rtl">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="flex-1 lg:mr-64 min-w-0 flex flex-col min-h-screen">
        <main className="p-4 lg:p-8 space-y-6 flex-1">
          
          {/* ================= البار العلوي (الترحيب وزر الإضافة) ================= */}
          <div className="bg-[var(--color-primary)] p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* الجزء الأيمن: زر القائمة المخفي + رسالة الترحيب */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                aria-label="فتح القائمة"
              >
                <Menu size={22} />
              </button>

              <div>
                <h2 className="text-xl font-bold text-white flex flex-wrap items-center gap-2">
                  <span>مرحباً بك، {userData?.name || "مدير النظام"}</span>
                  <span className="animate-bounce">👋</span>
                </h2>
                <p className="text-sm text-white/80 mt-1 font-medium">إليك ملخصاً لأداء موقعك اليوم</p>
              </div>
            </div>

            {/* الجزء الأيسر: زر إضافة مقال */}
            {/* استخدمي <Link to="/add-article"> لو عندك راوت، أو سيبيها <button> لو بتفتحي Modal */}
            <button
              // onClick={() => navigate("/add/article")}
              onClick={() => setActiveTab("إضافة مقال")}
             className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(252,105,85,0.3)] w-full sm:w-auto justify-center">
              <Plus size={18} />
              <span>إضافة مقال جديد</span>
            </button>

          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}