
import React, { useState, useEffect } from 'react';

interface CoinProps {
  x: number;
  y: number;
}

const Coin: React.FC<CoinProps> = ({ x, y }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`coin ${animate ? 'scale-90' : 'scale-100'}`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        transition: 'transform 0.5s ease'
      }}
    >
      {/* Pill capsule design */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[60%] rounded-full bg-white flex overflow-hidden">
          <div className="w-1/2 h-full bg-blue-500"></div>
          <div className="w-1/2 h-full bg-red-500"></div>
        </div>
      </div>
      
      {/* Highlight reflection */}
      <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-50"></div>
    </div>
  );
};

export default Coin;
