import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ArrowLeft, X, Terminal, CheckCircle, Loader2 } from 'lucide-react';
import { QuizComponent } from './QuizComponent'; // 確保引用 Quiz 組件

// --- 題目製造機 (Math Engine) ---
// 這是一個原本不存在的全新功能，負責現場產生題目
const generateDynamicQuiz = (lessonId) => {
  const questions = [];
  const questionCount = 3; // 每次產生 3 題

  // 輔助函數：產生隨機整數 (min 到 max)
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // 輔助函數：產生錯誤選項
  const generateOptions = (answer) => {
    const opts = new Set([answer]); // 使用 Set 確保不重複
    while (opts.size < 4) { // 湊滿 4 個選項
      // 產生一個接近答案的隨機錯誤數字
      let fake = answer + rand(-50, 50);
      if (fake > 0 && fake !== answer) opts.add(fake);
    }
    // 轉成陣列並打亂順序
    return Array.from(opts).sort(() => Math.random() - 0.5); 
  };

  // 根據單元 ID 決定出題邏輯
  for (let i = 0; i < questionCount; i++) {
    let q = {};
    
    // --- 單元一：加法 (u1) ---
    if (lessonId.includes('u1')) {
       if (lessonId.includes('l1')) { // 數字排排站 (位值)
          const num = rand(100, 999);
          const type = rand(0, 2); // 0:百位, 1:十位, 2:個位
          const places = ['百位', '十位', '個位'];
          const values = [Math.floor(num/100), Math.floor((num%100)/10), num%10];
          
          q = {
            question: `數字 ${num} 的「${places[type]}」數字是多少？`,
            answerVal: values[type], // 暫存正確答案數值
            options: [values[type], rand(0,9), rand(0,9), rand(0,9)].sort(() => Math.random() - 0.5),
            answer: 0 // 之後會校正 index
          };
          // 修正選項邏輯，確保只有一個正確答案
          const correctVal = values[type];
          const distractorSet = new Set([correctVal]);
          while(distractorSet.size < 4) distractorSet.add(rand(0, 9));
          q.options = Array.from(distractorSet).sort(() => Math.random() - 0.5);
          q.answer = q.options.indexOf(correctVal);

       } else { // 加法運算
          const n1 = rand(100, 500);
          const n2 = rand(100, 400);
          const ans = n1 + n2;
          const opts = generateOptions(ans);
          q = {
            question: `${n1} + ${n2} = ?`,
            options: opts.map(String),
            answer: opts.indexOf(ans)
          };
       }
    }
    
    // --- 單元二：減法 (u2) ---
    else if (lessonId.includes('u2')) {
       const n1 = rand(500, 900);
       const n2 = rand(100, 400);
       const ans = n1 - n2;
       const opts = generateOptions(ans);
       q = {
         question: `${n1} - ${n2} = ?`,
         options: opts.map(String),
         answer: opts.indexOf(ans)
       };
    }

    // --- 單元三：乘法 (u3) ---
    else if (lessonId.includes('u3')) {
       const n1 = rand(2, 9);
       const n2 = rand(2, 9);
       const ans = n1 * n2;
       const opts = generateOptions(ans);
       q = {
         question: `${n1} x ${n2} = ?`,
         options: opts.map(String),
         answer: opts.indexOf(ans)
       };
    }

    // --- 單元四：除法 (u4) ---
    else if (lessonId.includes('u4')) {
       // 先產生乘法，再反推除法，確保整除
       const n2 = rand(2, 9);
       const ans = rand(2, 9); 
       const n1 = n2 * ans; 
       const opts = generateOptions(ans);
       q = {
         question: `${n1} ÷ ${n2} = ?`,
         options: opts.map(String),
         answer: opts.indexOf(ans)
       };
    }

    // --- 單元五：綜合挑戰 (u5) ---
    else {
       const op = rand(0, 2); // 0:+, 1:-, 2:x
       let n1, n2, ans, symbol;
       if (op === 0) { n1=rand(100,500); n2=rand(100,500); ans=n1+n2; symbol='+'; }
       else if (op === 1) { n1=rand(500,900); n2=rand(100,400); ans=n1-n2; symbol='-'; }
       else { n1=rand(2,20); n2=rand(2,5); ans=n1*n2; symbol='x'; }
       
       const opts = generateOptions(ans);
       q = {
         question: `${n1} ${symbol} ${n2} = ?`,
         options: opts.map(String),
         answer: opts.indexOf(ans)
       };
    }

    questions.push(q);
  }
  return questions;
};

