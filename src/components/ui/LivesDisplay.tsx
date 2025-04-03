
import React from 'react';
import { Heart } from 'lucide-react';

interface LivesDisplayProps {
  lives: number;
  playerNumber: 1 | 2;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives, playerNumber }) => {
  const hearts = [];
  const color = playerNumber === 1 ? "text-[hsl(var(--player1))]" : "text-[hsl(var(--player2))]";
  
  // Add filled hearts for remaining lives
  for (let i = 0; i < lives; i++) {
    hearts.push(
      <Heart key={i} className={`h-5 w-5 ${color} fill-current`} />
    );
  }
  
  // Add empty hearts
  for (let i = lives; i < 3; i++) {
    hearts.push(
      <Heart key={i + 3} className={`h-5 w-5 ${color} opacity-30`} />
    );
  }
  
  return <div className="flex">{hearts}</div>;
};

export default LivesDisplay;
