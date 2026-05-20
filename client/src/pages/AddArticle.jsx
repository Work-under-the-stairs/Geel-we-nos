import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import toast from "react-hot-toast";
import { uploadToImageKit, IK_FOLDERS } from "../services/Useimagekit";

import { useCreateArticle } from "../hooks/useAdmin";
import { useCategories } from "../hooks/useArticles";

import {
  SidebarStepper,
  BasicInfoSection,
  EditorSection,
  MediaSection,
  ImportanceSection,
  ActionButtonsSection
} from "../components/ui/Article/Overlay";

export default function AddArticle() {
  const { data: categories, isLoading: isCatsLoading, isError: isCatsError } = useCategories();
  const createArticleMutation = useCreateArticle();

  // ── States ───────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [importance, setImportance] = useState(5);
  const [isUrgent, setIsUrgent] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");

  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredUploading, setFeaturedUploading] = useState(false);
  const [featuredProgress, setFeaturedProgress] = useState(0);

  const [gallery, setGallery] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState(0);

  const [videoPreview, setVideoPreview] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const [editorMediaList, setEditorMediaList] = useState([]);
  const [editorUploading, setEditorUploading] = useState(false);
  const [editorUploadLabel, setEditorUploadLabel] = useState("");
  const [editorProgress, setEditorProgress] = useState(0);

  // ── Refs ─────────────────────────────────────────────────────
  const basicInfoRef = useRef(null);
  const contentRef = useRef(null);
  const mediaRef = useRef(null);
  const importanceRef = useRef(null);
  const publishRef = useRef(null);

  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const deleteMediaFromServer = async (fileId) => {
    if (!fileId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/imagekit/delete/${fileId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log(`✅ تم حذف الملف للمعرف: ${fileId}`);
      }
    } catch (err) {
      console.error("❌ خطأ في مسار الحذف:", err.message);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({ openOnClick: false }),
      Image.configure({ HTMLAttributes: { class: "editor-uploaded-img" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<h2>ابدأ بكتابة المقال...</h2>",
    editorProps: {
      attributes: {
        class: "min-h-[350px] md:min-h-[500px] outline-none p-4 md:p-6 text-slate-700 leading-8 text-[15px]",
      },
    },
    onUpdate: ({ editor }) => {
      const currentHTML = editor.getHTML();
      setEditorMediaList((prevList) => {
        const remainingMedia = [];
        prevList.forEach((media) => {
          const cleanUrl = media.url.split("?")[0];
          if (currentHTML.includes(cleanUrl) || (media.fileId && currentHTML.includes(media.fileId))) {
            remainingMedia.push(media);
          } else {
            deleteMediaFromServer(media.fileId);
          }
        });
        return remainingMedia;
      });
    },
  });

  const handleSubmitArticle = (targetStatus) => {
    if (!title.trim()) {
      toast.error("برجاء إدخال عنوان المقال أولاً");
      scrollToSection(basicInfoRef);
      return;
    }
    if (!category) {
      toast.error("برجاء اختيار قسم للمقال");
      scrollToSection(basicInfoRef);
      return;
    }

    const contentHTML = editor?.getHTML() || "";
    if (!contentHTML || contentHTML === "<h2>ابدأ بكتابة المقال...</h2>") {
      toast.error("محتوى المقال فارغ!");
      scrollToSection(contentRef);
      return;
    }

    const allImages = [];
    if (featuredImage?.url) allImages.push(featuredImage.url);
    gallery.forEach((img) => { if (img.url) allImages.push(img.url); });

    const allVideos = [];
    if (videoPreview?.url) allVideos.push(videoPreview.url);

    const articlePayload = {
      title: title.trim(),
      content: contentHTML,
      category: category,
      important_rate: importance,
      isUrgent: isUrgent,
      images: allImages,
      videos: allVideos,
      hashtags: hashtags,
      status: targetStatus,
    };

    toast.loading("جاري حفظ البيانات وتجهيز المقال...", { id: "submit-toast" });

    createArticleMutation.mutate(articlePayload, {
      onSuccess: () => {
        toast.success(targetStatus === "published" ? "تم نشر المقال بنجاح! 🚀" : "تم حفظ المقال كمسودة بنجاح 💾", { id: "submit-toast" });
        clearFormFields();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "حدث خطأ أثناء الاتصال بالسيرفر", { id: "submit-toast" });
      },
    });
  };

  const clearFormFields = () => {
    setFeaturedImage(null);
    setVideoPreview(null);
    setGallery([]);
    setEditorMediaList([]);
    setTitle("");
    setCategory("");
    setHashtags([]);
    setImportance(5);
    setIsUrgent(false);
    editor?.commands.setContent("<h2>ابدأ بكتابة المقال...</h2>");
  };

  const executeCancelAndCleanup = async () => {
    const deletePromises = [];
    if (featuredImage?.fileId) deletePromises.push(deleteMediaFromServer(featuredImage.fileId));
    if (videoPreview?.fileId) deletePromises.push(deleteMediaFromServer(videoPreview.fileId));
    gallery.forEach((item) => { if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId)); });
    editorMediaList.forEach((item) => { if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId)); });

    await Promise.all(deletePromises);
    clearFormFields();
    toast.dismiss();
    setTimeout(() => {
      toast.success("تم إلغاء المقال بنجاح.", { id: "cancel-success-toast", duration: 3000 });
    }, 100);
  };

  const handleCancel = () => {
    toast.dismiss();
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1" style={{ direction: "rtl" }}>
          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            هل أنت متأكد من إلغاء المقال؟ سيتم حذف جميع الصور والفيديوهات المرفوعة لتوفير المساحة سحابياً.
          </p>
          <div className="flex justify-end gap-2 mt-1">
            <button onClick={async () => await executeCancelAndCleanup()} className="h-9 px-4 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition">نعم، إلغاء</button>
            <button onClick={() => toast.dismiss(t.id)} className="h-9 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition">تراجع</button>
          </div>
        </div>
      ),
      { id: "confirm-cancel-toast", duration: Infinity, position: "top-center" }
    );
  };

  const handleRemoveFeatured = async () => {
    if (featuredImage?.fileId) await deleteMediaFromServer(featuredImage.fileId);
    setFeaturedImage(null);
    toast.success("تم حذف الصورة البارزة", { id: "remove-featured" });
  };

  const handleRemoveVideo = async () => {
    if (videoPreview?.fileId) await deleteMediaFromServer(videoPreview.fileId);
    setVideoPreview(null);
    toast.success("تم حذف الفيديو الخارجي", { id: "remove-video" });
  };

  const handleRemoveGalleryItem = async (indexToRemove) => {
    const item = gallery[indexToRemove];
    if (item?.fileId) await deleteMediaFromServer(item.fileId);
    setGallery((prev) => prev.filter((_, i) => i !== indexToRemove));
    toast.success("تم إزالة الصورة من المعرض", { id: `remove-gallery-${indexToRemove}` });
  };

  const handleFeaturedImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedUploading(true);
    setFeaturedProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.featured, (pct) => setFeaturedProgress(pct));
      setFeaturedImage(mediaData);
      toast.success("تم رفع الصورة البارزة بنجاح!", { id: "upload-featured-success" });
    } catch (err) {
      toast.error("فشل رفع الصورة البارزة", { id: "upload-featured-error" });
    } finally {
      setFeaturedUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryUploading(true);
    setGalleryProgress(0);
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const mediaData = await uploadToImageKit(files[i], IK_FOLDERS.gallery, (pct) => {
          const base = (i / files.length) * 100;
          setGalleryProgress(Math.round(base + pct / files.length));
        });
        uploaded.push(mediaData);
      } catch (err) { console.error(err); }
    }
    if (uploaded.length > 0) {
      setGallery((prev) => [...prev, ...uploaded]);
      toast.success(`تم رفع ${uploaded.length} صور بنجاح!`, { id: "upload-gallery-success" });
    }
    setGalleryUploading(false);
    e.target.value = "";
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, (pct) => setVideoProgress(pct));
      setVideoPreview(mediaData);
      toast.success("تم رفع الفيديو بنجاح!", { id: "upload-video-success" });
    } catch (err) {
      toast.error("فشل رفع الفيديو", { id: "upload-video-error" });
    } finally {
      setVideoUploading(false);
      e.target.value = "";
    }
  };

  const addImageToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الصورة للمحرر...");
    setEditorProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.editor, (pct) => setEditorProgress(pct));
      if (mediaData?.url) {
        editor.chain().focus().setImage({ src: mediaData.url }).run();
        setEditorMediaList((prev) => [...prev, mediaData]);
        toast.success("تم إدراج الصورة", { id: "editor-img-success" });
      }
    } catch (err) {
      toast.error("فشل رفع الصورة للمحرر", { id: "editor-img-error" });
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  const addVideoToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الفيديو للمحرر...");
    setEditorProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, (pct) => setEditorProgress(pct));
      if (mediaData?.url) {
        editor.commands.focus();
        editor.commands.insertContent(
          `<video controls playsinline data-fileid="${mediaData.fileId}" id="${mediaData.fileId}" class="rounded-2xl my-4 w-full" src="${mediaData.url}"></video>`
        );
        setEditorMediaList((prev) => [...prev, mediaData]);
        toast.success("تم إدراج الفيديو", { id: "editor-video-success" });
      }
    } catch (err) {
      toast.error("فشل رفع الفيديو للمحرر", { id: "editor-video-error" });
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  const handleHashtagKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = hashtagInput.trim().replace(/\s+/g, "");
    if (!value) return;
    if (!value.startsWith("#")) value = `#${value}`;
    if (hashtags.includes(value)) return;
    setHashtags((prev) => [...prev, value]);
    setHashtagInput("");
  };

  const removeHashtag = (tag) => setHashtags((prev) => prev.filter((t) => t !== tag));

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f7fb] p-3 sm:p-6" style={{ fontFamily: "Tajawal, sans-serif" }}>
      <style>{`
        .ProseMirror h1 { font-size:28px; font-weight:800; margin-bottom:18px; }
        .ProseMirror h2 { font-size:22px; font-weight:700; margin-bottom:14px; }
        .ProseMirror p  { margin-bottom:14px; }
        .ProseMirror ul { list-style:disc;    padding-right:20px; }
        .ProseMirror ol { list-style:decimal; padding-right:20px; }
        /* اقتباس التحرير يتبع الـ Primary */
        .ProseMirror blockquote { border-right:4px solid var(--color-primary,#0D4C54); padding:14px; background:#f8fafc; border-radius:12px; margin:16px 0; }
        .ProseMirror img, .ProseMirror video { border-radius:18px; margin:18px 0; width:100%; }
      `}</style>

      {createArticleMutation.isPending && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-[9999] flex items-center justify-center">
          <div className="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-3">
            {/* اللودر يتبع الـ Secondary البرتقالي */}
            <Loader2 className="animate-spin text-[var(--color-secondary,#FF5A00)]" size={24} />
            <span className="text-sm font-bold text-slate-800">جاري الحفظ والمزامنة...</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[325px_1fr] gap-4 sm:gap-6 items-start">
        {/* SIDEBAR CONTAINER */}
        <div className="w-full xl:sticky xl:top-5 z-10">
          <SidebarStepper
            basicInfoRef={basicInfoRef}
            contentRef={contentRef}
            mediaRef={mediaRef}
            importanceRef={importanceRef}
            publishRef={publishRef}
            scrollToSection={scrollToSection}
          />
        </div>

        {/* MAIN FORM */}
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <div className="bg-white rounded-[28px] border border-slate-200 p-4 sm:p-6 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">إضافة مقال جديد</h1>
            <p className="text-sm text-slate-500 mt-1">أنشئ محتوى غني وجديد</p>
          </div>

          <BasicInfoSection
            innerRef={basicInfoRef} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            isCatsLoading={isCatsLoading} isCatsError={isCatsError} categories={categories} hashtags={hashtags}
            hashtagInput={hashtagInput} setHashtagInput={setHashtagInput} handleHashtagKeyDown={handleHashtagKeyDown}
            removeHashtag={removeHashtag} featuredUploading={featuredUploading} featuredProgress={featuredProgress}
            featuredImage={featuredImage} handleRemoveFeatured={handleRemoveFeatured} handleFeaturedImage={handleFeaturedImage}
          />

          <EditorSection
            innerRef={contentRef} editorUploading={editorUploading} editorProgress={editorProgress}
            editorUploadLabel={editorUploadLabel} editor={editor} addImageToEditor={addImageToEditor} addVideoToEditor={addVideoToEditor}
          />

          <MediaSection
            innerRef={mediaRef} videoUploading={videoUploading} videoProgress={videoProgress} videoPreview={videoPreview}
            handleRemoveVideo={handleRemoveVideo} handleVideoUpload={handleVideoUpload} galleryUploading={galleryUploading}
            galleryProgress={galleryProgress} handleGalleryUpload={handleGalleryUpload} gallery={gallery} handleRemoveGalleryItem={handleRemoveGalleryItem}
          />

          <ImportanceSection
            innerRef={importanceRef} importance={importance} setImportance={setImportance} isUrgent={isUrgent} setIsUrgent={setIsUrgent}
          />

          <ActionButtonsSection
            innerRef={publishRef} handleSubmitArticle={handleSubmitArticle} handleCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}