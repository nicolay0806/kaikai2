import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ArrowLeft, X, Terminal, CheckCircle, Loader2 } from 'lucide-react';
import { QuizComponent } from './QuizComponent';

// --- 題目製造機 (Math Engine) v2.0 ---
const generateDynamicQuiz = (lessonId) => {
  const questions = [];
  const questionCount = 5; // 增加到 5 題，提升訓練感

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // 智慧干擾生成：根據答案大小產生看起來很像的錯誤選項
  const generateOptions = (answer) => {
    const opts = new Set([answer]);
    while (opts.size < 4) {
      let fake;
      const strategy = rand(0, 2);
      if (strategy === 0) fake = answer + rand(-10, 10); // 微小誤差
      else if (strategy === 1) fake = answer + (rand(0, 1) === 0 ? 100 : -100); // 整百誤差
      else fake = answer + (rand(0, 1) === 0 ? 1000 : -1000); // 整千誤差 (針對千位數)

      if (fake > 0 && fake !== answer) opts.add(fake);
    }
    return Array.from(opts).sort(() => Math.random() - 0.5); 
  };

  for (let i = 0; i < questionCount; i++) {
    let q = {};
    
    // --- U1~U4 保留原有邏輯並微調 ---
    if (lessonId.includes('u1')) {
       if (lessonId.includes('l1')) {
          const num = rand(100, 999);
          const type = rand(0, 2);
          const places = ['百位', '十位', '個位'];
          const values = [Math.floor(num/100), Math.floor((num%100)/10), num%10];
          const correctVal = values[type];
          const distractorSet = new Set([correctVal]);
          while(distractorSet.size < 4) distractorSet.add(rand(0, 9));
          const opts = Array.from(distractorSet).sort(() => Math.random() - 0.5);
          q = {
            question: `數字 ${num} 的「${places[type]}」數字是多少？`,
            options: opts.map(String),
            answer: opts.indexOf(correctVal)
          };
       } else {
          const n1 = rand(100, 500), n2 = rand(100, 400), ans = n1 + n2;
          const opts = generateOptions(ans);
          q = { question: `${n1} + ${n2} = ?`, options: opts.map(String), answer: opts.indexOf(ans) };
       }
    }
    else if (lessonId.includes('u2')) {
       const n1 = rand(500, 900), n2 = rand(100, 400), ans = n1 - n2;
       const opts = generateOptions(ans);
       q = { question: `${n1} - ${n2} = ?`, options: opts.map(String), answer: opts.indexOf(ans) };
    }
    else if (lessonId.includes('u3')) {
       const n1 = rand(2, 9), n2 = rand(2, 9), ans = n1 * n2;
       const opts = generateOptions(ans);
       q = { question: `${n1} x ${n2} = ?`, options: opts.map(String), answer: opts.indexOf(ans) };
    }
    else if (lessonId.includes('u4')) {
       const n2 = rand(2, 9), ans = rand(2, 9), n1 = n2 * ans;
       const opts = generateOptions(ans);
       q = { question: `${n1} ÷ ${n2} = ?`, options: opts.map(String), answer: opts.indexOf(ans) };
    }
    // --- 新增 U5: 千位數重裝任務 ---
    else if (lessonId.includes('u5')) {
       const isAdd = rand(0, 1) === 0;
       let n1, n2, ans;
       if (isAdd) {
           n1 = rand(1000, 5000); n2 = rand(1000, 4000); ans = n1 + n2;
           q.question = `[系統升級] 千位數運算：\n${n1} + ${n2} = ?`;
       } else {
           n1 = rand(5000, 9999); n2 = rand(1000, 4000); ans = n1 - n2;
           q.question = `[系統升級] 千位數運算：\n${n1} - ${n2} = ?`;
       }
       const opts = generateOptions(ans);
       q.options = opts.map(String);
       q.answer = opts.indexOf(ans);
    }
    // --- 新增 U6: 邏輯解碼 (挖空題) ---
    else if (lessonId.includes('u6')) {
       const total = rand(2000, 9000);
       const part = rand(1000, total - 500);
       const unknown = total - part;
       const opts = generateOptions(unknown);
       q = {
           question: `解碼未知訊號：\n${part} + [ ? ] = ${total}`,
           options: opts.map(String),
           answer: opts.indexOf(unknown)
       };
    }
    // --- 混合模式 (當沒有匹配 ID 時執行) ---
    else {
       const mode = rand(0, 4);
       let n1, n2, ans, symbol;
       if (mode === 0) { n1=rand(100,500); n2=rand(100,500); ans=n1+n2; symbol='+'; }
       else if (mode === 1) { n1=rand(1000,4000); n2=rand(1000,4000); ans=n1+n2; symbol='+'; }
       else if (mode === 2) { n1=rand(5000,9000); n2=rand(1000,4000); ans=n1-n2; symbol='-'; }
       else if (mode === 3) { n1=rand(2,12); n2=rand(2,9); ans=n1*n2; symbol='x'; }
       else { 
           const target = rand(100, 900); n1 = rand(10, target-10); ans = target - n1;
           const opts = generateOptions(ans);
           q = { question: `${n1} + [ ? ] = ${target}`, options: opts.map(String), answer: opts.indexOf(ans) };
           questions.push(q); continue;
       }
       const opts = generateOptions(ans);
       q = { question: `${n1} ${symbol} ${n2} = ?`, options: opts.map(String), answer: opts.indexOf(ans) };
    }
    questions.push(q);
  }
  return questions;
};

