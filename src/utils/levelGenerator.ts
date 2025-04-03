
import { Platform, Coin, Enemy, Flag } from '../types/gameTypes';

// The width of each level
export const LEVEL_WIDTH = 2000;

export interface LevelData {
  platforms: Platform[];
  coins: Coin[];
  enemies: Enemy[];
  flag: Flag;
}

export const generateLevel = (level: number): LevelData => {
  const speedMultiplier = 1 + (level * 0.2); // Increase speed with each level
  
  // Increase enemy count and speed as levels progress
  const enemies: Enemy[] = [
    { x: 400, y: 470, direction: 'left', speed: 1 * speedMultiplier, id: 1, defeated: false },
    { x: 700, y: 320, direction: 'right', speed: 1 * speedMultiplier, id: 2, defeated: false },
    { x: 1000, y: 270, direction: 'left', speed: 1 * speedMultiplier, id: 3, defeated: false },
    { x: 1300, y: 320, direction: 'right', speed: 1 * speedMultiplier, id: 4, defeated: false },
    { x: 1600, y: 470, direction: 'left', speed: 1 * speedMultiplier, id: 5, defeated: false }
  ];
  
  // Add more enemies as levels increase
  if (level >= 2) {
    enemies.push(
      { x: 550, y: 470, direction: 'right', speed: 1.5 * speedMultiplier, id: 6, defeated: false },
      { x: 1150, y: 270, direction: 'left', speed: 1.5 * speedMultiplier, id: 7, defeated: false }
    );
  }
  
  if (level >= 3) {
    enemies.push(
      { x: 850, y: 470, direction: 'left', speed: 2 * speedMultiplier, id: 8, defeated: false },
      { x: 1450, y: 320, direction: 'right', speed: 2 * speedMultiplier, id: 9, defeated: false }
    );
  }
  
  return {
    enemies,
    coins: [
      { x: 350, y: 370, id: 1, collected: false },
      { x: 450, y: 370, id: 2, collected: false },
      { x: 650, y: 320, id: 3, collected: false },
      { x: 750, y: 320, id: 4, collected: false },
      { x: 950, y: 270, id: 5, collected: false },
      { x: 1050, y: 270, id: 6, collected: false },
      { x: 1250, y: 320, id: 7, collected: false },
      { x: 1350, y: 320, id: 8, collected: false },
      { x: 1550, y: 370, id: 9, collected: false },
      { x: 1650, y: 370, id: 10, collected: false }
    ],
    platforms: [
      { x: 0, y: 500, width: LEVEL_WIDTH, height: 100 }, // Ground
      { x: 300, y: 400, width: 200, height: 20 },
      { x: 600, y: 350, width: 200, height: 20 },
      { x: 900, y: 300, width: 200, height: 20 },
      { x: 1200, y: 350, width: 200, height: 20 },
      { x: 1500, y: 400, width: 200, height: 20 }
    ],
    flag: {
      x: 1800,
      y: 440,
      reached: false
    }
  };
};

export const getInitialGameState = () => {
  const levelData = generateLevel(1);
  
  return {
    player1: {
      x: 100,
      y: 400,
      velocityY: 0,
      isJumping: false,
      direction: 'right',
      score: 0,
      lives: 3,
      invulnerable: false
    },
    player2: {
      x: 200,
      y: 400,
      velocityY: 0,
      isJumping: false,
      direction: 'right',
      score: 0,
      lives: 3,
      invulnerable: false
    },
    platforms: levelData.platforms,
    coins: levelData.coins,
    enemies: levelData.enemies,
    flag: levelData.flag,
    gameStarted: false,
    gamePaused: false,
    gameOver: false,
    level: 1,
    levelCompleted: false,
    cameraOffset: 0
  };
};
