import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage7Game(levelId: number): GameController {
  switch (levelId) {
    case 61: return createTowerDefense();
    case 62: return createChessTrap();
    case 63: return createBombDefuser();
    case 64: return createResourceSurvival();
    case 65: return createEnemyPrediction();
    case 66: return createTacticalGrid();
    case 67: return createKingdomDefender();
    case 68: return createSecretAgent();
    case 69: return createStrategyWarRoom();
    case 70: return createGrandStrategist();
    default: return createTowerDefense();
  }
}

// L61: TOWER DEFENSE MASTER
function createTowerDefense(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('DEFEND BASE AGAINST 5 WAVES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(200, 200, 40, 40);
      ctx.fillRect(400, 200, 40, 40);
    },
  };
}

// L62: CHESS TRAP
function createChessTrap(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('TACTICAL CHECKMATE IN 2'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2600); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      // Chessboard 4x4
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? '#334155' : '#1e293b';
          ctx.fillRect(250 + c * 50, 150 + r * 50, 50, 50);
        }
      }
    },
  };
}

// L63: BOMB DEFUSER
function createBombDefuser(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('CUT THE CORRECT SEQUENCE WIRES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3200); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, w, h);
      const wireColors = ['#ef4444', '#3b82f6', '#eab308', '#ffffff'];
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = wireColors[i];
        ctx.fillRect(220, 160 + i * 40, 260, 8);
      }
    },
  };
}

// L64: RESOURCE SURVIVAL
function createResourceSurvival(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('MANAGE OXYGEN & ENERGY CYCLES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(200, 200, 150, 20);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(200, 240, 150, 20);
    },
  };
}

// L65: ENEMY PREDICTION
function createEnemyPrediction(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('CHOOSE BLIND SPOT COLD COORDINATES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2700); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(180, 140, 320, 180);
    },
  };
}

// L66: TACTICAL GRID
function createTacticalGrid(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SPEND ACTION POINTS (AP) & FLANK'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(150, 120, 400, 220);
    },
  };
}

// L67: KINGDOM DEFENDER
function createKingdomDefender(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('HOLD CASTLE RAMPARTS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3400); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, h * 0.6, w, h * 0.4);
    },
  };
}

// L68: SECRET AGENT
function createSecretAgent(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('INFILTRATE & HACK MAINFRAME'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2900); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(w / 2 - 20, h / 2 - 20, 40, 40);
    },
  };
}

// L69: STRATEGY WAR ROOM
function createStrategyWarRoom(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('COMMAND THEATER WAR ROOM NODES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3200); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(100, 100, w - 200, h - 200);
    },
  };
}

// L70: GRAND STRATEGIST (STAGE 7 FINALE)
function createGrandStrategist(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 7 FINALE: TOTAL TACTICAL VICTORY'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#eab308';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('GRAND STRATEGIST SUPREMACY', w / 2, h / 2);
    },
  };
}
