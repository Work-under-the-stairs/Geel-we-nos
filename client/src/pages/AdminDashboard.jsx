import React, { useState } from "react";
import { FileText, Eye, Users, BarChart2 } from "lucide-react";
import Sidebar from "../components/ui/Dashboard/Sidebar";
import TopNav from "../components/ui/Dashboard/TopNav";
import StatCards from "../components/ui/Dashboard/StatCards";
import DashboardContent from "../components/ui/Dashboard/DashboardContent";
import UsersTable from "../components/ui/Dashboard/UsersTable";
import CategoriesTable from "../components/ui/Dashboard/CategoriesTable";
import { 
  useDashboardSummary, 
  useCategories, 
  useAddCategory, 
  useUpdateCategory, 
  useDeleteCategory,
  useDeleteArticle // 👈 استدعينا هوك حذف المقال هنا
} from "../hooks/useAdmin";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("الرئيسية");

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
    // حالة تحميل الرئيسية فقط
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
      case "التصنيفات":
        console.log("Categories Data:", categoriesData);
        return (
          <CategoriesTable 
            categories={categoriesData.data|| []} 
            isLoading={isCategoriesLoading}
            onAddCategory={(data) => addCategory(data)}
            // في React Query V5 بنبعت الـ id والداتا في Object واحد لو الـ Mutation بياخد أكتر من باراميتر
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
              // 👈 نمرر دالة وحالة الحذف بالبروبس للكومبوننت
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
        <TopNav setIsSidebarOpen={setIsSidebarOpen} />
        <main className="p-4 lg:p-8 space-y-6 flex-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>مرحباً بك، محمد السيد</span>
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">إليك ملخصاً لأداء موقعك اليوم</p>
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}