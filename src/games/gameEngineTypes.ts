import { InputState, GameRunState } from '../types/game';

export interface GameCallbacks {
  addScore: (points: number) => void;
  loseLife: (reason?: string) => void;
  winGame: (bonusPoints?: number) => void;
  setStatus: (status: string) => void;
}

export interface GameController {
  init: (width: number, height: number, callbacks: GameCallbacks) => void;
  update: (
    dt: number,
    input: InputState,
    callbacks: GameCallbacks
  ) => void;
  render: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => void;
  handlePointerDown?: (x: number, y: number, callbacks: GameCallbacks) => void;
  handlePointerMove?: (x: number, y: number) => void;
  handlePointerUp?: () => void;
  cleanup?: () => void;
}
