import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LessonPlayer } from './components/LessonPlayer';
import { QuizComponent } from './components/QuizComponent';
import { GachaMachine } from './components/GachaMachine';
import { Inventory } from './components/Inventory';
import { useStore } from './store/useStore';

function App() {
  const [view, setView] = useState('dashboard'); // dashboard, lesson, quiz, gacha, inventory
  const [activeLesson, setActiveLesson] = useState(null);
  
  const completeLesson = useStore((state) => state.completeLesson);

  const handleSelectLesson = (lesson) => {
    setActiveLesson(lesson);
    setView('lesson');
  };

  const handleLessonComplete = () => {
    setView('quiz');
  };

  const handleQuizComplete = (passed) => {
    if (passed && activeLesson) {
        completeLesson(activeLesson.id);
    }
    setView('dashboard');
    setActiveLesson(null);
  };

  const handleExit = () => {
      setView('dashboard');
      setActiveLesson(null);
  };

  return (
    <Layout onViewChange={setView}>
      {view === 'dashboard' && <Dashboard onSelectLesson={handleSelectLesson} />}
      
      {view === 'lesson' && activeLesson && (
        <LessonPlayer 
            lesson={activeLesson} 
            onComplete={handleLessonComplete} 
            onExit={handleExit} 
        />
      )}

      {view === 'quiz' && activeLesson && (
        <QuizComponent 
            quizData={activeLesson.quiz} 
            onComplete={handleQuizComplete} 
            onExit={handleExit}
        />
      )}

      {view === 'gacha' && <GachaMachine />}
      
      {view === 'inventory' && <Inventory />}
    </Layout>
  );
}

export default App;
