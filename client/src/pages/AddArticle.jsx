import React, { useRef, useState, useEffect } from "react";

import {
  Bold, Italic, Underline, Heading1, Heading2,
  List, ListOrdered, Quote, Link as LinkIcon,
  Image as ImageIcon, Video, Eye, X, Trash2,
  Save, ChevronLeft, Upload, AlignRight,
  AlignCenter, AlignLeft, Flame, Loader2,
} from "lucide-react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import { uploadToImageKit, IK_FOLDERS } from "../services/Useimagekit";

// =============================================================
// UPLOAD PROGRESS OVERLAY
// =============================================================
function UploadOverlay({ progress, label }) {
  return (
    <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl gap-3">
      <Loader2 size={32} className="text-white animate-spin" />
      <p className="text-white text-sm font-bold">{label}</p>
      <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/80 text-xs">{progress}%</p>
    </div>
  );
}

// =============================================================
// TOOLBAR BUTTON
// =============================================================
function ToolbarButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl border transition flex items-center justify-center shrink-0 ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-white border-slate-200 hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

// =============================================================
// MAIN COMPONENT
// =============================================================
export default function AddArticle() {

  // ── Basic fields ─────────────────────────────────────────────
  const [title, setTitle]           = useState("");
  const [category, setCategory]     = useState("");
  const [importance, setImportance] = useState(5);
  const [isUrgent, setIsUrgent]     = useState(false);
  const [hashtags, setHashtags]     = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");

  // ── Media States ─────────────────────────────────────────────
  const [featuredImage, setFeaturedImage]         = useState(null); 
  const [featuredUploading, setFeaturedUploading] = useState(false);
  const [featuredProgress, setFeaturedProgress]   = useState(0);

  const [gallery, setGallery]                   = useState([]); 
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryProgress, setGalleryProgress]   = useState(0);

  const [videoPreview, setVideoPreview]       = useState(null); 
  const [videoUploading, setVideoUploading]   = useState(false);
  const [videoProgress, setVideoProgress]     = useState(0);

  // ── Editor Inline Media Tracking ──
  const [editorMediaList, setEditorMediaList] = useState([]);

  // ── Editor inline uploads status ─────────────────────────────
  const [editorUploading, setEditorUploading]     = useState(false);
  const [editorUploadLabel, setEditorUploadLabel] = useState("");
  const [editorProgress, setEditorProgress]       = useState(0);

  // ── Refs ─────────────────────────────────────────────────────
  const basicInfoRef  = useRef(null);
  const contentRef    = useRef(null);
  const mediaRef      = useRef(null);
  const importanceRef = useRef(null);
  const publishRef    = useRef(null);

  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── دالة الحذف الآمنة والمنقحة ──────────────────────
  const deleteMediaFromServer = async (fileId) => {
    if (!fileId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/imagekit/delete/${fileId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log(`✅ تم حذف الملف من ImageKit للمعرف: ${fileId}`);
      } else {
        console.warn("⚠️ تنبيه من السيرفر أثناء محاولة الحذف السحابي:", data.message || "خطأ غير معروف");
      }
    } catch (err) {
      console.error("❌ خطأ في الاتصال بمسار الحذف الخاص بالسيرفر:", err.message);
    }
  };

  // ── Tiptap editor ─────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({ openOnClick: false }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-uploaded-img',
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<h2>ابدأ بكتابة المقال...</h2>",
    editorProps: {
      attributes: {
        class:
          "min-h-[350px] md:min-h-[500px] outline-none p-4 md:p-6 text-slate-700 leading-8 text-[15px]",
      },
    },
    // =========================================================
    // مراقبة المحتوى المحدث وتجنب الحذف العشوائي للفيديوهات
    // =========================================================
    onUpdate: ({ editor }) => {
      const currentHTML = editor.getHTML();
      
      setEditorMediaList((prevList) => {
        const remainingMedia = [];
        
        prevList.forEach((media) => {
          const cleanUrl = media.url.split('?')[0]; 
          const isUrlPresent = currentHTML.includes(cleanUrl);
          const isIdPresent = media.fileId ? currentHTML.includes(media.fileId) : false;

          if (isUrlPresent || isIdPresent) {
            remainingMedia.push(media);
          } else {
            console.log(`[تتبع الميديا] تم حذف عنصر من داخل المحرر، جاري إزالته سحابياً: ${media.fileId}`);
            deleteMediaFromServer(media.fileId);
          }
        });
        
        return remainingMedia;
      });
    }
  });

  // ── دالة الإلغاء الكلي وتنظيف جميع الخوادم ─────────────────────────
  const handleCancel = async () => {
    const confirmCancel = window.confirm("هل أنت متأكد من إلغاء المقال؟ سيتم حذف جميع الصور والفيديوهات التي قمت برفعها فوراً لتوفير المساحة سحابياً.");
    if (!confirmCancel) return;

    const deletePromises = [];
    if (featuredImage?.fileId) deletePromises.push(deleteMediaFromServer(featuredImage.fileId));
    if (videoPreview?.fileId) deletePromises.push(deleteMediaFromServer(videoPreview.fileId));
    gallery.forEach((item) => {
      if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId));
    });
    editorMediaList.forEach((item) => {
      if (item.fileId) deletePromises.push(deleteMediaFromServer(item.fileId));
    });

    await Promise.all(deletePromises);

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
    
    alert("تم إلغاء المقال وتفريغ مساحات التخزين السحابية بنجاح.");
  };

  // ── معالجة عمليات حذف العناصر الفردية للواجهة الخارجية ──────────────
  const handleRemoveFeatured = async () => {
    if (featuredImage?.fileId) await deleteMediaFromServer(featuredImage.fileId);
    setFeaturedImage(null);
  };

  const handleRemoveVideo = async () => {
    if (videoPreview?.fileId) await deleteMediaFromServer(videoPreview.fileId);
    setVideoPreview(null);
  };

  const handleRemoveGalleryItem = async (indexToRemove) => {
    const item = gallery[indexToRemove];
    if (item?.fileId) await deleteMediaFromServer(item.fileId);
    setGallery((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // ── معالجات الرفع وحفظ البيانات الواردة ────────────────────────────
  const handleFeaturedImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedUploading(true);
    setFeaturedProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.featured, (pct) => setFeaturedProgress(pct));
      setFeaturedImage(mediaData);
    } catch (err) {
      console.error(err);
      alert("فشل رفع الصورة");
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
    setGallery((prev) => [...prev, ...uploaded]);
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
    } catch (err) {
      console.error(err);
      alert("فشل رفع الفيديو");
    } finally {
      setVideoUploading(false);
      e.target.value = "";
    }
  };

  const addImageToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الصورة...");
    setEditorProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.editor, (pct) => setEditorProgress(pct));
      editor.chain().focus().setImage({ src: mediaData.url }).run();
      setEditorMediaList((prev) => [...prev, mediaData]);
    } catch (err) {
      alert("فشل رفع الصورة للمحرر");
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  const addVideoToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الفيديو...");
    setEditorProgress(0);
    try {
      const mediaData = await uploadToImageKit(file, IK_FOLDERS.video, (pct) => setEditorProgress(pct));
      editor.commands.focus();
      editor.commands.insertContent(`<video controls playsinline data-fileid="${mediaData.fileId}" id="${mediaData.fileId}" class="rounded-2xl my-4 w-full" src="${mediaData.url}"></video>`);
      setEditorMediaList((prev) => [...prev, mediaData]);
    } catch (err) {
      alert("فشل رفع الفيديو للمحرر");
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  // ── الهاشتاجات ───────────────────────────────────────────────
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
        @media(min-width:768px){ .ProseMirror h1 { font-size:32px; } }
        .ProseMirror h2 { font-size:22px; font-weight:700; margin-bottom:14px; }
        @media(min-width:768px){ .ProseMirror h2 { font-size:26px; } }
        .ProseMirror p  { margin-bottom:14px; }
        .ProseMirror ul { list-style:disc;    padding-right:20px; }
        .ProseMirror ol { list-style:decimal; padding-right:20px; }
        .ProseMirror blockquote { border-right:4px solid var(--color-primary); padding:14px; background:#f8fafc; border-radius:12px; margin:16px 0; }
        .ProseMirror img   { border-radius:18px; margin:18px 0; width:100%; }
        .ProseMirror video { border-radius:18px; margin:18px 0; width:100%; }
      `}</style>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-4 sm:gap-6 items-start">
        {/* SIDEBAR */}
        <div className="w-full xl:sticky xl:top-5 z-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-primary p-4 sm:p-6 text-white">
              <h2 className="text-xl sm:text-2xl font-black">المراحل</h2>
            </div>
            <div className="p-4 sm:p-5 flex flex-row xl:flex-col gap-3 overflow-x-auto xl:overflow-x-visible scrollbar-none snap-x">
              {[
                { title: "المعلومات الأساسية", ref: basicInfoRef  },
                { title: "المحتوى",            ref: contentRef    },
                { title: "الوسائط",            ref: mediaRef      },
                { title: "الأهمية والإعدادات", ref: importanceRef },
                { title: "مراجعة ونشر",        ref: publishRef    },
              ].map((item, index) => (
                <button
                  key={index} type="button" onClick={() => scrollToSection(item.ref)}
                  className="min-w-[170px] sm:min-w-[200px] xl:w-full text-right rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 hover:border-primary hover:bg-primary/5 transition snap-center shrink-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">{item.title}</h3>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">{index + 1}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN FORM */}
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800">إضافة مقال جديد</h1>
              <p className="text-sm text-slate-500 mt-1">أنشئ محتوى غني وجديد</p>
            </div>
          </div>

          {/* SECTION 1: BASIC INFO */}
          <div ref={basicInfoRef} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">المعلومات الأساسية</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-700">عنوان المقال</label>
                <input type="text" placeholder="أدخل عنوان المقال" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-700">التصنيف</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">اختر التصنيف</option>
                  <option>تقنية</option>
                  <option>رياضة</option>
                  <option>اقتصاد</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-slate-700">الهاشتاجات</label>
              <div className="w-full min-h-[60px] rounded-2xl border border-slate-200 bg-white p-3 flex flex-wrap items-center gap-2">
                {hashtags.map((tag, i) => (
                  <div key={i} className="h-10 px-4 rounded-xl bg-secondary text-white flex items-center gap-2 text-sm font-medium">
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeHashtag(tag)}><X size={14} /></button>
                  </div>
                ))}
                <input type="text" value={hashtagInput} onChange={(e) => setHashtagInput(e.target.value)} onKeyDown={handleHashtagKeyDown} placeholder="اكتب هاشتاج واضغط Enter" className="flex-1 min-w-[180px] h-10 outline-none text-sm" />
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-bold text-slate-700">الصورة البارزة</label>
              <div className="relative rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 overflow-hidden bg-slate-50">
                {featuredUploading && <UploadOverlay progress={featuredProgress} label="جاري رفع الصورة البارزة..." />}
                {featuredImage?.url ? (
                  <div className="relative">
                    <img src={featuredImage.url} alt="" className="w-full h-[220px] sm:h-[350px] object-cover" />
                    <button type="button" onClick={handleRemoveFeatured} className="absolute top-3 left-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition"><Trash2 size={18} /></button>
                  </div>
                ) : (
                  <div className="h-[220px] sm:h-[350px] flex flex-col items-center justify-center p-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3"><Upload size={30} /></div>
                    <label className="h-11 px-5 rounded-xl bg-primary text-white flex items-center gap-2 cursor-pointer text-sm font-medium">
                      <Upload size={16} /> رفع صورة
                      <input type="file" hidden accept="image/*" onChange={handleFeaturedImage} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: EDITOR */}
          <div ref={contentRef} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm scroll-mt-24 relative">
            {editorUploading && <UploadOverlay progress={editorProgress} label={editorUploadLabel} />}
            <div className="p-3 border-b border-slate-200 flex flex-wrap gap-2 bg-slate-50">
              <ToolbarButton active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold size={17} /></ToolbarButton>
              <ToolbarButton active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic size={17} /></ToolbarButton>
              <ToolbarButton active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()}><Underline size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()}><List size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("right").run()}><AlignRight size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("center").run()}><AlignCenter size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("left").run()}><AlignLeft size={17} /></ToolbarButton>
              
              <label className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-primary hover:text-primary transition flex items-center justify-center cursor-pointer shrink-0">
                <ImageIcon size={17} />
                <input type="file" hidden accept="image/*" onChange={addImageToEditor} />
              </label>

              <label className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-primary hover:text-primary transition flex items-center justify-center cursor-pointer shrink-0">
                <Video size={17} />
                <input type="file" hidden accept="video/*" onChange={addVideoToEditor} />
              </label>
            </div>
            <EditorContent editor={editor} />
          </div>

          {/* SECTION 3: MEDIA (GALLERY & VIDEO) */}
          <div ref={mediaRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 scroll-mt-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-lg font-black mb-3 text-slate-800">إضافة فيديو خارجي</h3>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
                {videoUploading && <UploadOverlay progress={videoProgress} label="جاري الرفع..." />}
                {videoPreview?.url ? (
                  <div className="relative">
                    <video src={videoPreview.url} controls className="rounded-xl w-full max-h-[200px] object-cover" />
                    <button type="button" onClick={handleRemoveVideo} className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"><X size={16} /></button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Video size={24} className="mx-auto text-primary mb-2" />
                    <label className="h-10 px-4 rounded-xl bg-primary text-white inline-flex items-center gap-2 cursor-pointer text-xs font-medium">
                      اختر فيديو <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-lg font-black mb-3 text-slate-800">معرض صور إضافية</h3>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
                {galleryUploading && <UploadOverlay progress={galleryProgress} label="جاري الرفع..." />}
                <ImageIcon size={24} className="mx-auto text-secondary mb-2" />
                <label className="h-10 px-4 rounded-xl bg-secondary text-white inline-flex items-center gap-2 cursor-pointer text-xs font-medium">
                  اختر صور <input type="file" hidden multiple accept="image/*" onChange={handleGalleryUpload} />
                </label>
              </div>
              {gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {gallery.map((img, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden">
                      <img src={img.url} alt="" className="w-full h-20 object-cover" />
                      <button type="button" onClick={() => handleRemoveGalleryItem(index)} className="absolute top-1 left-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: IMPORTANCE */}
          <div ref={importanceRef} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-slate-800">أهمية المقال وتثبيته</h2>
              <div className="h-12 px-4 rounded-xl bg-secondary text-white flex items-center justify-center font-bold">{importance} / 10</div>
            </div>
            <input type="range" min="1" max="10" value={importance} onChange={(e) => setImportance(Number(e.target.value))} className="w-full accent-[var(--color-secondary)]" />
            
            <label className="mt-4 flex items-center justify-between rounded-xl bg-secondary/10 p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <Flame size={20} className="text-secondary" />
                <div>
                  <h3 className="font-bold text-secondary text-sm">تمييز كخبر عاجل</h3>
                </div>
              </div>
              <input type="checkbox" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} className="w-5 h-5 accent-[var(--color-secondary)]" />
            </label>
          </div>

          {/* SECTION 5: ACTIONS */}
          <div ref={publishRef} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 scroll-mt-24">
            <div className="flex gap-2">
              <button type="button" className="h-12 px-5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition text-sm font-medium text-slate-700">
                <Save size={16} /> حفظ المسودة
              </button>
              <button type="button" onClick={handleCancel} className="h-12 px-5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition text-sm font-medium">
                إلغاء المقال بالكامل
              </button>
            </div>
            <button type="button" className="h-12 px-6 rounded-xl bg-secondary text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-sm">
              نشر الآن <ChevronLeft size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}