import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { prizes } from '../data/prizes';
import { Sparkles, Package, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';

export const GachaMachine = () => {
  const points = useStore((state) => state.points);
  const deductPoints = useStore((state) => state.deductPoints);
  const addToInventory = useStore((state) => state.addToInventory);
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);

  const COST_PER_SPIN = 500;

  const handleSpin = () => {
    if (points < COST_PER_SPIN) return;
    
    deductPoints(COST_PER_SPIN);
    setIsSpinning(true);
    setWonPrize(null);

    // Simulate spinning delay
    setTimeout(() => {
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
        setWonPrize(randomPrize);
        addToInventory(randomPrize);
        setIsSpinning(false);
        
        // Effects
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#00f0ff', '#fdfd00', '#ff003c']
        });

    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="relative bg-cyber-card border-2 border-cyber-primary rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.3)]">
        
        {/* Machine Header */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border-2 border-cyber-warning px-6 py-2 rounded-full shadow-neon-yellow z-20">
            <span className="text-cyber-warning font-black text-xl tracking-widest">MATTER SYNTHESIZER</span>
        </div>

        {/* Display Area */}
        <div className="h-64 bg-black rounded-xl mb-8 border border-white/10 relative overflow-hidden flex items-center justify-center group">
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 animate-pulse"></div>
             <div className={`absolute inset-0 bg-gradient-to-b from-cyber-primary/20 to-transparent transition-transform duration-1000 ${isSpinning ? 'translate-y-full' : '-translate-y-full'}`}></div>

             {isSpinning ? (
                 <div className="text-6xl animate-spin">🌀</div>
             ) : wonPrize ? (
                 <div className="animate-in zoom-in duration-500 flex flex-col items-center">
                     <div className="text-8xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter contrast-125">{wonPrize.emoji}</div>
                     <div className={`text-xs font-bold px-2 py-1 rounded border mb-2 ${
                         wonPrize.rarity === 'UR' ? 'border-cyber-warning text-cyber-warning' :
                         wonPrize.rarity === 'SSR' ? 'border-cyber-accent text-cyber-accent' :
                         wonPrize.rarity === 'SR' ? 'border-cyber-secondary text-cyber-secondary' :
                         'border-cyber-primary text-cyber-primary'
                     }`}>
                         {wonPrize.rarity} CLASS
                     </div>
                 </div>
             ) : (
                 <div className="text-cyber-primary/30 font-mono text-sm">
                     READY TO SYNTHESIZE<br/>
                     INSERT ENERGY TO START
                 </div>
             )}
        </div>
        
        {/* Result Text */}
        {wonPrize && !isSpinning && (
            <div className="mb-8 animate-in slide-in-from-bottom-4">
                <h3 className="text-2xl font-black text-white mb-2">{wonPrize.name}</h3>
                <p className="text-gray-400 text-sm">{wonPrize.description}</p>
            </div>
        )}

        {/* Controls */}
        <button
            onClick={handleSpin}
            disabled={isSpinning || points < COST_PER_SPIN}
            className={clsx(
                "w-full py-4 text-xl font-black tracking-widest clip-path-polygon transition-all relative overflow-hidden group shadow-lg",
                points >= COST_PER_SPIN 
                    ? "bg-cyber-warning text-black hover:bg-white hover:scale-105 shadow-neon-yellow cursor-pointer" 
                    : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
            )}
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
        >
            <span className="relative z-10 flex items-center justify-center gap-3">
                {isSpinning ? "SYNTHESIZING..." : (
                    <>
                        <span>SYNTHESIZE</span>
                        <div className="flex items-center text-sm bg-black/20 px-2 py-1 rounded">
                            <Zap size={14} className="fill-current" /> {COST_PER_SPIN}
                        </div>
                    </>
                )}
            </span>
            {/* Energy flow animation on button */}
            {!isSpinning && points >= COST_PER_SPIN && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            )}
        </button>
        
        {points < COST_PER_SPIN && (
            <p className="text-red-500 text-xs mt-4 font-mono">
                ERROR: INSUFFICIENT ENERGY. REQUIRED: {COST_PER_SPIN}
            </p>
        )}
      </div>
    </div>
  );
};
