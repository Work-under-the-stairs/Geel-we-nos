import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ArticleForm from "../components/ui/Article/ArticleForm";
import { useCreateArticle } from "../hooks/useAdmin";

export default function AddArticle() {
  const navigate = useNavigate();
  const createArticleMutation = useCreateArticle();

  const handleCreate = (payload, status) => {
    toast.loading("جاري حفظ البيانات وتجهيز المقال...", { id: "submit-toast" });

    createArticleMutation.mutate(
      { ...payload, status },
      {
        onSuccess: (response) => {
          // ⚠️ ملحوظة: تأكدي من مسار الـ ID في الرد بتاع الـ Backend الخاص بيكي
          // غالباً بيكون response.data._id أو response.data.article._id
          const newArticleId = response?.data?._id || response?.data?.article?._id || response?._id;

          toast.success(
            status === "published" ? "تم نشر المقال بنجاح! 🚀" : "تم حفظ المقال كمسودة بنجاح 💾",
            { id: "submit-toast" }
          );

          // لو اتنشر ومعانا الـ ID، نوديه لصفحة الخبر مباشرة.. غير كده نرجعه للـ Admin
          if (status === "published" && newArticleId) {
            navigate(`/news/${newArticleId}`); // عدلي مسار /article/ لو مختلف عندك
          } else {
            navigate("/admin");
          }
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "حدث خطأ أثناء الاتصال بالسيرفر", {
            id: "submit-toast",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <ArticleForm
      isEditMode={false}
      onSubmit={handleCreate}
      isSubmitting={createArticleMutation.isPending}
      onCancel={handleCancel}
    />
  );
}