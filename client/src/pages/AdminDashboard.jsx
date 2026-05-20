import React, { useState } from "react";
import { FileText, Eye, Users, BarChart2 } from "lucide-react";
import Sidebar from "../components/ui/Dashboard/Sidebar";
import TopNav from "../components/ui/Dashboard/TopNav";
import StatCards from "../components/ui/Dashboard/StatCards";
import DashboardContent from "../components/ui/Dashboard/DashboardContent";
import UsersTable from "../components/ui/Dashboard/UsersTable"; // 👈 استدعينا جدول المستخدمين
import { useDashboardSummary } from "../hooks/useAdmin"; // 👈 استدعينا الهوك

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("الرئيسية"); // 👈 للتحكم في التنقل بين الصفحات

  const { data, isLoading, isError } = useDashboardSummary();

  const iconMap = {
    "المقالات": FileText,
    "المشاهدات": Eye,
    "المستخدمين": Users,
    "المقالات اليوم": FileText,
  };

  // إضافة الأيقونات لبيانات الكروت العلوية
  const topStatsWithIcons = data?.topStats?.map(stat => ({
    ...stat,
    icon: iconMap[stat.title] || BarChart2 // لو الأيقونة مش في الخريطة استخدم BarChart2 كافتراضي
  })) || [];

  // دالة لتحديد المحتوى اللي هيتعرض (الرئيسية ولا المستخدمين ولا غيره)
  const renderContent = () => {
    // حالة التحميل
    if (isLoading && activeTab === "الرئيسية") {
      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-secondary)]"></div>
          <p className="text-slate-400 mt-4 font-medium">جاري جلب إحصائيات لوحة التحكم...</p>
        </div>
      );
    }

    // حالة الخطأ
    if (isError && activeTab === "الرئيسية") {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[400px] text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100">
          حدث خطأ أثناء تحميل بيانات لوحة التحكم. تأكد من تشغيل الخادم.
        </div>
      );
    }

    // عرض المحتوى بناءً على التبويب النشط
    switch (activeTab) {
      case "المستخدمين":
        return <UsersTable />;
      case "الرئيسية":
      default:
        return (
          <>
            {/* كروت الإحصائيات العلوية */}
            <StatCards stats={topStatsWithIcons} />

            {/* باقي محتوى لوحة التحكم (الجداول والرسومات) */}
            <DashboardContent 
              recentArticles={data?.recentArticles || []} 
              topViewed={data?.topViewed || []} 
              categoryDistribution={data?.categoryDistribution || []} 
              quickStats={data?.quickStats || []} 
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 flex" dir="rtl">
      
      {/* مررنا الـ activeTab والـ setActiveTab للـ Sidebar عشان الزراير تشتغل */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 lg:mr-64 min-w-0 flex flex-col min-h-screen">
        <TopNav setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-4 lg:p-8 space-y-6 flex-1">
          {/* رسالة الترحيب ثابتة فوق */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>مرحباً بك، محمد السيد</span>
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">إليك ملخصاً لأداء موقعك اليوم</p>
            </div>
          </div>

          {/* استدعاء المحتوى المتغير */}
          {renderContent()}
          
        </main>
      </div>
    </div>
  );
}