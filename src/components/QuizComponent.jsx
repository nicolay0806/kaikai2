import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, Cpu, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import confetti from 'canvas-confetti';
import clsx from 'clsx';

export const QuizComponent = ({ quizData, onComplete, onExit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const addPoints = useStore((state) => state.addPoints);

  if (!quizData || quizData.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center h-64 bg-cyber-card border border-cyber-primary/30 rounded-2xl shadow-neon-blue p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">測驗資料庫離線</h2>
            <p className="text-gray-400 mb-6 font-mono">請稍後再嘗試連線。</p>
            <button onClick={onExit} className="bg-cyber-primary text-black px-6 py-2 rounded font-bold hover:bg-white transition-all">
                返回主控台
            </button>
        </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (index) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    const correct = selectedOption === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#ff003c', '#39ff14']
      });
    }
  };

  // 結束測驗的函數
  const finishQuiz = () => {
    setQuizFinished(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };
  
  const handleClaimReward = () => {
      // 計算獎勵點數：全對 100 點，否則一題 10 點
      let totalPoints = 0;
      if (score === quizData.length) {
          totalPoints = 100;
      } else {
          totalPoints = score * 10;
      }
      
      addPoints(totalPoints);
      
      if (score === quizData.length) {
            confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#00f0ff', '#ff003c', '#fdfd00']
          });
      }
      
      onComplete(score === quizData.length);
  };

  // 顯示結算畫面
  if (quizFinished) {
      const isPerfect = score === quizData.length;
      return (
          <div className="bg-cyber-card border border-cyber-success/50 rounded-2xl shadow-neon-green p-8 text-center animate-in zoom-in duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyber-success/5"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-cyber-success/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-cyber-success shadow-[0_0_30px_#39ff14]">
                    <Award size={48} className="text-cyber-success" />
                </div>
                <h2 className="text-4xl font-black text-white italic mb-2">任務完成！</h2>
                <p className="text-xl text-cyber-primary font-mono mb-8">
                    同步率: <span className="text-white font-bold text-3xl">{Math.round((score / quizData.length) * 100)}%</span>
                </p>
                
                <div className="bg-black/50 p-6 rounded-xl mb-8 border border-white/10">
                    <p className="text-gray-400 mb-2 uppercase tracking-widest text-xs">REWARD</p>
                    <p className="text-4xl font-black text-cyber-warning flex items-center justify-center gap-2">
                         <span className="text-2xl">+</span> {isPerfect ? 100 : score * 10} <span className="text-base font-mono text-gray-500">ENERGY</span>
                    </p>
                </div>
                
                <button 
                    onClick={handleClaimReward} 
                    className="w-full bg-cyber-success text-black text-xl font-black px-8 py-4 clip-path-polygon hover:bg-white transition-all hover:scale-105 shadow-neon-green"
                    style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}
                >
                    確認接收獎勵
                </button>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-cyber-card border border-cyber-primary/50 rounded-2xl shadow-neon-blue overflow-hidden max-w-2xl mx-auto relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-primary animate-gradient-x"></div>
      
      {/* Header */}
      <div className="bg-black/40 p-6 border-b border-white/5 flex justify-between items-center">
        <span className="font-mono font-bold text-cyber-primary tracking-widest">
            QUERY_Sequence: 0{currentQuestionIndex + 1} / 0{quizData.length}
        </span>
        <button onClick={onExit} className="text-gray-500 hover:text-white transition-colors">
            <XCircle size={24} />
        </button>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-8 leading-snug drop-shadow-md">
            {currentQuestion.question}
        </h3>

        <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
                let stateClass = "border border-white/10 bg-black/40 text-gray-300 hover:border-cyber-primary hover:text-cyber-primary hover:bg-cyber-primary/10";
                
                if (showResult) {
                    if (index === currentQuestion.answer) {
                        stateClass = "border-2 border-cyber-success bg-cyber-success/20 text-white shadow-neon-green";
                    } else if (index === selectedOption) {
                        stateClass = "border-2 border-cyber-accent bg-cyber-accent/20 text-white opacity-60";
                    } else {
                        stateClass = "opacity-30 grayscale";
                    }
                } else if (selectedOption === index) {
                    stateClass = "border-2 border-cyber-primary bg-cyber-primary/20 text-white shadow-neon-blue";
                }

                return (
                    <button
                        key={index}
                        disabled={showResult}
                        onClick={() => handleOptionClick(index)}
                        className={`w-full text-left p-5 rounded-lg font-bold text-lg transition-all duration-200 flex justify-between items-center group ${stateClass}`}
                    >
                        <span className="flex items-center gap-3">
                            <span className="font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">[{index + 1}]</span>
                            {option}
                        </span>
                        {showResult && index === currentQuestion.answer && <CheckCircle className="text-cyber-success" />}
                        {showResult && index === selectedOption && index !== currentQuestion.answer && <AlertTriangle className="text-cyber-accent" />}
                    </button>
                );
            })}
        </div>

        <div className="mt-10 h-16 flex items-center justify-end">
            {!showResult && (
                <button 
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="bg-cyber-primary text-black font-black px-8 py-3 rounded-none skew-x-[-10deg] shadow-lg hover:bg-white hover:shadow-neon-blue disabled:opacity-50 disabled:shadow-none transition-all"
                >
                    <span className="skew-x-[10deg] inline-block">提交運算</span>
                </button>
            )}

            {showResult && (
                <div className="flex items-center gap-6 w-full justify-between animate-in fade-in slide-in-from-bottom-2">
                    <div className={`font-black text-xl italic ${isCorrect ? 'text-cyber-success' : 'text-cyber-accent'}`}>
                        {isCorrect ? "ACCESS GRANTED" : "ACCESS DENIED"}
                    </div>
                    {/* 這裡就是原本報錯的地方，我已經改成正確的 finishQuiz 了 */}
                    <button 
                        onClick={currentQuestionIndex < quizData.length - 1 ? handleNext : finishQuiz}
                        className="bg-white text-black font-black px-8 py-3 clip-path-polygon hover:bg-gray-200 transition-all flex items-center gap-2"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    >
                        {currentQuestionIndex < quizData.length - 1 ? "NEXT QUERY" : "COMPLETE"}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
