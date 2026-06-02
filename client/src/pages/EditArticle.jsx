import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import ArticleForm from "../components/ui/Article/ArticleForm";
import { useUpdateArticle, useAdminArticle } from "../hooks/useAdmin";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function EditArticle() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: articleData, isLoading: isArticleLoading, isError } = useAdminArticle(id);
  const updateArticleMutation = useUpdateArticle();

  const handleUpdate = (payload, status) => {
    toast.loading("جاري تحديث المقال ومزامنة البيانات...", { id: "submit-toast" });

    updateArticleMutation.mutate(
      { id, data: { ...payload, status } },
      {
        onSuccess: (updatedData) => {
          queryClient.setQueryData(['news', id], updatedData);
          toast.success("تم تحديث وحفظ المقال بنجاح! 💾", { id: "submit-toast" });

          if (status === "published") {
            navigate(`/news/${id}`);
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

  if (isArticleLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
        <p className="text-sm font-bold text-slate-600">جاري تحميل بيانات المقال للمراجعة...</p>
      </div>
    );
  }

  if (isError || !articleData) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex flex-col items-center justify-center gap-2 text-center p-4">
        <p className="text-lg font-bold text-red-500">حدث خطأ أثناء محاولة جلب المقال المطلوبة</p>
      </div>
    );
  }

  return (
    <ArticleForm
      isEditMode={true}
      initialData={articleData}
      onSubmit={handleUpdate}
      isSubmitting={updateArticleMutation.isPending}
      onCancel={handleCancel}
    />
  );
}