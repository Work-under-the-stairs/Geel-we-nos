// src/pages/ArticleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Clock, MessageSquare, SendHorizonal, Play, FolderOpen, Reply, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { isAuthenticated, getUsername, isAdmin } from "../../../utils/auth";
// استدعاء الهوكس الحقيقية بتاعتك
import { 
  useAddReply, 
} from '../../../hooks/useArticles';


const CommentItem = ({ comment, articleId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  // استدعاء هوك إضافة الرد وتمرير الـ ID بتاع التعليق ده بالتحديد
  const { mutate: submitReply, isPending: isReplyingPending } = useAddReply(articleId, comment._id);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("يجب تسجيل الدخول أولاً!");
      return;
    }

    const username = getUsername();
    console.log("المعلق الحالي هو:", username);

    if (!replyText.trim()) return;

    // افترضت إن الباك إند بيستقبل حقل اسمه text أو commentText (عدليها حسب الـ Schema بتاعتك)
    submitReply({ content: replyText }, {
      onSuccess: () => {
        setReplyText("");
        setIsReplying(false); // نقفل مربع الرد بعد النجاح
      }
    });
  };

  return (
    <div className="bg-white border border-gray-100 p-4 rounded-2xl transition-all hover:border-gray-200">
      {/* التعليق الأساسي */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-gray-800">{comment.writer?.name || "مستخدم"}</span>
          <span className="text-[11px] text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <p className="text-gray-600 text-md ">
          {comment.content}
        </p>
        
        {/* زرار الرد */}
        <button 
          onClick={() => setIsReplying(!isReplying)}
          className="text-[11px] font-bold text-gray-400 hover:text-[var(--color-primary)] flex items-center gap-1 transition-colors mt-2"
        >
          <Reply size={12} className="transform scale-x-[-1] cursor-pointer" />
          <span>رد</span>
        </button>
      </div>

      {/* مربع كتابة الرد (يظهر فقط عند الضغط على زر رد) */}
      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-3 relative">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="اكتب ردك..."
            autoFocus
            className="w-full text-xs rounded-lg border border-gray-200 py-2.5 pr-3 pl-10 focus:border-[var(--color-primary)] outline-none transition-all bg-gray-50"
          />
          <button 
            type="submit" 
            disabled={isReplyingPending}
            className="absolute left-1.5 top-1.5 bottom-1.5 bg-[var(--color-primary)] text-white px-2.5 rounded-md hover:bg-[var(--color-primary)]/90 transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isReplyingPending ? <Loader2 size={12} className="animate-spin" /> : <SendHorizonal size={12} className="cursor-pointer" />}
          </button>
        </form>
      )}

      {/* عرض الردود السابقة (Nested Replies) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 mr-4 pr-3 border-r-2 border-[var(--color-primary)]/20 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply._id} className="bg-gray-50/80 p-3 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-gray-800">{reply.writer?.name || "مستخدم"}</span>
                <span className="text-[10px] text-gray-400">
                  {new Date(reply.createdAt).toLocaleDateString('ar-EG')}
                </span>
              </div>
              <p className="text-gray-600 text-md leading-relaxed font-light">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;