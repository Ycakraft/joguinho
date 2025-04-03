
import React from 'react';
import { Play, Pause, Trophy } from 'lucide-react';
import { GameState } from '../../types/gameTypes';

interface GameOverlayProps {
  gameState: GameState;
  onPause: () => void;
  onRestart: () => void;
  onStart: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({ 
  gameState, 
  onPause, 
  onRestart, 
  onStart 
}) => {
  // Start screen
  if (!gameState.gameStarted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-8 rounded-lg text-center max-w-[80%]">
          <h2 className="text-2xl font-bold mb-4">Pharma Bros</h2>
          <p className="mb-6">A 2-player pharmaceutical adventure!</p>
          <div className="mb-6 text-left">
            <h3 className="font-bold mb-2">How to Play:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Each player has 3 lives</li>
              <li>Jump on enemies to defeat them and earn points</li>
              <li>Collect pill capsules for points</li>
              <li>Reach the flag at the end of each level to progress</li>
              <li>Complete all 3 levels to win</li>
            </ul>
          </div>
          <button 
            onClick={onStart}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors shadow-lg text-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }
  
  // Pause screen
  if (gameState.gamePaused && !gameState.gameOver) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
          <p className="mb-6">Press 'P' or the button below to resume</p>
          <button 
            onClick={onPause}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded hover:from-green-600 hover:to-blue-600 transition-colors shadow-md"
          >
            Resume Game
          </button>
        </div>
      </div>
    );
  }
  
  // Level complete screen
  if (gameState.levelCompleted && !gameState.gameOver) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Parabéns!</h2>
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <p className="text-xl mb-2">Fase {gameState.level} Completada!</p>
          <p className="mb-4">Preparando próxima fase...</p>
        </div>
      </div>
    );
  }
  
  // Game over screen
  if (gameState.gameOver) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-8 rounded-lg text-center">
          {(gameState.player1.lives <= 0 && gameState.player2.lives <= 0) ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-red-600">Game Over!</h2>
              <p className="mb-4">Both players lost all lives</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-green-600">Game Completed!</h2>
              <p className="mb-2">Player 1 Score: {gameState.player1.score}</p>
              <p className="mb-4">Player 2 Score: {gameState.player2.score}</p>
              <p className="mb-4 text-xl font-bold">
                {gameState.player1.score > gameState.player2.score 
                  ? "Player 1 Wins!" 
                  : gameState.player2.score > gameState.player1.score 
                    ? "Player 2 Wins!"
                    : "It's a tie!"}
              </p>
            </>
          )}
          <button 
            onClick={onStart}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded hover:from-blue-600 hover:to-purple-600 transition-colors shadow-md"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default GameOverlay;