// --- 主程式開始 ---
export const LessonPlayer = ({ lesson, onComplete, onExit }) => {
  const [view, setView] = useState('slides'); // 'slides' or 'quiz'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = lesson.slides && lesson.slides[currentSlideIndex];

  // 使用 useMemo 確保每次進入課程時，題目只會產生一次，但重刷時會重新產生
  const dynamicQuizData = useMemo(() => {
     if (!lesson || !lesson.id) return [];
     console.log("Generating new questions for:", lesson.id);
     return generateDynamicQuiz(lesson.id);
  }, [lesson.id]); // 依賴 lesson.id，換課或重置時會重跑

  // 如果讀不到課程資料的錯誤畫面
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
      // 投影片播完，進入測驗模式
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
  
  // 當切換投影片時，重置計數器
  useEffect(() => {
     if (slide && slide.start !== undefined) {
         setCount(slide.start);
     } else {
         setCount(0);
     }
     setIsAnimating(false);
  }, [slide]);


  // 互動邏輯 (動畫版)
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

  // 如果現在是測驗模式，顯示 QuizComponent
  if (view === 'quiz') {
      return (
        <QuizComponent 
            quizData={dynamicQuizData} // 這裡傳入我們現場做的新鮮題目！
            onComplete={onComplete}
            onExit={onExit}
        />
      );
  }

  return (
    <div className="bg-cyber-card border border-cyber-primary/50 rounded-2xl shadow-neon-blue overflow-hidden min-h-[70vh] flex flex-col relative">
      {/* HUD 頂部狀態列 */}
      <div className="bg-black/50 p-4 flex justify-between items-center border-b border-cyber-primary/30">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
            <span className="font-mono text-cyber-primary text-sm tracking-widest uppercase">系統連線中</span>
        </div>
        <button onClick={onExit} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
        </button>
      </div>

      {/* 進度條 */}
      <div className="h-1 bg-gray-800 w-full relative">
        <div 
            className="h-full bg-cyber-primary shadow-[0_0_10px_#00f0ff] transition-all duration-500"
            style={{ width: `${((currentSlideIndex + 1) / lesson.slides.length) * 100}%` }}
        />
      </div>

      {/* 主要顯示區域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto w-full relative z-10">
         <h2 className="text-sm font-mono text-cyber-secondary mb-8 border border-cyber-secondary px-4 py-1 rounded">
            當前任務: {lesson.title}
         </h2>

         {/* 文字類型投影片 */}
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

         {/* 視覺教學類型 (顯示積木) */}
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

         {/* 互動操作類型 */}
         {slide.type === 'interactive' && (
             <div className="space-y-8 w-full animate-in fade-in duration-500">
                 <p className="text-3xl font-bold text-white">{slide.content}</p>
                 
                 {slide.task === 'place_value_drag' ? (
                     <div className="h-64 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-black/20 relative overflow-hidden transition-all duration-500">
                          {count > 0 ? (
                              <div className="flex flex-col items-center gap-4 w-full">
                                  {/* 積木顯示區 - 根據 count 階段性顯示 */}
                                  <div className="flex justify-center gap-8 items-end p-4">
                                      
                                      {/* 百位 - count >= 1 時顯示 */}
                                      <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${count >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                          <div className="grid grid-cols-2 gap-1 bg-cyber-secondary/20 p-2 rounded border border-cyber-secondary shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                                              {[1,2,3].map(i => <div key={i} className="w-6 h-6 bg-cyber-secondary shadow-neon-pink"></div>)}
                                          </div>
                                          <span className="font-mono text-cyber-secondary text-sm">百位</span>
                                      </div>

                                      {/* 十位 - count >= 2 時顯示 */}
                                      <div className={`flex flex-col items-center gap-2 transition-all duration-500 delay-100 ${count >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                         <div className="flex flex-col gap-1 bg-cyber-warning/20 p-2 rounded border border-cyber-warning shadow-[0_0_15px_rgba(255,255,0,0.3)]">
                                              {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-2 bg-cyber-warning shadow-neon-green"></div>)}
                                         </div>
                                         <span className="font-mono text-cyber-warning text-sm">十位</span>
                                      </div>

                                      {/* 個位 - count >= 3 時顯示 */}
                                      <div className={`flex flex-col items-center gap-2 transition-all duration-500 delay-100 ${count >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                         <div className="flex gap-1 bg-cyber-primary/20 p-2 rounded border border-cyber-primary shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                                              {[1,2].map(i => <div key={i} className="w-2 h-2 bg-cyber-primary shadow-neon-blue"></div>)}
                                         </div>
                                         <span className="font-mono text-cyber-primary text-sm">個位</span>
                                      </div>
                                  </div>
                                  
                                  {/* 完成訊息 - count >= 4 時顯示 */}
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
                          
                          {/* 讀取中動畫 */}
                          {isAnimating && count < 4 && (
                              <div className="absolute top-2 right-2 text-cyber-primary">
                                  <Loader2 className="animate-spin" size={20}/>
                              </div>
                          )}
                     </div>
                 ) : (
                     // 其他互動類型的預設顯示
                     <div className="text-6xl font-black text-cyber-primary font-mono">{count}</div>
                 )}
                 
                 {slide.task === 'place_value_drag' && count === 0 && (
                     <p className="text-sm text-gray-500 font-mono animate-pulse">等待指令輸入...</p>
                 )}
             </div>
         )}
      </div>

      {/* 底部控制列 */}
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
            disabled={slide.type === 'interactive' && count < 4 && slide.task === 'place_value_drag'} // 積木任務要等跑完，其他任務不卡
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
