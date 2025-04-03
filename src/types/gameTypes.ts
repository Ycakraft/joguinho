
export interface PlayerState {
  x: number;
  y: number;
  velocityY: number;
  isJumping: boolean;
  direction: 'left' | 'right';
  score: number;
  lives: number;
  invulnerable: boolean;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Coin {
  x: number;
  y: number;
  id: number;
  collected: boolean;
}

export interface Enemy {
  x: number;
  y: number;
  direction: 'left' | 'right';
  speed: number;
  id: number;
  defeated: boolean;
}

export interface Flag {
  x: number;
  y: number;
  reached: boolean;
}

export interface GameState {
  player1: PlayerState;
  player2: PlayerState;
  platforms: Platform[];
  coins: Coin[];
  enemies: Enemy[];
  flag: Flag;
  gameStarted: boolean;
  gamePaused: boolean;
  gameOver: boolean;
  level: number;
  levelCompleted: boolean;
  cameraOffset: number;
}
