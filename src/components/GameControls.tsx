
import React from 'react';
import { Gamepad, Heart, Shield, Flag } from 'lucide-react';

export const GameControls: React.FC = () => {
  return (
    <div className="controls w-full max-w-[800px]">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad className="h-6 w-6" />
        <h3>Game Controls</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-[hsl(var(--player1))]">Player 1:</h4>
          <p><strong>W</strong> - Jump</p>
          <p><strong>A</strong> - Move Left</p>
          <p><strong>D</strong> - Move Right</p>
        </div>
        
        <div>
          <h4 className="font-bold text-[hsl(var(--player2))]">Player 2:</h4>
          <p><strong>↑</strong> - Jump</p>
          <p><strong>←</strong> - Move Left</p>
          <p><strong>→</strong> - Move Right</p>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h4 className="font-bold mb-3">How to Play:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-red-500 fill-current" /> 
              <span>Each player has 3 lives</span>
            </p>
            <p className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-blue-500" /> 
              <span>Collect coins for points</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 mb-2">
              <span>Jump on enemies for points</span>
            </p>
            <p className="flex items-center gap-2 mb-2">
              <Flag className="h-5 w-5 text-green-500" /> 
              <span>Reach the flag to complete level</span>
            </p>
          </div>
        </div>
        <p className="mt-3">Press <strong>P</strong> key to pause the game</p>
        <p className="mt-2">The player with the highest score wins when all levels are cleared!</p>
      </div>
    </div>
  );
};
