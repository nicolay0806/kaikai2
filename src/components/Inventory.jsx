import React from 'react';
import { useStore } from '../store/useStore';
import { Package, Search } from 'lucide-react';

export const Inventory = () => {
  const inventory = useStore((state) => state.inventory);

  if (inventory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center bg-cyber-card border border-white/10 rounded-2xl">
        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-6 border border-gray-700">
             <Package size={48} className="text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-300 mb-2">儲存空間為空</h2>
        <p className="text-gray-500 font-mono">前往合成機獲取裝備。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h2 className="text-3xl font-black text-white italic tracking-wide">我的裝備庫</h2>
          <div className="bg-black border border-cyber-primary/30 px-4 py-1 rounded-full text-cyber-primary font-mono text-sm">
              COUNT: {inventory.length}
          </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventory.map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center hover:border-cyber-primary transition-colors group relative overflow-hidden"
          >
            {/* Rarity Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${
                item.rarity === 'UR' ? 'from-cyber-warning to-cyber-accent' :
                item.rarity === 'SSR' ? 'from-cyber-accent to-purple-500' :
                'from-cyber-primary to-blue-500'
            }`}></div>

            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                {item.emoji}
            </div>
            
            <div className={`text-xs font-bold px-2 py-0.5 rounded border mb-2 w-full ${
                 item.rarity === 'UR' ? 'border-cyber-warning text-cyber-warning' :
                 item.rarity === 'SSR' ? 'border-cyber-accent text-cyber-accent' :
                 item.rarity === 'SR' ? 'border-cyber-secondary text-cyber-secondary' :
                 'border-cyber-primary text-cyber-primary'
            }`}>
                 {item.rarity} CLASS
            </div>

            <h3 className="font-bold text-white mb-1">{item.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
