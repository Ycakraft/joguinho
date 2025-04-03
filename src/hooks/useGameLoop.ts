
import { useState, useEffect, useRef } from 'react';
import { GameState, PlayerState } from '../types/gameTypes';
import { LEVEL_WIDTH, generateLevel } from '../utils/levelGenerator';
import { useToast } from './use-toast';

export const useGameLoop = (initialGameState: GameState) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const gameLoopRef = useRef<number | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Function to make a player temporarily invulnerable after being hit
  const makePlayerInvulnerable = (playerNumber: 1 | 2) => {
    setGameState(prevState => ({
      ...prevState,
      [`player${playerNumber}`]: {
        ...prevState[`player${playerNumber}`],
        invulnerable: true
      }
    }));
    
    // Remove invulnerability after 2 seconds
    setTimeout(() => {
      setGameState(prevState => ({
        ...prevState,
        [`player${playerNumber}`]: {
          ...prevState[`player${playerNumber}`],
          invulnerable: false
        }
      }));
    }, 2000);
  };

  // Handle player damage
  const damagePlayer = (playerNumber: 1 | 2) => {
    setGameState(prevState => {
      const player = prevState[`player${playerNumber}`];
      
      // Skip if player is already invulnerable
      if (player.invulnerable) return prevState;
      
      const newLives = player.lives - 1;
      
      // Check if both players have lost all lives
      const otherPlayer = prevState[`player${playerNumber === 1 ? 2 : 1}`];
      const gameOver = newLives <= 0 && otherPlayer.lives <= 0;
      
      // Show toast notification
      if (newLives > 0) {
        toast({
          title: `Player ${playerNumber} hit!`,
          description: `${newLives} lives remaining`,
        });
      } else {
        toast({
          title: `Player ${playerNumber} lost all lives!`,
          description: gameOver ? "Game Over!" : `Player ${playerNumber === 1 ? 2 : 1} still has lives!`,
        });
      }
      
      // Apply damage and make temporarily invulnerable
      makePlayerInvulnerable(playerNumber);
      
      return {
        ...prevState,
        [`player${playerNumber}`]: {
          ...player,
          lives: Math.max(0, newLives),
          invulnerable: true
        },
        gameOver: gameOver
      };
    });
  };

  const startGame = () => {
    const newLevel = generateLevel(1);
    
    setGameState(prevState => ({
      ...prevState,
      gameStarted: true,
      gameOver: false,
      gamePaused: false,
      levelCompleted: false,
      level: 1,
      player1: { 
        ...prevState.player1, 
        score: 0, 
        lives: 3, 
        x: 100, 
        y: 400,
        velocityY: 0,
        isJumping: false,
        invulnerable: false
      },
      player2: { 
        ...prevState.player2, 
        score: 0, 
        lives: 3, 
        x: 200, 
        y: 400,
        velocityY: 0,
        isJumping: false,
        invulnerable: false  
      },
      platforms: newLevel.platforms,
      coins: newLevel.coins,
      enemies: newLevel.enemies,
      flag: newLevel.flag,
      cameraOffset: 0
    }));
    
    toast({
      title: "Game Started!",
      description: "Collect coins, avoid or jump on enemies, and reach the flag!",
    });
  };

  const pauseGame = () => {
    setGameState(prevState => ({
      ...prevState,
      gamePaused: !prevState.gamePaused
    }));
    
    if (!gameState.gamePaused) {
      toast({
        title: "Game Paused",
        description: "Press 'P' or click the pause button to resume.",
      });
    } else {
      toast({
        title: "Game Resumed",
        description: "Continue playing!",
      });
    }
  };

  const restartLevel = () => {
    const newLevel = generateLevel(gameState.level);
    
    setGameState(prevState => ({
      ...prevState,
      player1: { 
        ...prevState.player1, 
        x: 100, 
        y: 400,
        velocityY: 0,
        isJumping: false,
        invulnerable: false
      },
      player2: { 
        ...prevState.player2, 
        x: 200, 
        y: 400,
        velocityY: 0,
        isJumping: false, 
        invulnerable: false 
      },
      platforms: newLevel.platforms,
      coins: newLevel.coins,
      enemies: newLevel.enemies,
      flag: newLevel.flag,
      levelCompleted: false,
      gamePaused: false,
      cameraOffset: 0
    }));
    
    toast({
      title: "Level Restarted",
      description: `Current level: ${gameState.level}`,
    });
  };

  const nextLevel = () => {
    const newLevel = gameState.level + 1;
    const levelData = generateLevel(newLevel);
    
    // Check if game is completed (after level 3)
    if (newLevel > 3) {
      setGameState(prevState => ({
        ...prevState,
        gameOver: true,
        levelCompleted: false
      }));
      
      toast({
        title: "Congratulations!",
        description: "You've completed all levels! Game over!",
      });
      return;
    }
    
    setGameState(prevState => ({
      ...prevState,
      level: newLevel,
      platforms: levelData.platforms,
      coins: levelData.coins,
      enemies: levelData.enemies,
      flag: levelData.flag,
      levelCompleted: false,
      player1: { 
        ...prevState.player1, 
        x: 100, 
        y: 400,
        velocityY: 0,
        isJumping: false,
        invulnerable: false
      },
      player2: { 
        ...prevState.player2, 
        x: 200, 
        y: 400,
        velocityY: 0,
        isJumping: false,
        invulnerable: false
      },
      cameraOffset: 0
    }));
    
    toast({
      title: `Level ${newLevel}!`,
      description: `Difficulty increased! Reach the flag to complete the level!`,
    });
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
      
      // Handle pause with 'p' key
      if (e.key === 'p' && gameState.gameStarted && !gameState.gameOver) {
        pauseGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameOver, gameState.gamePaused]);

  // Handle level completion
  useEffect(() => {
    if (gameState.levelCompleted && !gameState.gameOver) {
      // Show level complete toast
      toast({
        title: `Parabéns! Fase ${gameState.level} Completada!`,
        description: "Preparando próxima fase...",
      });
      
      // Pause briefly to show level completion message
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  }, [gameState.levelCompleted]);

  // Main game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.gamePaused || gameState.levelCompleted) return;

    const gameLoop = () => {
      setGameState(prevState => {
        // Handle player 1 movement
        let newPlayer1 = { ...prevState.player1 };
        if (keysPressed.current['a']) {
          newPlayer1.x = Math.max(0, newPlayer1.x - 5);
          newPlayer1.direction = 'left';
        }
        if (keysPressed.current['d']) {
          newPlayer1.x = Math.min(LEVEL_WIDTH - 40, newPlayer1.x + 5);
          newPlayer1.direction = 'right';
        }
        if (keysPressed.current['w'] && !newPlayer1.isJumping) {
          newPlayer1.velocityY = -15;
          newPlayer1.isJumping = true;
        }

        // Handle player 2 movement
        let newPlayer2 = { ...prevState.player2 };
        if (keysPressed.current['ArrowLeft']) {
          newPlayer2.x = Math.max(0, newPlayer2.x - 5);
          newPlayer2.direction = 'left';
        }
        if (keysPressed.current['ArrowRight']) {
          newPlayer2.x = Math.min(LEVEL_WIDTH - 40, newPlayer2.x + 5);
          newPlayer2.direction = 'right';
        }
        if (keysPressed.current['ArrowUp'] && !newPlayer2.isJumping) {
          newPlayer2.velocityY = -15;
          newPlayer2.isJumping = true;
        }

        // Apply gravity to players
        newPlayer1.velocityY += 0.8;
        newPlayer1.y += newPlayer1.velocityY;
        newPlayer2.velocityY += 0.8;
        newPlayer2.y += newPlayer2.velocityY;

        // Check platform collisions for player 1
        let player1OnPlatform = false;
        prevState.platforms.forEach(platform => {
          // Check if player is falling and above platform
          if (
            newPlayer1.velocityY > 0 &&
            newPlayer1.x + 40 > platform.x &&
            newPlayer1.x < platform.x + platform.width &&
            newPlayer1.y + 60 > platform.y &&
            newPlayer1.y + 60 < platform.y + platform.height
          ) {
            newPlayer1.y = platform.y - 60;
            newPlayer1.velocityY = 0;
            newPlayer1.isJumping = false;
            player1OnPlatform = true;
          }
        });

        if (!player1OnPlatform && newPlayer1.y < 540) {
          newPlayer1.isJumping = true;
        }

        // Check platform collisions for player 2
        let player2OnPlatform = false;
        prevState.platforms.forEach(platform => {
          if (
            newPlayer2.velocityY > 0 &&
            newPlayer2.x + 40 > platform.x &&
            newPlayer2.x < platform.x + platform.width &&
            newPlayer2.y + 60 > platform.y &&
            newPlayer2.y + 60 < platform.y + platform.height
          ) {
            newPlayer2.y = platform.y - 60;
            newPlayer2.velocityY = 0;
            newPlayer2.isJumping = false;
            player2OnPlatform = true;
          }
        });

        if (!player2OnPlatform && newPlayer2.y < 540) {
          newPlayer2.isJumping = true;
        }

        // Check if player falls off the screen
        if (newPlayer1.y > 600 && newPlayer1.lives > 0) {
          newPlayer1.y = 400;
          newPlayer1.x = 100;
          newPlayer1.velocityY = 0;
          return {
            ...prevState,
            player1: {
              ...newPlayer1,
              lives: newPlayer1.lives - 1
            }
          };
        }

        if (newPlayer2.y > 600 && newPlayer2.lives > 0) {
          newPlayer2.y = 400;
          newPlayer2.x = 200;
          newPlayer2.velocityY = 0;
          return {
            ...prevState,
            player2: {
              ...newPlayer2,
              lives: newPlayer2.lives - 1
            }
          };
        }

        // Update coins (check collection)
        const newCoins = prevState.coins.map(coin => {
          if (coin.collected) return coin;

          // Check if player 1 collected coin
          if (
            newPlayer1.x + 40 > coin.x &&
            newPlayer1.x < coin.x + 20 &&
            newPlayer1.y + 60 > coin.y &&
            newPlayer1.y < coin.y + 20
          ) {
            newPlayer1.score += 10;
            return { ...coin, collected: true };
          }

          // Check if player 2 collected coin
          if (
            newPlayer2.x + 40 > coin.x &&
            newPlayer2.x < coin.x + 20 &&
            newPlayer2.y + 60 > coin.y &&
            newPlayer2.y < coin.y + 20
          ) {
            newPlayer2.score += 10;
            return { ...coin, collected: true };
          }

          return coin;
        });

        // Update enemies
        const newEnemies = prevState.enemies.map(enemy => {
          if (enemy.defeated) return enemy;

          // Move enemy
          let newX = enemy.x;
          if (enemy.direction === 'left') {
            newX -= enemy.speed;
            if (newX < 0) {
              return { ...enemy, x: 0, direction: 'right' };
            }
          } else {
            newX += enemy.speed;
            if (newX > LEVEL_WIDTH - 40) {
              return { ...enemy, x: LEVEL_WIDTH - 40, direction: 'left' };
            }
          }

          // Check if player 1 defeated enemy (by jumping on it)
          if (
            newPlayer1.velocityY > 0 &&
            newPlayer1.x + 40 > enemy.x &&
            newPlayer1.x < enemy.x + 40 &&
            newPlayer1.y + 60 > enemy.y &&
            newPlayer1.y < enemy.y + 15
          ) {
            newPlayer1.velocityY = -10; // Bounce up
            newPlayer1.score += 20;
            return { ...enemy, defeated: true };
          }

          // Check if player 2 defeated enemy
          if (
            newPlayer2.velocityY > 0 &&
            newPlayer2.x + 40 > enemy.x &&
            newPlayer2.x < enemy.x + 40 &&
            newPlayer2.y + 60 > enemy.y &&
            newPlayer2.y < enemy.y + 15
          ) {
            newPlayer2.velocityY = -10; // Bounce up
            newPlayer2.score += 20;
            return { ...enemy, defeated: true };
          }

          // Check if enemy hit player 1 from side - we now just lose points, not lives
          if (
            !enemy.defeated &&
            !newPlayer1.invulnerable &&
            newPlayer1.x + 40 > enemy.x &&
            newPlayer1.x < enemy.x + 40 &&
            newPlayer1.y + 60 > enemy.y + 15 &&
            newPlayer1.y < enemy.y + 30
          ) {
            // Player loses points (not lives like before)
            newPlayer1.score = Math.max(0, newPlayer1.score - 5);
            
            // Make player invulnerable briefly
            setTimeout(() => {
              makePlayerInvulnerable(1);
            }, 0);
          }

          // Check if player 2 hit by enemy from side
          if (
            !enemy.defeated &&
            !newPlayer2.invulnerable &&
            newPlayer2.x + 40 > enemy.x &&
            newPlayer2.x < enemy.x + 40 &&
            newPlayer2.y + 60 > enemy.y + 15 &&
            newPlayer2.y < enemy.y + 30
          ) {
            // Player loses points (not lives)
            newPlayer2.score = Math.max(0, newPlayer2.score - 5);
            
            // Make player invulnerable briefly
            setTimeout(() => {
              makePlayerInvulnerable(2);
            }, 0);
          }

          return { ...enemy, x: newX };
        });

        // Check if any player reached the flag
        let flagReached = prevState.flag.reached;
        if (!flagReached) {
          // Check if player 1 reached flag
          if (
            newPlayer1.x + 40 > prevState.flag.x &&
            newPlayer1.x < prevState.flag.x + 40 &&
            newPlayer1.y + 60 > prevState.flag.y
          ) {
            flagReached = true;
            newPlayer1.score += 50; // Bonus for reaching flag
          }
          
          // Check if player 2 reached flag
          if (
            newPlayer2.x + 40 > prevState.flag.x &&
            newPlayer2.x < prevState.flag.x + 40 &&
            newPlayer2.y + 60 > prevState.flag.y
          ) {
            flagReached = true;
            newPlayer2.score += 50; // Bonus for reaching flag
          }
        }

        // Calculate camera offset - follow the player that's furthest ahead
        const maxPlayerX = Math.max(newPlayer1.x, newPlayer2.x);
        let cameraOffset = 0;
        
        // Only start scrolling when player is beyond 350px from left edge
        if (maxPlayerX > 350) {
          cameraOffset = maxPlayerX - 350;
        }
        
        // Limit scrolling to the right edge of the level
        cameraOffset = Math.min(cameraOffset, LEVEL_WIDTH - 800);
        
        // Check if level is completed
        if (flagReached) {
          return {
            ...prevState,
            player1: newPlayer1,
            player2: newPlayer2,
            coins: newCoins,
            enemies: newEnemies,
            flag: { ...prevState.flag, reached: true },
            levelCompleted: true,
            cameraOffset
          };
        }

        // Check if both players have lost all lives
        if (newPlayer1.lives <= 0 && newPlayer2.lives <= 0) {
          return {
            ...prevState,
            player1: newPlayer1,
            player2: newPlayer2,
            coins: newCoins,
            enemies: newEnemies,
            gameOver: true,
            cameraOffset
          };
        }

        return {
          ...prevState,
          player1: newPlayer1,
          player2: newPlayer2,
          coins: newCoins,
          enemies: newEnemies,
          cameraOffset
        };
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameOver, gameState.gamePaused, gameState.levelCompleted]);

  return {
    gameState,
    startGame,
    pauseGame,
    restartLevel,
    nextLevel
  };
};
