import React from "react";
import { Newspaper } from "lucide-react"; // أيقونة لوسيد تليق بالموقع الإخباري

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 p-6 text-white" dir="rtl">
      
      {/* الخلفية الإبداعية المضيئة (Glow Effect) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[var(--color-secondary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative flex flex-col items-center max-w-sm w-full text-center space-y-8">
        
        {/* الـ Spinner المركزي المبتكر مع الأيقونة */}
        <div className="relative flex items-center justify-center">
          {/* الدائرة الخارجية المتحركة */}
          <div className="w-20 h-20 rounded-full border-2 border-white/5 border-t-[var(--color-secondary)] animate-spin duration-700" />
          
          {/* الدائرة الداخلية المعاكسة */}
          <div className="absolute w-14 h-14 rounded-full border-2 border-transparent border-b-white/20 animate-[spin_1s_linear_infinite_reverse]" />
          
          {/* الأيقونة الثابتة في المنتصف مع نبض خفيف */}
          <div className="absolute text-[var(--color-secondary)] animate-pulse">
            <Newspaper size={28} strokeWidth={1.5} />
          </div>
        </div>

        {/* نصوص التحميل الشيك */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            جيل و نص
          </h2>
          <p className="text-xs text-gray-400 font-light tracking-widest animate-pulse">
            جاري تحميل آخر المستجدات...
          </p>
        </div>

        {/* الـ Skeleton التخيلي أسفل اللودينج عشان يدي إيحاء بترتيب الأخبار */}
        <div className="w-full pt-6 border-t border-white/5 space-y-3 opacity-40">
          <div className="h-3 bg-white/10 rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-2 bg-white/5 rounded-full w-1/2 mx-auto animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>

      </div>
    </div>
  );
}