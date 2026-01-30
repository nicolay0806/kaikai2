import React from 'react';
import { curriculum } from '../data/curriculum';
import { useStore } from '../store/useStore';
import { CheckCircle, Lock, Cpu } from 'lucide-react';
import clsx from 'clsx';

export const Dashboard = ({ onSelectLesson }) => {
  const completedLessons = useStore((state) => state.completedLessons);

  const isLessonLocked = (unitIndex, lessonIndex) => {
    if (unitIndex === 0 && lessonIndex === 0) return false;
    
    if (lessonIndex === 0) {
        const prevUnit = curriculum[unitIndex - 1];
        if (!prevUnit) return true;
        const lastLessonOfPrevUnit = prevUnit.lessons[prevUnit.lessons.length - 1];
        return !completedLessons.includes(lastLessonOfPrevUnit.id);
    } else {
        const currentUnit = curriculum[unitIndex];
        const prevLesson = currentUnit.lessons[lessonIndex - 1];
        return !completedLessons.includes(prevLesson.id);
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-cyber-secondary to-cyber-card p-8 rounded-2xl border border-cyber-primary shadow-neon-blue relative overflow-hidden group">
        <div className="relative z-10">
            <h2 className="text-4xl font-black mb-3 text-white italic">歡迎回到基地，特務！</h2>
            <p className="text-cyber-primary font-mono text-lg">系統就緒。準備執行下一個數學任務。</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-cyber-primary/20 to-transparent"></div>
        <Cpu size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
      </div>

      {curriculum.map((unit, unitIndex) => (
        <div key={unit.id} className="relative">
          {/* Connecting Line */}
          {unitIndex < curriculum.length - 1 && (
             <div className="absolute left-8 top-full h-12 w-1 bg-cyber-card border-l border-dashed border-cyber-primary/50 z-0"></div>
          )}

          <div className="bg-cyber-card/80 backdrop-blur rounded-2xl p-6 border border-white/10 shadow-lg relative z-10 hover:border-cyber-primary/50 transition-colors">
            <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-black text-3xl shadow-lg border-2 ${
                  ['border-cyber-primary text-cyber-primary bg-cyber-primary/10', 
                   'border-cyber-accent text-cyber-accent bg-cyber-accent/10', 
                   'border-cyber-warning text-cyber-warning bg-cyber-warning/10', 
                   'border-cyber-success text-cyber-success bg-cyber-success/10', 
                   'border-cyber-secondary text-cyber-secondary bg-cyber-secondary/10'][unitIndex % 5]
              }`}>
                0{unitIndex + 1}
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">{unit.title}</h3>
                  <p className="text-gray-400 font-mono text-sm">{unit.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {unit.lessons.map((lesson, lessonIndex) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isLocked = isLessonLocked(unitIndex, lessonIndex);
                
                return (
                  <button
                    key={lesson.id}
                    disabled={isLocked}
                    onClick={() => onSelectLesson(lesson)}
                    className={clsx(
                      "relative p-4 rounded-xl border transition-all duration-300 w-full group flex flex-col justify-between h-32 text-left overflow-hidden",
                      isCompleted ? "bg-cyber-success/10 border-cyber-success hover:bg-cyber-success/20" :
                      isLocked ? "bg-black/40 border-white/5 opacity-50 cursor-not-allowed grayscale" :
                      "bg-cyber-card border-cyber-primary/50 hover:border-cyber-primary hover:shadow-neon-blue hover:-translate-y-1"
                    )}
                  >
                    <div className="flex justify-between items-start w-full relative z-10">
                      <span className="font-mono text-xs opacity-70">
                        MISSION 0{lessonIndex + 1}
                      </span>
                      {isCompleted ? <CheckCircle size={18} className="text-cyber-success" /> : 
                       isLocked ? <Lock size={16} className="text-gray-500" /> :
                       <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse" />}
                    </div>
                    
                    <h4 className={clsx("font-bold relative z-10 line-clamp-2", isLocked ? "text-gray-500" : "text-white group-hover:text-cyber-primary")}>
                      {lesson.title.split('. ')[1] || lesson.title}
                    </h4>

                    {/* Button Decor */}
                    {!isLocked && <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
