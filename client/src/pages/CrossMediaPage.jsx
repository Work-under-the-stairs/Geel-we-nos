import React from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2 } from 'lucide-react';

const stories = [
  { id: 1, name: "دعاء", location: "غزة", text: "طبيبة المستقبل.. ألم كبير في جسد صغير", color: "bg-red-500" },
  { id: 2, name: "غزل", location: "غزة", text: "صحافية المستقبل.. حلم لا ينكسر", color: "bg-orange-500" },
  { id: 3, name: "أدهم", location: "غزة", text: "يدي سبقتني للجنة.. إيمان يتحدى الحرب", color: "bg-red-600" },
  { id: 4, name: "حسن", location: "السودان", text: "عقله وبراءته.. تفوق المحارب", color: "bg-yellow-600" },
  { id: 5, name: "أحمد", location: "السودان", text: "متلازمة القلق.. أمل في إعادة الإعمار", color: "bg-yellow-700" }
];

const CrossMediaPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      {/* العنوان الرئيسي مع حركة */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">أطفال الحروب.. أجيال من العزيمة</h1>
        <p className="text-xl text-neutral-400">قصص من غزة والسودان</p>
      </motion.header>

      {/* شبكة القصص */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <motion.div 
            key={story.id}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl overflow-hidden ${story.color} p-6 h-80 flex flex-col justify-end cursor-pointer`}
          >
            <span className="text-xs uppercase tracking-widest opacity-75">{story.location}</span>
            <h2 className="text-2xl font-bold mt-2">{story.name}</h2>
            <p className="text-sm mt-2 opacity-90">{story.text}</p>
            <div className="mt-4 flex gap-4">
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/40">
                <Play size={20} />
              </button>
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/40">
                <Volume2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CrossMediaPage;