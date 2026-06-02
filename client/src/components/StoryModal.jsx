// src/components/StoryModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, Mic, MapPin, Quote } from 'lucide-react';

const StoryModal = ({ isOpen, onClose, story }) => {
  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="relative bg-neutral-900 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-50 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
          <img 
            src={story.image} 
            alt={story.name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-900 to-transparent">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <MapPin size={16} />
              <span className="text-sm font-bold uppercase tracking-widest">{story.location}</span>
            </div>
            <h2 className="text-4xl font-bold text-white">{story.name}</h2>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-neutral-900">
          <div className="mb-8 p-4 bg-white/5 rounded-2xl flex items-center gap-4 border border-white/10">
            <div className="bg-red-600 p-3 rounded-full animate-pulse">
              <Mic size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">استمع لشهادة الطفل</p>
              <p className="text-sm font-medium">سجل بصوت: {story.name}</p>
            </div>
            <audio controls className="h-8 ml-auto opacity-50 hover:opacity-100 transition">
              <source src={story.audio} type="audio/mpeg" />
            </audio>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="flex gap-2 mb-4">
               <Quote className="text-red-600 rotate-180" size={32} />
               <h3 className="text-2xl font-semibold text-neutral-200 leading-relaxed">
                 {story.title}
               </h3>
            </div>
            
            {story.paragraphs.map((p, index) => (
              <p key={index} className="text-neutral-400 leading-loose text-lg mb-6">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-white/10">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full" />
              بيانات من واقع الأزمة
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-red-500 text-2xl font-black">{story.stats.value}</p>
                <p className="text-neutral-500 text-xs">{story.stats.label}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-white text-2xl font-black">{story.stats.year}</p>
                <p className="text-neutral-500 text-xs">تاريخ الحالة</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoryModal;