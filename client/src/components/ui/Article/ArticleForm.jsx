import React, { useRef, useState, useEffect } from "react";
import { Loader2, Users, Trash2, Link as LinkIcon } from "lucide-react";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { mergeAttributes } from "@tiptap/core";

import toast from "react-hot-toast";
import { uploadToImageKit, IK_FOLDERS } from "../../../services/Useimagekit";
import { useCategories } from "../../../hooks/useArticles";
import { FALLBACK_IMAGE } from "../../../constants/Fall_Back_Image";

import {
  SidebarStepper,
  BasicInfoSection,
  EditorSection,
  MediaSection,
  ImportanceSection,
  ActionButtonsSection,
} from "./Overlay"; 

const ImageWithCaption = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-caption') || null,
        renderHTML: () => ({}),
      },
      'data-caption': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-caption') || null,
        renderHTML: (attrs) => attrs['data-caption'] ? { 'data-caption': attrs['data-caption'] } : {},
      },
    };
  },
  parseHTML() {
    return [{ tag: 'img[src]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const { caption, 'data-caption': dataCaption, ...rest } = HTMLAttributes;
    const captionText = caption || dataCaption;
    if (captionText) {
      return [
        'figure',
        { class: 'editor-figure my-4 block text-center' },
        ['img', mergeAttributes(this.options.HTMLAttributes, rest, { 'data-caption': captionText })],
        ['figcaption', { class: 'text-xs text-slate-500 mt-2 font-medium bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100 block w-full text-center' }, captionText],
      ];
    }
    return ['img', mergeAttributes(this.options.HTMLAttributes, rest)];
  },
});

