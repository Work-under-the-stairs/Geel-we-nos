import React, { useState } from "react";
import {
  Bold, Italic, Underline, Heading1, Heading2,
  List, ListOrdered, Quote, Image as ImageIcon, Video, X, Trash2,
  Upload, Flame, Loader2, Save, ChevronLeft,
  AlignRight, AlignCenter, AlignLeft, Check,
  Link, LinkIcon
} from "lucide-react";
import { EditorContent } from "@tiptap/react";
import toast from "react-hot-toast";

// =============================================================
// UPLOAD PROGRESS OVERLAY
// =============================================================
export function UploadOverlay({ progress, label }) {
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
export function ToolbarButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl border transition flex items-center justify-center shrink-0 ${
        active
          ? "bg-[var(--color-primary,#0D4C54)] text-white border-[var(--color-primary,#0D4C54)]"
          : "bg-white border-slate-200 hover:border-[var(--color-primary,#0D4C54)] hover:text-[var(--color-primary,#0D4C54)]"
      }`}
    >
      {children}
    </button>
  );
}

// =============================================================
// SIDEBAR STEPPER WITH EMBEDDED WRITER TIPS
// =============================================================
export function SidebarStepper({ basicInfoRef, contentRef, mediaRef, importanceRef, publishRef, scrollToSection }) {
  const steps = [
    { title: "المعلومات الأساسية", ref: basicInfoRef },
    { title: "المحتوى", ref: contentRef },
    { title: "الوسائط", ref: mediaRef },
    { title: "الأهمية والإعدادات", ref: importanceRef },
    { title: "مراجعة ونشر", ref: publishRef },
  ];

  const tips = [
    "استخدم عنوان جذاب وواضح",
    "أضف صورة بارزة عالية الجودة",
    "قسم المقال بعناوين فرعية",
    "راجع المقال قبل النشر"
  ];

  return (
    <div className="w-full bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm flex flex-col pb-5" dir="rtl">
      
      {/* هيدر المراحل */}
      <div className="bg-[var(--color-primary,#0D4C54)] p-4 sm:p-5 text-white text-center rounded-t-[27px] mb-4">
        <h2 className="text-lg sm:text-xl font-black">المراحل</h2>
      </div>

      {/* قائمة الخطوات */}
      <div className="px-4 sm:px-5 flex flex-row xl:flex-col gap-3.5 overflow-x-auto xl:overflow-x-visible scrollbar-none snap-x mb-2">
        {steps.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToSection(item.ref)}
            className="min-w-[180px] sm:min-w-[210px] xl:w-full text-right rounded-2xl border border-slate-100 p-4 hover:border-[var(--color-primary)]/30 hover:bg-slate-50/80 transition snap-center shrink-0 shadow-xs"
          >
            <div className="flex items-center gap-4 justify-start">
              <div className="w-9 h-9 rounded-full bg-[var(--color-primary,#0D4C54)] text-white flex items-center justify-center text-sm font-black shrink-0 shadow-sm">
                {index + 1}
              </div>
              <h3 className="font-bold text-xs sm:text-[14px] text-slate-700 tracking-wide">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* صندوق نصائح الكاتب المحدث لتبدأ العناصر من اليمين تماماً */}
      <div className="mx-4 sm:mx-5 bg-[var(--color-secondary-bg,#FFF8F2)] rounded-2xl border border-[var(--color-secondary-border,#FFE1CC)] p-5 shadow-xs mt-3" dir="rtl">
        <div className="text-right mb-4">
          <h3 className="font-black text-sm sm:text-base text-[var(--color-secondary,#FF5A00)] tracking-wide">
            نصائح لكتابة مقال مميز
          </h3>
        </div>
        <ul className="space-y-3 text-right">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start justify-start gap-3 text-right">
              {/* أيقونة الصح في اليمين دائماً */}
              <Check size={18} className="text-[var(--color-secondary,#FF5A00)] shrink-0 mt-0.5" />
              {/* النص بجانب الأيقونة مباشرة متجهاً لليسار */}
              <span className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {tip}
              </span>
            </div>
          ))}
        </ul>
      </div>

    </div>
  );
}

// =============================================================
// SECTION 1: BASIC INFO
// =============================================================
export function BasicInfoSection({
  innerRef, title, setTitle, category, setCategory, isCatsLoading, isCatsError,
  categories, hashtags, hashtagInput, setHashtagInput, handleHashtagKeyDown,
  removeHashtag, featuredUploading, featuredProgress, featuredImage,
  handleRemoveFeatured, handleFeaturedImage
}) {
  return (
    <div ref={innerRef} className="bg-white rounded-[28px] border border-slate-200 p-4 sm:p-6 shadow-sm scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">المعلومات الأساسية</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-bold text-slate-700">عنوان المقال</label>
          <input
            type="text"
            placeholder="أدخل عنوان المقال"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#0D4C54)]"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-slate-700">التصنيف</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isCatsLoading || isCatsError}
            className="w-full h-12 sm:h-14 rounded-xl border border-slate-200 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#0D4C54)] disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            {isCatsLoading ? (
              <option>جاري تحميل الأقسام...</option>
            ) : isCatsError ? (
              <option>خطأ في جلب الأقسام من السيرفر</option>
            ) : (
              <>
                <option value="">اختر التصنيف</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-sm font-bold text-slate-700">الهاشتاجات</label>
        <div className="w-full min-h-[60px] rounded-2xl border border-slate-200 bg-white p-3 flex flex-wrap items-center gap-2">
          {hashtags.map((tag, i) => (
            <div key={i} className="h-10 px-4 rounded-xl bg-[var(--color-secondary,#FF5A00)] text-white flex items-center gap-2 text-sm font-medium">
              <span>{tag}</span>
              <button type="button" onClick={() => removeHashtag(tag)}><X size={14} /></button>
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

      <div className="mt-6">
        <label className="block mb-2 text-sm font-bold text-slate-700">الصورة البارزة</label>
        <div className="relative rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 overflow-hidden bg-slate-50">
          {featuredUploading && <UploadOverlay progress={featuredProgress} label="جاري رفع الصورة البارزة..." />}
          {featuredImage?.url ? (
            <div className="relative">
              <img src={featuredImage.url} alt="" className="w-full h-[220px] sm:h-[350px] object-cover" />
              <button
                type="button"
                onClick={handleRemoveFeatured}
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <div className="h-[220px] sm:h-[350px] flex flex-col items-center justify-center p-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[var(--color-primary,#0D4C54)] mb-3">
                <Upload size={30} />
              </div>
              <label className="h-11 px-5 rounded-xl bg-[var(--color-primary,#0D4C54)] text-white flex items-center gap-2 cursor-pointer text-sm font-medium hover:opacity-90 transition">
                <Upload size={16} /> رفع صورة
                <input type="file" hidden accept="image/*" onChange={handleFeaturedImage} />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// SECTION 2: EDITOR SECTION
// =============================================================
export function EditorSection({
  innerRef, editorUploading, editorProgress, editorUploadLabel, editor,
  addImageToEditor, addVideoToEditor
}) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const handleSaveLink = () => {
    if (linkUrl.trim() === "") {
      toast.error("يرجى إدخال رابط صحيح");
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    toast.success("تم إضافة الرابط بنجاح");
    
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
    toast.success("تم إزالة الرابط");
  };

  return (
    <div ref={innerRef} className="bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm scroll-mt-24 relative">
      {editorUploading && <UploadOverlay progress={editorProgress} label={editorUploadLabel} />}

      <div className="p-3 border-b border-slate-200 flex flex-wrap gap-2 bg-slate-50 relative">
        <ToolbarButton active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold size={17} />
        </ToolbarButton>
        <ToolbarButton active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic size={17} />
        </ToolbarButton>
        <ToolbarButton active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          <Underline size={17} />
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()}><List size={17} /></ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered size={17} /></ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote size={17} /></ToolbarButton>
        
        <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("right").run()}><AlignRight size={17} /></ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("center").run()}><AlignCenter size={17} /></ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("left").run()}><AlignLeft size={17} /></ToolbarButton>

        <label className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-[var(--color-primary,#0D4C54)] hover:text-[var(--color-primary,#0D4C54)] transition flex items-center justify-center cursor-pointer shrink-0">
          <ImageIcon size={17} />
          <input type="file" hidden accept="image/*" onChange={addImageToEditor} />
        </label>

        <label className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-[var(--color-primary,#0D4C54)] hover:text-[var(--color-primary,#0D4C54)] transition flex items-center justify-center cursor-pointer shrink-0">
          <Video size={17} />
          <input type="file" hidden accept="video/*" onChange={addVideoToEditor} />
        </label>

        <ToolbarButton 
          active={editor?.isActive("link")} 
          onClick={() => {
            if (!editor) return;
            if (editor.isActive("link")) {
              handleRemoveLink();
            } else {
              setShowLinkInput(!showLinkInput);
            }
          }}
        >
          <LinkIcon size={17} />
        </ToolbarButton>
      </div>

      {showLinkInput && (
        <div className="bg-slate-100 p-3 flex gap-2 border-b border-slate-200 transition-all">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="أدخل رابطاً (مثال: https://example.com)"
            dir="ltr"
            className="flex-1 h-10 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#0D4C54)] text-sm text-left"
          />
          <button 
            onClick={handleSaveLink}
            className="h-10 px-5 rounded-xl bg-[var(--color-primary,#0D4C54)] text-white text-sm font-bold hover:opacity-90 transition"
          >
            إضافة
          </button>
          <button 
            onClick={() => setShowLinkInput(false)}
            className="h-10 px-5 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-300 transition"
          >
            إلغاء
          </button>
        </div>
      )}

      <div className="p-4 sm:p-6 min-h-[300px]">
        <EditorContent 
          editor={editor} 
          className="outline-none prose max-w-none text-slate-800
            [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-800 [&_a]:cursor-pointer
            [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200 [&_img]:shadow-sm [&_img]:mx-auto
            [&_figure]:mx-auto [&_figure]:text-center [&_figure]:my-6
            [&_figcaption]:text-sm [&_figcaption]:text-slate-500 [&_figcaption]:mt-2 [&_figcaption]:italic [&_figcaption]:outline-none"
        />
      </div>
    </div>
  );
}

// =============================================================
// SECTION 3: MEDIA SECTION
// =============================================================
export function MediaSection({
  innerRef, videoUploading, videoProgress, videoPreview, handleRemoveVideo, handleVideoUpload,
  galleryUploading, galleryProgress, handleGalleryUpload, gallery, handleRemoveGalleryItem
}) {
  return (
    <div ref={innerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 scroll-mt-24">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h3 className="text-lg font-black mb-3 text-slate-800">إضافة فيديو خارجي</h3>
        <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
          {videoUploading && <UploadOverlay progress={videoProgress} label="جاري الرفع..." />}
          {videoPreview?.url ? (
            <div className="relative">
              <video src={videoPreview.url} controls className="rounded-xl w-full max-h-[200px] object-cover" />
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="py-2">
              <Video size={24} className="mx-auto text-[var(--color-primary,#0D4C54)] mb-2" />
              <label className="h-10 px-4 rounded-xl bg-[var(--color-primary,#0D4C54)] text-white inline-flex items-center gap-2 cursor-pointer text-xs font-medium hover:opacity-90 transition">
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
          <ImageIcon size={24} className="mx-auto text-[var(--color-secondary,#FF5A00)] mb-2" />
          <label className="h-10 px-4 rounded-xl bg-[var(--color-secondary,#FF5A00)] text-white inline-flex items-center gap-2 cursor-pointer text-xs font-medium hover:opacity-90 transition">
            اختر صور <input type="file" hidden multiple accept="image/*" onChange={handleGalleryUpload} />
          </label>
        </div>
        {gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {gallery.map((img, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden">
                <img src={img.url} alt="" className="w-full h-20 object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryItem(index)}
                  className="absolute top-1 left-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================
// SECTION 4: IMPORTANCE & URGENT SETTINGS
// =============================================================
export function ImportanceSection({ innerRef, importance, setImportance, isUrgent, setIsUrgent }) {
  return (
    <div ref={innerRef} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-slate-800">أهمية المقال وتثبيته</h2>
        <div className="h-12 px-4 rounded-xl bg-[var(--color-secondary,#FF5A00)] text-white flex items-center justify-center font-bold">
          {importance} / 10
        </div>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={importance}
        onChange={(e) => setImportance(Number(e.target.value))}
        className="w-full accent-[var(--color-secondary,#FF5A00)]"
      />

      <label className="mt-4 flex items-center justify-between rounded-xl bg-[var(--color-secondary,#FF5A00)]/5 p-4 cursor-pointer border border-[var(--color-secondary,#FF5A00)]/20">
        <div className="flex items-center gap-3">
          <Flame size={20} className="text-[var(--color-secondary,#FF5A00)]" />
          <div>
            <h3 className="font-bold text-[var(--color-secondary,#FF5A00)] text-sm">تمييز كخبر عاجل</h3>
          </div>
        </div>
        <input
          type="checkbox"
          checked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
          className="w-5 h-5 accent-[var(--color-secondary,#FF5A00)]"
        />
      </label>
    </div>
  );
}

// =============================================================
// SECTION 5: ACTION BUTTONS
// =============================================================
export function ActionButtonsSection({ innerRef, handleSubmitArticle, handleCancel }) {
  return (
    <div ref={innerRef} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 scroll-mt-24">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleSubmitArticle("draft")}
          className="h-12 px-5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition text-sm font-medium text-slate-700"
        >
          <Save size={16} /> حفظ المسودة
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="h-12 px-5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition text-sm font-medium"
        >
          إلغاء المقال بالكامل
        </button>
      </div>
      <button
        type="button"
        onClick={() => handleSubmitArticle("published")}
        className="h-12 px-6 rounded-xl bg-[var(--color-secondary,#FF5A00)] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-sm"
      >
        نشر الآن <ChevronLeft size={18} />
      </button>
    </div>
  );
}