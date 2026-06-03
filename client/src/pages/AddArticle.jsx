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
          

          const newArticleId = response?.data?._id;

          toast.success(
            status === "published" ? "تم نشر المقال بنجاح! 🚀" : "تم حفظ المقال كمسودة بنجاح 💾",
            { id: "submit-toast" }
          );

          if (status === "published" && newArticleId) {
            navigate(`/news/${newArticleId}`);
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