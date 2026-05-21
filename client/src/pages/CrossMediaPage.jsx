import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, X, Mic, MapPin, Quote } from 'lucide-react';
import { stories } from '../data/stories';

// المكون الفرعي للـ Modal
const StoryModal = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative bg-neutral-900 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <button onClick={onClose} className="absolute top-5 right-5 z-50 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition"><X size={24} /></button>
            
            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
              <img src={story.image} alt={story.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-900 to-transparent">
                <div className="flex items-center gap-2 text-red-500 mb-2"><MapPin size={16} /><span className="text-sm font-bold uppercase tracking-widest">{story.location}</span></div>
                <h2 className="text-4xl font-bold text-white">{story.name}</h2>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-neutral-900">
              <div className="mb-8 p-4 bg-white/5 rounded-2xl flex items-center gap-4 border border-white/10">
                <div className="bg-red-600 p-3 rounded-full animate-pulse"><Mic size={20} className="text-white" /></div>
                <div>
                  <p className="text-xs text-neutral-400">استمع لشهادة الطفل</p>
                  <audio controls className="h-8"><source src={story.audio} type="audio/mpeg" /></audio>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="flex gap-2 mb-4"><Quote className="text-red-600 rotate-180" size={32} /><h3 className="text-2xl font-semibold text-neutral-200">{story.title}</h3></div>
                {story.paragraphs.map((p, index) => (<p key={index} className="text-neutral-400 leading-loose text-lg mb-6">{p}</p>))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// الصفحة الرئيسية
const CrossMediaPage = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 md:p-20">
      <motion.header initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">أطفال الحروب.. أجيال من العزيمة والإرادة</h1>
        <p className="text-xl text-neutral-400">قصص بصرية وصوتية من غزة والسودان</p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedStory(story)}
            className="bg-neutral-900 rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-red-500/50 transition-all"
          >
            <img src={story.image} alt={story.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <span className="text-red-500 font-bold uppercase text-xs">{story.location}</span>
              <h2 className="text-2xl font-bold mt-2">{story.name}</h2>
              <p className="text-neutral-400 mt-2 line-clamp-2">{story.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <StoryModal isOpen={!!selectedStory} onClose={() => setSelectedStory(null)} story={selectedStory} />
    </div>
  );
};

export default CrossMediaPage;