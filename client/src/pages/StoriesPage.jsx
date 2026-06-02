// src/pages/StoriesPage.jsx
import React, { useState } from 'react';
import { stories } from '../data/stories';
import StoryModal from '../components/StoryModal';

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [filter, setFilter] = useState('الكل');

  const locations = ['الكل', ...new Set(stories.map(s => s.location))];

  const filteredStories = filter === 'الكل' 
    ? stories 
    : stories.filter(s => s.location === filter);

  return (
    <div className="min-h-screen bg-neutral-950 py-16 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            أصوات من وسط الركام
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
            قصص أطفال تحدوا الحرب، فقدوا الكثير، لكنهم ما زالوا يحلمون بالغد.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setFilter(loc)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === loc 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <div 
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-red-600 transition-all duration-500 hover:translate-y-[-5px]"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{story.location}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{story.name}</h3>
                  <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">{story.title}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-neutral-600">
              لا توجد قصص في هذا التصنيف حالياً.
            </div>
          )}
        </div>
      </div>

      <StoryModal 
        isOpen={!!selectedStory} 
        onClose={() => setSelectedStory(null)} 
        story={selectedStory} 
      />
    </div>
  );
}