// --- 主程式開始 ---
export const LessonPlayer = ({ lesson, onComplete, onExit }) => {
  const [view, setView] = useState('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = lesson.slides && lesson.slides[currentSlideIndex];

  const dynamicQuizData = useMemo(() => {
     if (!lesson || !lesson.id) return [];
     return generateDynamicQuiz(lesson.id);
  }, [lesson.id]);

  if (!lesson.slides || lesson.slides.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-96 bg-cyber-card border border-cyber-primary/30 rounded-2xl shadow-neon-blue p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <Terminal size={64} className="text-cyber-primary mb-6 animate-pulse" />
              <h2 className="text-3xl font-black mb-4 text-white">資料載入中...</h2>
              <button onClick={onExit} className="border border-white/20 text-gray-400 px-6 py-3 hover:text-white hover:border-white transition-all">
                  返回
              </button>
          </div>
      )
  }

  const handleNext = () => {
    if (currentSlideIndex < lesson.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setView('quiz');
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const [count, setCount] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
     if (slide && slide.start !== undefined) {
         setCount(slide.start);
     } else {
         setCount(0);
     }
     setIsAnimating(false);
  }, [slide]);

  const handleInteractiveClick = () => {
       if (slide.task === 'count_to_target') {
         setCount(prev => prev + 1);
       }
       if (slide.task === 'place_value_drag') {
           setIsAnimating(true);
           setCount(1);
           setTimeout(() => setCount(2), 800);
           setTimeout(() => setCount(3), 1600);
           setTimeout(() => {
               setCount(4);
               setIsAnimating(false);
           }, 2400);
       }
  };

  if (view === 'quiz') {
      return (
        <QuizComponent 
            quizData={dynamicQuizData}
            onComplete={onComplete}
            onExit={onExit}
        />
      );
  }

  return (
    <div className="bg-cyber-card border border-cyber-primary/50 rounded-2xl shadow-neon-blue overflow-hidden min-h-[70vh] flex flex-col relative">
      <div className="bg-black/50 p-4 flex justify-between items-center border-b border-cyber-primary/30">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
            <span className="font-mono text-cyber-primary text-sm tracking-widest uppercase">系統連線中</span>
        </div>
        <button onClick={onExit} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
        </button>
      </div>

      <div className="h-1 bg-gray-800 w-full relative">
        <div 
            className="h-full bg-cyber-primary shadow-[0_0_10px_#00f0ff] transition-all duration-500"
            style={{ width: `${((currentSlideIndex + 1) / lesson.slides.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto w-full relative z-10">
         <h2 className="text-sm font-mono text-cyber-secondary mb-8 border border-cyber-secondary px-4 py-1 rounded">
            當前任務: {lesson.title}
         </h2>

         {slide.type === 'text' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                 {slide.image && (
                     <div className="relative inline-block rounded-xl overflow-hidden border-2 border-cyber-primary/50 group">
                        <img src={slide.image} alt="Lesson illustration" className="max-h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent opacity-50"></div>
                     </div>
                 )}
                 <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed drop-shadow-lg whitespace-pre-line">
                     {slide.content}
                 </p>
             </div>
         )}

         {slide.type === 'visual' && slide.visualType === 'place_value' && (
             <div className="space-y-8 w-full animate-in fade-in zoom-in duration-500">
                 <p className="text-2xl font-bold text-white mb-8 whitespace-pre-line">{slide.content}</p>
                 <div className="flex justify-center gap-8 items-end p-8 bg-black/30 rounded-xl border border-white/10">
                     <div className="flex flex-col items-center gap-2">
                         <div className="grid grid-cols-2 gap-1 bg-cyber-secondary/20 p-2 rounded border border-cyber-secondary">
                             <div className="w-8 h-8 bg-cyber-secondary shadow-neon-pink"></div>
                             <div className="w-8 h-8 bg-cyber-secondary shadow-neon-pink"></div>
                             <div className="w-8 h-8 bg-cyber-secondary shadow-neon-pink"></div>
                         </div>
                         <span className="font-mono text-cyber-secondary">百位 (3)</span>
                     </div>
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
                 <p className="text-3xl font-bold text-white whitespace-pre-line">{slide.content}</p>
                 
                 {slide.task === 'place_value_drag' ? (
                     <div className="h-64 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-black/20 relative overflow-hidden transition-all duration-500">
                          {count > 0 ? (
                              <div className="flex flex-col items-center gap-4 w-full">
                                  <div className="flex justify-center gap-8 items-end p-4">
                                      <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${count >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                          <div className="grid grid-cols-2 gap-1 bg-cyber-secondary/20 p-2 rounded border border-cyber-secondary shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                                              {[1,2,3].map(i => <div key={i} className="w-6 h-6 bg-cyber-secondary shadow-neon-pink"></div>)}
                                          </div>
                                          <span className="font-mono text-cyber-secondary text-sm">百位</span>
                                      </div>
                                      <div className={`flex flex-col items-center gap-2 transition-all duration-500 delay-100 ${count >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                         <div className="flex flex-col gap-1 bg-cyber-warning/20 p-2 rounded border border-cyber-warning shadow-[0_0_15px_rgba(255,255,0,0.3)]">
                                              {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-2 bg-cyber-warning shadow-neon-green"></div>)}
                                         </div>
                                         <span className="font-mono text-cyber-warning text-sm">十位</span>
                                      </div>
                                      <div className={`flex flex-col items-center gap-2 transition-all duration-500 delay-100 ${count >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                         <div className="flex gap-1 bg-cyber-primary/20 p-2 rounded border border-cyber-primary shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                                              {[1,2].map(i => <div key={i} className="w-2 h-2 bg-cyber-primary shadow-neon-blue"></div>)}
                                         </div>
                                         <span className="font-mono text-cyber-primary text-sm">個位</span>
                                      </div>
                                  </div>
                                  
                                  {count >= 4 && (
                                    <div className="animate-in zoom-in duration-300 text-cyber-success font-bold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-cyber-success/50 shadow-neon-green">
                                        <CheckCircle size={20} /> 積木放置完成！
                                    </div>
                                  )}
                              </div>
                          ) : (
                              <button 
                                onClick={handleInteractiveClick}
                                disabled={isAnimating}
                                className="group relative px-8 py-4 bg-cyber-card border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all rounded font-mono overflow-hidden"
                              >
                                  <div className="absolute inset-0 bg-cyber-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                  <span className="relative z-10 flex items-center gap-2">
                                    [ 啟動自動放置程序 ]
                                  </span>
                              </button>
                          )}
                          
                          {isAnimating && count < 4 && (
                              <div className="absolute top-2 right-2 text-cyber-primary">
                                  <Loader2 className="animate-spin" size={20}/>
                              </div>
                          )}
                     </div>
                 ) : (
                     <div className="text-6xl font-black text-cyber-primary font-mono">{count}</div>
                 )}
                 
                 {slide.task === 'place_value_drag' && count === 0 && (
                     <p className="text-sm text-gray-500 font-mono animate-pulse">等待指令輸入...</p>
                 )}
             </div>
         )}
      </div>

      <div className="p-6 bg-black/80 border-t border-cyber-primary/30 flex justify-between items-center backdrop-blur relative z-20">
        <button 
            onClick={handlePrev} 
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 text-gray-400 font-bold px-6 py-3 hover:text-white disabled:opacity-30 transition-colors uppercase tracking-wider font-mono"
        >
            <ArrowLeft size={18} /> 上一步
        </button>

        <button 
            onClick={handleNext}
            disabled={slide.type === 'interactive' && count < 4 && slide.task === 'place_value_drag'}
            className="group relative bg-cyber-primary text-black font-black px-8 py-3 clip-path-polygon hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)' }}
        >
            <span className="flex items-center gap-2">
                {currentSlideIndex === lesson.slides.length - 1 ? '開始測驗' : '下一步'} <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
};
