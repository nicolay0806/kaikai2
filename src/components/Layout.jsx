import React from 'react';
import { Star, Backpack, Map, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Layout = ({ children, onViewChange }) => {
  const points = useStore((state) => state.points);

  return (
    <div className="min-h-screen bg-cyber-bg text-white font-sans selection:bg-cyber-primary selection:text-black">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Header */}
      <header className="bg-cyber-card/90 backdrop-blur-md border-b border-cyber-secondary sticky top-0 z-20 shadow-neon-blue">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange('dashboard')}>
            <div className="bg-cyber-primary p-2 rounded-lg text-black shadow-lg group-hover:shadow-neon-blue transition-all">
              <Map size={24} />
            </div>
            <h1 className="text-xl md:text-2xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
              數學特攻隊
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => onViewChange('inventory')}
              className="flex items-center gap-2 bg-cyber-card border border-cyber-primary text-cyber-primary px-4 py-2 rounded-lg hover:bg-cyber-primary hover:text-black transition-all font-bold uppercase tracking-wider"
            >
              <Backpack size={20} />
              <span className="hidden sm:inline">道具欄</span>
            </button>
            
            <button 
              onClick={() => onViewChange('gacha')}
              className="relative flex items-center gap-2 bg-black border-2 border-cyber-warning text-cyber-warning px-5 py-2 rounded-full font-black shadow-neon-green hover:scale-105 transition-transform"
            >
              <Zap size={20} className="fill-cyber-warning animate-pulse" />
              <span>{points} 能量</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 pb-24 relative z-10">
        {children}
      </main>
    </div>
  );
};
