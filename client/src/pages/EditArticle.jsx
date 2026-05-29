import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import toast from "react-hot-toast";
import { uploadToImageKit, IK_FOLDERS } from "../services/Useimagekit";

import { useUpdateArticle, useAdminArticle } from "../hooks/useAdmin";
import { useCategories } from "../hooks/useArticles";

import {
  SidebarStepper,
  BasicInfoSection,
  EditorSection,
  MediaSection,
  ImportanceSection,
  ActionButtonsSection,
} from "../components/ui/Article/Overlay";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: categories, isLoading: isCatsLoading, isError: isCatsError } = useCategories();

  const {
    data: articleData,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useAdminArticle(id);

  const updateArticleMutation = useUpdateArticle();

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

  const [contributors, setContributors] = useState([]);
  const [newContributor, setNewContributor] = useState({ name: "", role: "writer" });

  // --- حالات يوتيوب ---
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [youtubeInput, setYoutubeInput] = useState("");

  // ── Refs ─────────────────────────────────────────────────────
  const basicInfoRef = useRef(null);
  const contentRef = useRef(null);
  const mediaRef = useRef(null);
  const importanceRef = useRef(null);
  const publishRef = useRef(null);

  const isContentHydratingRef = useRef(true);
  const isInitializedRef = useRef(false);

  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const deleteMediaFromServer = async (fileId) => {
    if (!fileId) return;
    try {
      const response = await fetch(`/api/imagekit/delete/${fileId}`, {
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

  // --- دوال معالجة يوتيوب ---
  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddYoutubeLink = () => {
    if (!youtubeInput.trim()) return;
    
    const videoId = extractYouTubeId(youtubeInput);
    if (!videoId) {
      toast.error("الرابط غير صالح! يرجى إدخال رابط يوتيوب صحيح.");
      return;
    }

    const isExist = youtubeLinks.some(link => link.id === videoId);
    if (isExist) {
      toast.error("تمت إضافة هذا الفيديو مسبقاً!");
      return;
    }

    setYoutubeLinks(prev => [...prev, { id: videoId, url: youtubeInput }]);
    setYoutubeInput("");
    toast.success("تم إضافة فيديو يوتيوب بنجاح");
  };

  const handleRemoveYoutubeLink = (idToRemove) => {
    setYoutubeLinks(prev => prev.filter(link => link.id !== idToRemove));
  };
  // -------------------------

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({ openOnClick: false }),
      Image.configure({ HTMLAttributes: { class: "editor-uploaded-img" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[350px] md:min-h-[500px] outline-none p-4 md:p-6 text-slate-700 leading-8 text-[15px]",
      },
    },
    onUpdate: ({ editor }) => {
      if (isContentHydratingRef.current) return;

      const currentHTML = editor.getHTML();
      setEditorMediaList((prevList) => {
        const remainingMedia = [];
        prevList.forEach((media) => {
          const cleanUrl = media.url.split("?")[0];
          if (
            currentHTML.includes(cleanUrl) ||
            (media.fileId && currentHTML.includes(media.fileId))
          ) {
            remainingMedia.push(media);
          } else {
            deleteMediaFromServer(media.fileId);
          }
        });
        return remainingMedia;
      });
    },
  });

  // ── تهيئة وتعبئة البيانات الآمنة لمرة واحدة ──────────────────
  useEffect(() => {
    if (!articleData || !editor || isInitializedRef.current) return;

    isInitializedRef.current = true;
    isContentHydratingRef.current = true;

    setTitle(articleData.title || "");
    setCategory(articleData.category || "");
    setImportance(articleData.important_rate || 5);
    setIsUrgent(articleData.isUrgent || false);
    setHashtags(articleData.hashtags || []);
    setContributors(articleData.contributors || []);

    // --- تهيئة يوتيوب ---
    if (articleData.youtube_videos && articleData.youtube_videos.length > 0) {
      const formattedYoutubeLinks = articleData.youtube_videos.map(id => ({
        id: id,
        url: `https://www.youtube.com/watch?v=${id}` // إعادة بناء رابط وهمي للعرض
      }));
      setYoutubeLinks(formattedYoutubeLinks);
    }

    if (articleData.images && articleData.images.length > 0) {
      setFeaturedImage({ url: articleData.images[0], fileId: null });
      const extraImages = articleData.images
        .slice(1)
        .map((imgUrl) => ({ url: imgUrl, fileId: null }));
      setGallery(extraImages);
    } else {
      setFeaturedImage(null);
      setGallery([]);
    }

    if (articleData.videos && articleData.videos.length > 0) {
      setVideoPreview({ url: articleData.videos[0], fileId: null });
    } else {
      setVideoPreview(null);
    }

    editor.commands.setContent(articleData.content || "<p></p>");

    setTimeout(() => {
      isContentHydratingRef.current = false;
    }, 100);
  }, [articleData, editor]);

  // ── إرسال التحديثات ───────────────────────────────────────────
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
    if (!contentHTML || contentHTML === "<p></p>") {
      toast.error("محتوى المقال فارغ!");
      scrollToSection(contentRef);
      return;
    }

    const allImages = [];
    if (featuredImage?.url) allImages.push(featuredImage.url);
    gallery.forEach((img) => {
      if (img.url && img.url !== featuredImage?.url) {
        allImages.push(img.url);
      }
    });

    const allVideos = [];
    if (videoPreview?.url) allVideos.push(videoPreview.url);

    // استخراج الـ IDs من قائمة اليوتيوب لإرسالها
    const youtubeIdsArray = youtubeLinks.map(item => item.id);

    const articlePayload = {
      title: title.trim(),
      content: contentHTML,
      category: category,
      important_rate: importance,
      isUrgent: isUrgent,
      images: allImages,
      videos: allVideos,
      youtube_videos: youtubeIdsArray, // إضافة حقل يوتيوب
      hashtags: hashtags,
      contributors: contributors,
      status: targetStatus,
    };

    toast.loading("جاري تحديث المقال ومزامنة البيانات...", { id: "submit-toast" });

    updateArticleMutation.mutate(
      { id, data: articlePayload },
      {
        onSuccess: () => {
          toast.success("تم تحديث وحفظ المقال بنجاح! 💾", { id: "submit-toast" });
          navigate("/admin");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "حدث خطأ أثناء الاتصال بالسيرفر",
            { id: "submit-toast" }
          );
        },
      }
    );
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
    setYoutubeLinks([]);
    setYoutubeInput("");
    editor?.commands.setContent("");
  };

  const executeCancelAndCleanup = async () => {
    const deletePromises = [];
    if (featuredImage?.fileId)
      deletePromises.push(deleteMediaFromServer(featuredImage.fileId));
    if (videoPreview?.fileId)
      deletePromises.push(deleteMediaFromServer(videoPreview.fileId));
    gallery.forEach((item) => {
      if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId));
    });
    editorMediaList.forEach((item) => {
      if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId));
    });

    await Promise.all(deletePromises);
    clearFormFields();
    toast.dismiss();
    setTimeout(() => {
      toast.success("تم إلغاء التعديلات بنجاح.", {
        id: "cancel-success-toast",
        duration: 3000,
      });
      navigate("/admin");
    }, 100);
  };

  const handleCancel = () => {
    toast.dismiss();
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1" style={{ direction: "rtl" }}>
          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            هل تود إلغاء تعديل المقال والرجوع؟ سيتم التخلص من أي وسائط جديدة قمت برفعها مؤخراً.
          </p>
          <div className="flex justify-end gap-2 mt-1">
            <button
              onClick={async () => await executeCancelAndCleanup()}
              className="h-9 px-4 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition"
            >
              تأكيد الإلغاء
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="h-9 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition"
            >
              تراجع
            </button>
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
    toast.success("تم إزالة الصورة من المعرض", {
      id: `remove-gallery-${indexToRemove}`,
    });
  };

  const handleFeaturedImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedUploading(true);
    setFeaturedProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.featured, (pct) =>
        setFeaturedProgress(pct)
      );
      setFeaturedImage(mediaData);
      toast.success("تم تغيير الصورة البارزة بنجاح!", { id: "upload-featured-success" });
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
      } catch (err) {
        console.error(err);
      }
    }
    if (uploaded.length > 0) {
      setGallery((prev) => [...prev, ...uploaded]);
      toast.success(`تم إلحاق ${uploaded.length} صور بالمعرض!`, {
        id: "upload-gallery-success",
      });
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
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, (pct) =>
        setVideoProgress(pct)
      );
      setVideoPreview(mediaData);
      toast.success("تم تغيير الفيديو بنجاح!", { id: "upload-video-success" });
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
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.editor, (pct) =>
        setEditorProgress(pct)
      );
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
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, (pct) =>
        setEditorProgress(pct)
      );
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

  const addContributor = () => {
    if (!newContributor.name.trim()) {
      toast.error("يرجى إدخال اسم الشخص");
      return;
    }
    setContributors((prev) => [...prev, newContributor]);
    setNewContributor({ name: "", role: "writer" });
  };

  const removeContributor = (index) => {
    setContributors((prev) => prev.filter((_, i) => i !== index));
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

  const removeHashtag = (tag) =>
    setHashtags((prev) => prev.filter((t) => t !== tag));

  // ── Loading & Error States ────────────────────────────────────
  if (isArticleLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex flex-col items-center justify-center gap-3">
        <Loader2
          className="animate-spin text-[var(--color-primary,#0D4C54)]"
          size={40}
        />
        <p className="text-sm font-bold text-slate-600">
          جاري تحميل بيانات المقال للمراجعة...
        </p>
      </div>
    );
  }

  if (isArticleError || !articleData) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex flex-col items-center justify-center gap-2 text-center p-4">
        <p className="text-lg font-bold text-red-500">
          حدث خطأ أثناء محاولة جلب المقال المطلوبة
        </p>
        <p className="text-xs text-slate-500">
          تأكد من أن المعرّف (ID) صحيح أو أنك تملك الصلاحيات الكافية
        </p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f5f7fb] p-3 sm:p-6"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <style>{`
        .ProseMirror h1 { font-size:28px; font-weight:800; margin-bottom:18px; }
        .ProseMirror h2 { font-size:22px; font-weight:700; margin-bottom:14px; }
        .ProseMirror p  { margin-bottom:14px; }
        .ProseMirror ul { list-style:disc;    padding-right:20px; }
        .ProseMirror ol { list-style:decimal; padding-right:20px; }
        .ProseMirror blockquote { border-right:4px solid var(--color-primary,#0D4C54); padding:14px; background:#f8fafc; border-radius:12px; margin:16px 0; }
        .ProseMirror img, .ProseMirror video { border-radius:18px; margin:18px 0; width:100%; }
      `}</style>

      {updateArticleMutation.isPending && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-[9999] flex items-center justify-center">
          <div className="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-3">
            <Loader2
              className="animate-spin text-[var(--color-secondary,#FF5A00)]"
              size={24}
            />
            <span className="text-sm font-bold text-slate-800">
              جاري تعديل وحفظ التغييرات...
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[325px_1fr] gap-4 sm:gap-6 items-start">
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

        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <div className="bg-white rounded-[28px] border border-slate-200 p-4 sm:p-6 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
              تعديل ومراجعة المقال
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              تحديث البيانات والوسائط للمقال المحدد
            </p>
          </div>

          <BasicInfoSection
            innerRef={basicInfoRef}
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            isCatsLoading={isCatsLoading}
            isCatsError={isCatsError}
            categories={categories}
            hashtags={hashtags}
            hashtagInput={hashtagInput}
            setHashtagInput={setHashtagInput}
            handleHashtagKeyDown={handleHashtagKeyDown}
            removeHashtag={removeHashtag}
            featuredUploading={featuredUploading}
            featuredProgress={featuredProgress}
            featuredImage={featuredImage}
            handleRemoveFeatured={handleRemoveFeatured}
            handleFeaturedImage={handleFeaturedImage}
          />

          {/* قسم فريق العمل */}
          <div className="bg-white rounded-[28px] border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">فريق العمل</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <input
                placeholder="اسم الشخص"
                className="flex-1 min-w-[200px] p-3 rounded-xl border border-slate-200"
                value={newContributor.name}
                onChange={(e) => setNewContributor({ ...newContributor, name: e.target.value })}
              />
              <select
                className="p-3 rounded-xl border border-slate-200"
                value={newContributor.role}
                onChange={(e) => setNewContributor({ ...newContributor, role: e.target.value })}
              >
                <option value="writer">كاتب (Writer)</option>
                <option value="photographer">مصور (Photographer)</option>
                <option value="editor">محرر (Editor)</option>
              </select>
              <button
                onClick={addContributor}
                className="bg-slate-800 text-white px-6 rounded-xl font-bold hover:bg-slate-900"
              >
                + إضافة
              </button>
            </div>
            <div className="space-y-2">
              {contributors.map((c, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-medium text-slate-700">
                    {c.name} - <span className="text-xs text-slate-400 uppercase">{c.role}</span>
                  </span>
                  <button onClick={() => removeContributor(index)} className="text-red-500 text-sm hover:underline">
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          <EditorSection
            innerRef={contentRef}
            editorUploading={editorUploading}
            editorProgress={editorProgress}
            editorUploadLabel={editorUploadLabel}
            editor={editor}
            addImageToEditor={addImageToEditor}
            addVideoToEditor={addVideoToEditor}
          />

          <MediaSection
            innerRef={mediaRef}
            videoUploading={videoUploading}
            videoProgress={videoProgress}
            videoPreview={videoPreview}
            handleRemoveVideo={handleRemoveVideo}
            handleVideoUpload={handleVideoUpload}
            galleryUploading={galleryUploading}
            galleryProgress={galleryProgress}
            handleGalleryUpload={handleGalleryUpload}
            gallery={gallery}
            handleRemoveGalleryItem={handleRemoveGalleryItem}
          />

          {/* --- قسم روابط يوتيوب الإضافية --- */}
          <div className="bg-white rounded-[28px] border border-slate-200 p-6 shadow-sm mt-6">
            <h2 className="text-lg font-bold text-slate-800 mb-1">فيديوهات يوتيوب (اختياري)</h2>
            <p className="text-sm text-slate-500 mb-4">أضف روابط الفيديوهات الخارجية كبديل للرفع المباشر.</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <input 
                placeholder="https://www.youtube.com/watch?v=..." 
                className="flex-1 min-w-[200px] p-3 rounded-xl border border-slate-200 text-left"
                style={{ direction: "ltr" }}
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddYoutubeLink())}
              />
              <button 
                onClick={handleAddYoutubeLink}
                className="bg-secondary text-white px-6 rounded-xl font-bold hover:bg-orange4 transition"
              >
                + إضافة الفيديو
              </button>
            </div>

            {youtubeLinks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {youtubeLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden">
                    <div className="flex items-center gap-3 truncate">
                      <img 
                        src={`https://img.youtube.com/vi/${link.id}/default.jpg`} 
                        alt="thumbnail" 
                        className="w-12 h-9 object-cover rounded-md"
                      />
                      <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate" dir="ltr">
                        {link.id}
                      </a>
                    </div>
                    <button onClick={() => handleRemoveYoutubeLink(link.id)} className="text-red-500 text-sm hover:underline mr-2">
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* ---------------------------------- */}

          <ImportanceSection
            innerRef={importanceRef}
            importance={importance}
            setImportance={setImportance}
            isUrgent={isUrgent}
            setIsUrgent={setIsUrgent}
          />

          <ActionButtonsSection
            innerRef={publishRef}
            handleSubmitArticle={handleSubmitArticle}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}