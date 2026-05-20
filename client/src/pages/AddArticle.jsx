import React, { useRef, useState } from "react";

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

  // ── Featured image ───────────────────────────────────────────
  const [featuredImage, setFeaturedImage]         = useState(null);
  const [featuredProgress, setFeaturedProgress]   = useState(0);
  const [featuredUploading, setFeaturedUploading] = useState(false);

  // ── Gallery ──────────────────────────────────────────────────
  const [gallery, setGallery]                   = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryProgress, setGalleryProgress]   = useState(0);

  // ── Video (media section) ────────────────────────────────────
  const [videoPreview, setVideoPreview]       = useState(null);
  const [videoUploading, setVideoUploading]   = useState(false);
  const [videoProgress, setVideoProgress]     = useState(0);

  // ── Editor inline uploads ────────────────────────────────────
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

  // ── Tiptap editor ─────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<h2>ابدأ بكتابة المقال...</h2>",
    editorProps: {
      attributes: {
        class:
          "min-h-[350px] md:min-h-[500px] outline-none p-4 md:p-6 text-slate-700 leading-8 text-[15px]",
      },
    },
  });

  // ── Upload: Featured image ────────────────────────────────────
  const handleFeaturedImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedUploading(true);
    setFeaturedProgress(0);
    try {
      const url = await uploadToImageKit(
        file,
        IK_FOLDERS.featured,
        (pct) => setFeaturedProgress(pct)
      );
      setFeaturedImage(url);
    } catch (err) {
      console.error("Featured image upload failed:", err);
      alert("فشل رفع الصورة، حاول مجدداً");
    } finally {
      setFeaturedUploading(false);
      e.target.value = "";
    }
  };

  // ── Upload: Gallery ───────────────────────────────────────────
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryUploading(true);
    setGalleryProgress(0);
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadToImageKit(
          files[i],
          IK_FOLDERS.gallery,
          (pct) => {
            const base = (i / files.length) * 100;
            setGalleryProgress(Math.round(base + pct / files.length));
          }
        );
        uploaded.push(url);
      } catch (err) {
        console.error(`Gallery upload failed for file ${i}:`, err);
      }
    }
    setGallery((prev) => [...prev, ...uploaded]);
    setGalleryUploading(false);
    e.target.value = "";
  };

  // ── Upload: Video (media section) ─────────────────────────────
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoProgress(0);
    try {
      const url = await uploadToImageKit(
        file,
        IK_FOLDERS.video,
        (pct) => setVideoProgress(pct)
      );
      setVideoPreview(url);
    } catch (err) {
      console.error("Video upload failed:", err);
      alert("فشل رفع الفيديو، حاول مجدداً");
    } finally {
      setVideoUploading(false);
      e.target.value = "";
    }
  };

  // ── Upload: Image → Tiptap editor ─────────────────────────────
  const addImageToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الصورة...");
    setEditorProgress(0);
    try {
      const url = await uploadToImageKit(
        file,
        IK_FOLDERS.editor,
        (pct) => setEditorProgress(pct)
      );
      
      // FIX: Secure transactional view assignment to fix RangeError mismatch
      const { view } = editor;
      const { state } = view;
      const node = state.schema.nodes.image.create({ src: url });
      const transaction = state.tr.replaceSelectionWith(node);
      view.dispatch(transaction);
      editor.commands.focus();
    } catch (err) {
      console.error("Editor image upload failed:", err);
      alert("فشل رفع الصورة في المحرر");
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  // ── Upload: Video → Tiptap editor ─────────────────────────────
  const addVideoToEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setEditorUploading(true);
    setEditorUploadLabel("جاري رفع الفيديو...");
    setEditorProgress(0);
    try {
      const url = await uploadToImageKit(
        file,
        IK_FOLDERS.video,
        (pct) => setEditorProgress(pct)
      );
      
      // FIX: Apply a clean insert content block execution schema instead of explicit chain injection
      editor.commands.focus();
      editor.commands.insertContent(
        `<video controls playsinline class="rounded-2xl my-4 w-full" src="${url}"></video>`
      );
    } catch (err) {
      console.error("Editor video upload failed:", err);
      alert("فشل رفع الفيديو في المحرر");
    } finally {
      setEditorUploading(false);
      e.target.value = "";
    }
  };

  // ── Hashtags ──────────────────────────────────────────────────
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

  // =============================================================
  // RENDER
  // =============================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f5f7fb] p-3 sm:p-6"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <style>{`
        .ProseMirror h1 { font-size:28px; font-weight:800; margin-bottom:18px; }
        @media(min-width:768px){ .ProseMirror h1 { font-size:32px; } }
        .ProseMirror h2 { font-size:22px; font-weight:700; margin-bottom:14px; }
        @media(min-width:768px){ .ProseMirror h2 { font-size:26px; } }
        .ProseMirror p  { margin-bottom:14px; }
        .ProseMirror ul { list-style:disc;    padding-right:20px; }
        .ProseMirror ol { list-style:decimal; padding-right:20px; }
        .ProseMirror blockquote {
          border-right:4px solid var(--color-primary);
          padding:14px; background:#f8fafc;
          border-radius:12px; margin:16px 0;
        }
        .ProseMirror img   { border-radius:18px; margin:18px 0; width:100%; }
        .ProseMirror video { border-radius:18px; margin:18px 0; width:100%; }
      `}</style>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-4 sm:gap-6 items-start">

        {/* ══ SIDEBAR ══════════════════════════════════════════ */}
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
                  key={index}
                  type="button"
                  onClick={() => scrollToSection(item.ref)}
                  className="min-w-[170px] sm:min-w-[200px] xl:w-full text-right rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 hover:border-primary hover:bg-primary/5 transition snap-center shrink-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1 xl:line-clamp-none">
                      {item.title}
                    </h3>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="hidden sm:block p-5 border-t border-slate-100 xl:border-t-0">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <h3 className="text-sm font-black text-orange-600 mb-3">نصائح لكتابة مقال مميز</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✔ استخدم عنوان جذاب وواضح</li>
                  <li>✔ أضف صورة بارزة عالية الجودة</li>
                  <li>✔ قسم المقال بعناوين فرعية</li>
                  <li>✔ راجع المقال قبل النشر</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ══ MAIN ═════════════════════════════════════════════ */}
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">

          {/* HEADER */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800">إضافة مقال جديد</h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1">أنشئ محتوى جديد</p>
            </div>
            <button type="button" className="w-full sm:w-auto h-12 px-5 rounded-2xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition text-sm sm:text-base font-medium">
              <Eye size={18} /> معاينة المقال
            </button>
          </div>

          {/* ── BASIC INFO ──────────────────────────────────── */}
          <div
            ref={basicInfoRef}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm scroll-mt-20 xl:scroll-mt-24"
          >
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 sm:mb-6">
              المعلومات الأساسية
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-700">عنوان المقال</label>
                <input
                  type="text"
                  placeholder="أدخل عنوان المقال"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border border-slate-200 px-4 sm:px-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-700">التصنيف</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border border-slate-200 px-4 sm:px-5 bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">اختر التصنيف</option>
                  <option>تقنية</option>
                  <option>رياضة</option>
                  <option>اقتصاد</option>
                  <option>أخبار</option>
                </select>
              </div>
            </div>

            {/* HASHTAGS */}
            <div className="mt-4">
              <label className="block mb-3 text-sm font-bold text-slate-700">الهاشتاجات</label>
              <div className="w-full min-h-[60px] rounded-2xl border border-slate-200 bg-white p-3 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-primary">
                {hashtags.map((tag, i) => (
                  <div key={i} className="h-10 px-4 rounded-xl bg-secondary text-white flex items-center gap-2 text-sm font-medium">
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeHashtag(tag)} className="hover:opacity-70">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyDown={handleHashtagKeyDown}
                  placeholder="اكتب هاشتاج واضغط Enter"
                  className="flex-1 min-w-[180px] h-10 outline-none text-sm"
                />
              </div>
            </div>

            {/* FEATURED IMAGE */}
            <div className="mt-6 sm:mt-8">
              <label className="block mb-3 text-sm font-bold text-slate-700">الصورة البارزة</label>
              <div className="relative rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 overflow-hidden bg-slate-50">

                {featuredUploading && (
                  <UploadOverlay progress={featuredProgress} label="جاري رفع الصورة البارزة..." />
                )}

                {featuredImage ? (
                  <div className="relative">
                    <img
                      src={featuredImage}
                      alt=""
                      className="w-full h-[220px] sm:h-[350px] object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-lg max-w-[60%] truncate">
                      {featuredImage}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFeaturedImage(null)}
                      className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[220px] sm:h-[350px] flex flex-col items-center justify-center p-4">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 sm:mb-4">
                      <Upload size={35} />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-700 mb-2 text-center">
                      رفع صورة المقال
                    </h3>
                    <label className="h-10 sm:h-12 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-primary text-white flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium hover:opacity-95 transition">
                      <Upload size={16} /> رفع صورة
                      <input type="file" hidden accept="image/*" onChange={handleFeaturedImage} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── EDITOR ──────────────────────────────────────── */}
          <div
            ref={contentRef}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm scroll-mt-20 xl:scroll-mt-24"
          >
            {/* TOOLBAR */}
            <div className="p-3 sm:p-4 border-b border-slate-200 flex flex-wrap gap-1.5 sm:gap-2 bg-slate-50 max-h-[180px] overflow-y-auto">
              <ToolbarButton active={editor?.isActive("bold")}      onClick={() => editor?.chain().focus().toggleBold().run()}><Bold size={17} /></ToolbarButton>
              <ToolbarButton active={editor?.isActive("italic")}    onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic size={17} /></ToolbarButton>
              <ToolbarButton active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()}><Underline size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()}><List size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("right").run()}><AlignRight size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("center").run()}><AlignCenter size={17} /></ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("left").run()}><AlignLeft size={17} /></ToolbarButton>
              <ToolbarButton
                onClick={() => {
                  const url = prompt("ضع الرابط");
                  if (url) editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                }}
              >
                <LinkIcon size={17} />
              </ToolbarButton>

              {/* IMAGE → editor */}
              <label className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl border border-slate-200 bg-white hover:border-primary hover:text-primary transition flex items-center justify-center cursor-pointer shrink-0">
                {editorUploading && editorUploadLabel.includes("صورة")
                  ? <Loader2 size={17} className="animate-spin text-primary" />
                  : <ImageIcon size={17} />
                }
                <input type="file" hidden accept="image/*" onChange={addImageToEditor} />
              </label>

              {/* VIDEO → editor */}
              <label className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl border border-slate-200 bg-white hover:border-primary hover:text-primary transition flex items-center justify-center cursor-pointer shrink-0">
                {editorUploading && editorUploadLabel.includes("فيديو")
                  ? <Loader2 size={17} className="animate-spin text-primary" />
                  : <Video size={17} />
                }
                <input type="file" hidden accept="video/*" onChange={addVideoToEditor} />
              </label>
            </div>

            {/* editor upload progress bar */}
            {editorUploading && (
              <div className="bg-primary/5 px-4 py-2 flex items-center gap-3 border-b border-slate-200">
                <Loader2 size={16} className="animate-spin text-primary shrink-0" />
                <span className="text-sm text-primary font-medium">{editorUploadLabel}</span>
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200"
                    style={{ width: `${editorProgress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 shrink-0">{editorProgress}%</span>
              </div>
            )}

            <EditorContent editor={editor} />
          </div>

          {/* ── MEDIA ════════════════════════════════════════─ */}
          <div
            ref={mediaRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 scroll-mt-20 xl:scroll-mt-24"
          >
            {/* VIDEO */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-black mb-4 sm:mb-5 text-slate-800">إضافة فيديو</h3>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center bg-slate-50">
                {videoUploading && <UploadOverlay progress={videoProgress} label="جاري رفع الفيديو..." />}
                {videoPreview ? (
                  <div className="relative">
                    <video
                      src={videoPreview}
                      controls
                      className="rounded-xl sm:rounded-2xl w-full max-h-[250px] object-cover"
                    />
                    <div className="mt-2 text-[10px] text-slate-400 break-all text-right px-1">
                      {videoPreview}
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoPreview(null)}
                      className="absolute top-2 left-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3 sm:mb-4">
                      <Video size={28} />
                    </div>
                    <label className="h-10 sm:h-12 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-primary text-white inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium">
                      <Upload size={16} /> اختر فيديو
                      <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* GALLERY */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-black mb-4 sm:mb-5 text-slate-800">معرض الصور</h3>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center bg-slate-50">
                {galleryUploading && <UploadOverlay progress={galleryProgress} label="جاري رفع الصور..." />}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center mb-3 sm:mb-4">
                  <ImageIcon size={28} />
                </div>
                <label className="h-10 sm:h-12 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-secondary text-white inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium">
                  <Upload size={16} /> اختر صور
                  <input type="file" hidden multiple accept="image/*" onChange={handleGalleryUpload} />
                </label>
              </div>
              {gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                  {gallery.map((img, index) => (
                    <div key={index} className="relative rounded-xl sm:rounded-2xl overflow-hidden group">
                      <img src={img} alt="" className="w-full h-24 sm:h-32 object-cover" />
                      <button
                        type="button"
                        onClick={() => setGallery((prev) => prev.filter((_, i) => i !== index))}
                        className="absolute top-1.5 left-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── IMPORTANCE ──────────────────────────────────── */}
          <div
            ref={importanceRef}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm scroll-mt-20 xl:scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">أهمية المقال</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">تحكم في أولوية ظهور المقال</p>
              </div>
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-white shadow-lg self-center shrink-0 ${
                  importance >= 8 ? "bg-red-500" : importance >= 5 ? "bg-secondary" : "bg-primary"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black">{importance}</span>
                <span className="text-xs sm:text-sm">/10</span>
              </div>
            </div>
            <input
              type="range" min="1" max="10" value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="w-full h-2 sm:h-3 rounded-full accent-[var(--color-secondary)] cursor-pointer"
            />
            <div className="flex justify-between mt-3 text-xs sm:text-sm text-slate-400 px-1">
              {[1,2,3,4,5,6,7,8,9,10].map((n) => <span key={n}>{n}</span>)}
            </div>
            <label className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl sm:rounded-3xl border border-secondary/20 bg-secondary/10 p-4 sm:p-5 cursor-pointer gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-3xl bg-secondary text-white flex items-center justify-center shrink-0">
                  <Flame size={28} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-secondary">عاجل</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">إظهار المقال كخبر عاجل</p>
                </div>
              </div>
              <input
                type="checkbox" checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-5 h-5 sm:w-6 sm:h-6 accent-[var(--color-secondary)] self-end sm:self-auto"
              />
            </label>
          </div>

          {/* ── FOOTER / PUBLISH ────────────────────────────── */}
          <div
            ref={publishRef}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 scroll-mt-20 xl:scroll-mt-24"
          >
            <div className="grid grid-cols-2 sm:flex gap-2.5 sm:gap-3">
              <button type="button" className="h-11 sm:h-12 px-4 sm:px-6 rounded-xl sm:rounded-2xl border border-slate-200 flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-slate-50 transition text-xs sm:text-sm font-medium text-slate-700">
                <Save size={16} /> حفظ كمسودة
              </button>
              <button type="button" className="h-11 sm:h-12 px-4 sm:px-6 rounded-xl sm:rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 transition text-xs sm:text-sm font-medium">
                إلغاء
              </button>
            </div>
            <button type="button" className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-secondary text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-sm sm:text-base">
              نشر المقال <ChevronLeft size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}