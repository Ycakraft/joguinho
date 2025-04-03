
import React from 'react';

interface PlayerProps {
  x: number;
  y: number;
  playerNumber: 1 | 2;
  direction: 'left' | 'right';
  invulnerable?: boolean;
}

const Player: React.FC<PlayerProps> = ({ x, y, playerNumber, direction, invulnerable = false }) => {
  return (
    <div 
      className={`player player-${playerNumber} ${direction === 'left' ? 'scale-x-[-1]' : ''} ${invulnerable ? 'animate-pulse opacity-70' : ''}`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
      }}
    >
      <div className="relative w-full h-full">
        {/* Laboratory goggles */}
        <div className="absolute top-1 w-full flex justify-center">
          <div className="w-[80%] h-4 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center">
            <div className="flex gap-3">
              <div className="w-3 h-3 bg-sky-300 rounded-full"></div>
              <div className="w-3 h-3 bg-sky-300 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Hair */}
        <div className="absolute top-0 w-full h-2 bg-black rounded-t-md"></div>
        
        {/* Face */}
        <div className="absolute top-5 left-[25%] right-[25%] h-[12%] bg-[#FFD6B0] rounded-full"></div>
        
        {/* Lab coat for both players */}
        <div className="absolute top-0 left-0 right-0 h-[70%] bg-white rounded-t-md"></div>
        
        {/* Scrubs underneath */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] rounded-b-md" 
          style={{ backgroundColor: playerNumber === 1 ? 'hsl(var(--player1))' : 'hsl(var(--player2))' }}></div>
          
        {/* Lab coat collar */}
        <div className="absolute top-[25%] left-[30%] right-[30%] h-[15%] bg-gray-200"></div>
        
        {/* Name tag */}
        <div className="absolute top-[40%] left-[30%] w-[20%] h-[10%]" 
          style={{ backgroundColor: playerNumber === 1 ? 'hsl(var(--player1))' : 'hsl(var(--player2))' }}></div>
          
        {/* Pocket with pens */}
        <div className="absolute top-[30%] right-[25%] w-[15%] h-[15%] bg-gray-100 border border-gray-300 flex items-center justify-center">
          <div className="w-1 h-4 bg-blue-600 mx-[1px]"></div>
          <div className="w-1 h-4 bg-red-600 mx-[1px]"></div>
        </div>
        
        {/* Stethoscope */}
        <div className="absolute top-[45%] left-[10%] right-[60%] h-[5%] bg-black rounded-full"></div>
        <div className="absolute top-[45%] left-[10%] h-[15%] w-[5%] bg-black rounded-full"></div>
        <div className="absolute top-[60%] left-[10%] w-[15%] h-[5%] bg-black rounded-full"></div>
        
        {/* Badge */}
        <div className="absolute top-[30%] left-[15%] w-[10%] h-[10%] bg-blue-200 border border-blue-500 flex items-center justify-center">
          <div className="w-[70%] h-[70%] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