const preprocessContentHTML = (html) => {
  if (!html) return html;
  return html.replace(
    /<figure[^>]*>\s*<img([^>]*?)\/?\s*>\s*<figcaption[^>]*>([\s\S]*?)<\/figcaption>\s*<\/figure>/gi,
    (_, imgAttrs, captionText) => {
      const caption = captionText.trim().replace(/"/g, '&quot;');
      return `<img${imgAttrs} data-caption="${caption}"/>`;
    }
  );
};

const editorExtensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'ابدأ بكتابة المقال...',
    // This ensures the placeholder only shows when the editor is empty
    emptyEditorClass: 'is-editor-empty', 
  }),
  UnderlineExtension,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-[var(--color-secondary,#FF5A00)] underline cursor-pointer hover:text-[var(--color-primary,#0D4C54)] transition"
    }
  }),
  ImageWithCaption.configure({
    HTMLAttributes: { class: "editor-uploaded-img rounded-2xl w-full my-2" }
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Youtube.configure({
    controls: true,
    nocookie: true,
    HTMLAttributes: {
      class: "w-full aspect-video rounded-2xl my-4 border border-slate-200 shadow-sm",
    },
  }),
];

export default function ArticleForm({
  initialData = null,
  onSubmit,
  isSubmitting,
  isEditMode = false,
  onCancel,
}) {
  const { data: categories, isLoading: isCatsLoading, isError: isCatsError } = useCategories();

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
  const [newContributor, setNewContributor] = useState({ name: "", role: "photographer" });

  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [youtubeInput, setYoutubeInput] = useState("");

  const [isCaptionModalOpen, setIsCaptionModalOpen] = useState(false);
  const [pendingEditorImageData, setPendingEditorImageData] = useState(null);
  const [editorImageCaption, setEditorImageCaption] = useState("");

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
      const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : `${window.location.origin}/api`;
      const response = await fetch(`${apiBase}/imagekit/delete/${fileId}`, {
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
    if (youtubeLinks.some(link => link.id === videoId)) {
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

  const editor = useEditor({
    extensions: editorExtensions,
    content: '', // Set to empty string
  editorProps: {
    attributes: {
      class: "min-h-[350px] md:min-h-[500px] outline-none p-4 md:p-6 text-slate-700 leading-8 text-[15px]",
    },
  },
    onUpdate: ({ editor }) => {
      if (isContentHydratingRef.current) return;
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

  useEffect(() => {
    if (!isEditMode || !initialData || !editor || isInitializedRef.current) return;

    isInitializedRef.current = true;
    isContentHydratingRef.current = true;

    setTitle(initialData.title || "");
    setCategory(initialData.category?._id || initialData.category || "");
    setImportance(initialData.important_rate || 5);
    setIsUrgent(initialData.isUrgent || false);
    setHashtags(initialData.hashtags || []);
    setContributors(initialData.contributors || []);

    if (initialData.youtube_videos?.length > 0) {
      setYoutubeLinks(initialData.youtube_videos.map(id => ({ id, url: `https://www.youtube.com/watch?v=${id}` })));
    }

    if (initialData.images?.length > 0) {
      const firstImg = initialData.images[0] || FALLBACK_IMAGE;
      setFeaturedImage({
        url: firstImg?.url ?? "",
        fileId: firstImg?.fileId || "legacy_image", 
        caption: firstImg?.caption ?? "",
      });
      
      const extraImages = initialData.images.slice(1).map((img) => ({
        url: img?.url ?? "",
        fileId: img?.fileId || "legacy_image", 
        caption: img?.caption ?? "",
      }));
      setGallery(extraImages);
    }

    if (initialData.videos?.length > 0) {
      setVideoPreview({ 
        url: initialData.videos[0], 
        fileId: initialData.videoFileId || "legacy_video"
      });
    }

    if (initialData.content) {
      editor.commands.setContent(preprocessContentHTML(initialData.content));
    }

    setTimeout(() => {
      isContentHydratingRef.current = false;
    }, 100);
  }, [initialData, editor, isEditMode]);

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
    if (!contentHTML || contentHTML === "<h2>ابدأ بكتابة المقال...</h2>" || contentHTML === "<p></p>") {
      toast.error("محتوى المقال فارغ!");
      scrollToSection(contentRef);
      return;
    }

    // 2. Prepare Images Array with fileId
    // Mapping both gallery and featured image to ensure they contain fileId
    const formattedGallery = gallery.map((img) => ({ 
      url: img.url, 
      fileId: img.fileId, 
      caption: img.caption || "" 
    }));

    if (featuredImage?.url) {
      formattedGallery.unshift({ 
        url: featuredImage.url, 
        fileId: featuredImage.fileId, 
        caption: "الصورة البارزة" 
      });
    }

    // 3. Prepare Other Payloads
    const allVideos = videoPreview?.url ? [videoPreview.url] : [];
    const youtubeIdsArray = youtubeLinks.map(item => item.id);

    const payload = {
      title: title.trim(),
      content: contentHTML,
      category,
      important_rate: importance,
      isUrgent,
      images: formattedGallery, // Includes url, fileId, caption
      videos: allVideos,
      youtube_videos: youtubeIdsArray,
      hashtags,
      contributors,
      status: targetStatus,
    };

    // 4. Submit
    onSubmit(payload, targetStatus);
  };

  const executeCancelAndCleanup = async () => {
    const deletePromises = [];
    if (featuredImage?.fileId) deletePromises.push(deleteMediaFromServer(featuredImage.fileId));
    if (videoPreview?.fileId) deletePromises.push(deleteMediaFromServer(videoPreview.fileId));
    gallery.forEach((item) => { if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId)); });
    editorMediaList.forEach((item) => { if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId)); });

    await Promise.all(deletePromises);
    toast.dismiss();
    onCancel();
  };

  const handleCancel = () => {
    toast.dismiss();
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1" style={{ direction: "rtl" }}>
          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            {isEditMode 
              ? "هل تود إلغاء تعديل المقال والرجوع؟ سيتم التخلص من أي وسائط جديدة قمت برفعها مؤخراً."
              : "هل أنت متأكد من إلغاء المقال؟ سيتم حذف جميع الصور والفيديوهات المرفوعة."}
          </p>
          <div className="flex justify-end gap-2 mt-1">
            <button onClick={async () => await executeCancelAndCleanup()} className="h-9 px-4 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition">
              تأكيد الإلغاء
            </button>
            <button onClick={() => toast.dismiss(t.id)} className="h-9 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition">
              تراجع
            </button>
          </div>
        </div>
      ),
      { id: "confirm-cancel-toast", duration: Infinity, position: "top-center" }
    );
  };

  const handleFeaturedImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedUploading(true);
    setFeaturedProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.featured, setFeaturedProgress);
      setFeaturedImage(mediaData);
      toast.success("تم رفع الصورة البارزة بنجاح!", { id: "upload-featured-success" });
    } catch (err) {
      toast.error("فشل رفع الصورة", { id: "upload-featured-error" });
    } finally {
      setFeaturedUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveFeatured = async () => {
    if (featuredImage?.fileId) await deleteMediaFromServer(featuredImage.fileId);
    setFeaturedImage(null);
    toast.success("تم حذف الصورة البارزة");
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
          setGalleryProgress(Math.round(((i / files.length) * 100) + pct / files.length));
        });
        uploaded.push({ ...mediaData, caption: "" });
      } catch (err) { console.error(err); }
    }
    if (uploaded.length > 0) {
      setGallery((prev) => [...prev, ...uploaded]);
      toast.success(`تم رفع ${uploaded.length} صور بنجاح!`);
    }
    setGalleryUploading(false);
    e.target.value = "";
  };

  const handleRemoveGalleryItem = async (indexToRemove) => {
    const item = gallery[indexToRemove];
    if (item?.fileId) await deleteMediaFromServer(item.fileId);
    setGallery((prev) => prev.filter((_, i) => i !== indexToRemove));
    toast.success("تم إزالة الصورة من المعرض");
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, setVideoProgress);
      setVideoPreview(mediaData);
      toast.success("تم رفع الفيديو بنجاح!");
    } catch (err) {
      toast.error("فشل رفع الفيديو");
    } finally {
      setVideoUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveVideo = async () => {
    if (videoPreview?.fileId) await deleteMediaFromServer(videoPreview.fileId);
    setVideoPreview(null);
    toast.success("تم حذف الفيديو الخارجي");
  };

  const addImageToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الصورة للمحرر...");
    setEditorProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.editor, setEditorProgress);
      if (mediaData?.url) {
        setPendingEditorImageData(mediaData);
        setEditorImageCaption("");
        setIsCaptionModalOpen(true);
      }
    } catch (err) {
      toast.error("فشل رفع الصورة للمحرر");
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  const handleConfirmEditorImageCaption = () => {
    if (!pendingEditorImageData || !editor) return;
    const captionText = editorImageCaption.trim() || null;
    editor.chain().focus().setImage({ src: pendingEditorImageData.url, caption: captionText, 'data-caption': captionText }).run();
    setEditorMediaList((prev) => [...prev, pendingEditorImageData]);
    toast.success("تم إدراج الصورة");
    setIsCaptionModalOpen(false);
    setPendingEditorImageData(null);
    setEditorImageCaption("");
  };

  const addVideoToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الفيديو للمحرر...");
    setEditorProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, setEditorProgress);
      if (mediaData?.url) {
        editor.commands.focus();
        editor.commands.insertContent(`<video controls playsinline data-fileid="${mediaData.fileId}" id="${mediaData.fileId}" class="rounded-2xl my-4 w-full" src="${mediaData.url}"></video>`);
        setEditorMediaList((prev) => [...prev, mediaData]);
        toast.success("تم إدراج الفيديو");
      }
    } catch (err) {
      toast.error("فشل رفع الفيديو للمحرر");
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  const addYoutubeVideoToEditor = () => {
    if (!editor) return;
    toast(
      (t) => {
        const handleConfirm = (e) => {
          e.preventDefault();
          const url = e.target.youtubeUrl.value.trim();
          if (!url) return toast.error("يرجى إدخال الرابط أولاً", { id: "yt-empty" });
          const ytRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
          if (ytRegex.test(url)) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
            toast.dismiss(t.id);
            setTimeout(() => toast.success("تم إدراج فيديو اليوتيوب بنجاح"), 100);
          } else {
            toast.error("الرابط غير صحيح", { id: "yt-invalid" });
          }
        };
        return (
          <form onSubmit={handleConfirm} className="flex flex-col gap-3 p-1 w-[320px] max-w-full" style={{ direction: "rtl" }}>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800">إضافة فيديو يوتيوب للمقال</h3>
            </div>
            <input name="youtubeUrl" type="text" autoFocus className="w-full p-3 rounded-xl border border-slate-200 outline-none text-sm" placeholder="https://www.youtube.com/watch?v=..." style={{ direction: "ltr" }} />
            <div className="flex justify-end gap-2 mt-1">
              <button type="submit" className="h-9 px-4 rounded-xl bg-slate-800 text-white text-xs font-bold">إدراج الفيديو</button>
              <button type="button" onClick={() => toast.dismiss(t.id)} className="h-9 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium">إلغاء</button>
            </div>
          </form>
        );
      },
      { id: "youtube-input-toast", duration: Infinity, position: "top-center" }
    );
  };

  const addContributor = () => {
    if (!newContributor.name.trim()) return toast.error("يرجى إدخال اسم الشخص");
    setContributors((prev) => [...prev, newContributor]);
    setNewContributor({ name: "", role: "photographer" });
  };
  const removeContributor = (index) => setContributors((prev) => prev.filter((_, i) => i !== index));

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

  .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: #94a3b8;
  float: right;
  pointer-events: none;
  height: 0;

  font-size: 24px;     /* حجم أكبر */
  font-weight: 700;    /* خط عريض */
  line-height: 1.5;
}

