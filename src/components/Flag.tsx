
import React from 'react';
import { Flag } from 'lucide-react';

interface FlagProps {
  x: number;
  y: number;
}

const LevelFlag: React.FC<FlagProps> = ({ x, y }) => {
  return (
    <div 
      className="flag absolute flex flex-col items-center"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        height: '60px',
        width: '40px'
      }}
    >
      {/* Flagpole */}
      <div className="h-full w-2 bg-gray-700 rounded-t-md relative">
        {/* Flag */}
        <div className="absolute -right-[20px] top-0 animate-pulse">
          <Flag className="h-8 w-8 text-green-500 fill-green-500" />
        </div>
      </div>
      {/* Base */}
      <div className="w-10 h-2 bg-gray-800 rounded-md -mt-1"></div>
    </div>
  );
};

export default LevelFlag;
