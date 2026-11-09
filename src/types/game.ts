export type Difficulty = 'Very Hard' | 'Extreme' | 'Nightmare' | 'Legendary' | 'Impossible';

export interface GameDefinition {
  id: number; // 1 to 100
  title: string;
  stageId: number; // 1 to 10
  stageName: string;
  difficulty: Difficulty;
  description: string;
  instructions: string;
  objective: string;
  controlsHint: string;
  controlType: 'platformer' | 'dpad' | 'steer' | 'tap' | 'drag' | 'slider' | 'puzzle' | 'hybrid';
  icon: string;
  timeLimit?: number; // in seconds if timed
  targetScore?: number;
  initialLives: number;
}

export interface StageDefinition {
  id: number; // 1 to 10
  name: string;
  theme: string;
  color: string;
  accentColor: string;
  badge: string;
  description: string;
  levelRange: [number, number];
}

export interface LevelProgress {
  unlocked: boolean;
  completed: boolean;
  stars: number; // 0 to 3
  highScore: number;
  bestTime: number; // in seconds
  attempts: number;
  noDeathClear: boolean;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xp: number;
}

export interface PlayerSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number; // 0 to 1
  haptics: boolean;
  controlMode: 'touch' | 'dpad' | 'joystick';
}

export interface GameRunState {
  levelId: number;
  score: number;
  lives: number;
  maxLives: number;
  timeRemaining: number;
  elapsedTime: number;
  isWon: boolean;
  isLost: boolean;
  isPaused: boolean;
  starsAwarded: number;
  customStatus?: string;
}

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  actionA: boolean; // Jump / Primary
  actionB: boolean; // Action / Dash / Defend
  pointerX: number; // 0 to 1 normalized or world px
  pointerY: number;
  pointerDown: boolean;
  pointerJustTapped: boolean;
  swipeDirection: 'up' | 'down' | 'left' | 'right' | null;
}
