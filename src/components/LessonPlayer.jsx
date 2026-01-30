import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X, Terminal } from 'lucide-react';
import clsx from 'clsx';

export const LessonPlayer = ({ lesson, onComplete, onExit }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = lesson.slides && lesson.slides[currentSlideIndex];

  if (!lesson.slides || lesson.slides.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-96 bg-cyber-card border border-cyber-primary/30 rounded-2xl shadow-neon-blue p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <Terminal size={64} className="text-cyber-primary mb-6 animate-pulse" />
              <h2 className="text-3xl font-black mb-4 text-white">資料解密中...</h2>
              <p className="text-cyber-primary font-mono mb-8">本區塊資料尚未完全同步，工程師正在搶修！</p>
              <div className="flex gap-4 z-10">
                <button onClick={onComplete} className="bg-cyber-success text-black px-6 py-3 rounded-none font-bold shadow-neon-green hover:bg-green-400 transition-all skew-x-[-10deg]">
                    <span className="skew-x-[10deg] inline-block">略過任務 (測試用)</span>
                </button>
                <button onClick={onExit} className="border border-white/20 text-gray-400 px-6 py-3 hover:text-white hover:border-white transition-all">
                    中止任務
                </button>
              </div>
          </div>
      )
  }

  const handleNext = () => {
    if (currentSlideIndex < lesson.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const [count, setCount] = useState(0); // Initialize with 0 or slide.start
  
  // Update count when slide changes
  useEffect(() => {
     if (slide && slide.start !== undefined) {
         setCount(slide.start);
     } else {
         setCount(0);
     }
  }, [slide]);


  // Interactive task logic
  const handleInteractiveClick = () => {
       if (slide.task === 'count_to_target') {
          setCount(prev => prev + 1);
       }
       // Specific logic for place_value_drag is too complex for this demo, 
       // but we can simulate a "success" state after a click for the visual demo.
       if (slide.task === 'place_value_drag') {
           setCount(prev => prev + 1); // Just increment to show interaction
       }
  };

  return (
    <div className="bg-cyber-card border border-cyber-primary/50 rounded-2xl shadow-neon-blue overflow-hidden min-h-[70vh] flex flex-col relative">
      {/* HUD Header */}
      <div className="bg-black/50 p-4 flex justify-between items-center border-b border-cyber-primary/30">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
            <span className="font-mono text-cyber-primary text-sm tracking-widest uppercase">Live Connection</span>
        </div>
        <button onClick={onExit} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-800 w-full relative">
        <div 
            className="h-full bg-cyber-primary shadow-[0_0_10px_#00f0ff] transition-all duration-500"
            style={{ width: `${((currentSlideIndex + 1) / lesson.slides.length) * 100}%` }}
        />
      </div>

      {/* Main Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto w-full relative z-10">
         <h2 className="text-sm font-mono text-cyber-secondary mb-8 border border-cyber-secondary px-4 py-1 rounded">
            TARGET: {lesson.title}
         </h2>

         {slide.type === 'text' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {slide.image && (
                     <div className="relative inline-block rounded-xl overflow-hidden border-2 border-cyber-primary/50 group">
                        <img src={slide.image} alt="Lesson illustration" className="max-h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent opacity-50"></div>
                     </div>
                 )}
                 <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed drop-shadow-lg">
                     {slide.content}
                 </p>
             </div>
         )}

         {slide.type === 'visual' && slide.visualType === 'place_value' && (
             <div className="space-y-8 w-full animate-in fade-in zoom-in duration-500">
                 <p className="text-2xl font-bold text-white mb-8">{slide.content}</p>
                 <div className="flex justify-center gap-8 items-end p-8 bg-black/30 rounded-xl border border-white/10">
                     {/* Hundreds */}
                     <div className="flex flex-col items-center gap-2">
                         <div className="grid grid-cols-2 gap-1 bg-cyber-secondary/20 p-2 rounded border border-cyber-secondary">
                             <div className="w-8 h-8 bg-cyber-secondary shadow-neon-pink"></div>
                             <div className="w-8 h-8 bg-cyber-secondary shadow-neon-pink"></div>
                             <div className="w-8 h-8 bg-cyber-secondary shadow-neon-pink"></div>
                         </div>
                         <span className="font-mono text-cyber-secondary">百位 (3)</span>
                     </div>
                     {/* Tens */}
                     <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col gap-1 bg-cyber-warning/20 p-2 rounded border border-cyber-warning">
                             <div className="w-8 h-2 bg-cyber-warning shadow-neon-green"></div>
                             <div className="w-8 h-2 bg-cyber-warning shadow-neon-green"></div>
                             <div className="w-8 h-2 bg-cyber-warning shadow-neon-green"></div>
                             <div className="w-8 h-2 bg-cyber-warning shadow-neon-green"></div>
                             <div className="w-8 h-2 bg-cyber-warning shadow-neon-green"></div>
                        </div>
                        <span className="font-mono text-cyber-warning">十位 (5)</span>
                     </div>
                     {/* Ones */}
                     <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-1 bg-cyber-primary/20 p-2 rounded border border-cyber-primary">
                             <div className="w-2 h-2 bg-cyber-primary shadow-neon-blue"></div>
                             <div className="w-2 h-2 bg-cyber-primary shadow-neon-blue"></div>
                        </div>
                        <span className="font-mono text-cyber-primary">個位 (2)</span>
                     </div>
                 </div>
                 <div className="text-4xl font-black text-white font-mono tracking-[0.5em]">
                     <span className="text-cyber-secondary">3</span>
                     <span className="text-cyber-warning">5</span>
                     <span className="text-cyber-primary">2</span>
                 </div>
             </div>
         )}

         {slide.type === 'interactive' && (
             <div className="space-y-8 w-full animate-in fade-in duration-500">
                 <p className="text-3xl font-bold text-white">{slide.content}</p>
                 
                 {slide.task === 'place_value_drag' ? (
                     <div className="h-64 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-black/20">
                         {count > 0 ? (
                             <div className="text-cyber-success font-bold text-2xl flex items-center gap-2">
                                 <CheckCircle size={32} /> 系統校準成功！
                             </div>
                         ) : (
                             <button 
                                onClick={handleInteractiveClick}
                                className="px-8 py-4 bg-cyber-card border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all rounded font-mono"
                             >
                                 [ 點擊此處模擬放置積木 ]
                             </button>
                         )}
                     </div>
                 ) : (
                     // Fallback for generic interactive
                     <div className="text-6xl font-black text-cyber-primary font-mono">{count}</div>
                 )}
                 
                 {slide.task === 'place_value_drag' && count === 0 && (
                     <p className="text-sm text-gray-500 font-mono">等待輸入...</p>
                 )}
             </div>
         )}
      </div>

      {/* Footer Controls */}
      <div className="p-6 bg-black/80 border-t border-cyber-primary/30 flex justify-between items-center backdrop-blur relative z-20">
        <button 
            onClick={handlePrev} 
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 text-gray-400 font-bold px-6 py-3 hover:text-white disabled:opacity-30 transition-colors uppercase tracking-wider font-mono"
        >
            <ArrowLeft size={18} /> Prev
        </button>

        <button 
            onClick={handleNext}
            disabled={slide.type === 'interactive' && count === 0} // Basic validation
            className="group relative bg-cyber-primary text-black font-black px-8 py-3 clip-path-polygon hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)' }}
        >
            <span className="flex items-center gap-2">
                {currentSlideIndex === lesson.slides.length - 1 ? 'START QUIZ' : 'NEXT'} <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
};

// Simple icon for demo
import { CheckCircle } from 'lucide-react';
