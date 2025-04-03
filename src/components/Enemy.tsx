
import React, { useState, useEffect } from 'react';

interface EnemyProps {
  x: number;
  y: number;
  direction: 'left' | 'right';
}

const Enemy: React.FC<EnemyProps> = ({ x, y, direction }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`enemy ${direction === 'left' ? 'scale-x-[-1]' : ''}`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        transform: `${direction === 'left' ? 'scaleX(-1)' : ''} ${pulse ? 'scale(1.05)' : 'scale(1)'}`,
        transition: 'transform 0.5s ease'
      }}
    >
      <div className="relative w-full h-full">
        {/* Enemy is a virus/germ with more details */}
        
        {/* Main virus body with spikes */}
        <div className="absolute inset-1 bg-green-700 rounded-full flex items-center justify-center shadow-lg">
          {/* Virus nucleus */}
          <div className="w-[60%] h-[60%] bg-green-500 rounded-full relative overflow-hidden flex items-center justify-center">
            {/* Virus eyes */}
            <div className="absolute top-1 w-full flex justify-center">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
                <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Virus mouth */}
            <div className="absolute bottom-1 left-[30%] right-[30%] h-1 bg-red-600 rounded-md"></div>
            
            {/* Virus internal patterns */}
            <div className="absolute left-1 top-[40%] w-1 h-1 bg-green-400 rounded-full"></div>
            <div className="absolute right-1 top-[40%] w-1 h-1 bg-green-400 rounded-full"></div>
            <div className="absolute left-[40%] top-[60%] w-1 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Virus spikes - more and pointier */}
        <div className="absolute -top-2 left-[45%] w-[10%] h-[25%] bg-green-700 rounded-t-full"></div>
        <div className="absolute -bottom-2 left-[45%] w-[10%] h-[25%] bg-green-700 rounded-b-full"></div>
        <div className="absolute top-[45%] -left-2 h-[10%] w-[25%] bg-green-700 rounded-l-full"></div>
        <div className="absolute top-[45%] -right-2 h-[10%] w-[25%] bg-green-700 rounded-r-full"></div>
        
        {/* Diagonal spikes */}
        <div className="absolute top-[10%] left-[10%] w-[15%] h-[15%] bg-green-700 rounded-full"></div>
        <div className="absolute top-[10%] right-[10%] w-[15%] h-[15%] bg-green-700 rounded-full"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[15%] h-[15%] bg-green-700 rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[15%] h-[15%] bg-green-700 rounded-full"></div>
        
        {/* Extra small spikes for more detail */}
        <div className="absolute top-[30%] left-[5%] w-[8%] h-[8%] bg-green-800 rounded-full"></div>
        <div className="absolute top-[30%] right-[5%] w-[8%] h-[8%] bg-green-800 rounded-full"></div>
        <div className="absolute bottom-[30%] left-[5%] w-[8%] h-[8%] bg-green-800 rounded-full"></div>
        <div className="absolute bottom-[30%] right-[5%] w-[8%] h-[8%] bg-green-800 rounded-full"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 blur-sm"></div>
      </div>
    </div>
  );
};

export default Enemy;
