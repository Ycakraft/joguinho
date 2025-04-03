
import React from 'react';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Platform: React.FC<PlatformProps> = ({ x, y, width, height }) => {
  return (
    <div 
      className="platform"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {/* Top grass layer */}
      {height > 30 && <div className="absolute top-0 left-0 right-0 h-6 bg-green-700 border-b-2 border-black"></div>}
    </div>
  );
};

export default Platform;
