import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage9Game(levelId: number): GameController {
  switch (levelId) {
    case 81: return createZeroGravityEscape();
    case 82: return createInfiniteSpeedRun();
    case 83: return createPerfectMemory();
    case 84: return createChaosMaze();
    case 85: return createFiveElements();
    case 86: return createShadowClone();
    case 87: return createTimeLoop();
    case 88: return createTheFakeWorld();
    case 89: return createLegendarySurvival();
    case 90: return createLegendaryMaster();
    default: return createZeroGravityEscape();
  }
}

// L81: ZERO GRAVITY ESCAPE
function createZeroGravityEscape(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('NEWTONIAN INERTIA THRUSTERS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3200); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 14, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L82: INFINITE SPEED RUN
function createInfiniteSpeedRun(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('MACH-3 ACCELERATING RUNNER'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(100, h * 0.7, 40, 20);
    },
  };
}

// L83: PERFECT MEMORY
function createPerfectMemory(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('16-GLYPH QUANTUM RECALL'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3600); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#a855f7';
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          ctx.fillRect(200 + i * 50, 150 + j * 50, 40, 40);
        }
      }
    },
  };
}

// L84: CHAOS MAZE
function createChaosMaze(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('NON-EUCLIDEAN SPATIAL MAZE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3400); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(150, 150, 300, 200);
    },
  };
}

// L85: FIVE ELEMENTS
function createFiveElements(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('BALANCE 5 PRIMORDIAL FORCES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      const elemColors = ['#ef4444', '#06b6d4', '#10b981', '#f59e0b', '#a855f7'];
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = elemColors[i];
        ctx.fillRect(150 + i * 80, 200, 50, 80);
      }
    },
  };
}

// L86: SHADOW CLONE
function createShadowClone(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('COOPERATE WITH PAST SELF GHOST'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3300); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(200, 200, 30, 30);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(400, 200, 30, 30);
    },
  };
}

// L87: TIME LOOP
function createTimeLoop(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('8-SECOND REPEATING TIME LOOP'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 70, 0, Math.PI * 1.5);
      ctx.stroke();
    },
  };
}

// L88: THE FAKE WORLD
function createTheFakeWorld(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('IDENTIFY THE SINGLE GENUINE DOOR'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3400); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i === 2 ? '#10b981' : '#334155';
        ctx.fillRect(150 + i * 110, 180, 60, 100);
      }
    },
  };
}

// L89: LEGENDARY SURVIVAL
function createLegendarySurvival(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('4-PHASE BULLET HELL APOCALYPSE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(4000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#1c0a0a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 90, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}

// L90: LEGENDARY MASTER (STAGE 9 FINALE)
function createLegendaryMaster(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 9 FINALE: LEGENDARY DECATHLON'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#a855f7';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('LEGENDARY MASTER QUALIFIED', w / 2, h / 2);
    },
  };
}