.ProseMirror.is-editor-empty::before {
  content: attr(data-placeholder);
  color: #94a3b8;
  float: right;
  pointer-events: none;
  height: 0;

  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
}
`}</style>

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-[9999] flex items-center justify-center">
          <div className="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-3">
            <Loader2 className="animate-spin text-orange-500" size={24} />
            <span className="text-sm font-bold text-slate-800">جاري المعالجة والحفظ...</span>
          </div>
        </div>
      )}

      {isCaptionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl shadow-xl max-w-md w-full space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">إضافة نص توضيحي للصورة</h3>
            </div>
            {pendingEditorImageData?.url && (
              <img src={pendingEditorImageData.url} alt="preview" className="w-full max-h-48 object-cover rounded-xl" />
            )}
            <input
              type="text"
              className="w-full p-3.5 rounded-xl border border-slate-200 outline-none text-sm"
              placeholder="مثال: لقطة من المؤتمر..."
              value={editorImageCaption}
              onChange={(e) => setEditorImageCaption(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmEditorImageCaption()}
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={handleConfirmEditorImageCaption} className="h-11 px-5 rounded-xl bg-slate-800 text-white text-xs font-bold">إدراج الصورة</button>
              <button onClick={() => { setIsCaptionModalOpen(false); setPendingEditorImageData(null); setEditorImageCaption(""); }} className="h-11 px-5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium">إلغاء</button>
            </div>
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
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">{isEditMode ? "تعديل ومراجعة المقال" : "إضافة مقال جديد"}</h1>
            <p className="text-sm text-slate-500 mt-1">{isEditMode ? "تحديث البيانات والوسائط للمقال المحدد ومزامنتها تلقائياً" : "أنشئ محتوى غني وجديد"}</p>
          </div>

          <BasicInfoSection
            innerRef={basicInfoRef} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            isCatsLoading={isCatsLoading} isCatsError={isCatsError} categories={categories} hashtags={hashtags}
            hashtagInput={hashtagInput} setHashtagInput={setHashtagInput} handleHashtagKeyDown={handleHashtagKeyDown}
            removeHashtag={removeHashtag} featuredUploading={featuredUploading} featuredProgress={featuredProgress}
            featuredImage={featuredImage} handleRemoveFeatured={handleRemoveFeatured} handleFeaturedImage={handleFeaturedImage}
          />

          <div className="bg-white rounded-[28px] border border-slate-200 p-4 sm:p-6 shadow-sm mt-6">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Users className="text-slate-700 w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">فريق العمل والمساهمين</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <input placeholder="اسم الشخص" className="p-3 rounded-xl border border-slate-200 text-sm" value={newContributor.name} onChange={(e) => setNewContributor({ ...newContributor, name: e.target.value })} />
              <select className="p-3 rounded-xl border border-slate-200 text-sm" value={newContributor.role} onChange={(e) => setNewContributor({ ...newContributor, role: e.target.value })}>
                <option value="photographer">مصور (Photographer)</option>
                <option value="editor">محرر (Editor)</option>
              </select>
              <button onClick={addContributor} className="bg-slate-800 text-white p-3 rounded-xl text-sm font-bold">+ إضافة</button>
            </div>
            <div className="space-y-2">
              {contributors.map((c, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-medium text-slate-700 text-sm">{c.name} — <span className="text-xs text-slate-400 font-bold uppercase">{c.role}</span></span>
                  <button onClick={() => removeContributor(index)} className="text-red-500 text-xs font-bold flex items-center gap-1"><Trash2 size={14} /> حذف</button>
                </div>
              ))}
            </div>
          </div>

          <EditorSection
            innerRef={contentRef} editorUploading={editorUploading} editorProgress={editorProgress}
            editorUploadLabel={editorUploadLabel} editor={editor} addImageToEditor={addImageToEditor} 
            addVideoToEditor={addVideoToEditor} addYoutubeVideoToEditor={addYoutubeVideoToEditor}
          />

          <MediaSection
            innerRef={mediaRef} videoUploading={videoUploading} videoProgress={videoProgress} videoPreview={videoPreview}
            handleRemoveVideo={handleRemoveVideo} handleVideoUpload={handleVideoUpload} galleryUploading={galleryUploading}
            galleryProgress={galleryProgress} handleGalleryUpload={handleGalleryUpload} gallery={gallery} 
            handleRemoveGalleryItem={handleRemoveGalleryItem} setGallery={setGallery}
          />

          <div className="bg-white rounded-[28px] border border-slate-200 p-4 sm:p-6 shadow-sm mt-6">
            <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-3">
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <h2 className="text-lg font-bold text-slate-800">فيديوهات يوتيوب المرفقة</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <input placeholder="https://www.youtube.com/watch?v=..." className="w-full p-3 pl-10 rounded-xl border border-slate-200 text-left text-sm" style={{ direction: "ltr" }} value={youtubeInput} onChange={(e) => setYoutubeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddYoutubeLink())} />
                <LinkIcon className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
              </div>
              <button onClick={handleAddYoutubeLink} className="bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold">+ ربط الفيديو</button>
            </div>
            {youtubeLinks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {youtubeLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 truncate">
                      <img src={`https://img.youtube.com/vi/${link.id}/default.jpg`} alt="thumbnail" className="w-12 h-9 object-cover rounded-md" />
                      <a href={link.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline truncate" dir="ltr">{link.id}</a>
                    </div>
                    <button onClick={() => handleRemoveYoutubeLink(link.id)} className="text-red-500 text-xs font-bold flex items-center gap-1"><Trash2 size={13} /> إزالة</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ImportanceSection innerRef={importanceRef} importance={importance} setImportance={setImportance} isUrgent={isUrgent} setIsUrgent={setIsUrgent} />

          <ActionButtonsSection innerRef={publishRef} handleSubmitArticle={handleSubmitArticle} handleCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}