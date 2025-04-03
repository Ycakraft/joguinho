
import React from 'react';
import Player from './Player';
import Platform from './Platform';
import Coin from './Coin';
import Enemy from './Enemy';
import LevelFlag from './Flag';
import { Pause, Play } from 'lucide-react';
import { GameControls } from './GameControls';
import LivesDisplay from './ui/LivesDisplay';
import GameOverlay from './ui/GameOverlay';
import { useGameLoop } from '../hooks/useGameLoop';
import { getInitialGameState } from '../utils/levelGenerator';

const Game: React.FC = () => {
  const { gameState, startGame, pauseGame, restartLevel } = useGameLoop(getInitialGameState());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Pharma Bros</h1>
      
      <div className="w-full max-w-[800px] flex justify-between items-center mb-2">
        <div className="player1-score flex items-center gap-2">
          <LivesDisplay lives={gameState.player1.lives} playerNumber={1} />
          <div>Player 1: {gameState.player1.score}</div>
        </div>
        <div className="level-indicator">Level: {gameState.level}</div>
        <div className="player2-score flex items-center gap-2">
          <div>Player 2: {gameState.player2.score}</div>
          <LivesDisplay lives={gameState.player2.lives} playerNumber={2} />
        </div>
      </div>
      
      {/* Game controls button bar */}
      <div className="w-full max-w-[800px] flex justify-center gap-4 mb-4">
        {gameState.gameStarted && !gameState.gameOver && (
          <button
            onClick={pauseGame}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {gameState.gamePaused ? (
              <><Play className="h-4 w-4 mr-2" /> Resume</>
            ) : (
              <><Pause className="h-4 w-4 mr-2" /> Pause</>
            )}
          </button>
        )}
        {gameState.gameStarted && !gameState.gameOver && (
          <button
            onClick={restartLevel}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Restart Level
          </button>
        )}
      </div>
      
      <div className="game-container relative overflow-hidden w-[800px] h-[600px] bg-blue-50 border-2 border-gray-300 rounded-lg">
        <div 
          className="game-world absolute"
          style={{ transform: `translateX(-${gameState.cameraOffset}px)` }}
        >
          {gameState.platforms.map((platform, index) => (
            <Platform key={index} x={platform.x} y={platform.y} width={platform.width} height={platform.height} />
          ))}
          
          {gameState.coins
            .filter(coin => !coin.collected)
            .map(coin => (
              <Coin key={coin.id} x={coin.x} y={coin.y} />
            ))}
          
          {gameState.enemies
            .filter(enemy => !enemy.defeated)
            .map(enemy => (
              <Enemy key={enemy.id} x={enemy.x} y={enemy.y} direction={enemy.direction} />
            ))}
          
          <LevelFlag x={gameState.flag.x} y={gameState.flag.y} />
          
          <Player 
            x={gameState.player1.x} 
            y={gameState.player1.y} 
            playerNumber={1}
            direction={gameState.player1.direction}
            invulnerable={gameState.player1.invulnerable}
          />
          
          <Player 
            x={gameState.player2.x} 
            y={gameState.player2.y} 
            playerNumber={2}
            direction={gameState.player2.direction}
            invulnerable={gameState.player2.invulnerable}
          />
        </div>
        
        <GameOverlay 
          gameState={gameState}
          onPause={pauseGame}
          onRestart={restartLevel}
          onStart={startGame}
        />
      </div>
      
      <GameControls />
    </div>
  );
};

export default Game;
